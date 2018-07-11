import extend from "./extend";

/**
 * @public
 * 创建骨骼动画
 * @param {String} path 骨骼动画路径
 * @param {Number} rate 骨骼动画帧率，引擎默认为30，一般传24
 * @param {Number} type 动画类型 0,使用模板缓冲的数据，模板缓冲的数据，不允许修改	（内存开销小，计算开销小，不支持换装） 1,使用动画自己的缓冲区，每个动画都会有自己的缓冲区，相当耗费内存 （内存开销大，计算开销小，支持换装） 2,使用动态方式，去实时去画	（内存开销小，计算开销大，支持换装,不建议使用）
 * 
 * @return 骨骼动画
 */
function createSkeleton (path, rate, type) {
    rate = rate || 30;
    type = type || 0;
    let png = Laya.loader.getRes(path + ".png");
    let sk  = Laya.loader.getRes(path + ".sk");
    if(!png || !sk){return null;}

    let templet = new Laya.Templet();
        templet.parseData(png, sk, rate);

    return templet.buildArmature(type);
}

/**
 * @public
 * 获取字符串长度，支持中文
 * @param {String} str 要获取长度的字符串
 * 
 * @return 字符串长度
 */
function getStringLength (str) {
    return ("" + str.replace(/[^\x00-\xff]/gi,"ox")).length;
}
/**
 * @public
 * 按指定长度截取字符串
 * @param {String} str 要截取长度的字符串
 * @param {Number} length 字符串长度
 * 
 * @return 截取长度后的字符串
 */
function cutStr (text, length) {
    text = text + "";
    let reg = /[^\x00-\xff]/g;
    if(text.replace(reg, "mm").length <= length){return text;}
    let m = Math.floor(length / 2);
    for(let i = m; i < text.length; i++){
        if(text.substr(0, i).replace(reg, "mm").length >= length){
            return text.substr(0, i) + "...";
        }
    }
    return text;
}
/**
 * @public
 * 获取URL中指定参数的值
 * @param {String} name 参数名
 * 
 * @return 参数值
 */
function getUrlParam (name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    
    if(r != null){
        return unescape(r[2]);
    }
    
    return null;
}

/**
 * @public
 * 将毫秒转换为`{h}小时{m}分钟{s}秒`的格式
 * @param {Number} total 毫秒数
 * 
 * @return 格式化后的字符串
 */
function formatTime (total) {
    let time = "";
    let h = 0;
    let m = 0;
    let s = total % 60;
    if(total > 60) {
        m = total / 60 | 0;
    }
    if(m > 60){
        h = m / 60 | 0;
        m = m % 60;
    }
    
    if(s > 0){
        time = s + "秒";
    }
    if(m > 0){
        time = m + "分钟" + time;
    }
    if(h > 0){
        time = h + "小时" + time;
    }

    return time;
}

export {
    extend,
    createSkeleton,
    getStringLength,
    cutStr,
    getUrlParam,
    formatTime
}
export default {
    extend,
    createSkeleton,
    getStringLength,
    cutStr,
    getUrlParam,
    formatTime
}