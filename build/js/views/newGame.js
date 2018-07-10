/**
 * Created by guminji on 2018/7/10.
 */
(function()
{
    var ball = require('../modules/ball.js');
    var world = require('../modules/world.js');
    var line  =require('../modules/line.js')
    var routerCalculate = require('../modules/routers.js');
    var getEliminateData = require('../modules/eliminate.js');
    var playSection = require('../views/playSection.js');
    var Sprite  = Laya.Sprite;
    var Stage   = Laya.Stage;
    var Texture = Laya.Texture;
    var Browser = Laya.Browser;
    var Handler = Laya.Handler;
    var WebGL   = Laya.WebGL;

    // 不支持WebGL时自动切换至Canvas
    Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

    Laya.stage.alignV = Stage.ALIGN_MIDDLE;
    Laya.stage.alignH = Stage.ALIGN_CENTER;

    Laya.stage.scaleMode = "showall";
    Laya.stage.bgColor = "#232628";
    Laya.stage.height =1334;
    Laya.stage.width =750;
    //showApe();
    var World = new world();
    var myplaySection = new playSection({
        renderData:CONFIG.balls
    });
    Laya.stage.addChild(myplaySection);
    //bindEvent(playSection);
    //renderBall();
    //复盘布局小球的位置
    function renderBall(){
        var balls = CONFIG.balls;
        //window.balls=[[1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
        for(var i= 0;i<balls.length;i++){
            for(var j =0;j<balls[i].length;j++){
                if(!!balls[i][j].status){
                    var Ball = new ball({
                        speed:0,
                        angle:0,
                        x:locationConfig.location[i][j][0],
                        y:locationConfig.location[i][j][1],
                        color:balls[i][j].color,
                        type:balls[i][j].type
                    });
                    playSection.addChild(Ball);
                    balls[i][j]._ball = Ball;
                    console.log(balls[i][j]._ball);
                    //World.addToWorld(Ball);
                }
            }
        }
    }
    function bindEvent(playSection){
        playSection.on('mousedown',this,function(e){
            window.startTime = new Date().getTime();
            var angle ='';
            var localPoint = e.target.globalToLocal({
                x:e.stageX,
                y:e.stageY
            })
            console.log(localPoint);
            if(localPoint.x>325){
                var a = (800-localPoint.y)/(localPoint.x -325);
                var angle = 180 - Math.atan(a)*180/Math.PI;

            }else{
                var a = (800-localPoint.y)/(325-localPoint.x);
                var angle = Math.atan(a)*180/Math.PI;
            }
            //画线
            var newLine = new line({
                parent:playSection,
                angle:angle
            })
            newLine.drawLine();
            //计算路径
            var routers = routerCalculate(locationConfig.location,newLine._routers);
            window.endTime =new Date().getTime();
            console.log('消耗时间',endTime - startTime);
            lanchBall(routers);
            console.log(routers);
        })
    }
    //发射小球
    function lanchBall(routers){
        var balls = CONFIG.balls;
        var realIntersectLayer= routers.ballLayer;
        //balls[realIntersectLayer.y][realIntersectLayer.x].status =1;
        var Ball = new ball({
            type:1,
            color:'green',
            x:325,
            y:800
        });
        balls[realIntersectLayer.y][realIntersectLayer.x] ={
            status:1,
            color:'green',
            type:1,
            _ball:Ball
        }
        var routerIndex =0;
        playSection.addChild(Ball);
        window.endTime =new Date().getTime();
        console.log('消耗时间2',endTime - startTime);
        animation();
        function animation(){
            laya.utils.Tween.to(Ball,{
                x:routers.routers[routerIndex][0],
                y:routers.routers[routerIndex][1]
            },200,'',laya.utils.Handler.create(this,function(){
                routerIndex += 1;
                if(routerIndex >(routers.routers.length-1)){
                    var location = {x:realIntersectLayer.x,y:realIntersectLayer.y};
                    var type = locationConfig.location[realIntersectLayer.y].length%2?'odd':'even';
                    var color = 'green';
                    var data = getEliminateData(location,type,color);
                    console.log('getEliminateData',data);
                    if(data.length>=3){
                        eliminate(data);
                    }
                    //eliminate(data);
                    return
                }else{
                    animation()
                }
            }))
        }
    }
    function eliminate(data){
        var balls = CONFIG.balls;
        for(var i = 0;i<data.length;i++){
            var x = data[i]['x'];
            var y = data[i]['y'];
            balls[y][x]._ball.destroy();
            balls[y][x] ={};
        }
    }


})();