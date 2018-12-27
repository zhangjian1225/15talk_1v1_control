/**
 * 绘制装备
 */
function Equipment(obj){
    this.id = obj.id;
    this.bitmap = new createjs.Bitmap(obj.image);
    this.bitmap.alpha = 0.5;
    this.bitmap.x = obj.x;
    this.bitmap.y = obj.y;
    this.bitmap.regX = this.bitmap.getBounds().width / 2;
    this.bitmap.regY = this.bitmap.getBounds().height / 2;
    this.init();
}

Equipment.prototype.setVisible = function (flag) {
    if(flag) {
        this.bitmap.alpha = 1;
    } else {
        this.bitmap.alpha = 0.5;
    }
};

Equipment.prototype.setDisabled = function(flag){
	if(flag) {
        this.bitmap.visible = true;
    } else {
        this.bitmap.visible = false;
    }
};

Equipment.prototype.init = function () {

};

Equipment.prototype.bind = function () {
    this.bitmap.addEventListener('click', function (e) {
        e.stopPropagation();

    });
};

export {Equipment}