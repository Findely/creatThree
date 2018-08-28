class GameBegin extends eui.Component {
	public ban1: eui.Image;
	public ban2: eui.Image;
	public btn_rule: eui.Image;
	public btn_star: eui.Image;
	public btn_rank: eui.Image;
	public rule: eui.Group;
	private beainAn: egret.tween.TweenGroup;
	public constructor() {
		super();
		this.skinName = 'eui_begin';
		this.beainAn.play();
		this.btn_star.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnstarf, this);
		this.btn_rank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rankbtnf, this);
		this.btn_rule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnrulef, this);
		this.rule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnrulefc, this);
	}
	public btnstarf() {
		let view: GameView = new GameView();
		this.addChild(view);
		//$('.myface1').fadeIn();
	}
	private rankbtnf() {
		window.location.href = 'list.html'
	}
	private btnrulef() {
		this.rule.visible = true;
	}
	private btnrulefc() {
		this.rule.visible = false;
	}

}