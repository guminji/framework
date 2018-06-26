/**
 * Created by guminji on 2018/6/13.
 */
//世界类 用于丢入各类元素
class world{
    constructor(){
        //super();
        this.renderTime = 0.01;//渲染间隔时间为0.02秒
        this.dynamicBallsPool = [];
        this.staticBallsPool = [];
        this.startEngine();

    }
    //开始计算小球的物理位置以及碰撞
    startEngine(){
        setInterval(()=>{
            this.dynamicBallsPool.forEach((item,index)=>{
                item.run(this.renderTime);
            })
            //检测球体之间的碰撞
            this.checkBallsBoom();
            //判断动态 进行分类 (动态,静态)
            this.divideBalls();
        },this.renderTime*1000)
    }
    //检测球体之间的碰撞
    checkBallsBoom(){
        this.dynamicBallsPool.forEach((dynamicBall,index) => {
            this.staticBallsPool.forEach((staticBall,index2) => {
                var ifBoom = this.checkDistance(dynamicBall,staticBall,staticBall.width);
                if(ifBoom){
                    dynamicBall.angle = 0;
                    dynamicBall.speed =0;
                }else{

                }
            })
        })
    }
    divideBalls(){
        this.dynamicBallsPool.forEach((dynamicBall,index)=>{
            if(!dynamicBall.speed){
                this.staticBallsPool.push(dynamicBall);
                this.dynamicBallsPool.splice[index,1];
                //this.staticBallsPool.push(dynamicBall);
            }
        })
    }
    //检测圆心的距离
    checkDistance(ball1,ball2,circleWidth){
        var distance = Math.pow((ball1.x-ball2.x),2) +Math.pow((ball1.y-ball2.y),2);
        distance = Math.sqrt(distance);
        if(distance<=circleWidth){
            return true;
        }else{
            return false;
        }
    }
    //添加入世界中
    addToWorld(ball){
        this.dynamicBallsPool.push(ball);
    }


}
module.exports = world;
