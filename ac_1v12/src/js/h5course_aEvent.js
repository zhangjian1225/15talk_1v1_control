/**
 * Created by haowerui on 2017/3/23.
 * 说明：
 *      事件代理模块
 *      根据数据池的数据集中处理事件的绑定和处理方式
 *      比如处理特色课程事件处理
 *      教材品质逻辑与参数
 */

import {classConf} from './classConf';
import {globalCommon} from './h5course_globalCommon';
import {syncActions} from './h5course_syncActions';

let eventBind = {
  //绑定入口
  bind: function () {
    classConf.event.resize && eventBind.resizeEvent();
    classConf.event.tools && eventBind.toolEvent();
    classConf.event.mouse && eventBind.mouseEvent();
  },

  iTimer: 0,

  /**
   * 教材品质相关
   */
  courseQuality: ['high', 'medium', 'low'],
  qualityPzIndex: 0,

  resetQuality: function (count) {
    let selfFrame = $('#h5_course_self_frame');
    let pz = this.courseQuality[count];
    if (!pz) {
      pz = this.courseQuality[this.courseQuality.length - 1];
    }
    classConf.h5Course.currentCourseQuality = pz;
    let currentPageUrl = syncActions.getPageUrl(globalCommon.toInt(classConf.h5Course.localPage));
    classConf.url.h5Course.headUrl = currentPageUrl.replace(/pz=(\w)*/, function () {
      return 'pz=' + pz;
    });
    selfFrame.attr('src', classConf.url.h5Course.headUrl);
  },

  resizeEvent: function () {
    globalCommon.logPrint('bind resize event');
    let self = this;
    window.addEventListener('resize', function () {
      //重置画板大小
      clearTimeout(self.iTimer);
      self.iTimer = setTimeout(function () {
        syncActions.initDrawBoxSize();
      }, 300);
    });
  },
  mouseEvent: function () {
    globalCommon.logPrint('bind mouse event');
    let clickTag = 0;
    let self = this;

    $('#h5_btn_practice').bind('click', function () {
      let status = $('#h5_btn_practice').attr('data-status');

      if (clickTag == 0) {
        clickTag = 1;

        if (!$('#h5_course_draw').hasClass('hide')) {
          //如果画布开着就关闭
          $("#h5_course_tool .btn-tool[data-func='bind']").trigger('click');
        }
        if (status == undefined || status == '') {
          syncActions.handlePractice('1');
        } else {
          syncActions.handlePractice('0');
        }
        setTimeout(function () {
          clickTag = 0;
        }, 200);
      }
    });

    $('#h5_btn_showStu').bind('click', function () {
      if (clickTag == 0) {
        clickTag = 1;
        syncActions.showStuWindow();
        setTimeout(function () {
          clickTag = 0;
        }, 200);
      }
    });

    $('#h5_course_stu_screens').on('click', '.view', function (e) {
      e.stopPropagation();
      if (clickTag == 0) {
        clickTag = 1;
        syncActions.seeStuWindow(this);
        setTimeout(function () {
          clickTag = 0;
        }, 200);
      }
    });

    $('#h5_course_page_prev').bind('click', function (e) {
      if (clickTag == 0) {
        clickTag = 1;
        if ($(this).hasClass('disabled') || $(this).hasClass('disallow')) {
        } else {
          syncActions.paging('prev');
        }
        setTimeout(function () {
          clickTag = 0;
        }, 200);
      }
    });

    $('#h5_course_page_next').bind('click', function (e) {
      if (clickTag == 0) {
        clickTag = 1;
        if ($(this).hasClass('disabled') || $(this).hasClass('disallow')) {
        } else {
          syncActions.paging('next');
        }
        setTimeout(function () {
          clickTag = 0;
        }, 200);
      }
    });

    $('#h5_course_pager_select').bind('change', function () {
      syncActions.paging('jump');
    });

    $('#h5_course_screen_prev').bind('click', function (e) {
      if (clickTag == 0) {
        clickTag = 1;
        if ($(this).hasClass('disabled')) {
        } else {
          syncActions.screenPaging('prev');
        }
        setTimeout(function () {
          clickTag = 0;
        }, 200);
      }
    });

    $('#h5_course_screen_next').bind('click', function (e) {
      if (clickTag == 0) {
        clickTag = 1;
        if ($(this).hasClass('disabled')) {
        } else {
          syncActions.screenPaging('next');
        }
        setTimeout(function () {
          clickTag = 0;
        }, 200);
      }
    });

    $('#h5_course_screen_pages').on('click', '.num', function (e) {
      let currentPage = $(this).index() + 1;
      syncActions.screenPaging('go', currentPage);
    });

    $('#h5_btn_share_four').bind('click', function (e) {
      if (clickTag == 0) {
        clickTag = 1;
        syncActions.shareFour();
        setTimeout(function () {
          clickTag = 0;
        }, 200);
      }
    });

    $('#h5_btn_share_single').bind('click', function (e) {
      if (clickTag == 0) {
        clickTag = 1;
        syncActions.shareSingle();
        setTimeout(function () {
          clickTag = 0;
        }, 200);
      }
    });

    /*$('#h5_course_network').on('click', '.close-btn', function () {
     $(this).parent('.mask-tip').addClass('hide');
     });*/

    /*$('#h5_course_btn_refresh').bind('click', function () {
     let btn_refresh = $(this);
     if (btn_refresh.attr('data-click-flag') == undefined) {
     btn_refresh.attr('data-click-flag', '1');

     classConf.h5Course.pageLoadStartTime = new Date().getTime();
     console.log('页面加载开始的时间点是 classConf.h5Course.pageLoadStartTime----------------->%s', classConf.h5Course.pageLoadStartTime);
     // classConf.h5Course.currentPageRefreshCount = freshCount;
     classConf.h5Course.pageLoadAction = '2';
     $('#h5_course_refresh').addClass('hide');
     globalCommon.showPageLoading();

     //教材品质处理
     self.qualityPzIndex = self.qualityPzIndex + 1;
     self.resetQuality(self.qualityPzIndex);
     }
     setTimeout(function () {
     btn_refresh.removeAttr('data-click-flag');
     }, 200);
     });*/

    //添加切换教材CDN按钮功能
    /*$('#h5_course_btn_cdn').bind('click', function () {
     globalCommon.changeCdnClient('showerrorpage');
     });*/
  },
  toolEvent: function () {
    globalCommon.logPrint('bind tool event');
    $('#h5_course_tool').on('click', '.btn-tool', function () {
      let that = $(this);
      syncActions.handleWbTools(that);
    });
  }
};

//对外开发的函数各自定义  保护私有变量和私有函数
let eventEnter = function () {
  eventBind.bind();
};

export {eventEnter};
