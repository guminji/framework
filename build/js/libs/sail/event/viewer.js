/**
 * 发布订阅模块构造函数
 */
class Viewer {
    constructor () {
        this.topics = {};
    }
    _register (Event, caller, CallBack) {
        // Sail.DEBUG && console.log("订阅事件：" + Event);
    
        if(!this.topics.hasOwnProperty(Event)){
            this.topics[Event] = [];
        }
    
        this.topics[Event].push({caller : caller, callback : CallBack});
    }
    _unregister (Event, CallBack) {
        if(this.topics.hasOwnProperty(Event)){
            if(CallBack && typeof CallBack === "function"){
                let Events = this.topics[Event];
                
                for(let i = 0; i < this.topics[Event].length; i++){
                    if (Events[i].callback == CallBack){
                        Events.splice(i, 1);
                        // Sail.DEBUG && console.log("删除订阅事件：" + Event + "中的事件：", CallBack);
    
                        return;
                    }
                }
            }else{
                delete this.topics[Event];
                // Sail.DEBUG && console.log("删除订阅事件：" + Event);
            }
        }else{
            // Sail.DEBUG && console.warn(new Error("不存在的订阅名：" + Event));
        }
    }
    
    /**
     * 订阅事件
     * @param  {String}    Event    事件名
     * @param  {Object}    Caller   事件作用域
     * @param  {Function}  CallBack 事件回调函数
     * 
     * @return void
     */
    register (Event, Caller, CallBack) {
        if(typeof Event == "object"){
            for(let i in Event){
                this._register(i, Caller, Event[i]);
            }
        }else{
            this._register(Event, Caller, CallBack);
        }
    }
    
    /**
     * 取消订阅事件
     * @param  {String}    Event    事件名
     * @param  {Function}  CallBack 事件函数
     * 
     * @return void
     */
    unregister (Event, CallBack) {
        if(!Event){return;}
        if(typeof Event == "object"){
            for(let i in Event){
                this._unregister(i, Event[i]);
            }
        }else{
            this._unregister(Event, CallBack);
        }
    }
    
    /**
     * 发布订阅
     * @param  {String}    Event  事件名
     * @param  {...any}    args   参数列表
     * 
     * @return void
     */
    publish (Event, ...args) {
        // let args = Array.prototype.slice.call(arguments);
        // let Event = args.shift();
        
        if(this.topics.hasOwnProperty(Event)){
            let Events = this.topics[Event];
    
            for(let i in Events){
                let event = Events[i];
    
                if(typeof event.callback === "function"){
                    event.callback.apply(event.caller, args);
                }else{
                    // Sail.DEBUG && console.log(new Error("订阅名：" + Event + "中注册了类型不正确的回调函数"));
                    // Sail.DEBUG && console.log(Events);
                }
            }
        }else{
            // Sail.DEBUG && console.warn(new Error("不存在的订阅事件：" + Event));
        }
    }
}

export default Viewer;