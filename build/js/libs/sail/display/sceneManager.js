class SceneManager {
    constructor () {
        this.curScene = null;
    }

    run (scene) {
        Laya.stage.addChildAt(scene, 0);

        if(this.curScene){
            if(this.curScene.onExit){
                this.curScene.onExit();
            }
            this.curScene.destroy(true);
        }
        Laya.timer.callLater(this, function () {            
            this.curScene = scene;
            scene.onEnter && scene.onEnter();
        });
    }
}

export default SceneManager;