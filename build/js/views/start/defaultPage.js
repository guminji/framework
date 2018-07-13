import Sail from "../../libs/sail/sail";
import StartUI from "../components/startui";
import CMD_CONFIG from "../config";
var playSection = require('../room/playSection.js');

class defaultPage extends Sail.Page {
    constructor() {
        super();

        this.startui = null;
    }

    onEnter () {
        //this.addChild(new ui.start.startUI);
        //this.startui = new StartUI;
        Sail.io.emit(CMD_CONFIG.HALL.toIn,{'roomId':18},"socket")
        window.playSection1 = new playSection({
            renderData:CONFIG.balls
        })
        this.addChild(playSection1);
    }
    onExit () {
    }
    onShow () {
    }
    onHide () {
    }
    onResize (width, height) {}
}

export default defaultPage;