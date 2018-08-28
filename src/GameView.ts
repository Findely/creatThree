class GameView extends eui.Component {
	public view: eui.Group;
	public eathbody: eui.Group;
	public threebody: eui.Group;
	public arrowbody: eui.Group;
	public myarrow: eui.Group;
	private arrowwidth: number = 29;
	private arrowheight: number = 97;
	public scoretext: eui.Label;
	public timertext: eui.Label;
	private speed: number = 10;
	private sout: number = 0;
	private gameTage: boolean = true;

	public gameover_plan: eui.Group;
	public forScore: eui.Label;
	public forSize: eui.Label;
	public btnAgain: eui.Image;
	public shareplan: eui.Image;
	public btns_rank: eui.Image;


	public constructor() {
		super();
		this.skinName = 'eui_star';
		this.myarrow.scrollEnabled = true;
		this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.init, this);
		this.btnAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GameAgain, this);
		this.shareplan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareplanbtn, this);
		this.btns_rank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rankbtnf, this);
	}
	private three: GameUtil;
	//初始化游戏界面

	private creatTimer: egret.Timer;
	private init() {
		myDate.score = 0;
		myDate.timer = 100;
		this.sout = 0;
		this.botmthreetage = false;
		this.gameTage = true;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ThreeArray, this);
		this.addEventListener(egret.TouchEvent.ENTER_FRAME, this.updateFrame, this);
		this.creatTimer = new egret.Timer(100, 0);
		this.creatTimer.addEventListener(egret.TimerEvent.TIMER, this.myTimer, this);
		this.creatTimer.start();
		//地球转动
		let eath: GameUtil = new GameUtil('3-1_png');
		eath.anchorOffsetX = 112;
		eath.anchorOffsetY = 112;
		eath.x = 320;
		eath.y = 460;
		this.eathbody.addChild(eath);

		//创建初始化树
		let three: CreatThrees = new CreatThrees('3-2_png');
		three.x = 320 + 114 * Math.cos(2 * (90 - 135) * Math.PI / 360);
		three.y = 460 + 114 * Math.sin(2 * (90 - 135) * Math.PI / 360);
		three.rotation = -135;
		this.threebody.addChild(three);

		let three2: CreatThrees = new CreatThrees('3-2_png');
		three2.x = 320 + 114 * Math.cos(2 * (90 - 90) * Math.PI / 360);
		three2.y = 460 + 114 * Math.sin(2 * (90 - 90) * Math.PI / 360);
		three2.rotation = -90;
		this.threebody.addChild(three2);

		let three3: CreatThrees = new CreatThrees('3-2_png');
		three3.x = 320 + 114 * Math.cos(2 * (90 - 220) * Math.PI / 360);
		three3.y = 460 + 114 * Math.sin(2 * (90 - 220) * Math.PI / 360);
		three3.rotation = -220;
		this.threebody.addChild(three3);


		let three4: CreatThrees = new CreatThrees('3-2_png');
		three4.x = 320 + 114 * Math.cos(2 * (90 - 15) * Math.PI / 360);
		three4.y = 460 + 114 * Math.sin(2 * (90 - 15) * Math.PI / 360);
		three4.rotation = -15;
		this.threebody.addChild(three4);


		for (let i = 0; i < 5; i++) {
			let botmthree = new GameUtil('3-2_png');
			botmthree.anchorOffsetX = this.arrowwidth / 2;
			botmthree.x = 320;
			botmthree.y = i * 55;
			this.myarrow.addChild(botmthree);
		}

	}
	//创建树苗
	private botmthreetage: boolean = false;
	private ThreeArray() {
		if (this.gameTage) {
			let threes: CreatThrees = new CreatThrees('3-2_png');
			threes.anchorOffsetX = this.arrowwidth / 2;
			threes.x = 320;
			threes.y = 763;
			this.arrowbody.addChild(threes);
			this.botmthreetage = true;
		} else {

		}
	}
	//帧数侦听函数
	private Angle: number;
	private updateFrame() {
		this.scoretext.text = myDate.score.toString();
		//地球转动
		this.eathbody.rotation += 1;
		this.threebody.rotation += 1;
		if (this.threebody.rotation <= 0) {
			this.Angle = 180 + 180 + this.threebody.rotation
		} else {
			this.Angle = this.eathbody.rotation;
		}
		//创建底部树苗的队列方式
		if (this.botmthreetage) {
			this.sout += this.speed;
			for (let i = this.myarrow.numChildren - 1; i >= 0; i--) {
				var getmythree = this.myarrow.getChildAt(i);
				getmythree.y -= this.speed;
				if (getmythree.y < 0) {
					this.myarrow.removeChild(getmythree);
				}
			}
			if (this.sout >= 50) {
				this.botmthreetage = false;
				this.sout = 0;
				let botmthree = new GameUtil('3-2_png');
				botmthree.anchorOffsetX = this.arrowwidth / 2;
				botmthree.x = 320;
				botmthree.y = 4 * 55;
				this.myarrow.addChild(botmthree);
				myDate.score++;

			}
		}
		//树苗的坐标点和旋转的角度
		for (let i = this.arrowbody.numChildren - 1; i >= 0; i--) {
			var getThrees = <CreatThrees>this.arrowbody.getChildAt(i);
			if (getThrees.ThreeImgType) {
				getThrees.y -= this.speed * 2;
			} else {

			}
			if (getThrees.y <= 560) {
				getThrees.ThreeImgType = false;
				this.threebody.addChild(getThrees);
				getThrees.x = 320 + 114 * Math.cos(2 * (90 - this.Angle) * Math.PI / 360);
				getThrees.y = 460 + 114 * Math.sin(2 * (90 - this.Angle) * Math.PI / 360);
				getThrees.rotation = -this.Angle;
			}
		}
		//碰撞检测
		for (let i = this.threebody.numChildren - 1; i >= 0; i--) {
			var numthreebd = <CreatThrees>this.threebody.getChildAt(i);
			var x1 = numthreebd.localToGlobal().x;
			var y1 = numthreebd.localToGlobal().y;
			var checkpt1 = new egret.Point(x1, y1);
			for (let j = this.arrowbody.numChildren - 1; j >= 0; j--) {
				var numArrowRct = <CreatThrees>this.arrowbody.getChildAt(j);
				var pox = numArrowRct.localToGlobal().x;
				var poy = numArrowRct.localToGlobal().y;
				var arrowRct = new egret.Rectangle(pox - 15, poy, numArrowRct.width, numArrowRct.height);
				if (arrowRct.containsPoint(checkpt1)) {
					this.gameTage = false;
				}
			}

		}
		if (this.gameTage) {

		} else {
			this.Gameover();
		}
	}
	//计时函数

	/**
	 * 设置计时器 
	 */
	private myTimer() {
		myDate.timer--;
		this.timertext.text = (myDate.timer / 10).toString();
		if (myDate.timer <= 0) {
			this.gameTage = false;
			this.creatTimer.stop();
		}
	}
	/**
 * 游戏结束调用
 */
	public Gameover() {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.updateFrame, this);
		this.forScore.text = myDate.score.toString();
		this.gameover_plan.visible = true;
		this.creatTimer.stop();
		/*if (FlageID) {
			UpdateScore(myDate.score)
		} else {
			SaveNickName()
		}
		$('.myface1').fadeOut();
		$('.myface2').fadeIn();
		$('.Percent').fadeIn();*/

	}
	/*public static UpdateScore(e) {
		if (!OpenID) {
			alert("网络连接错误！");
			return;
		}
		$.get("https://wb.jaas.ac.cn/WxGame2018/CommonHelper.ashx?Method=UpdateScore", {
			"OpenID": OpenID,
			"Score": e,
			"ProjectCode": 'GongYuanDao.G.180309',
			"ArrAy": 1  //默认是1，1是倒序（分数越高的约靠前），0（是分数越低排名越靠前）
		},
			function (result) {
				var entity = JSON.parse(result)[0];
				//$('.Percent').html(entity.Percent + '%');
				if (entity.Opt == 10) {
					alert("活动结束!");
				}
			})

		//Share("我为地球种下" + e + "颗树！你也来试试？", "https://wb.jaas.ac.cn/Game2018/GongYuanDao.G.180309/index.html", "https://wb.jaas.ac.cn/Game2018/GongYuanDao.G.180309/resource/assets/share.jpg", "种下一城繁华，收获一生财富", "GongYuanDao.G.180309");
		//PlusNums("GongYuanDao.G.180309");

	}*/
	/**
	 * 再次游戏方法
	 */
	private GameAgain() {
		for (let i = this.threebody.numChildren - 1; i >= 0; i--) {
			this.threebody.removeChild(this.threebody.getChildAt(i));
		}
		for (let i = this.eathbody.numChildren - 1; i >= 0; i--) {
			this.eathbody.removeChild(this.eathbody.getChildAt(i));
		}
		for (let i = this.arrowbody.numChildren - 1; i >= 0; i--) {
			this.arrowbody.removeChild(this.arrowbody.getChildAt(i));
		}
		for (let i = this.myarrow.numChildren - 1; i >= 0; i--) {
			this.myarrow.removeChild(this.myarrow.getChildAt(i));
		}
		this.gameover_plan.visible = false;
		this.init();
		/*$('.myface1').fadeIn();
		$('.myface2').fadeOut();
		$('.Percent').fadeOut();*/
	}
	/**
	 * 排行榜
	 */
	private rankbtnf() {
		window.location.href = 'list.html'
	}

	private shareplanbtn() {
		//$('.share').fadeIn();
	}
}