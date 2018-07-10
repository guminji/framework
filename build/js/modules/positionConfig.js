/**
 * Created by guminji on 2018/6/19.
 */
//默认球的位置
class positionConfig{
    constructor(){
        this.ballDiameter = 65;//小球直径
        this.layerNum = 10;//泡泡最多层数
        this.ballsNum = 11;//最多每行泡泡的数目
        this.Type = 'even';//第一层的奇偶性 odd奇数 even偶数
        this.yDistance = '';//每一排相差的距离
        this.location = [];//存放每个小球应该在的位置`
        //this.calculate();
    }
    calculate(){
        //计算前重置之前的位置信息
        this.location =[];
        //每一行y坐标的间隔
        this.yDistance = Math.sqrt(this.ballDiameter*this.ballDiameter - this.ballDiameter*this.ballDiameter/4);
        for(var i =1;i<=this.layerNum;i++){
            var layerType;
            if(!!(i%2)){
                switch(this.Type){
                    case 'odd':
                        layerType = 'odd';
                    case 'even':
                        layerType = 'even'
                }
            }else{
                switch(this.Type){
                    case 'odd':
                        layerType = 'even';
                    case 'even':
                        layerType = 'odd'
                }
            }
            ((layer,layerType) =>{
                var layerLocation = this.layerCalculate(layer,layerType);
                this.location.push(layerLocation);
            })(i,layerType)

        }
        console.log('positionConfig',this.location);
    }
    //层计算坐标
    //@params layer Number 小球的层数
    //@params layer string odd奇数层 even偶数层
    layerCalculate(layer,layerType){
        var layerLocation =[],x,y; //X和Y坐标相对于直径的倍率
        var ballsNum;
        if(layerType=='even'){
            ballsNum = this.ballsNum;
            x = 0.5;
        }else{
            ballsNum = this.ballsNum-1;
            x =1;
        }
        for(var i =0;i<ballsNum;i++){
            layerLocation.push([(i+x)*this.ballDiameter,(0.5*this.ballDiameter+(layer-1)*this.yDistance)])
        }
        return layerLocation;
    }
}
var position = {
    ballDiameter:65,//小球直径
    layerNum : 10,//泡泡最多层数
    ballsNum :10,//最多每行泡泡的数目
    Type:'even',//第一层的奇偶性 odd奇数 even偶数
    yDistance:'',//每一排相差的距离
    location:[],//存放每个小球应该在的位置`
    //计算小球应该出现的位置
    calculate:function(){
        //计算前重置之前的位置信息
        this.location =[];
        //每一行y坐标的间隔
        yDistance = Math.sqrt(this.ballDiameter*this.ballDiameter - this.ballDiameter*this.ballDiameter/4);
        for(var i =1;i<=this.layerNum;i++){
            var layerType;
            if(!!(i%2)){
                switch(this.Type){
                    case 'odd':
                        layerType = 'odd';
                    case 'even':
                        layerType = 'even'
                }
            }else{
                switch(this.Type){
                    case 'odd':
                        layerType = 'even';
                    case 'even':
                        layerType = 'odd'
                }
            }
            ((layer,layerType) =>{
                var layerLocation = this.layerCalculate(layer,layerType);
                this.location.push(layerLocation);
            })(i,layerType)

        }
    },
    //层计算坐标
    //@params layer Number 小球的层数
    //@params layer string odd奇数层 even偶数层
    layerCalculate(layer,layerType){
        var layerLocation =[],x,y; //X和Y坐标相对于直径的倍率
        var ballsNum;
        if(layerType=='even'){
            ballsNum = this.ballsNum;
            x = 0.5;
        }else{
            ballsNum = this.ballsNum-1;
            x =1;
        }
        for(var i =0;i<ballsNum;i++){
            layerLocation.push([(i+x)*this.ballDiameter,(0.5*this.ballDiameter+(layer-1)*yDistance)])
        }
        return layerLocation;
    }


}

module.exports = positionConfig;