/**
 * Created by guminji on 2018/7/13.
 */
var bubbleUtils = require('./bubbleUtils.js');
//特殊玩法
class specialPlay{
    constructor(params){
        this.boomBalls = [];// 需要爆炸的小球
        this.eliminateBalls = [];//需要消除的小球
        this.impactBalls(params.renderData,params.ballData);
    }
    //碰撞产生的效果
    impactBalls(renderData,ballData){
        var self = this;
        var betweenBalls = bubbleUtils.getBetween(ballData);
        var ballDataX = ballData.x;
        var ballDataY = ballData.y;
        if(renderData[ballDataY][ballDataX].status&&renderData[ballDataY][ballDataX]._ball.type == 2){
            this.eliminateBalls  = this.eliminateBalls.concat(betweenBalls);
        }
        betweenBalls.forEach(function(item){
            var x = item.x;
            var y = item.y;

            //var type = renderData[y][x]._ball.type;
            if(renderData[y][x].status&&renderData[y][x]._ball.type!= 1){
                var type = renderData[y][x]._ball.type;
                //当周围有炸弹时
                switch(parseInt(type)){
                    case 2:
                        self.Boom(renderData,{
                            x:x,
                            y:y,
                            parity:renderData[y].length%2?'odd':'even'
                        },renderData[y][x]._ball);
                        break;

                }
            }
        })
        if(!!this.eliminateBalls.length){
            this.eliminateBalls.forEach(function(item){
                var x = item.x;
                var y = item.y;
                if(renderData[y][x].status&&renderData[y][x]._ball){
                    renderData[y][x]._ball.destroy(true);
                }
            })
        }
    }
    //
    Boom(renderData,ballData,boomBall){
        if(boomBall._boomed) return;
        boomBall._boomed = true;
        this.impactBalls(renderData,ballData);
    }
}
module.exports = specialPlay;

