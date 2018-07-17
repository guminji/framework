import Sail from "../../libs/sail/sail";
import StartUI from "../components/startui";
import CMD_CONFIG from "../config";
var playSection = require('../room/playSection.js');

class roomPage extends Sail.Page {
    constructor() {
        super();
        this.startui = null;
        this.playSectionA  = '';
        this.actions = {
            'replay':function(params){
                this.playSectionA = new playSection({
                    renderData:params.balls,
                    launchBubble:params.launchBubble,
                    layerBubble:params.layerBubble
                })
            },
        }
    }

    onEnter () {
        //this.addChild(new ui.start.startUI);
        //this.startui = new StartUI;
        // Sail.io.emit(CMD_CONFIG.HALL.toIn,{'roomId':18},"primus");
        this.playSectionA = new playSection({
            renderData:CONFIG.balls
        })
        this.addChild(this.playSectionA);
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