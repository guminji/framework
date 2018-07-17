import Sail from "../../libs/sail/sail";
import startPage from "./startPage";

class StartScene extends Sail.Scene {
    constructor() {
        super();
    }

    onEnter () {
        this.addPage(new startPage());
    }
    onExit () {
    }
    onShow () {
    }
    onHide () {
    }
    onResize (width, height) {}
}

export default StartScene;