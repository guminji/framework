import Sail from "../../libs/sail/sail";
import StartUI from "../components/startui";
import CMD_CONFIG from "../config";
var playSection = require('../room/playSection.js');

class roomPage extends Sail.Page {
    constructor() {
        super();
        this.startui = null;
        this.playSectionA  = '';
        this.registerActions()
    }
    registerActions(){
        var actions ={
            'replay':function(params){
                this.playSectionA = new playSection({
                    renderData:params.balls,
                    launchBubble:params.launchBubble,
                    layerBubble:params.layerBubble
                })
            },

        }
        Sail.io.register(actions,this);
    }
    onEnter () {
        Sail.io.emit('replay')
    }
    onExit () {
    }
    onShow () {
    }
    onHide () {
    }
    onResize (width, height) {}
}

export default roomPage;