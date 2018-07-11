import Sail from "../../libs/sail/sail";
import defaultPage from "./defaultPage";

class StartScene extends Sail.Scene {
    constructor() {
        super();
    }

    onEnter () {
        this.addPage(new defaultPage());
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