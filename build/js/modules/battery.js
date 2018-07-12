/**
 * Created by guminji on 2018/7/10.
 */
var tools = require('./tools');
//炮台类
class battery extends laya.ui.Box{
    constructor(){
        super();
        this.height = 185;
        this.width = 384;
        this.anchorX = 0.5,
        this.renderLayout();
    }
    //渲染布局
    renderLayout(){
        //渲染炮台
        var battery = this.battery = new laya.ui.Image();;
        tools.setProperty(battery,{
            height:160,
            width:130,
            anchorX:0.5,
            anchorY:0.7,
            pivotX:65,
            pivotY:112,
        })
        //this.setBg(battery,'../../images/battery.png',130,160)
        this.addChild(battery);
        this.setBg(battery,'../../images/battery.png',130,160)
        battery.pos(this.width/2,50)
        //渲染炮台底座
        var batteryBottom  = this.batteryBottom = new laya.ui.Image();
        tools.setProperty(batteryBottom,{
            height:this.height,
            width:this.width,
        })
        //this.setBg(batteryBottom,'../../images/batteryBottom.png',384,185)
        this.addChild(batteryBottom);
        this.setBg(batteryBottom,'../../images/batteryBottom.png',384,185)
        this.turnBattery(0);
    }
    //炮台转向
    turnBattery(angle){
        this.battery.rotation = angle;
    }
    //背景切换
    setBg(target,picUrl,width,height){
        Laya.loader.load(picUrl, Laya.Handler.create(this, function(res)
        {
            var t = Laya.loader.getRes(picUrl);
            target.source = t;
            //target.graphics.drawTexture(t, 192, 92.5,width,height);
        }));
    }
}
module.exports = battery;