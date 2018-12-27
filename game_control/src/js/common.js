var common = {
    isDev: 'true',//标识环境   上线改为false

    logPrint: function (dec, tem) {
        let logConf = window.localStorage.getItem('logConf');
        if (logConf == undefined) {
            //首次进入默认不打印log
            window.localStorage.setItem('logConf', this.isDev);
            logConf = this.isDev;
        }
        if (logConf == 'true') {
            let date = new Date();
            let headDes = date.toLocaleTimeString() + ' ' + date.getMilliseconds() + 'ms';
            console.log('%s========controller=======start==================>%s:', headDes, dec);
            if (tem) {
                if (tem instanceof Array) {
                    for (let v in tem) {
                        console.log(v);
                    }
                } else {
                    console.log(tem);
                }
            }
            console.log('%s========controller=======end==================>', headDes);
        }
    },

    getPageFontSize: function (frameWidth, frameHeight) {
        let aspectRatio = frameWidth / frameHeight;
        let remBase = 100;
        if (aspectRatio > 1920 / 1080) {
            remBase = 100 * (frameHeight / 1080);
        } else {
            remBase = 100 * (frameWidth / 1920);
        }
        return remBase;
    },

    //创建背景
    bg: {},

    setBg: function (obj) {
        var bitmap = new createjs.Bitmap(obj.images);
        // this.bg[obj.id] = bitmap;
        bitmap.x = obj.x;
        bitmap.y = obj.y;
        bitmap.scaleX = 1.5;
        bitmap.scaleY = 1.5;
        return bitmap;
    },

    findEquipmentById: function (equipmentJson, id) {
        console.log('findEquipmentById');
        var json = equipmentJson.filter(function (value) {
            return value.id == id;
        });
        return json[0];
    },

    findCardById: function (cardJson, id) {
        var json = cardJson.filter(function (value) {
            return value.id == id;
        });
        return json[0];
    },

    findHeroById: function (heroArr, id) {
        var json = heroArr.filter(function (item) {
            return item.userInfo.uid == id;
        });
        return json[0];
    },

    deepCopy: function (source) {
        let result = {};
        for (let key in source) {
            result[key] = Object.prototype.toString.call(source[key]) === '[object Object]' ? globalCommon.deepCopy(source[key]) : source[key];
        }
        return result;
    },

    toString: function (val) {
        if (val == null) {
            return '';
        }
        if (typeof val === 'string') {
            return val;
        }
        const result = `${val}`;
        return result;
    },

    toInt: function (val) {
        return parseInt(val, 10);
    },

    showPageLoading: function () {
        $("#h5_course_loading").removeClass("hide");
    },

    hidePageLoading: function () {
        $("#h5_course_loading").addClass("hide");
    },

    showMask: function () {
        $("#mask").removeClass('hide');
    },

    closeMask: function () {
        $("#mask").addClass('hide');
    },

    tipStuAllow: function (opt) {
        if(opt == 'do') {
            $('#h5_tip_allow_stu').removeClass('hide');
            setTimeout(function () {
                $('#h5_tip_allow_stu').addClass('hide');
            }, 5000);
        } else {
            $('#h5_tip_allow_stu').addClass('allow-draw').removeClass('hide');
            setTimeout(function () {
                $('#h5_tip_allow_stu').addClass('hide').removeClass('allow-draw');
            }, 5000);
        }
    }
    
};
// window.common = common;
export { common }