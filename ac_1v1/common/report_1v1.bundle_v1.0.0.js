/**
 * Created by shaoyongkai on 2017/10/10.
 * qTypes = ['TM', 'TS', 'TF', 'TX', 'T', 'TB', 'TD'];
 * TM 连线或者匹配
 * TS 排序
 */

/**
 * 数据上报
 **/
var dataReport = {
  openSwitch: '1', //是否开启上报功能 1：开启 0：关闭
  openTracking: '0', //是否开启行为数据上报 1：开启 0：关闭
  classConf: '',

  setConfig: function (obj) {
    console.log('h5 report init start');
    this.classConf = obj;
  },

  getProtocol: function () {
    return document.location.protocol;
  },

  /**
   * 检查上报开关的判断
   */
  getReportCheck: function () {
    var flag = false;
    if (dataReport.openSwitch == '1' && dataReport.classConf.h5Course.classStatus != 0 && (dataReport.classConf.user.type == 'tea' || dataReport.classConf.user.type == 'stu')) {
      flag = true;
    }
    return flag;
  },

  /**
   * 检查行为数据上报
   */
  getTrackingCheck: function () {
    var flag = false;
    if (dataReport.openTracking == '1' && dataReport.classConf.h5Course.classStatus != 0 && (dataReport.classConf.user.type == 'tea' || dataReport.classConf.user.type == 'stu')) {
      flag = true;
    }
    return flag;
  },

  getClientType: function () {
    var sourceType = {
      Window: function () {
        return navigator.userAgent.match(/Window/i) ? true : false;
      },
      Mac: function () {
        return navigator.userAgent.match(/Mac OS X/i) ? true : false;
      },
      Android: function () {
        return navigator.userAgent.match(/Android/i) ? true : false;
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPod/i) ? true : false;
      },
      iPad: function () {
        return navigator.userAgent.match(/iPad/i) ? true : false;
      }
    };

    if (sourceType.Window()) {
      return '1';
    } else if (sourceType.Mac()) {
      return '7';
    } else if (sourceType.Android()) {
      return '2';
    } else if (sourceType.iOS()) {
      return '3';
    } else if (sourceType.iPad()) {
      return '4';
    } else {
      return '';
    }
  },

  /**
   * 数据上报入口
   * @param type 上报类别
   * @param otherOpts 其他需要的参数
   *          {
     *              action: '',
     *              pageLoadTime: ''
     *          }
   */
  log: {
    report: function (type, otherOpts) {
      var dataUrl = '';
      var param = {};
      if (type == 'controller') {
        /**
         * 当前用户ID
         * 课程ID
         * 客户端类型，1：PC；2：Andorid；3：IOS；4：IPAD；7：MAC；15：IGS
         * 课程父类型
         * 课程子类型
         * 用户类型
         * 当前控制器地址
         * 时间戳，控制器加载完成时间
         */
        dataUrl = dataReport.classConf.course.H5HostUrl + '/Ac/H5ControllerLog/addLog';
        param = {
          uid: dataReport.classConf.serverData.objUserInfo.uid,
          cid: dataReport.classConf.serverData.objCourseInfo.courseId,
          client_type: dataReport.getClientType(),
          course_type: dataReport.classConf.serverData.objCourseInfo.coursestyle,
          sub_course_type: dataReport.classConf.course.subcoursetype,
          user_role: dataReport.classConf.serverData.objUserInfo.userrole,
          url: dataReport.classConf.serverData.objCourseAllInfo != null ? dataReport.classConf.serverData.objCourseAllInfo.controller : '',
          loading_time: otherOpts.loading_time
        };
      } else if (type == 'H5Source') {
        /**
         * cid 课程编号
         * course_type 课程父类型
         * sub_course_type 课程子类型
         * uid 用户编号
         * user_role 用户类型
         * current_page 当前页码
         * total_page 总页数
         * loading_time 课件加载时长
         * quality 教材品质
         * url 教材URL
         * client_type 客户端类型，1：PC；2：Andorid；3：IOS；4：IPAD；7：MAC；15：IGS
         * action_type 操作类型，1：默认加载；2：手动刷新
         */
        dataUrl = dataReport.classConf.course.H5HostUrl + '/Ac/H5CoursewareLog/addLog';
        param = {
          cid: dataReport.classConf.serverData.objCourseInfo.courseId,
          course_type: dataReport.classConf.serverData.objCourseInfo.coursestyle,
          sub_course_type: dataReport.classConf.course.subcoursetype,
          uid: dataReport.classConf.serverData.objUserInfo.uid,
          user_role: dataReport.classConf.serverData.objUserInfo.userrole,
          current_page: dataReport.classConf.h5Course.localPage,
          total_page: dataReport.classConf.serverData.objCourseAllInfo != null ? dataReport.classConf.serverData.objCourseAllInfo.h5PageCount : '',
          loading_time: otherOpts.pageLoadTime,
          quality: dataReport.classConf.h5Course.currentCourseQuality,
          url: dataReport.classConf.serverData.objCourseAllInfo != null ? dataReport.classConf.serverData.objCourseAllInfo.courseH5Source : '',
          client_type: dataReport.getClientType(),
          action_type: otherOpts.action
        };
      } else {
      }

      var isReport = dataReport.getReportCheck();
      if (isReport) {
        $.ajax({
          type: 'post',
          url: dataReport.getProtocol() + '//' + dataUrl,
          data: JSON.stringify(param),
          dataType: 'json'
        }).done(function (res) {
          if (res.code == '1') {
          }
        });
      }
    }
  },

  /**
   * 数据埋点相关上报
   */
  tracking: {
    getTrackUrl: function () {
      return dataReport.getProtocol() + '//' + dataReport.classConf.course.H5HostUrl + '/coursewareactionlog';
    },

    qTypes: ['TM', 'TS', 'TF', 'TX', 'T', 'TB', 'TD'],

    /**
     *  要发送的数据对象(顺序必须固定):
     *  文档：http://123.56.15.24:4567/mercury/mercury-architecture/course/deploy
     */
    trackingInfo: {
      topic: 'jp.000001',
      lessonid: '', //课程id
      teaid: '', //当前上课的教师ID  从courseAll 取当前教室老师的ID
      uid: '', //学员id
      ac: navigator.platform, //终端平台如Win32，MacIntel，ipad
      tplate: '', //template模板id 参考文档 如TC001
      model: 'page',
      pageid: '',
      ope: '', //操作人，学生or教师or系统，stu，tea,system
      action: '',
      value: '', //值，如分数，成绩等 0：答错 1：答对 2：答完 3：未知
      note: '', //课中状态 上课 练习 自由
      ver: '20171220', //js收集版本
      rand: ''
    },

    // 初始化/刚进入时候发送的数据
    init: function (tpl) {

      try {
        this.trackingInfo.lessonid = dataReport.classConf.course.id; //课程id
        this.trackingInfo.teaid = dataReport.classConf.serverData.objCourseAllInfo.teaId; //当前上课的教师ID  从courseAll 取当前教室老师的ID

        this.trackingInfo.pageid = encodeURIComponent($('#h5_course_self_frame').attr('src'));
        this.trackingInfo.tplate = tpl.tplate;
        this.trackingInfo.ope = dataReport.classConf.user.type;

        if (dataReport.classConf.user.type == 'stu') {
          this.trackingInfo.uid = dataReport.classConf.user.id;
        }

        this.trackingInfo.action = 'open';
        this.trackingInfo.note = 'less_status=' + dataReport.classConf.h5Course.classStatus;
        this.trackingInfo.rand = Math.floor(Math.random() * 1000000);
        var trackingUrl = this.getTrackUrl();

        var isReport = dataReport.getTrackingCheck();
        if (isReport) {
          $.ajax({
            type: 'post',
            url: trackingUrl,
            data: JSON.stringify(this.trackingInfo),
            dataType: 'json'
          }).done(function (res) {
            if (res.code == '1') {
              console.log('H5_template_init_tracking: 埋点请求调用成功！');
            }
          });
        }
      } catch (e) {
        console.error(e);
      }
    },

    // 发送埋点数据
    sendTemplateInfo: function (data, type) {

      /*let data = {
       "method": "event",
       "syncAction": {"index": 3, "syncName": "syncAnswerClick", "otherInfor": ""},
       "user": {
       "id": "800003998",
       "userID": 800003998,
       "sex": 0,
       "type": "stu",
       "name": "sdfs",
       "userRole": "unKnow userRole",
       "userType": "student",
       "courseRole": ""
       },
       "sendUser": "800003998",
       "receiveUser": "800003998",
       "sendUserInfo": {
       "id": "800003998",
       "userID": 800003998,
       "sex": 0,
       "type": "stu",
       "name": "sdfs",
       "userRole": "unKnow userRole",
       "userType": "student",
       "courseRole": ""
       },
       "classStatus": "1",
       "starSend": "0",
       "type": "sync",
       "questionType": "TC",
       "tplate": "TC001"
       };*/

      var qTypes = this.qTypes;

      if (data.sendUser != dataReport.classConf.user.id) {
        return;
      }

      this.trackingInfo.uid = data.user.type == 'stu' ? data.user.id : '';
      this.trackingInfo.action = data.questionType;
      this.trackingInfo.note = 'less_status=' + dataReport.classConf.h5Course.classStatus;
      this.trackingInfo.rand = Math.floor(Math.random() * 1000000);

      if (type == 'sync') {
        this.trackingInfo.value = '3';
      } else if (type == 'resultSync') {
        var isRight = data.syncAction.resultData.isRight;

        if (isRight) {
          if (qTypes.indexOf(this.trackingInfo.action) != -1) {
            this.trackingInfo.value = '2';
          } else {
            this.trackingInfo.value = '1';
          }
        } else {
          this.trackingInfo.value = 0;
        }
      } else {

      }

      var trackingUrl = this.getTrackUrl();
      var isReport = dataReport.getTrackingCheck();
      if (isReport) {
        $.ajax({
          type: 'post',
          url: trackingUrl,
          data: JSON.stringify(this.trackingInfo),
          dataType: 'json'
        }).done(function (res) {
          if (res.code == '1') {
            console.log('H5_template_init_tracking: 埋点请求调用成功！');
          }
        });
      }
    },

    // 发送控制器数据
    sendControllerInfo: function (type, obj) {
      if (type == 'rank') {
        this.trackingInfo.action = 'ranking';
        this.trackingInfo.value = JSON.stringify(obj);
      } else if (type == 'authorize') {
        this.trackingInfo.action = 'authorize';
        this.trackingInfo.value = 'true';
      } else if (type == 'call') {
        this.trackingInfo.action = 'call';
        this.trackingInfo.value = '';
      } else if (type == 'star') {
        this.trackingInfo.action = 'star';
        this.trackingInfo.value = '';
      }

      this.trackingInfo.ope = 'tea';
      this.trackingInfo.uid = '';
      this.trackingInfo.note = 'less_status=' + dataReport.classConf.h5Course.classStatus;
      this.trackingInfo.rand = Math.floor(Math.random() * 1000000);

      var trackingUrl = this.getTrackUrl();
      var isReport = dataReport.getTrackingCheck();
      if (isReport) {
        $.ajax({
          type: 'post',
          url: trackingUrl,
          data: JSON.stringify(this.trackingInfo),
          dataType: 'json'
        }).done(function (res) {
          if (res.code == '1') {
            console.log('H5_template_init_tracking: 埋点请求调用成功！');
          }
        });
      }
    }
  },

  /**
   * 语音上报
   */
  audioReport: {
    successScore: function (message) {
      var dataUrl = dataReport.classConf.course.H5HostUrl + '/Ac/RecordEvaluateLog/addLog';
      var param = {};
      var isReport = dataReport.getTrackingCheck();
      if (isReport) {
        param = {
          cid: dataReport.classConf.serverData.objCourseInfo.courseId,
          uid: dataReport.classConf.serverData.objUserInfo.uid,
          user_role: dataReport.classConf.serverData.objUserInfo.userrole,
          current_page: dataReport.classConf.h5Course.localPage,
          recordings: message.recordings,
          record_time: message.record_time,//录音时长
          public_key: message.public_key,//唯一标识KEY
          client_type: dataReport.getClientType()
        };

        $.ajax({
          type: 'post',
          url: dataReport.getProtocol() + '//' + dataUrl,
          data: JSON.stringify(param),
          dataType: 'json'
        }).done(function (res) {
          if (res.code == '1') {

          }
        });
      }
    }
  }
};

window.dataReport = dataReport;