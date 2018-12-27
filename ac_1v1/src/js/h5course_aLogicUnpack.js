/**
 * Created by shaoyongkai on 2017/12/01.
 * update by shaoyongkai on 2017/12/06
 * 说明：
 *      逻辑代理模块
 *      主要用于接收通讯模块下发的数据，进行数据拆包和分发
 *      初始化数据处理，依次加载运行其他模块等
 */

import {classConf} from "./classConf";
import {globalCommon} from "./h5course_globalCommon";
import {viewEnter} from "./h5course_aView";
import {eventEnter} from "./h5course_aEvent";
import {App} from "./h5course_app";

/*消息缓存处理*/
let dataCache = {
  /*是否初始化*/
  isInit: false,

  /*缓存的消息*/
  cache: [],

  /*处理缓存的消息*/
  clear: function () {
    globalCommon.logOnlinePrint('clear cache data for svc when initData is ok!', 'log');
    dataCache.isInit = true;
    for (let v of dataCache.cache) {
      globalCommon.logPrint(v.type, v.obj);
      logicDataEnter(v.type, v.obj);
    }
    dataCache.cache = [];
  }
};

//逻辑分析模块处理
let logicUnpack = {//根据公司的业务逻辑将从服务器拿到的数据信息解包以便加载不同的模块
  'inited': false,

  'conf': {//这里是一些固定的配置信息
    'courseRole': {
      '-1': 'guest',
      '0': 'student',
      '1': '1v1 teacher',
      '2': 'unKnow type',
      '3': 'unKnow type',
      '4': '1vn teacher',
      '5': 'PSO student',
      '6': 'PSO teacher',
      '7': 'chinese teacher',
      '16': 'control flash map',
      '48': 'unKnow type',
      '64': 'cc sales',
      '65': 'CRIT',
      '176': 'assistant teacher',
      '192': 'anonymous',
      '224': 'unKnow type',
      '240': '1VM Administrator'
    },
    'courseStyle': {
      '0': '1v1',
      '1': 'open lecture',
      '2': 'multi video classroom',
      '3': 'experience lecture',
      '4': 'competitive Small-class-based lecture',
      '5': 'active open lecture',
      '6': 'PSO training lecture',
      '7': 'SA open lecture',
      '8': 'PT ways lecture',
      '9': 'CEGC(CE Unit lecture)',
      '10': 'chinese teacher lecture',
      '12': 'B2S open lecture',
      '13': 'class lecture'
    },
    'userRole': {
      '-1': {
        type: 'unKnow',
        info: 'guest'
      },
      '0': {
        type: 'stu',
        info: 'student'
      },
      '1': {
        type: 'tea',
        info: '1v1 teacher'
      },
      '2': {
        type: 'unKnow',
        info: 'obligate type'
      },
      '3': {
        type: 'unKnow',
        info: 'obligate type'
      },
      '4': {
        type: 'tea',
        info: '1vn teacher'
      },
      '5': {
        type: 'stu',
        info: 'PSO student'
      },
      '6': {
        type: 'tea',
        info: 'PSO teacher'
      },
      '7': {
        type: 'tea',
        info: 'chinese teacher'
      },
      '16': {
        type: 'listener',
        info: 'flash map listener'
      },
      '48': {
        type: 'unKnow',
        info: 'obligate type'
      },
      '64': {
        type: 'cc',
        info: 'cc sales'
      },
      '65': {
        type: 'CRIT',
        info: 'CRIT'
      },
      '176': {
        type: 'tutor',
        info: 'assistant teacher'
      },
      '192': {
        type: 'anonymous',
        info: 'anonymous'
      },
      '224': {
        type: 'unKnow',
        info: 'obligate type'
      },
      '240': {
        type: 'unKnow',
        info: 'obligate 1VM Administrator'
      }
    },
    'userType': {
      '1': 'teacher',
      '2': 'student',
      '3': 'administrator',
      '4': 'customer service'
    },
    'textType': {
      '0': 'pdf',
      '1': 'ppt',
      '2': 'h5course'
    },
    'teaType': [1, 4, 6, 7],
    'stu': [0, 5]
  },

  initData: function (type, obj) {
    //保留所有服务器下发的数据
    type == 'course' && (classConf.serverData.objCourseInfo = obj);
    type == 'user' && (classConf.serverData.objUserInfo = obj);
    type == 'url' && (classConf.serverData.objURLInfo = obj);
    type == 'boardSet' && (classConf.serverData.objBoardSetInfo = obj);
    type == 'appointMemberList' && (classConf.serverData.objAppointMemberListInfo = obj);
    type == 'courseAll' && (classConf.serverData.objCourseAllInfo = obj);
    type == 'userAll' && (classConf.serverData.objUserAllInfo = obj);

    //每次判断初始化数据是否齐全 齐全之后才进行数据分析，跑流程，注意处理初始化数据未齐全时服务器下发的数据
    if (!logicUnpack.inited && classConf.serverData.objCourseInfo && classConf.serverData.objUserInfo && classConf.serverData.objURLInfo && classConf.serverData.objBoardSetInfo && classConf.serverData.objAppointMemberListInfo && classConf.serverData.objCourseAllInfo && classConf.serverData.objUserAllInfo) {

      globalCommon.logPrint('====初始化数据齐全开始启动H5流程====');

      //保证只有一次初始化
      logicUnpack.inited = true;

      //更新配置池数据
      logicUnpack.updateConf();

      //一次加载所有模块开始工作
      classConf.event.tools = true;
      classConf.event.resize = true;

      //初始化report和sdk模块环境
      window.H5SDK.setConfig(classConf);
      window.dataReport.setConfig(classConf);

      //视图
      viewEnter();

      //事件
      eventEnter();

      //通知互动教材
      App.start();

      /*处理缓存的消息*/
      dataCache.clear();
    }
  },

  //更新配置池
  updateConf: function () {

    let [aliasCourse, aliasUser, aliasUrl, aliasBoardSet, aliasServerData] = [classConf.course, classConf.user, classConf.url, classConf.boardSet, classConf.serverData];

    //判断是否支持消息并发新方案改版
    classConf.isSupportEncodeFunc = (window.AcJs_get_encode != undefined);
    // classConf.isSupportEncodeFunc = true;

    //更新course
    aliasCourse.id = aliasServerData.objCourseInfo.courseId;
    aliasCourse.type = aliasServerData.objCourseInfo.coursestyle != undefined ?
      (aliasServerData.objCourseInfo.coursestyle == 0 ? '1v1' : '1vN') : ('1v1');
    aliasCourse.isMulti = aliasServerData.objCourseInfo.coursestyle != undefined ?
      (((aliasServerData.objCourseInfo.coursestyle == 2) || (aliasServerData.objCourseInfo.coursestyle == 9)) ? true : false) : (false);
    aliasCourse.courseStyle = aliasServerData.objCourseInfo.coursestyle != undefined ?
      (logicUnpack.conf.courseStyle[aliasServerData.objCourseInfo.coursestyle]) : ('undefined');
    aliasCourse.language = aliasServerData.objCourseInfo.language != undefined ?
      (aliasServerData.objCourseInfo.language) : ('Cn');
    aliasCourse.textType = aliasServerData.objCourseInfo.textType != undefined ?
      (logicUnpack.conf.textType[aliasServerData.objCourseInfo.textType]) : ('pdf');
    aliasCourse.subcoursetype = aliasServerData.objCourseInfo.subcoursetype != undefined ? aliasServerData.objCourseInfo.subcoursetype : '';

    //上报数据动态域名
    if (aliasServerData.objCourseAllInfo != null && aliasServerData.objCourseAllInfo.H5HostUrl != undefined) { //防止mac旧版本无courseAll协议数据
      aliasCourse.H5HostUrl = aliasServerData.objCourseAllInfo.H5HostUrl;
    }

    //更新user
    aliasUser.id = aliasServerData.objUserInfo.uid;
    aliasUser.userID = aliasServerData.objUserInfo.userid;
    aliasUser.sex = aliasServerData.objUserInfo.userSex;
    if (logicUnpack.conf.userRole[aliasServerData.objCourseInfo.courserole + ''] != undefined) {
      aliasUser.type = logicUnpack.conf.userRole[aliasServerData.objCourseInfo.courserole + ''].type;
    } else {
      aliasUser.type = "unKnow";
    }

    aliasUser.name = aliasServerData.objUserInfo.userName;

    aliasUser.userRole = ((aliasServerData.objUserInfo.userrole) && (logicUnpack.conf.userRole[aliasServerData.objUserInfo.userrole])
      && (logicUnpack.conf.userRole[aliasServerData.objUserInfo.userrole].info)) || 'unKnow userRole';
    aliasUser.userType = (aliasServerData.objUserInfo.usertype && logicUnpack.conf.userType[aliasServerData.objUserInfo.usertype]) || 'unKnow userType';

    //更新url
    if (PRODUCTION) {
      aliasUrl.h5Course.countNum = aliasServerData.objURLInfo.h5Course.countNum;
      aliasUrl.h5Course.headUrl = window.MyBase64.decode(aliasServerData.objURLInfo.h5Course.headUrl);
    } else {
      aliasUrl.h5Course.countNum = 35;//h5course
      aliasUrl.h5Course.headUrl = H5COURSE_HEADURL;
    }

    if (aliasUrl.h5Course.headUrl.indexOf("v") == -1) {
      aliasUrl.h5Course.headUrl = aliasUrl.h5Course.headUrl + '?v=' + new Date().getTime();
    }

    if (classConf.user.type == 'tea') {
      classConf.h5Course.currentCourseQuality = 'medium';
      aliasUrl.h5Course.headUrl = aliasUrl.h5Course.headUrl + '&pz=medium';
    } else {
      classConf.h5Course.currentCourseQuality = 'high';
      aliasUrl.h5Course.headUrl = aliasUrl.h5Course.headUrl + '&pz=high';
    }

    //更新boardset
    aliasBoardSet = aliasServerData.objBoardSetInfo;
    aliasBoardSet.showPlugLog = false;

    //更新appointMemberList
    classConf.appointMemberList = (aliasServerData.objAppointMemberListInfo.list && aliasServerData.objAppointMemberListInfo.list.slice(0)) || [];
    // classConf.appointMemberList = (aliasServerData.objAppointMemberListInfo.list && aliasServerData.objAppointMemberListInfo.list.slice(0, 2)) || [];

  }
};

//对外开发的函数各自定义  保护私有变量和私有函数
let logicDataEnter = function (type, obj) {
  let initKeys = ['course', 'user', 'url', 'boardSet', 'appointMemberList', 'courseAll', 'userAll'];
  if (initKeys.indexOf(type) !== -1) {
    //初始化数据
    logicUnpack.initData(type, obj);
  } else {
    if (!dataCache.isInit) {
      globalCommon.logPrint('storage data from svc when initData is not ok!', type);
      dataCache.cache.push({type: type, obj: obj});
      return;
    }

    if (window.H5SDK.unpack[type]) {
      window.H5SDK.unpack[type](obj);
    } else {
      globalCommon.logPrint('can not find logicUnpack:' + type);
    }
  }
};

//绑定comm模块
let loadComm = function () {
  //回掉函数
  globalCommon.logPrint('set h5sdk callFuc');
  window.H5SDK.callFuc = logicDataEnter;
};

export {loadComm};
