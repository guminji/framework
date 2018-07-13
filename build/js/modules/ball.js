/**
 * Created by guminji on 2018/6/13.
 */
class ball extends laya.ui.Component{
    constructor(params){
        super();
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.width =65;
        this.height = 65;
        this.speed = 500;//初始化速度
        this.angle =30;
        this.paintBall(params);
    }
    paintBall(params){
        this.color = params.color;
        this.type = params.type;
        this.speed = (!!params&&(!!params.speed||params.speed ==0))?params.speed:500;//初始化速度
        this.angle = (!!params&&(!!params.angle||params.angle ==0))?params.angle:30
        var positionX = !!params&&params.x?params.x:this.stage.width/2;
        var positionY = !!params&&params.y?params.y:this.stage.height;
        this.pos(positionX, positionY);
        var ballName = this.switchBall(params.type,params.color);
        Laya.loader.load("../../images/balls/"+ballName, Laya.Handler.create(this, function(res)
        {
            var t = Laya.loader.getRes("../../images/balls/"+ballName);
            this.graphics.drawTexture(t, 0, 0,65,65);
            //Laya.stage.addChild(this);
            //this.pos(this.stage.width/2, this.stage.height);
        }));
    }
    setAngle(angle){
        this.angle = angle;
    }
    setSpeed(speed){
        this.speed = speed;
    }
    switchBall(type,color){
        if(type == 1 ){
            return color + 'Ball.png'
        }else{
            return 'BallType'+type+'.png'
        }
    }
    run(time) {
        if (!this.angle || !this.speed) return;
        var angle = this.angle;
        var speedX,speedY; //x方向和y方向的速度
        if(angle>90){
            speedX = Math.cos((180-angle)* Math.PI / 180)*this.speed;
            speedY = -Math.sin((180-angle)* Math.PI / 180)*this.speed;
        }
        else if(angle ==90){
            speedX = 0;
            speedY = this.speed;
        }
        else {
            speedX = -Math.cos(angle* Math.PI / 180) * this.speed;
            speedY = -Math.sin(angle* Math.PI / 180) * this.speed;
        }
        this.pos(this.x+speedX*time,this.y+speedY*time);
        this.checkBoom()
    }
    //检测碰撞
    checkBoom(){
        //当点小于泡泡边缘时候 需要修正 并且反弹
        if(this.x < (this.width/2)){
            this.y = this.y +(this.width/2-this.x)/Math.tan(this.angle*Math.PI / 180);
            this.x = 0;
            this.pos(this.width/2,this.y);
            this.angle = 180-this.angle;
        }
        if(this.x>(this.parent.width-this.width/2)){
            this.y = this.y+(this.x-this.parent.width+this.width/2)/Math.tan((180-this.angle)*Math.PI /180);
            this.x = this.parent.width-this.width/2;
            this.pos(this.parent.width-this.width/2,this.y);
            this.angle = 180-this.angle;
        }
        if(this.y<=(this.height/2)){
            this.speed = 0;
            this.angle = 0;
        }
    }

}
module.exports = ball;