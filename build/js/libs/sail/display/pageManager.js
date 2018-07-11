class PageManager extends Laya.Box {
    constructor () {
        super();
        this.pages = [];
        this._curPageIndex = -1;
    }

    destroy () {
        super.destroy();
        this.pages.length = 0;
        this._curPageIndex = null;
    }

    add (page) {
        let curPage = this.pages[this.pages.length - 1];
        if(curPage){
            curPage.visible = false;
            curPage.onHide && curPage.onHide();
        }
        
        this.addChild(page);
        this.pages.push(page);
        this._curPageIndex++;

        page.onEnter && page.onEnter();
    }

    remove (pageNum = 1) {
        let pages = this.pages.splice(-pageNum);
        let curPage = this.pages[this.pages.length - 1];

        curPage.visible = true;
        curPage.onShow && curPage.onShow();

        for(let p of pages) {
            p.onRemove && p.onRemove();
            p.destroy();
        }
    }

    onExit () {
        for(let page of this.pages){
            page.onExit && page.onExit(width, height);
        }
    }

    onShow () {
        for(let page of this.pages){
            page.onShow && page.onShow(width, height);
        }
    }

    onHide () {
        for(let page of this.pages){
            page.onHide && page.onHide(width, height);
        }
    }

    onResize (width, height) {
        for(let page of this.pages){
            page.onResize && page.onResize(width, height);
        }
    }

    get curPage () {
        return this.pages[this._curPageIndex] || null;
    }

    get curPageIndex () {
        return this._curPageIndex;
    }
}

export default PageManager;