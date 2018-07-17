/**
 * Created by guminji on 2018/7/17.
 */
import Sail from "../../libs/sail/sail";
import roomPage from "./roomPage";

class StartScene extends Sail.Scene {
    constructor() {
        super();
    }

    onEnter () {
        this.addPage(new roomPage());
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