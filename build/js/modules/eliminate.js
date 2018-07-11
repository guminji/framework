/**
 * Created by guminji on 2018/6/29.
 */
var ballsConifg = CONFIG.balls;
function getData(location,type,color,renderData){
    var linkedBall  = [];
    var ballsChecked = [[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}],[{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0},{checked:0}]];
    eliminate(location,type,color,ballsChecked,renderData);
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
 *@method 消除方法
 *@for
 *@param {array} lcation [x,y] x是列数 y是行数
 *@param {string} type even为双数行 odd为单数行
 *@return {array} 需要消除的球的数组
 */
function eliminate(location,type,color,ballsChecked,renderData){
    var otherBalls = getOtherBalls(location,type,color,ballsChecked,renderData);
    ballsChecked[location.y][location.x].checked =1;
    if(otherBalls.length>=0){
        for(var i = 0;i<otherBalls.length;i++){
            eliminate(otherBalls[i].location,otherBalls[i].type,otherBalls[i].color,ballsChecked,renderData);
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
            if(type=='odd'){
                if(y == location.y &&(x>=0&&x<=10)){
                    if(!!ballsConifg[y][x].status&&(ballsConifg[y][x].color == color)&&!ballsChecked[y][x].checked){
                        balls.push({
                            location:{x:x,y:y},
                            type:'odd',
                            color:color
                        })
                    }
                }else{
                    if((x>=0&&x<=9)&&!!ballsConifg[y][x].status&&(ballsConifg[y][x].color == color)){
                        if(!!ballsConifg[y][x].status&&!ballsChecked[y][x].checked){
                            balls.push({
                                location:{x:x,y:y},
                                type:'even',
                                color:color
                            })
                        }
                    }
                }
            }else{
                if(y == location.y){
                    if((x>=0&&x<=9)&&!!ballsConifg[y][x].status&&(ballsConifg[y][x].color == color)&&!ballsChecked[y][x].checked){
                        balls.push({
                            location:{x:x,y:y},
                            type:'even',
                            color:color
                        })
                    }
                }else{
                    if(!!ballsConifg[y][x].status&&(ballsConifg[y][x].color == color)&&!ballsChecked[y][x].checked){
                        balls.push({
                            location:{x:x,y:y},
                            type:'odd',
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