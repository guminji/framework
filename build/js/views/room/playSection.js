/**
 * Created by guminji on 2018/7/10.
 */
var initPosition = require('../../modules/positionConfig.js');
var fakeData = require('../../modules/fakeBallData.js');
var ball = require('../../modules/ball.js');
var battery = require('../../modules/battery.js');
var routerCalculate = require('../../modules/routers.js');
var getEliminateData = require('../../modules/eliminate.js');
var line  =require('../../modules/line.js')

//可视游戏区域
class playSection extends laya.ui.Box{
    constructor(params){
        super();
        this.width = 715;
        this.height =947;
        this.positionConfig =''; //可视区域的小球的参考位置
        this.renderData = '';//可视化视图泡泡布局
        this.renderSection();  //渲染视图
        this.initData(params);
        this.gameReplay();
        this.bindEvent();
    }
    //初始化可视区域的一些model数据
    initData(params){
        this.renderData = params.renderData; //小球的位置布局
        this.positionConfig = new initPosition(); //初始化小球的参考位置信息 x,y坐标
        this.positionConfigCalute();//可视区域面板数据 小球的位置

    }
    //根据每行的奇偶性来计算泡泡的位置
    positionConfigCalute(){
        if(!!this.renderData[0].length%2){
            this.positionConfig.Type = 'even';
        }else{
            this.positionConfig.Type = 'odd';
        }
        this.positionConfig.calculate();
    }
    //复盘
    gameReplay(){
        this.renderBubble(this.renderData);
    }
    //渲染游戏区域的泡泡
    renderBubble(balls){
        var self = this;
        for(var i= 0;i<balls.length;i++){
            for(var j =0;j<balls[i].length;j++){
                if(!!balls[i][j].status){
                    var Ball = new ball({
                        speed:0,
                        angle:0,
                        x:self.positionConfig.location[i][j][0],
                        y:self.positionConfig.location[i][j][1],
                        color:balls[i][j].color,
                        type:balls[i][j].type
                    });
                    this.addChild(Ball);
                    balls[i][j]._ball = Ball;
                    console.log(balls[i][j]._ball);
                    //World.addToWorld(Ball);
                }
            }
        }
    }
    //渲染可视界面
    renderSection(){
        //渲染背景
        this.bg = new laya.display.Sprite();
        this.setBg(this.bg);
        this.addChild(this.bg);
        //渲染炮台
        this.Battery = new battery();
        this.addChild(this.Battery);
        this.Battery.pos(357.5,800);
        console.log(this.Battery);
    }
    //检测角度
    bindEvent(){
        this.on('mousedown',this,function(e){
            //window.startTime = new Date().getTime();
            var angle ='',
                turnAngle;
            var localPoint = e.target.globalToLocal({
                x:e.stageX,
                y:e.stageY
            })
            console.log(localPoint);
            if(localPoint.x>357){
                var a = (847-localPoint.y)/(localPoint.x -357.5);
                angle = 180 - Math.atan(a)*180/Math.PI;
                turnAngle = angle - 90;

            }else{
                var a = (847-localPoint.y)/(357.5-localPoint.x);
                angle = Math.atan(a)*180/Math.PI;
                turnAngle = angle-90;
            }
            console.log(angle);
            this.Battery.turnBattery(turnAngle);
            //画线
            var newLine = new line({
                parent:this,
                angle:angle
            })
            newLine.drawLine();
            ////计算路径
            var routers = routerCalculate(this.positionConfig.location,newLine._routers,this.renderData);
            //window.endTime =new Date().getTime();
            //console.log('消耗时间',endTime - startTime);
            this.lanchBall(routers);
            //console.log(routers);
        })
    }
    lanchBall(routers){
        var self = this;
        var balls = this.renderData;
        var realIntersectLayer= routers.ballLayer;
        //balls[realIntersectLayer.y][realIntersectLayer.x].status =1;
        var Ball = new ball({
            type:1,
            color:'green',
            x:357.5,
            y:847
        });
        balls[realIntersectLayer.y][realIntersectLayer.x] ={
            status:1,
            color:'green',
            type:1,
            _ball:Ball
        }
        var routerIndex =0;
        this.addChild(Ball);
        //window.endTime =new Date().getTime();
        //console.log('消耗时间2',endTime - startTime);
        animation();
        function animation(){
            laya.utils.Tween.to(Ball,{
                x:routers.routers[routerIndex][0],
                y:routers.routers[routerIndex][1]
            },200,'',laya.utils.Handler.create(this,function(){
                routerIndex += 1;
                if(routerIndex >(routers.routers.length-1)){
                    var location = {x:realIntersectLayer.x,y:realIntersectLayer.y};
                    var type = self.positionConfig.location[realIntersectLayer.y].length%2?'odd':'even';
                    var color = 'green';
                    var data = getEliminateData(location,type,color);
                    console.log('getEliminateData',data);
                    if(data.length>=3){
                        self.eliminate(data);
                    }
                    //eliminate(data);
                    return
                }else{
                    animation()
                }
            }))
        }
    }
    //消除小球
    eliminate(data){
        var balls = CONFIG.balls;
        for(var i = 0;i<data.length;i++){
            var x = data[i]['x'];
            var y = data[i]['y'];
            balls[y][x]._ball.destroy();
            balls[y][x] ={};
        }
    }
    //背景切换
    setBg(target){
        Laya.loader.load("../../images/sectionBg.png", Laya.Handler.create(this, function(res)
        {
            var t = Laya.loader.getRes("../../images/sectionBg.png");

            target.graphics.drawTexture(t, 0, 0,715,947);
        }));
    }

}
module.exports = playSection;