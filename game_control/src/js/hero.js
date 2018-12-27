//移动的精灵对象：闯关英雄
function Hero(count, img, height, width, left, top, userInfo) {
	this.userInfo = userInfo;
	
	this.hero_container = new createjs.Container();
	this.hero_container.x = 10;
	this.hero_container.y = 100;
	this.hero_container.scaleY = 1.5;
	this.hero_container.scaleX = 1.5;
    this.hero_container.visible = false;
	
	let self = this;
	
    //加载图片
    let image = new Image();
    image.src = this.userInfo.userImg;
    image.onload = function(){
    	self.bitmap = new createjs.Bitmap(self.userInfo.userImg);
		self.bitmap.x = left;
		self.bitmap.y = top - 110;
		self.hero_container.addChild(self.bitmap);
    };

	this.spriteSheet = new createjs.SpriteSheet({
		"animations": {
			"run": [0, count - 1, "run", 0.5],
			"stop": [count - 1]
		},
		"images": [img],
		"frames": {
			//单个帧的高度，宽度，就是png图片里面那么多个帧一个帧的大小
			"height": height,
			"width": width,
			//相对于原始偏移的位置
			"regX": 0,
			"regY": 0,
			//帧数
			"count": count
		}
	});
	this.sprite = new createjs.Sprite(this.spriteSheet);
	this.sprite.x = left + 30;
	this.sprite.y = top;
	this.hero_container.addChild(this.sprite);
	
	this.sprite.addEventListener('click', function(e) {
		e.stopPropagation();

	});
	
	
}

Hero.prototype.setVisible = function(flag) {
    this.hero_container.visible = flag;
    // this.sprite.visible = flag;
};

export {
	Hero
}