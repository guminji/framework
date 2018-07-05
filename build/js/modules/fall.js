/**
 * Created by guminji on 2018/6/29.
 */
var ballsConifg = CONFIG.balls;
function getData(location,type){
    var linkedBall  = [];
    var ballsChecked = [[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}]];
    for(var i=0;i<ballsChecked[0].length;i++){
        if(!ballsChecked[0][i].checked&&!!ballsConifg[0][i].status){
            fall(location,type,ballsChecked);
        }
    }
    //fall(location,type,ballsChecked);
    for(var i =0;i<ballsChecked.length;i++){
        for(var j =0;j<ballsChecked[i].length;j++){
            if(ballsChecked[i][j].checked){
                linkedBall.push({x:j,y:i});
            }
        }
    }
    return linkedBall;
}
/**
 *@method 掉落方法
 *@for
 *@param {array} lcation [x,y] x是列数 y是行数
 *@param {string} type even为双数行 odd为单数行
 *@return {array} 需要消除的球的数组
 */
function fall(location,type,ballsChecked){
    var otherBalls = getOtherBalls(location,type,ballsChecked);
    ballsChecked[location.y][location.x].checked =1;
    if(otherBalls.length>=0){
        for(var i = 0;i<otherBalls.length;i++){
            fall(otherBalls[i].location,otherBalls[i].type,ballsChecked);
        }
    }
}
/**
 *@method 获取泡泡周围6个其他6个泡泡
 *@for
 *@param {array} lcation [x,y] x是列数 y是行数
 *@param {string} type even为双数行 odd为单数行
 *@return {array} 需要消除的球的数组
 */
function getOtherBalls(location,type,color,ballsChecked){
    var balls = [];
    var otherBallsLocations;
    if(type == 'even'){
        otherBallsLocations =[
            {
                x:location.x-1,
                y:location.y-1,
            },
            {
                x:location.x,
                y:location.y-1,
            },
            {
                x:location.x+1,
                y:location.y,
            },
            {
                x:location.x,
                y:location.y+1,
            },
            {
                x:location.x-1,
                y:location.y+1,
            },
            {
                x:location.x-1,
                y:location.y,
            }
        ]
    }else{
        otherBallsLocations =[
            {
                x:location.x,
                y:location.y-1,
            },
            {
                x:location.x+1,
                y:location.y-1,
            },
            {
                x:location.x+1,
                y:location.y,
            },
            {
                x:location.x+1,
                y:location.y+1,
            },
            {
                x:location.x,
                y:location.y+1,
            },
            {
                x:location.x-1,
                y:location.y,
            }
        ]
    }
    for(var i=0;i<otherBallsLocations.length;i++){
        var x = otherBallsLocations[i].x;
        var y = otherBallsLocations[i].y;
        if(y>=0&&y<=9){
            if(type=='even'){
                if(y == location.y &&(x>=0&&x<=9)){
                    if(!!ballsConifg[y][x].status&&!ballsChecked[y][x].checked){
                        balls.push({
                            location:{x:x,y:y},
                            type:'even',
                            color:color
                        })
                    }
                }else{
                    if((x>=0&&x<=8)&&!!ballsConifg[y][x].status){
                        if(!!ballsConifg[y][x].status&&!ballsChecked[y][x].checked){
                            balls.push({
                                location:{x:x,y:y},
                                type:'odd',
                                color:color
                            })
                        }
                    }
                }
            }else{
                if(y == location.y){
                    if((x>=0&&x<=8)&&!!ballsConifg[y][x].status&&!ballsChecked[y][x].checked){
                        balls.push({
                            location:{x:x,y:y},
                            type:'odd',
                            color:color
                        })
                    }
                }else{
                    if(!!ballsConifg[y][x].status&&!ballsChecked[y][x].checked){
                        balls.push({
                            location:{x:x,y:y},
                            type:'even',
                            color:color
                        })
                    }
                }
            }
        }
    }
    return balls;
}
module.exports = getData;