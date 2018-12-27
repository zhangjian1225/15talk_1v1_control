
/**
 * 用户类
 * @param {Object} obj
 */
function User(obj) {
    this.container = obj.container;
    this.name = obj.name;
    this.userRanks = {};
    this.x = obj.x;
    this.y = obj.y;
    this.userInfo = obj.userInfo;
    this.callback = function () {

    };
    this.init();
}

User.prototype.init = function () {
    var self = this;
    self.userInfo.info.classList.forEach(function (value) {
        var bitmap = new createjs.Bitmap(value.src);
        bitmap.x = self.x;
        bitmap.y = self.y;
        bitmap.visible = false;
        bitmap.addEventListener('click', function (e) {
            e.stopPropagation();
            self.callback(e);
        });
        self.userRanks[value.rank] = bitmap;
        self.container.addChild(bitmap);
    });
    self.setUserRank('0');
};

User.prototype.setUserRank = function (rank) {
    this.userRanks[rank].visible = true;
};

User.prototype.setDisabled = function(flag){
	if(flag) {
        this.container.alpha = 1;
    } else {
        this.container.alpha = 0;
    }
};

export {User}