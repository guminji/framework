/**
 * Created by guminji on 2018/7/10.
 */
var initPosition = require('../modules/positionConfig.js');
var fakeData = require('../modules/fakeBallData.js');
var ball = require('../modules/ball.js');
//可视游戏区域
class playSection extends laya.ui.Box{
    constructor(params){
        super();
        this.width = 715;
        this.height =947;
        this.positionConfig =''; //可视区域的小球的参考位置
        this.renderSection();  //渲染视图
        this.initData(params);
        this.gameReplay();
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
        this.bg = new laya.display.Sprite();
        this.setBg(this.bg);
        this.addChild(this.bg);
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