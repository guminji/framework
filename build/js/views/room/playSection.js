/**
 * Created by guminji on 2018/7/10.
 */
var initPosition = require('../../modules/positionConfig.js');
var fakeData = require('../../modules/fakeBallData.js');
var ball = require('../../modules/ball.js');
var battery = require('battery.js');
var routerCalculate = require('../../modules/routers.js');
var getEliminateData = require('../../modules/eliminate.js');
var getFallData = require('../../modules/fall.js');
var line  =require('../../modules/line.js');
var storeData = require('../../modules/storeData.js');
var bubbleUtils = require('../../modules/bubbleUtils.js');
var specialPlay = require('../../modules/specialPlay.js');

//可视游戏区域
class playSection extends laya.ui.Box{
    constructor(params){
        super();
        this.canHit = true; //是否可以发射小球 动画过程中不能连续发射
        this.width = 715;
        this.height =947;
        this.positionConfig =''; //可视区域的小球的参考位置
        this.renderData = '';//可视化视图泡泡布局
        this.readyBall = ''; //准备发射的球
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
            this.positionConfig.Type = 'odd';
        }else{
            this.positionConfig.Type = 'even';
        }
        this.positionConfig.calculate();
    }
    //复盘
    gameReplay(){
        this.initLaunchBall();
        this.renderBubble(this.renderData);
    }
    //渲染要发射的小球
    initLaunchBall(){
        var ballConfig = storeData.launchBubble.shift();
        var Ball  = new ball({
            type:1,
            color:ballConfig.color,
            x:357.5,
            y:847
        });
        this.readyBall = Ball;
        this.addChild(Ball);

    }
    //渲染游戏区域的泡泡
    renderBubble(balls){
        var self = this;
        var positionlocation = this.positionConfig.location
        for(var i= 0;i<balls.length;i++){
            for(var j =0;j<balls[i].length;j++){
                if(!!balls[i][j].status){
                    var Ball = new ball({
                        speed:0,
                        angle:0,
                        x:positionlocation[i][j][0],
                        y:positionlocation[i][j][1],
                        color:balls[i][j].color,
                        type:balls[i][j].type
                    });
                    this.addChild(Ball);
                    if(!!balls[i][j]._ball){
                        !!balls[i][j]._ball.destroy(true);
                    }
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
            if(!this.canHit) return;
            this.canHit = false;
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
            //this.Battery.turnBattery(turnAngle);
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
            this.Battery.turnBattery(turnAngle);
            //console.log(routers);
        })
    }
    //发射泡泡
    lanchBall(routers){
        var self = this;
        var readyBall = this.readyBall;
        var balls = this.renderData;
        var realIntersectLayer= routers.ballLayer;
        if(!routers.ballLayer){
            alert('你嗝屁了!!');
            return;
        }
        balls[realIntersectLayer.y][realIntersectLayer.x] ={
            status:1,
            color:this.readyBall.color,
            type:1,
            _ball:this.readyBall
        }
        var routerIndex =0;
        var betweenBalls = bubbleUtils.getBetween({
            x:realIntersectLayer.x,
            y:realIntersectLayer.y,
            parity:this.getParity(this.renderData[realIntersectLayer.y])
        },2)
        console.log('betweenBalls',betweenBalls);
        //this.addChild(Ball);
        //window.endTime =new Date().getTime();
        //console.log('消耗时间2',endTime - startTime);
        animation();
        function animation(){
            laya.utils.Tween.to(readyBall,{
                x:routers.routers[routerIndex][0],
                y:routers.routers[routerIndex][1]
            },300,laya.utils.Ease.strongOut,laya.utils.Handler.create(this,function(){
                routerIndex += 1;
                if(routerIndex >(routers.routers.length-1)){
                    var location = {x:realIntersectLayer.x,y:realIntersectLayer.y};
                    var type = self.positionConfig.location[realIntersectLayer.y].length%2?'odd':'even';
                    var color = readyBall.color;
                    var data = getEliminateData(location,type,color,self.renderData);
                    console.log('getEliminateData',data);
                    if(data.length>=3){
                        self.eliminate(data);
                    }
                    var special = new specialPlay({
                        renderData:self.renderData,
                        ballData:{
                            x:realIntersectLayer.x,
                            y:realIntersectLayer.y,
                            parity:self.getParity(self.renderData[realIntersectLayer.y])
                        }
                    });
                    //需要掉落的小球计算
                    var fallDataType = self.positionConfig.location[0].length%2?'odd':'even';
                    var fallData = getFallData(location,fallDataType,self.renderData);
                    console.log('fallData',fallData);
                    self.eliminate(fallData);
                    self.initLaunchBall()
                    self.canHit = true;
                    return
                }else{
                    animation()
                }
            }))
        }
    }
    //获取该行的奇偶性
    getParity(layer){
        return layer.length%2?'odd':'even';
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
    //掉落层
    downLayer(layerNum){
        this.renderData.unshift(storeData.layerBubble.shift());
        this.renderData.pop();
        this.positionConfig.Type = this.renderData[0].length%2?'odd':'even';
        this.positionConfig.calculate();
        this.renderBubble(this.renderData);
    }

}
module.exports = playSection;