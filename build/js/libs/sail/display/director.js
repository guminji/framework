import DialogManager from "./dialogManager";
import SceneManager from "./sceneManager";

class Director {
    constructor (dialogtype) {
        this.dialog = null;
        this.scene = null;

        this.init(dialogtype);
    }

    init (dialogtype) {
        this.dialog = new DialogManager(dialogtype);
        this.sceneManager = new SceneManager();

        // Laya.stage.addChild(this.dialog);
        Laya.Dialog.manager = this.dialog;

        // Laya.stage.on(EVENT_RESIZE, this, function () {
        //     this.onResize(Laya.stage.width, Laya.stage.height);
        // });
        // Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, function () {
        //     Sail.io.publish("stage.visible", Laya.stage.isVisibility);
        // });
        // Laya.stage.event(EVENT_RESIZE);
    }

    runScene (scene) {
        this.sceneManager.run(scene);
    }

    popScene (dialog, config) {
        this.dialog.open(dialog, config);
    }

    getRunningScene () {
        return this.sceneManager.curScene;
    }

    closeAll () {
        this.dialog.closeAll();
    }

    closeByName (name) {
        this.dialog.closeByName(name);
    }

    closeByGroup (group) {
        this.dialog.closeByGroup(group);
    }

    getDialogsByGroup (group) {
        return this.dialog.getDialogsByGroup(group);
    }

    getDialogByName (name) {
        return this.dialog.getDialogByName(name);
    }
}

export default Director;