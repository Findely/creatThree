class GameUtil extends eui.Image {
	private imgUrl: String;
	public constructor(v: String) {
		super();
		this.ImgUrl = v;
	}
	private get ImgUrl(): String {
		return this.imgUrl;
	}
	private set ImgUrl(v: String) {
		this.imgUrl = v;
		var str = v;
		this.source = str.toString();
	}
}