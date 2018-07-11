import Scene from "./display/scene";
import Page from "./display/page";
import Director from "./display/director";
import Viewer from "./event/viewer";
import IO from "./net/io";
import Utils from "./utils/utils";

const isConchApp = Laya.Render.isConchApp;
var ASSETS_VERSION = null;

function customFormat (url) {
    if (!isConchApp && url.indexOf("?v=") < 0 && url.indexOf("data:image") < 0) url += ("?v=" + ASSETS_VERSION);
    // if(Sail.DEBUG){
    //     console.log("URL.customFormat:--->  " + url);
    // }
    return url;
}

function LayaClass(_class, fullName) {
    Laya.class(_class, fullName);
}

class game {
    constructor () {
        this.__isInit = false;
        this.version = "1.1.0";
        this.class = LayaClass;

        this.Director = Director;
        this.Scene = Scene;
        this.Page = Page;
        this.Viewer = Viewer;
        this.IO = IO;
        this.Utils = Utils;
        this.DEBUG = true;

        this.viewer = new Viewer();
        this.io = new IO();
    }

    run (Config) {
        if(this.__isInit){return;}
        Laya.init(Config.WIDTH, Config.HEIGHT, Laya.WebGL);

        Laya.stage.screenMode = Config.SCREEN_MODE;
        Laya.stage.scaleMode = Config.SCALE_MODE;
        Config.BASE_PATH && (Laya.URL.basePath = Config.BASE_PATH);
        Laya.URL.customFormat = customFormat;

        if(Utils.getUrlParam("debug_status") == "1"){
            this.DEBUG = true;
        }else{
            this.DEBUG = false;
            window.console && (console.log = console.trace = console.error = function () {});
        }

        this.director = new Director(Config.DIALOGTYPE);
        ASSETS_VERSION = Config.VERSION;

        this.onStart.call(this);
        this.__isInit = true;
    }

    onStart () {}
}

const Sail = new game();

export default Sail;

//window.Sail = new Game;