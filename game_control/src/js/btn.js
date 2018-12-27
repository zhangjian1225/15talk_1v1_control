
//创建左右按钮
function Btn(obj) {
    this.bitmap = new createjs.Bitmap(obj.image);
    this.bitmap.x = obj.x;
    this.bitmap.y = obj.y;
    this.bitmap.regX = this.bitmap.getBounds().width / 2;
    this.bitmap.regY = this.bitmap.getBounds().height / 2;
}

Btn.prototype.setVisible = function (flag) {
    console.log('Btn setVisible');
    if(flag) {
        this.bitmap.alpha = 1;
    } else {
        this.bitmap.alpha = 0;
    }
};

Btn.prototype.bind = function (method, callback) {
    this.bitmap.addEventListener(method, function (e) {
        e.stopPropagation();
        callback(e);
    });
};

export {Btn}