import Sail from "../../libs/sail/sail";
import StartUI from "../components/startui";
import CMD_CONFIG from "../config";
import roomScene from "../room/roomScene";


class startPage extends Sail.Page {
    constructor() {
        super();
        this.startui = null;
        this.registerActions();
    }
    registerActions(){
        var actions ={
            'toIn':function(params){
                console.log('进入房间!')
                Sail.director.runScene(new roomScene());
            },
            'getUserInfo':function(params){

            },

        }
        Sail.io.register(actions,this);
    }
    onEnter () {
        Sail.io.emit('toIn',{
            roomId:18
        });
        //this.addChild(new ui.start.startUI);
        //this.startui = new StartUI;
        // Sail.io.emit(CMD_CONFIG.HALL.toIn,{'roomId':18},"primus");
        //sail.
        //this.playSectionA = new playSection({
        //    renderData:CONFIG.balls
        //})
        //this.addChild(this.playSectionA);
    }
    onExit () {
    }
    onShow () {
    }
    onHide () {
    }
    onResize (width, height) {}
}

export default startPage;