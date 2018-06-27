/**
 * Created by guminji on 2018/6/25.
 */
//虚线类
//用于计算线的轨迹
class line{
    constructor(params){
        //super();
        this.parent = params.parent; //设定线所在的父级容器
        this.ballWidth =65; //小球的直接
        this.initData(params); //初始化计算数据
        this.calculateRouter(); //计算线与容器的碰撞点
        console.log(this._routers);
    }
    //初始化数据
    initData(params){
        this.angle = params.angle;//发射的初始角度
        this.startX = params.parent.width/2; //发射的初始x坐标
        this.startY = params.parent.height; //发射的初始y坐标
        this.containerWidth = this.parent.width; //容器的宽度
        this.containerHeight = this.parent.height; //容器的高度
        this._routers = [[this.startX,this.startY]]; //所有交点的坐标组 用于计算碰撞和画出小球的轨迹
    }
    //画线
    drawLine(){
        var points = [];
        for(var i = 0;i<this._routers.length;i++){
            points.push(this._routers[i][0],this._routers[i][1]);

        }
        this.parent.graphics.drawLines(0,0,points,'#ff0000',4);

    }
    //计算线路
    calculateRouter(){
        var tanWidth,coordinate; //计算时需要的tan边长,以及线与父容器的下一个交点coordinate
        var coordinateX,coordinateY; //下一个交点的x,y坐标
        //当角度大于90度是时候 计算直线碰击的下一个点想x,y的坐标
        if(this.angle>=90){
            tanWidth = this.containerWidth-this.startX-this.ballWidth/2;
            coordinateX = this.containerWidth-this.ballWidth/2;
            if(this.angle ==90){
                coordinateY =this.ballWidth/2
            }else{
                coordinateY = this.startY-(-tanWidth*Math.tan(this.angle*Math.PI / 180))
            }
        }else{
            //当角度大于90度是时候 计算直线碰击的下一个点
            tanWidth = this.startX - this.ballWidth/2;
            coordinateX = this.ballWidth/2;
            coordinateY = this.startY - tanWidth*Math.tan(this.angle*Math.PI / 180)
        }
        //当交点坐标超出容器时需要 结束计算 并且修正最后一个碰撞点的坐标
        if(coordinateY<=0){
            if(coordinateX == this.ballWidth/2){
                var newCoordinateX = coordinateX + (-coordinateY+this.ballWidth/2)/Math.tan(this.angle*Math.PI / 180);
            }else{
                var newCoordinateX =coordinateX - (coordinateY-this.ballWidth/2)/Math.tan(this.angle*Math.PI / 180);
            }
            this._routers.push([newCoordinateX,this.ballWidth/2]);
            return;
        }else{
            this._routers.push([coordinateX,coordinateY]);
            this.startX = coordinateX;
            this.startY = coordinateY;
            this.angle = 180 - this.angle;
            this.calculateRouter();
        }


    }



}
module.exports = line;