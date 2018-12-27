/**
 * Created by shaoyongkai on 2017/3/23.
 */

/**
 * 通用方法
 * remove checkHttpUrl方法
 */

let globalCommon = {
  showLog: LOG_SHOW,
  getUUID16: function (prefix) {
    let uid = new Date().getTime().toString(16);
    uid += Math.floor((1 + Math.random()) * Math.pow(16, (16 - uid.length))).toString(16).substr(1);
    return (prefix || '') + uid;
  },

  logPrint: function (dec, tem) {
    if (globalCommon.showLog) {
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

  logOnlinePrint: function (content, type) {
    let head = '=========window pc log=========> ';
    if (Object.prototype.toString.call(content) == '[object Object]') {
      content = JSON.stringify(content);
    }
    let tem = head + content;
    switch (type) {
      case 'warn':
        console.warn(tem);
        break;
      case 'error':
        console.error(tem);
        break;
      default:
        console.log(tem);
        break;
    }
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
    const result = `${ val }`;
    return result;
  },

  toInt: function (val) {
    return parseInt(val, 10);
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

  showMaskForbid: function () {
    $("#h5_course_mask_forbid").removeClass('hide');
    $("#h5_course_tea_out").removeClass('hide');
  },

  tipStuAllow: function (opt) {
    if (opt == 'do') {
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

export {globalCommon}