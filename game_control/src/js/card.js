//绘制简单的关卡
function Card(obj) {
    this.id = obj.id;
    this.bitmap = new createjs.Bitmap(obj.image);
    this.bitmap.x = obj.x;
    this.bitmap.y = obj.y;
    this.bitmap.scaleX = 1.5;
    this.bitmap.scaleY = 1.5;
    this.bitmap.regX = this.bitmap.getBounds().width / 2;
    this.bitmap.regY = this.bitmap.getBounds().height / 2;
    this.bitmap.canClick = obj.canClick;
    var self = this;
    this.bitmap.setAnimate= function (remove) {
        createjs.Tween.get(self.bitmap,{loop:true},{override:remove}).to({
            scaleX: 1.6,
            scaleY: 1.6
        }, 1000).to( {
            scaleX: 1.5,
            scaleY: 1.5
        },1000);
    };
}

Card.prototype.bind = function (method, callback) {
    this.bitmap.addEventListener(method, function (e) {
        e.stopPropagation();
        callback(e)
    });
};

Card.prototype.setScale = function () {
    var self = this;
    createjs.Tween.get(self.bitmap).to({
        scaleX: 1.6,
        scaleY: 1.6
    }, 100).call(function () {
        self.bitmap.scaleX = 1.5;
        self.bitmap.scaleY = 1.5;
    });
};

export {Card}