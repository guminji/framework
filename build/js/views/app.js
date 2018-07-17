/**
 * Created by guminji on 2018/7/10.
 */
/**
 * Created by guminji on 2018/7/10.
 */

import Sail from "../libs/sail/sail";
import StartScene from "./start/startScene";


const GAME_CONFIG = {
    WIDTH       : 750,
    HEIGHT      : 1334,
    SCREEN_MODE : Laya.Stage.SCREEN_VERTICAL, //可选自动横屏:Laya.Stage.SCREEN_HORIZONTAL 或者 自动竖屏:Laya.Stage.SCREEN_VERTICAL
    SCALE_MODE  : Laya.Stage.SCALE_FIXED_HEIGHT, //自动横屏时选择:Laya.Stage.SCALE_FIXED_WIDTH  自动竖屏时选择:Laya.Stage.SCALE_FIXED_HEIGHT
    DIALOGTYPE  : "multiple", //弹窗模式 single:弹出弹窗时自动关闭其他弹窗, multiple : 允许弹出多层弹窗，可使用"closeOther:true"在弹出时关闭其他弹窗
    VERSION     : "IMG_VERSION",
    BASE_PATH   : ""
}
const IO_CONFIG = {
    "type" : "primus",
    "URL"  : websocketurl,
    "publicKey": publicKey,
    'token':token
}

Sail.onStart = function () {
    Sail.io.init(IO_CONFIG,Sail.io.ERROR);
    Sail.io.register('io.open',this,function(){
        Sail.director.runScene(new StartScene());
    });
}

Sail.run(GAME_CONFIG);