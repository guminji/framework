/**
 * Created by guminji on 2018/6/29.
 */
function getData(location,type,renderData){
    var ballsConifg = renderData;
    var linkedBall  = [];
    var ballsChecked = initBallChecked(renderData);
    for(var i=0;i<ballsChecked[0].length;i++){
        if(!ballsChecked[0][i].checked&&!!ballsConifg[0][i].status){
            fall({
                x:i,
                y:0
            },type,ballsChecked,renderData);
        }
    }
    //fall(location,type,ballsChecked);
    for(var i =0;i<ballsChecked.length;i++){
        for(var j =0;j<ballsChecked[i].length;j++){
            if(!ballsChecked[i][j].checked&&!!renderData[i][j].status){
                linkedBall.push({x:j,y:i});
            }
        }
    }
    return linkedBall;
}
/**
 *@method 初始化递归泡泡数组 用于遍历泡泡是否被递推过
 *@for
 *@param {array} lcation [x,y] x是列数 y是行数
 *@param {string} type even为双数行 odd为单数行
 *@return {array} 需要消除的球的数组
 */
function initBallChecked(renderData){
    var ballsChecked =[];
    for(var i=0;i<renderData.length;i++){
        var layerData = [];
        for(var j = 0;j<renderData[i].length;j++){
            layerData.push({
                checked:0
            });
        }
        ballsChecked.push(layerData)

    }
    return ballsChecked;
}
/**
 *@method 掉落方法
 *@for
 *@param {array} lcation [x,y] x是列数 y是行数
 *@param {string} type even为双数行 odd为单数行
 *@return {array} 需要消除的球的数组
 */
function fall(location,type,ballsChecked,renderData){
    var otherBalls = getOtherBalls(location,type,ballsChecked,renderData);
    ballsChecked[location.y][location.x].checked =1;
    if(otherBalls.length>=0){
        for(var i = 0;i<otherBalls.length;i++){
            fall(otherBalls[i].location,otherBalls[i].type,ballsChecked,renderData);
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
function getOtherBalls(location,type,ballsChecked,renderData){
    var ballsConifg = renderData;
    var balls = [];
    var otherBallsLocations;
    if(type == 'odd'){
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
                    if(!!ballsConifg[y][x].status&&!ballsChecked[y][x].checked){
                        balls.push({
                            location:{x:x,y:y},
                            type:'odd',
                            //color:color
                        })
                    }
                }else{
                    if((x>=0&&x<=9)&&!!ballsConifg[y][x].status){
                        if(!!ballsConifg[y][x].status&&!ballsChecked[y][x].checked){
                            balls.push({
                                location:{x:x,y:y},
                                type:'even',
                                //color:color
                            })
                        }
                    }
                }
            }else{
                if(y == location.y){
                    if((x>=0&&x<=9)&&!!ballsConifg[y][x].status&&!ballsChecked[y][x].checked){
                        balls.push({
                            location:{x:x,y:y},
                            type:'even',
                            //color:color
                        })
                    }
                }else{
                    if(!!ballsConifg[y][x].status&&!ballsChecked[y][x].checked){
                        balls.push({
                            location:{x:x,y:y},
                            type:'odd',
                            //color:color
                        })
                    }
                }
            }
        }
    }
    return balls;
}
module.exports = getData;