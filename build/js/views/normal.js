/**
 * Created by guminji on 2018/7/10.
 */
/**
 * Created by guminji on 2018/7/10.
 */
(function()
{
    var Sprite  = Laya.Sprite;
    var Stage   = Laya.Stage;
    var Texture = Laya.Texture;
    var Browser = Laya.Browser;
    var Handler = Laya.Handler;
    var WebGL   = Laya.WebGL;

    // 不支持WebGL时自动切换至Canvas
    Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

    Laya.stage.alignV = Stage.ALIGN_MIDDLE;
    Laya.stage.alignH = Stage.ALIGN_CENTER;

    Laya.stage.scaleMode = "showall";
    Laya.stage.bgColor = "#232628";
    Laya.stage.height =1334;
    Laya.stage.width =750;
    //页面布局

})();