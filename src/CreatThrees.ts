class CreatThrees extends eui.Image {
	private threeimgUrl: String;
	private threeimgType: boolean;
	public constructor(v: String) {
		super();
		this.ThreeImgUrl = v;
		this.ThreeImgType = true;
	}
	public get ThreeImgUrl(): String {
		return this.threeimgUrl;
	}
	public set ThreeImgUrl(v: String) {
		this.threeimgUrl = v;
		this.source = this.threeimgUrl.toString();
	}
	public get ThreeImgType(): boolean {
		return this.threeimgType;
	}
	public set ThreeImgType(v: boolean) {
		this.threeimgType = v;
	}
}