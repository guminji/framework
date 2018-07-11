/**
 * Created [1] guminji on 2018/6/25.
 */
//计算相撞的球的坐标 以及运动轨迹
//核心算法

var ballLayer ={};//小球最后的行数 行数和列数
var locationConfig = require('../modules/positionConfig.js');//小球的默认位置

//核心算法 计算小球实际最后的运动轨迹
//@params locationsConfig Array //小球的默认坐标
//@params routers Array 直线轨迹
function routerCalculate(locationsConfig,routers,locations){
    //var locations =window.CONFIG.balls; //小球的占位信息
    var fakeIntersect = []; //相交但是不占位的球
    var realIntersect = []; //真实相交的第一个球
    var intersectIndex = 0;//在第几个交点上相切
    //拿到直线轨迹的点组成
    for(var i=0;i<routers.length-1;i++){
        //与每个小球的默认位置做比较
        for(var j=locationsConfig.length-1;j>=0;j--){
            //角度小于90时
            if(routers[i][0]>routers[i+1][0]){
                    //角度小于90时 从右侧开始计算碰撞 因为肯定是右侧的球先相交
                    for(var k=locationsConfig[j].length-1;k>=0;k--){
                        //计算直线与小球的位置
                        var distance = getDistance(routers[i],routers[i+1],locationsConfig[j][k]);
                        //当距离小于半径且相交的小球占位时 退出循环 计算结束
                        if(distance<=32.5&&!!locations[j][k].status){
                            realIntersect.push({
                                //小球的坐标
                                coordinate:{
                                    x:locationsConfig[j][k][0],
                                    y:locationsConfig[j][k][1]
                                },
                                //小球的占位数
                                layer:{
                                    x:k,
                                    y:j
                                },
                                //小球所在行的奇偶性
                                type:locationsConfig[j].length%2?'odd':'even'
                            })
                            intersectIndex = i+1;//相交于第几条直线
                            //计算最后的小球路径
                            return lastCalculate(fakeIntersect,realIntersect,intersectIndex,routers);
                        }
                        else if(distance<32.5&&!locations[j][k].status){
                            fakeIntersect.push({
                                coordinate:{
                                    x:locationsConfig[j][k][0],
                                    y:locationsConfig[j][k][1]
                                },
                                layer:{
                                    x:k,
                                    y:j
                                },
                                type:locationsConfig[j].length%2?'odd':'even'
                            })
                        }
                }
            }
            //角度大于90 算法从左开始计算碰撞
            if(routers[i][0]<routers[i+1][0]){
                for(var k=0;k<locationsConfig[j].length;k++){
                    var distance = getDistance(routers[i],routers[i+1],locationsConfig[j][k]);
                    if(distance<=32.5&&!!locations[j][k].status){
                        realIntersect.push({
                            coordinate:{
                                x:locationsConfig[j][k][0],
                                y:locationsConfig[j][k][1]
                            },
                            layer:{
                                x:k,
                                y:j
                            },
                            type:locationsConfig[j].length%2?'odd':'even'
                        })
                        intersectIndex = i+1;
                        return lastCalculate(fakeIntersect,realIntersect,intersectIndex,routers);
                    }else if(distance<32.5&&!locations[j][k].status){
                        fakeIntersect.push({
                            coordinate:{
                                x:locationsConfig[j][k][0],
                                y:locationsConfig[j][k][1]
                            },
                            layer:{
                                x:k,
                                y:j
                            },
                            type:locationsConfig[j].length%2?'odd':'even'
                        })
                    }
                }
            }
        }
    }

}
//计算最后得到小球运动轨迹
function lastCalculate(fakeIntersect,realIntersect,intersectIndex,routers){
    //获取最后小球落于哪个坐标
    var realLocation = getballLocation(fakeIntersect,realIntersect);
    var routers = routers.slice(0,intersectIndex+1);
    //修正最后一个点的坐标
    routers[routers.length-1] = realLocation;
    //一些特殊角度需要修正
    if(routers.length>=3){
        if(routers[routers.length-2][1]<routers[routers.length-1][1]){
            routers[routers.length-2] = routers[routers.length-1]
            routers = routers.slice(0,intersectIndex);
        }
    }
    //
    return {
        ballLayer:ballLayer,//小球的列数 行数
        //realIntersect:realIntersect, //小球
        routers:routers //小球最后的运动轨迹 ARRAY [points];
    };
}
function getballLocation(fakeIntersect,realIntersect){
    var ballLocation = [];//小球位置
    for(var i = fakeIntersect.length-1;i>=0;i--){
        //同一行相交未占位的球优先计算
        if(fakeIntersect[i].layer.y == realIntersect[0].layer.y){
            if((fakeIntersect[i].layer.x == (realIntersect[0].layer.x-1)) ||(fakeIntersect[i].layer.x == (realIntersect[0].layer.x+1))){
                ballLocation[0] = fakeIntersect[i].coordinate.x; //小球的x坐标
                ballLocation[1] = fakeIntersect[i].coordinate.y;//小球的y坐标
                ballLayer.x =fakeIntersect[i].layer.x;//小球的列数
                ballLayer.y =fakeIntersect[i].layer.y;//小球的行数
                return ballLocation;
            }
        //下一行相交未占位的球
        }else if((fakeIntersect[i].layer.y-1) == realIntersect[0].layer.y){
            if(realIntersect[0].type == 'odd'){
                if((fakeIntersect[i].layer.x == (realIntersect[0].layer.x-1)) ||fakeIntersect[i].layer.x == realIntersect[0].layer.x){
                    ballLocation[0] = fakeIntersect[i].coordinate.x;
                    ballLocation[1] = fakeIntersect[i].coordinate.y;
                    ballLayer.x =fakeIntersect[i].layer.x;
                    ballLayer.y =fakeIntersect[i].layer.y;
                    return ballLocation;
                }
            }else{
                if((fakeIntersect[i].layer.x == (realIntersect[0].layer.x+1))  ||fakeIntersect[i].layer.x == realIntersect[0].layer.x){
                    ballLocation[0] = fakeIntersect[i].coordinate.x;
                    ballLocation[1] = fakeIntersect[i].coordinate.y;
                    ballLayer.x =fakeIntersect[i].layer.x;
                    ballLayer.y =fakeIntersect[i].layer.y;
                    return ballLocation;
                }
            }
        }

    }
    //一些特殊角度交到了双数的一排边 然后最近的相交球在下面1层
    if(!ballLocation.length){
        var x = realIntersect[0].layer.x;
        var y = realIntersect[0].layer.y+2;
        ballLayer.x =x;
        ballLayer.y =y;
        return [locationConfig.location[y][x][0],locationConfig.location[y][x][1]];
    }
    //return locationsConfig[];
}
//计算直线到点的距离
//@p1 p2,p2 string p1,p2组成直线 ,p3为直线外一点
function getDistance(p1,p2,p3)
{
    var len;

    //如果p1.x==p2.x 说明是条竖着的线
    if(p1[0]-p2[0]==0)
    {
        len=Math.abs(p3[0]-p1[0])
    }
    else
    {
        var A=(p1[1]-p2[1])/(p1[0]-p2[0])
        var B=p1[1]-A*p1[0]

        len=Math.abs((A*p3[0]+B-p3[1])/Math.sqrt(A*A+1))
    }

    return len
}

module.exports = routerCalculate;