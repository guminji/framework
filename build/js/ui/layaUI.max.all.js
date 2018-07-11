var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var startUI=(function(_super){
		function startUI(){
			
		    this.btnChangeScene=null;

			startUI.__super.call(this);
		}

		CLASS$(startUI,'ui.start.startUI',_super);
		var __proto__=startUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(startUI.uiView);

		}

		startUI.uiView={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Button","props":{"y":717,"x":308,"width":200,"var":"btnChangeScene","labelSize":50,"label":"切换场景","height":100}},{"type":"Label","props":{"y":547,"x":387,"text":"start scene"}}]};
		return startUI;
	})(View);