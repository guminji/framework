import Sail from "../../libs/sail/sail";
import StartUI from "../components/startui";

class defaultPage extends Sail.Page {
    constructor() {
        super();

        this.startui = null;
    }

    onEnter () {
        //this.addChild(new ui.start.startUI);
        this.startui = new StartUI;
        this.addChild(this.startui);
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