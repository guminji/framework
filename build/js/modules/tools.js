/**
 * Created by guminji on 2018/7/11.
 */
Tools = {
    setProperty:function(target,options){
        for(var property in options){
            target[property] = options[property];
        }
    }
}
module.exports = Tools;