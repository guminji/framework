import PageManager from "./pageManager";

class Scene extends Laya.View {
    constructor () {
        super();
        this.pageManager = new PageManager(this);
        this.addChild(this.pageManager);

        this.setSceneSize();
        
        Laya.stage.on(Laya.Event.RESIZE, this, this.setSceneSize);
        Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, this.onVisibilityChange);
    }

    setSceneSize() {
        this.callLater(() =>{
            this.size(Laya.stage.width, Laya.stage.height);
            this.onResize();
            this.pageManager.onResize(this.width, this.height);
        });
    }

    onVisibilityChange () {
        if(Laya.stage.isVisibility){
            this.onShow();
        }else{
            this.onHide();
        }
    }

    destroy () {
        Laya.stage.off(Laya.Event.RESIZE, setSceneSize);
        Laya.stage.off(Laya.Event.VISIBILITY_CHANGE, onVisibilityChange);
        super.destroy();
    }

    addPage (page) {
        this.pageManager.add(page);
    }

    removePage (index) {
        this.pageManager.remove(index);
    }

    onEnter () {}
    onExit () {
        this.pageManager.onExit();
    }
    onShow () {
        this.pageManager.onShow();
    }
    onHide () {
        this.pageManager.onHide();
    }
    onResize (width, height) {}

    get curPage () {
        return this.pageManager.curPage;
    }

    get curPageIndex () {
        return this.pageManager.curPageIndex;
    }
}

export default Scene;