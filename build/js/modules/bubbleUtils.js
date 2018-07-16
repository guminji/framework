/**
 * Created by guminji on 2018/7/16.
 */
var bubbleUtils ={
    /**
     * @method 获取相邻n个单位的小球
     * @param {obj} renderData 可视界面小球的分布数据
     * @param {obj} position 可视界面小球的坐标点
     * @param {obj} ballData
     * @return 格式化后的字符串
     */
    getBetween:function(ballData,unit){
        var self = this;
        //获取相邻一排的奇偶性
        function getParity(index){
            var jugleValue = !!(index%2);
            if(jugleValue){
                if(ballData.parity == 'odd'){
                    return 'even';
                }else{
                    return 'odd';
                }
            }else{
                return ballData.parity;
            }
        }
        //获取相邻一行小球的x坐标
        function getBeside(ballData){
            if(!!ballData){
                if(ballData.parity == 'odd'){
                    return ballData.x;
                }else{
                    return ballData.x+1;
                }
            }
        }
        var unit = unit?unit:1;//默认相邻一行的数据
        var balls=[];//最终获取小球的数组
        //首先获取左右两边的小球
        var sameLevelBallls = []; //相邻两边的球
        var blewLevelBalls = []; //下方的球
        var upLevelBalls = []; //上方的球
        //首先获取左右两边的小球
        for(var i =unit;i>0;i--){
            sameLevelBallls.push({
                parity:ballData.parity,
                x:ballData.x-i,
                y:ballData.y
            })
        }
        for(var i =1;i<=unit;i++){
            sameLevelBallls.push({
                parity:ballData.parity,
                x:ballData.x+i,
                y:ballData.y
            })
        }
        //获取平行的第一个球的横坐标
        var besideBallX = getBeside(sameLevelBallls[0]);
        //获取上面的小球
        for(var i=1;i<=unit;i++){
            var layerBalls = [];
            var parity = getParity(i);
            for(var j =0;j<sameLevelBallls.length-i+1;j++){
                layerBalls.push({
                    parity:parity,
                    x:besideBallX+j,
                    y:ballData.y-i
                })
            }
            besideBallX = getBeside(layerBalls[0]);
            upLevelBalls = upLevelBalls.concat(layerBalls);
        }
        //获取平行的第一个球的横坐标
        besideBallX = getBeside(sameLevelBallls[0]);
        //获取下面的小球
        for(var i=1;i<=unit;i++){
            var layerBalls = [];
            var parity = getParity(i);
            for(var j =0;j<sameLevelBallls.length-i+1;j++){
                layerBalls.push({
                    parity:parity,
                    x:besideBallX+j,
                    y:ballData.y+i
                })
            }
            besideBallX = getBeside(layerBalls[0]);
            blewLevelBalls =blewLevelBalls.concat(layerBalls);
        }
        var fakeBalls = sameLevelBallls.concat(blewLevelBalls).concat(upLevelBalls);
        //最后检验真实性 是否存在的点
        fakeBalls.forEach(function(item,index){
            if(!!self.jugleExist(item)){
                balls.push(item);
            }
        })
        return balls;
    },

    /**
     * @method 判断是二维数组中这些值是否客观存在
     * @param {obj}  parity odd奇数行 even 偶数行 location {x:1,y:1} 排数行数
     * @return {booleam}是否客观存在
     */
    jugleExist:function(ballData){
        //检查行数是否合理
        if(ballData.y>10||ballData.y<0){
            return false;
        }
        if(ballData.parity == 'odd'){
            if(ballData.x>=0&&ballData.x<=10){
                return true;
            }
        }else{
            if(ballData.x>=0&&ballData.x<=9){
                return true;
            }
        }
        return false;
    }

}
module.exports = bubbleUtils;