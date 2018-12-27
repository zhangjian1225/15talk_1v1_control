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
    const result = `${val}`;
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
    $('#h5_course_loading').removeClass('hide');
  },

  hidePageLoading: function () {
    $('#h5_course_loading').addClass('hide');
  },

  showMask: function () {
    $('#mask').removeClass('hide');
  },

  closeMask: function () {
    $('#mask').addClass('hide');
  },

  showMaskForbid: function () {
    $('#h5_course_mask_forbid').removeClass('hide');
    $('#h5_course_tea_out').removeClass('hide');
  },

  getProtocol: function () {
    return document.location.protocol;
  },

  /***
   * 画笔授权、操作授权提示
   * @param act 动作：authorize 授权，cancel_authorize 取消授权
   * @param subact 具体操作类型：draw:画笔授权，operate:操作授权
   *
   * 两个提示不互斥，显示最近一个操作的提示，如果取消其中一个，另一个提示显示出来
   */
  tipStuAllow: function (act, subact) {
    if (act === 'authorize') {
      //授权操作
      if (subact) {
        addOrRemoveAct('add', subact);
      }
      showTip(subact);
    }
    else if (act === 'cancel_authorize' && subact) {
      //取消授权
      addOrRemoveAct('remove', subact);
      if ($('#h5_tip_allow_stu').hasClass('slideInRight')) {
        $('#h5_tip_allow_stu').removeClass('slideInRight').addClass('slideOutRight');
      }

      //获取最近一次其它的授权并显示，没有则不处理
      let dataType = $('#h5_tip_allow_stu').attr('data-type');
      dataType = JSON.parse(dataType || '[]');
      if (Array.isArray(dataType) && dataType.length) {
        let lastSubact = dataType[dataType.length - 1];
        showTip(lastSubact);
      }
    }

    function addOrRemoveAct(type, subact) {
      let dataType = $('#h5_tip_allow_stu').attr('data-type');
      //data-type="['operate','draw']"
      dataType = JSON.parse(dataType || '[]');
      if (!Array.isArray(dataType)) {
        dataType = [];
      }
      let i = dataType.indexOf(subact); //操作值
      if (type === 'add' && i === -1) {
        //没有就添加
        dataType.push(subact);
      } else if (type === 'remove' && i > -1) {
        //有才移除
        dataType.splice(i, 1);
      }
      $('#h5_tip_allow_stu').attr('data-type', JSON.stringify(dataType));
    }

    function showTip(subact) {
      if (subact === 'operate') {
        //操作授权
        $('#h5_tip_allow_stu').removeClass('slideOutRight').removeClass('allow-draw').addClass('allow-do').addClass('slideInRight');
        $('#h5_tip_allow_stu').find('.tip-text').html('请作答<span class="dotting"></span>');
      }
      else if (subact === 'draw') {
        //画笔授权
        $('#h5_tip_allow_stu').removeClass('slideOutRight').removeClass('allow-do').addClass('allow-draw').addClass('slideInRight');
        $('#h5_tip_allow_stu').find('.tip-text').html('请作答<span class="dotting"></span>');
      }
    }
  }

};

export {globalCommon};
