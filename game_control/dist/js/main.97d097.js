webpackJsonp([0],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return classConf; });
/**
 * Created by shaoyongkai on 2017/3/23.
 * 说明：
 *      该模块用于数据配置存储，供各模块get和set
 */

var H5AGRREEMENTID = 400;

var classConf = {
    boardDataCache: [], //storage server data when draw handle is not ready 缓冲池，用于当教材和白板没有准备好的时候存储服务器下发的数据
    isSupportEncodeFunc: false, //是否支持新版本服务器数据处理机制
    serverData: { //服务器的数据，用于存储最开始从客户端接收到的数据
        objCourseInfo: null, //class info 教室的信息
        objUserInfo: null, //user info 用户的信息
        objURLInfo: null, //url info 课件信息 比如url
        objBoardSetInfo: null, //board info 白板信息
        objAppointMemberListInfo: null, //appoint info 预约成员信息
        objCourseAllInfo: null, //courseAll info 课程原始信息，未经客户端处理过的信息
        objUserAllInfo: null //userAll info 用户的原始信息 未经客户端处理过的信息
    },
    user: {
        id: '', //用户的id
        userID: '', //记录短id  暂时不用，已经淘汰，做备份
        sex: '', //用户的性别
        type: '', //'stu'/'tea' 用户的类型  stu tea cc CRIT tutor(助教) anonymous(匿名用户)  unKnow(未知类型 什么也不能做)
        name: '', //用户的姓名
        //下面这些暂时不用关心
        userRole: '', //detailed user's role 用户的详细角色信息
        userType: '', //user's power stu/administrator/tea/... 和权限相关的类型
        courseRole: '' //user's type in course 教室内的角色
    },
    course: {
        type: '', //1v1 1vN 教室的类型
        id: '', //课程id
        courseStyle: 0, //detailed course style 教室的详细类型
        language: '', //当前教室的语言  Cn中文 En英文
        textType: '', //当前只有互动教材  支持pdf和H5Course
        teaLogin: false, //true/false 老师是否已经进入教室
        isMulti: false, //代表是否是多视频教室
        subcoursetype: 5, //5:一对四|6:一对十二|7:其他|8:体验课
        H5HostUrl: 'www.51talkac.com', //数据上报动态域名
        switchMsgLine: 'svc' //消息服务的首发线路标识
    },
    url: {
        h5Course: {
            countNum: '',
            headUrl: '/575114/01/index.html', //H5那边先自己给
            headUrlSub: []
        }
    },
    appointMemberList: [
        //所有的预约用户信息  有可能为空，需要做灾害措施,每一项都是一个对象 {}
    ],
    userList: {
        //包括成员的变更信息和具体信息
    },
    boardSet: {
        tools: { //根据这个来判断采用哪些工具
            //工具条信息
            pen: false, //画笔
            signpen: false, //荧光笔
            rec: false, //矩形
            rub: false, //旧版橡皮擦
            newrub: false, //新版橡皮擦
            text: false, //文字
            draft: false, //拖拽
            back: false, //回退
            clear: false //清空
        },
        showPlugLog: false,
        color: '#ff0000',
        canvasColor: 'rgba(202, 232, 174, 0.2)' //画布的颜色配置
    },
    viewSet: { //根据这个来加载模块
        tools: {
            bind: true,
            pencil: true, //画笔
            highPencil: true, //荧光笔
            rect: true, //矩形
            rubberOld: true, //旧版橡皮擦
            newrub: true, //新版橡皮擦
            text: true, //文字
            draft: true, //拖拽
            back: true, //回退
            clear: true, //清空
            authorize: true
        },
        commonTools: {
            pencil: true, //画笔
            rect: true //矩形
        },
        teaTools: {
            bind: true,
            highPencil: true, //荧光笔
            text: true, //文字
            draft: true, //拖拽
            clear: true, //清空
            authorize: true
        }
    },
    event: { //事件绑定 根据这些来判断是否要绑定这些事件
        resize: true,
        mouse: true,
        tools: true
    },
    h5Course: {
        agreementID: H5AGRREEMENTID, //互动教材协议的type  互动教材传递协议的时候用白板哪个图形协议
        classStatus: '0', //未开始上课 0未上课 1开始上课 2开始练习
        localPage: '1', //用户本地的当前页码
        svcPage: '1', //服务端的当前页码
        isRoot: false, //是否是  root状态，是否能像svc发数据，例如学生在练习状态为root老师在上课时为root
        screenLocalPage: '1',
        screenPageSize: '4',
        starData: "",
        pencilColor: '', //存储用户画笔颜色
        // currentPageRefreshCount: 0, //当前页面刷新次数
        currentCourseQuality: 'high',
        controllerLoadStartTime: '', //控制器开始加载时间
        pageLoadStartTime: '', //教材开始加载的时间
        pageLoadEndTime: '', //教材加载完毕的时间
        pageLoadAction: '1',

        course_card_id: '',
        course_localPage: '1',
        starSrc: 'http://h5course.51talk.com/dist/999999/14/index.html'
    }
};



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return common; });
var common = {
    isDev: 'true', //标识环境   上线改为false

    logPrint: function logPrint(dec, tem) {
        var logConf = window.localStorage.getItem('logConf');
        if (logConf == undefined) {
            //首次进入默认不打印log
            window.localStorage.setItem('logConf', this.isDev);
            logConf = this.isDev;
        }
        if (logConf == 'true') {
            var date = new Date();
            var headDes = date.toLocaleTimeString() + ' ' + date.getMilliseconds() + 'ms';
            console.log('%s========controller=======start==================>%s:', headDes, dec);
            if (tem) {
                if (tem instanceof Array) {
                    for (var v in tem) {
                        console.log(v);
                    }
                } else {
                    console.log(tem);
                }
            }
            console.log('%s========controller=======end==================>', headDes);
        }
    },

    getPageFontSize: function getPageFontSize(frameWidth, frameHeight) {
        var aspectRatio = frameWidth / frameHeight;
        var remBase = 100;
        if (aspectRatio > 1920 / 1080) {
            remBase = 100 * (frameHeight / 1080);
        } else {
            remBase = 100 * (frameWidth / 1920);
        }
        return remBase;
    },

    //创建背景
    bg: {},

    setBg: function setBg(obj) {
        var bitmap = new createjs.Bitmap(obj.images);
        // this.bg[obj.id] = bitmap;
        bitmap.x = obj.x;
        bitmap.y = obj.y;
        bitmap.scaleX = 1.5;
        bitmap.scaleY = 1.5;
        return bitmap;
    },

    findEquipmentById: function findEquipmentById(equipmentJson, id) {
        console.log('findEquipmentById');
        var json = equipmentJson.filter(function (value) {
            return value.id == id;
        });
        return json[0];
    },

    findCardById: function findCardById(cardJson, id) {
        var json = cardJson.filter(function (value) {
            return value.id == id;
        });
        return json[0];
    },

    findHeroById: function findHeroById(heroArr, id) {
        var json = heroArr.filter(function (item) {
            return item.userInfo.uid == id;
        });
        return json[0];
    },

    deepCopy: function deepCopy(source) {
        var result = {};
        for (var key in source) {
            result[key] = Object.prototype.toString.call(source[key]) === '[object Object]' ? globalCommon.deepCopy(source[key]) : source[key];
        }
        return result;
    },

    toString: function toString(val) {
        if (val == null) {
            return '';
        }
        if (typeof val === 'string') {
            return val;
        }
        var result = '' + val;
        return result;
    },

    toInt: function toInt(val) {
        return parseInt(val, 10);
    },

    showPageLoading: function showPageLoading() {
        $("#h5_course_loading").removeClass("hide");
    },

    hidePageLoading: function hidePageLoading() {
        $("#h5_course_loading").addClass("hide");
    },

    showMask: function showMask() {
        $("#mask").removeClass('hide');
    },

    closeMask: function closeMask() {
        $("#mask").addClass('hide');
    },

    tipStuAllow: function tipStuAllow(opt) {
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
// window.common = common;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return h5_course; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classConf__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__syncActions__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pathJson__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sendOrReceive__ = __webpack_require__(3);






var h5_course = {
    courseAudios: {},
    courseCard: {},

    init: function init(cardId) {
        this.initCardData(cardId);

        // this.bindEvent();
    },

    initCardData: function initCardData(cardId) {
        var cardData = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].findCardById(__WEBPACK_IMPORTED_MODULE_3__pathJson__["a" /* cardsJson */], cardId);
        // classConf.h5Course.course_card = cardData;

        this.courseCard = cardData;
    },

    /**
     * 更新对应关卡的装备信息
     */
    updateCardEquip: function updateCardEquip() {
        if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == 'stu') {
            window.gameUser.setUserRank(this.courseCard.rank);
            var equipment = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].findEquipmentById(window.equipments, this.courseCard.id);
            equipment.setVisible(true);
        }
    },

    courseShow: function courseShow() {
        $('#h5_course_part').removeClass('hide');
        $('#mask').removeClass('mask-full');
        //初始化画板大小
        $('#h5_course_part').unbind().bind('animationend webkitAnimationEnd', function () {
            __WEBPACK_IMPORTED_MODULE_2__syncActions__["a" /* syncActions */].initDrawBoxSize();
        });
    },

    /**
     * 教材翻页
     */
    coursePaging: function coursePaging(type, currentPage) {

        var self = this;

        // let practiceButton = $('#h5_btn_practice');

        var userType = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type;
        var isSend = false; //是否要发送出去
        var countNum = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(this.courseCard.info.total);

        var temPage = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.course_localPage);

        switch (type) {
            case 'prev':
                temPage = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.course_localPage) - 1;
                temPage = temPage > 0 ? temPage : temPage + 1;
                __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.course_localPage = temPage;
                isSend = true;

                handleRootPageLogic();

                if (userType == 'tea') {
                    //清空画布
                    __WEBPACK_IMPORTED_MODULE_2__syncActions__["a" /* syncActions */].nowWBTar.draw("clear");
                } else if (userType == 'stu') {} else {}

                break;
            case 'next':
                temPage = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.course_localPage) + 1;
                temPage = temPage <= countNum ? temPage : temPage - 1;
                __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.course_localPage = temPage;
                isSend = true;

                handleRootPageLogic();

                if (userType == 'tea') {
                    //清空画布
                    __WEBPACK_IMPORTED_MODULE_2__syncActions__["a" /* syncActions */].nowWBTar.draw("clear");
                } else if (userType == 'stu') {} else {}

                break;
            // case 'set':
            //     classConf.h5Course.course_localPage = common.toInt(currentPage);
            //     temPage = common.toInt(currentPage);
            //     isSend = false;
            //     break;
            case 'go':
                __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.course_localPage = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(currentPage);
                temPage = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(currentPage);
                isSend = true;

                handleRootPageLogic();

                break;
            default:
                break;
        }

        //统一发包
        function handleRootPageLogic() {
            //设置完数据之后再 先看是否要发送数据 然后进行翻页处理
            if (userType == 'tea') {
                if (isSend) {
                    // practiceButton.removeClass('hide');
                    //恢复开始上课状态
                    var msgData = __WEBPACK_IMPORTED_MODULE_4__sendOrReceive__["a" /* sendOrReceive */].buildStatusData({
                        type: 'starting',
                        key: 'classStatus',
                        value: {
                            classStatus: '1'
                        }
                    });
                    __WEBPACK_IMPORTED_MODULE_4__sendOrReceive__["a" /* sendOrReceive */].addSendMessage(msgData);

                    // 翻页
                    var pageData = __WEBPACK_IMPORTED_MODULE_4__sendOrReceive__["a" /* sendOrReceive */].buildStatusData({
                        type: 'coursePaging',
                        key: 'coursePaging',
                        value: {
                            currentPage: __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toString(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.course_localPage),
                            cardId: self.courseCard.id
                        }
                    });
                    __WEBPACK_IMPORTED_MODULE_4__sendOrReceive__["a" /* sendOrReceive */].addSendMessage(pageData);
                }
            } else if (userType == 'stu') {
                // 翻页
                var _pageData = __WEBPACK_IMPORTED_MODULE_4__sendOrReceive__["a" /* sendOrReceive */].buildStatusData({
                    type: 'coursePaging',
                    key: 'coursePaging',
                    value: {
                        currentPage: __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toString(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.course_localPage),
                        cardId: self.courseCard.id
                    }
                });
                __WEBPACK_IMPORTED_MODULE_4__sendOrReceive__["a" /* sendOrReceive */].addEventQueue(_pageData);
            } else {}
        }
    },

    pageSet: function pageSet(currentPage) {
        var frames = $("iframe[frame_load_status]");

        __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.course_localPage = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(currentPage);

        var btn_page_prev = $('#h5_course_page_prev');
        var btn_page_next = $('#h5_course_page_next');

        var countNum = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(this.courseCard.info.total);

        var temPage = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.course_localPage);

        //重新改变加载标示
        frames.attr('frame_load_status', '0');
        // common.showPageLoading();

        //教材开始加载时间
        __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.pageLoadStartTime = new Date().getTime();
        console.log('页面加载开始的时间点是 classConf.h5Course.pageLoadStartTime----------------->%s', __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.pageLoadStartTime);

        //分页按钮处理
        btn_page_prev.removeClass('disabled');
        btn_page_next.removeClass('disabled');
        if (temPage == 1) {
            btn_page_prev.addClass('disabled');
        } else if (temPage == countNum) {
            btn_page_next.addClass('disabled');
        }

        //页面加载地址
        var pageUrl = this.getPageUrl(__WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(temPage));
        var targetFrame = $('#h5_course_self_frame');
        targetFrame.attr("src", pageUrl);
    },

    /**
     * 获取课件页面地址
     */
    getPageUrl: function getPageUrl(page) {
        var countNum = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(this.courseCard.info.total);

        if (page >= countNum) {
            page = countNum;
        }

        var pageNum = this.courseCard.info.src[page];

        var pageUrl = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].url.h5Course.headUrl.replace(/\/(\d{2})\//g, function () {
            return '/' + pageNum + '/';
        });

        return pageUrl;
    },

    buildCourseAudio: function buildCourseAudio(courseAudioObj) {
        courseAudioObj.forEach(function (item) {
            createjs.Sound.registerSound(item.src, item.name);
        });
    },

    //播放单个不循环音频
    playSound: function playSound(soundId) {
        createjs.Sound.play(soundId);
    }
};
window.h5_course = h5_course;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return sendOrReceive; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classConf__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(1);


var gTypes = ['openStarPage', 'shareSingle', 'shareFour', 'screenSelected', 'screenPaging', 'showSingleStuWindow', 'showStuWindow', 'openWbToolAuthority', 'showWB', 'starting', 'free', 'firstInto', 'practice', 'clickCard', 'coursePaging', 'partComplete', 'bgMove' /* ,
                                                                                                                                                                                                                                                                        'sync' */
];
window.gTypes = gTypes;
var sendOrReceive = {
    localIdNum: gTypes.length, // gTypes数组长度
    /**
     * 模板间接调用队列
     */
    addEventQueue: function addEventQueue(message) {
        window.EventQueue.addEventQueue(message);
    },

    setEventUnlocked: function setEventUnlocked() {
        window.EventQueue.executeEventQueue();
    },

    /**
     * 课件中白板数据封装（h5模板sdk中也会调用）
     */
    buildMsgData: function buildMsgData(json, type) {
        json['currentCardId'] = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.course_card_id;
        json['currentCardPageNum'] = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.course_localPage;

        return {
            type: type,
            CID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id,
            textBookID: '1',
            textBookType: '1',
            page: __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toString(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.localPage),
            operate: json.operate != undefined ? json.operate : '1',
            // operate: '1',
            data: [{
                // localID: '',
                value: json,
                byteData: '', //给空
                byteDataLength: '' //给空
            }]
        };
    },

    /**
     * 构建状态覆盖式数据
     */
    buildStatusData: function buildStatusData(json) {

        return {
            type: json.type,
            CID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id,
            operate: json.operate != undefined ? json.operate : '1',
            data: [{
                key: json.key,
                value: json.value,
                ownerUID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.id
            }]
        };
    },

    addSendMessage: function addSendMessage(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('---------addSendMessage---------', JSON.stringify(message));

        if (message.data[0].value.sendUser == message.data[0].value.receiveUser) {

            this.localIdNum = this.localIdNum + 1;
            message.data[0].value.localIDNum = this.localIdNum;

            if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.switchMsgLine == 'game') {
                // 发送socket包
                var func = "00001000";
                var meta = 1;
                var dataNum = 1;
                var typeIndex = gTypes.indexOf(message.type) + 1;
                if (typeIndex >= 0) {
                    dataNum = typeIndex;
                    meta = typeIndex;
                } else {
                    meta = gTypes.length + 1;
                    dataNum = this.localIdNum;
                }

                //关系过程
                window.sdk_game.doSend({
                    portParent: 3,
                    func: func,
                    target: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id,
                    dataNum: dataNum,
                    meta: meta,
                    body: JSON.stringify(message)
                });
            } else {
                var _typeIndex = gTypes.indexOf(message.type);
                var sendData = {};

                this.addEventQueue(message);

                if (_typeIndex >= 0) {
                    var msgVal = message.data[0].value;
                    if (Object.prototype.toString.call(msgVal) == "[object Object]") {
                        message.data[0].value = JSON.stringify(msgVal);
                    }
                    //替换消息 关心状态
                    window.H5SDK.sendDataToClient.gSetData(message);
                } else {
                    //关系过程
                    window.H5SDK.sendDataToClient.clAddData(message);
                }
            }
        }
    },

    /**
     * 互动白板相关
     */
    wbAddData: function wbAddData(message) {
        var self = this;
        this.localIdNum = this.localIdNum + 1;
        message.data[0].value.localIDNum = this.localIdNum;
        if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.switchMsgLine == 'game') {
            message.type = 'wb';
            window.sdk_game.doSend({
                portParent: 3,
                func: "00001000",
                target: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id,
                dataNum: self.localIdNum,
                meta: gTypes.length + 2,
                body: JSON.stringify(message)
            });
        } else {
            window.H5SDK.sendDataToClient.wbAddData(message);
        }
    },

    wbClearData: function wbClearData(message) {
        var self = this;
        this.localIdNum = this.localIdNum + 1;
        // message.data[0].value.localIDNum = this.localIdNum;
        if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.switchMsgLine == 'game') {
            message.type = 'wb';
            window.sdk_game.doSend({
                portParent: 13,
                func: "00001000",
                dataNum: -1,
                meta: gTypes.length + 2,
                body: JSON.stringify(message)
            });
        } else {
            window.H5SDK.sendDataToClient.wbClearData(message);
        }
    },

    wbEditData: function wbEditData(message) {
        var self = this;
        this.localIdNum = this.localIdNum + 1;
        message.data[0].value.localIDNum = this.localIdNum;
        if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.switchMsgLine == 'game') {
            message.type = 'wb';
            window.sdk_game.doSend({
                portParent: 3,
                func: "00001000",
                target: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id,
                dataNum: self.localIdNum,
                meta: gTypes.length + 2,
                body: JSON.stringify(message)
            });
        } else {
            window.H5SDK.sendDataToClient.wbAddData(message);
        }
    }

};

window.sendOrReceive = sendOrReceive;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return syncActions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classConf__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__course__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__result__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__aEvent__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__screens__ = __webpack_require__(18);







var syncActions = {
    isSync: true,
    whiteboards: {},
    isShowTea: '0',
    isShowOneStu: '0',
    currentPage: __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.localPage),
    nowWBTar: null, //工具条对象
    localIdNum: 0,
    isComplete: '0',
    severType: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.switchMsgLine,
    /*
     * 第一次加载   用于初始化第一页（默认页）
     */
    firstTime: true,
    /*
     * 乐观锁相关加载次数
     */
    selfRunSyncCount: 0,
    // syncTimer: 0,

    /**
     * 用来标识分享状态
     */
    isShareFour: '0', //默认0：未被分享 1：已经分享
    isShareSingle: '0', //默认0：未被分享 1：已经分享

    createStudentsScreens: function createStudentsScreens() {
        var appointMemberList = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].appointMemberList;
        var currentUser = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user;
        if (currentUser.type == 'stu') {} else {
            if (appointMemberList && appointMemberList.length > 0) {

                appointMemberList.forEach(function (item) {
                    if (item.role == 'tea') {} else {
                        __WEBPACK_IMPORTED_MODULE_5__screens__["a" /* screenAc */].addStuScreen({
                            uid: item.uid,
                            role: item.role,
                            name: item.name
                        });
                    }
                });

                this.buildScreenPages();

                //默认自己和四格中的自己在线状态
                // screenAc.showUserScreen(currentUser.id);
                // screenAc.initScreensByUser(currentUser.type);
            }
        }
    },

    /**
     * 构建四格页码
     */
    buildScreenPages: function buildScreenPages() {
        var screens = $('#h5_course_stu_screens .screen');
        var screen_pages = $('#h5_course_screen_pages');
        var countNum = screens.length;
        var screenPageSize = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.screenPageSize);
        var numStr = '<li class="num active">1</li>';
        if (countNum % screenPageSize == 0) {
            countNum = countNum / screenPageSize;
        } else {
            countNum = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(countNum / screenPageSize) + 1;
        }
        for (var i = 2; i <= countNum; i++) {
            numStr += "<li class=\"num\">" + i + "</li>";
        }
        screen_pages.html(numStr);
    },

    createResultPanel: function createResultPanel() {
        //add: 老师端显示结果列表
        if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == 'tea') {
            __WEBPACK_IMPORTED_MODULE_3__result__["a" /* courseResult */].createResult();
        }
    },

    /**
     * 构建学生端结果列表
     */
    createResultStuPanel: function createResultStuPanel() {
        if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == 'stu') {
            // courseResultStu.createResult();
        }
    },

    showStuButtonAndPracticeButton: function showStuButtonAndPracticeButton() {
        var userType = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type;
        var practiceButton = $('#h5_btn_practice');
        var showStuButton = $('#h5_btn_showStu');
        var shareFourButton = $('#h5_btn_share_four');
        var shareSingleButton = $('#h5_btn_share_single');
        var completeButton = $('#h5_course_page_ensure');
        var starBtn = $('#h5_btn_star_open');
        if (userType === 'stu') {
            practiceButton.remove();
            showStuButton.remove();
            shareFourButton.remove();
            shareSingleButton.remove();
            completeButton.remove();
            starBtn.remove();
        } else if (userType === 'tea') {}
    },

    isResultPage: function isResultPage(obj) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('isResultPage', obj);
        var user = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user;
        var h5_course_result = $('#h5_course_result');
        if (obj) {
            if (user.type == 'tea') {
                h5_course_result.removeClass('hide');
            } else if (user.type == 'stu') {} else {
                h5_course_result.removeClass('hide');
            }
        } else {
            h5_course_result.addClass('hide');
        }
    },

    /**
     * 是否显示结果
     */
    isPracticePage: function isPracticePage(obj) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('isPracticePage', obj);
        var practiceButton = $('#h5_btn_practice');
        if (obj) {
            practiceButton.removeClass('hide');
        } else {
            practiceButton.addClass('hide');
        }
    },

    /**
     * 控制教师端tg显示
     * @param flag
     * @param html
     */
    isCreateTg: function isCreateTg(flag, html) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('isCreateTg', flag);
        if (flag == '1') {
            $('#h5_course_tg').html(html);
            // tg.bindEvents();
        } else {
            $('#h5_course_tg').html('');
        }
    },

    /**
     * 初始化工具条画板大小
     */
    initDrawBoxSize: function initDrawBoxSize() {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('initDrawBoxSize');
        var self_frame = $('#h5_course_self_frame');
        var draw_box = $('#h5_course_draw');

        var frameWidth = self_frame.width();
        var frameHeight = self_frame.height();
        var getPageFontSize = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].getPageFontSize(frameWidth, frameHeight);
        var c_page_width = 19.2 * getPageFontSize;
        var c_page_height = 10.8 * getPageFontSize;
        draw_box.css({
            'width': c_page_width,
            'height': c_page_height
        });

        // window.H5SDK.sendDataToClient.courseAreaData({
        //     pX: parseInt(Math.max(0, (frameWidth - c_page_width) / 2)),  // 坐标x
        //     pY: parseInt(Math.max(0, (frameHeight - c_page_height) / 2)),  // 坐标y
        //     width: parseInt(c_page_width),  //宽度
        //     height: parseInt(c_page_height)  //高度
        // });

        //改变画板大小
        this.nowWBTar.wbResize();
        this.drawBoxResize();
    },

    /**
     * 更新root权限及设置老师、学生是否可翻页
     */
    updateRootAndSetPageEnable: function updateRootAndSetPageEnable() {
        // 学生老师隐藏关闭按钮
        var closeBtn = $('#h5_course_close_btn');
        closeBtn.addClass('hide');

        if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == 'tea') {
            __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.isRoot = true;
            //老师可翻页
            this.setPageEnable(true);
            // window.con_btn.alpha = 1;
        } else if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == 'stu') {
            __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.isRoot = false;
            //学生不可翻页
            this.setPageEnable(false);
        } else {}
    },

    /**
     * 翻页是否可用
     */
    setPageEnable: function setPageEnable(pager) {
        var pagerBox = $('#h5_pager_box .btn');
        if (pager) {
            pagerBox.removeClass('disallow');
            window.conBtn.visible = true;
        } else {
            pagerBox.addClass('disallow');
            window.conBtn.visible = false;
        }
    },

    /**
     * 分享单例模式
     */
    shareSingle: function shareSingle() {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('shareSingle');
        var screenId = $('.fullShow').attr('id');
        if (this.isShareSingle == '0') {
            window.H5SDK.sendDataToClient.gSetData({
                CID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id,
                operate: '1',
                data: [{
                    key: 'shareSingle',
                    value: '1#' + screenId,
                    ownerUID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.id
                }]
            });
            window.H5SDK.EventQueue.addEventQueue({
                type: 'shareSingle',
                CID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id,
                operate: '1',
                data: [{
                    key: 'shareSingle',
                    value: '1#' + screenId,
                    ownerUID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.id
                }]
            });
        } else if (this.isShareSingle == '1') {
            window.H5SDK.sendDataToClient.gSetData({
                CID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id,
                operate: '1',
                data: [{
                    key: 'shareSingle',
                    value: '0#' + screenId,
                    ownerUID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.id
                }]
            });
            window.H5SDK.EventQueue.addEventQueue({
                type: 'shareSingle',
                CID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id,
                operate: '1',
                data: [{
                    key: 'shareSingle',
                    value: '0#' + screenId,
                    ownerUID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.id
                }]
            });
        } else {}
    },

    /**
     * 点击open star
    */
    openStarPage: function openStarPage(status) {
        var self_frame = $("#h5_course_star_frame");
        var h5_course_star_page = $("#h5_course_star_page");
        var h5_btn_star_open = $('#h5_btn_star_open');

        if (status == '1') {
            h5_btn_star_open.attr('data-status', '1');

            self_frame.attr('src', __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.starSrc);
            h5_course_star_page.removeClass('hide');
            h5_btn_star_open.text('close star');
        } else {
            h5_btn_star_open.attr('data-status', '0');
            h5_course_star_page.addClass('hide');
            h5_btn_star_open.text('open star');
            self_frame.attr('src', '');
        }
    },

    /**
     * 点击授权按钮调用
    */

    handlePractice: function handlePractice() {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('handlePractice');
        var practiceButton = $('#h5_btn_practice');
        practiceButton.addClass('hide');

        // let sendMsg = sendOrReceive.buildStatusData({
        //     operate: '1',
        //     classStatus: '2'
        // }, 'practice');

        var sendMsg = sendOrReceive.buildStatusData({
            type: 'practice',
            key: 'classStatus',
            value: {
                currentPage: __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toString(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.course_localPage),
                classStatus: '2'
            }
        });
        sendOrReceive.addSendMessage(sendMsg);
    },

    /**
     * 显示四格窗口
    */
    showStuWindow: function showStuWindow() {
        if (this.isShowTea == '0') {

            var msgData = sendOrReceive.buildStatusData({
                type: 'showStuWindow',
                key: 'showStuWindow',
                value: '1'
            });

            window.EventQueue.addEventQueue(msgData);
        } else if (this.isShowTea == '1') {

            var _msgData = sendOrReceive.buildStatusData({
                type: 'showStuWindow',
                key: 'showStuWindow',
                value: '0'
            });

            window.EventQueue.addEventQueue(_msgData);

            //删除单例
            if (this.isShowOneStu == '1') {
                var full_screen_id = $(".fullShow").attr('id');

                var _msgData2 = sendOrReceive.buildStatusData({
                    type: 'showSingleStuWindow',
                    key: 'showSingleStuWindow',
                    value: '0#' + full_screen_id
                });

                window.EventQueue.addEventQueue(_msgData2);
            }
        } else {}
    },

    /**
     * 查看单个学生窗口
     */
    seeStuWindow: function seeStuWindow(screenId) {
        if (this.isShowOneStu == '0') {
            window.EventQueue.addEventQueue({
                type: 'showSingleStuWindow',
                CID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id,
                operate: '1',
                data: [{
                    key: 'showSingleStuWindow',
                    value: '1#' + screenId,
                    ownerUID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.id
                }]
            });
        } else if (this.isShowOneStu == '1') {
            window.EventQueue.addEventQueue({
                type: 'showSingleStuWindow',
                CID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id,
                operate: '1',
                data: [{
                    key: 'showSingleStuWindow',
                    value: '0#' + screenId,
                    ownerUID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.id
                }]
            });
        }
    },

    /**
     * 重置画板大小
     */
    resetScreenDraw: function resetScreenDraw(screenId) {
        var screen_frame = $('#' + screenId + ' .frame');
        var self = this;
        var screen_ratio = 1920 / 1080;
        var user_id = screen_frame.attr('user_id');
        var screen_c_page_width = screen_frame.width();
        var screen_c_page_height = screen_frame.width() / screen_ratio;
        if ($('#j_screen_draw_' + user_id).length != 0) {
            $('#j_screen_draw_' + user_id).css({
                'width': screen_c_page_width,
                'height': screen_c_page_height
            });
            self.whiteboards['j_screen_draw_' + user_id].wbResize();
        }
    },

    /**
     * 出现奖杯
    */
    coursePrize: function coursePrize(operate) {
        var self = this;

        $('#mask').addClass('mask-full');

        if (operate == '1') {
            $('#h5_course_part').addClass('zoomOut');
            $("#h5_course_prizes_shade").removeClass('hide');
            $("#h5_course_prizes").removeClass('hide');
            __WEBPACK_IMPORTED_MODULE_2__course__["a" /* h5_course */].playSound("showCup");
            setTimeout(function () {
                $('#h5_course_part').removeClass('zoomOut').addClass('hide');
                $("#h5_course_prizes").addClass('zoomOut');
                setTimeout(function () {
                    $("#h5_course_prizes_shade").addClass('hide');
                    $("#h5_course_prizes").removeClass('zoomOut').addClass('hide');
                    __WEBPACK_IMPORTED_MODULE_2__course__["a" /* h5_course */].updateCardEquip();
                }, 500);
            }, 4000);
        } else {
            if (this.cardComplete == __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.course_card_id) {
                $('#h5_course_part').addClass('hide');
                $("#h5_course_prizes_shade").addClass('hide');
                $("#h5_course_prizes").addClass('hide');
                __WEBPACK_IMPORTED_MODULE_2__course__["a" /* h5_course */].updateCardEquip();
            }
        }
    },

    sendResultToStu: function sendResultToStu(message) {
        var resultMessageValue = message.data[0].value;
        resultMessageValue.type = 'resultSyncStu';
        this.localIdNum = this.localIdNum + 1;
        window.H5SDK.sendDataToClient.clAddData({
            CID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id,
            textBookID: '1',
            textBookType: '1',
            page: __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toString(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.localPage),
            operate: '1',
            data: [{
                localID: this.localIdNum,
                value: resultMessageValue,
                byteData: '',
                byteDataLength: ''
            }]
        });
    },

    /**
     * screens 翻页
     */
    screenPaging: function screenPaging(type, currentPage) {
        var userType = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type;
        var screenPrevBtn = $('#h5_course_screen_prev');
        var screenNextBtn = $('#h5_course_screen_next');
        var temPage = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.screenLocalPage);
        var screens = $('#h5_course_stu_screens .screen');
        var countNum = screens.length; //记录数
        var screenPageSize = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.screenPageSize);
        var screenPageCount = Math.ceil(countNum / screenPageSize); //计算出总共页数
        var isSend = false;
        //根据不同的type结合不同的权限设置数据
        switch (type) {
            case 'prev':
                temPage = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.screenLocalPage) - 1;
                temPage = temPage > 0 ? temPage : temPage + 1;
                __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.screenLocalPage = temPage;
                isSend = true;
                break;
            case 'next':
                temPage = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.screenLocalPage) + 1;
                temPage = temPage <= screenPageCount ? temPage : temPage - 1;
                __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.screenLocalPage = temPage;
                isSend = true;
                break;
            case 'set':
                __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.screenLocalPage = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(currentPage);
                temPage = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(currentPage);
                isSend = false;
                break;
            case 'go':
                __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.screenLocalPage = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(currentPage);
                temPage = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toInt(currentPage);
                isSend = true;
                break;
            default:
                break;
        }

        //分页按钮处理
        screenPrevBtn.removeClass('disabled');
        screenNextBtn.removeClass('disabled');
        if (temPage == 1) {
            screenPrevBtn.addClass('disabled');
        } else if (temPage == screenPageCount) {
            screenNextBtn.addClass('disabled');
        }

        //分页逻辑
        screens.addClass('hide-scale');
        // this.currentFourUsers = [];
        for (var i = (temPage - 1) * screenPageSize; i < screenPageSize * temPage; i++) {
            var screen_item = screens.eq(i);
            screen_item.removeClass('hide-scale');
            // let user_id = screen_item.attr('user_id');
            //add：记录当前四格用户数据
            // this.currentFourUsers.push({
            //     user_id: user_id
            // });
        }
        $('#h5_course_screen_pages .num').removeClass('active').eq(temPage - 1).addClass('active');
        //发送指令
        if (userType == 'tea' && isSend) {
            /*window.H5SDK.sendDataToClient.gSetData({
                CID: classConf.course.id,
                operate: '1',
                data: [{
                    key: 'screenPaging',
                    value: common.toString(classConf.h5Course.screenLocalPage),
                    ownerUID: classConf.user.id
                }]
            });*/
        }
    },

    /**
     * 发星星
     */
    sendStarData: function sendStarData(message) {
        var sendUser = message.data[0].value.sendUser;

        var resultData = message.data[0].value.syncAction.resultData;

        if (resultData.isRight == true) {
            window.H5SDK.sendDataToClient.starData({
                type: 'notify',
                CID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id,
                value: {
                    starType: '0', // 0:个人 1：组
                    starAdd: '1', //预留
                    senderID: '', //发送者id
                    receivers: [sendUser],
                    witnesses: [sendUser]
                }
            });
        }
    },

    /**
     * 海岛是否可点击
     */
    setCardDisable: function setCardDisable(msgValue) {
        var nextCanCard = msgValue.canClickIndex + 1;
        if (nextCanCard <= window.cardsJson.length - 1) {
            window.con_card.getChildAt(nextCanCard).canClick = true;
            window.con_card.getChildAt(nextCanCard).alpha = 1;
            window.con_card.getChildAt(nextCanCard).setAnimate(false);
            window.canClickId = nextCanCard;
        }
    },

    /**
     * 退出教室重进英雄位置
    */
    setHeroPosition: function setHeroPosition(msgValue) {
        var count = msgValue.cardData.path.length;
        var path = msgValue.cardData.path[count - 1];
        window.heroArr.forEach(function (item, index) {
            if (item.userInfo.role == 'tea') {
                item.hero_container.x = path.x + 100;
            } else {
                item.hero_container.x = path.x;
            }

            item.hero_container.y = path.y;
        });
    },

    /**
     * 课中英雄运动
    */
    goWayByPath: function goWayByPath(heroArr, message, callback) {
        var runCount = 0;
        var cardData = message.cardData;
        heroArr.forEach(function (item, index) {
            // item(某一个hero对象)
            item.sprite.gotoAndPlay("run");
            var hero_teen = createjs.Tween.get(item.hero_container);

            cardData.path.forEach(function (value) {
                var path_x = value.x;
                var path_y = value.y;

                if (item.userInfo.role == 'tea') {
                    path_x = path_x + 100;
                } else {
                    path_x = path_x;
                }

                var paths = {
                    x: path_x,
                    y: path_y
                };

                if (item.userInfo.role == 'tea') {
                    hero_teen.to(paths, cardData.pathLength / 100 * 1000);
                } else {
                    hero_teen.to(paths, cardData.pathLength / 100 * 1000 + index * 200);
                }
            });

            hero_teen.call(function () {
                runCount = runCount + 1;
                item.sprite.gotoAndPlay("stop");
                if (runCount == heroArr.length) {
                    callback();
                }
            });
        });
    },

    /**
     * 画板工具相关
     */
    handleWbTools: function handleWbTools(currentTarget) {
        // let toolBox = $('#h5_course_draw');
        var funcName = currentTarget.attr('data-func');
        // let screen_draws = $('#h5_course_stu_screens .screen-draw-box');
        var bindBtn = $('.btn-tool[data-func="bind"]');
        // let btnTool = $('.btn-tool:not([data-func="bind"])');

        if (currentTarget.hasClass('disabled')) {} else {
            //bind和authorize做特殊处理
            if (funcName == 'bind') {
                if (currentTarget.hasClass('selected')) {
                    // 白板显示状态
                    var sendMsg = sendOrReceive.buildStatusData({
                        type: 'showWB',
                        key: 'showWB',
                        value: {
                            status: '0'
                        }
                    });
                    sendOrReceive.addSendMessage(sendMsg);
                    /* window.H5SDK.sendDataToClient.gSetData({
                        CID: classConf.course.id,
                        operate: '1',
                        data: [{
                            key: 'showWB',
                            value: '0',
                            ownerUID: classConf.user.id
                        }]
                    });
                      // change
                    window.H5SDK.EventQueue.addEventQueue({
                        type: 'showWB',
                        CID: classConf.course.id,
                        operate: '1',
                        data: [{
                            key: 'showWB',
                            value: '0',
                            ownerUID: classConf.user.id
                        }]
                    }); */

                    // toolBox.addClass('hide');
                    currentTarget.removeClass('selected');

                    // screen_draws.addClass('hide');
                    // btnTool.addClass('disabled').removeClass('fadeIn animated');
                } else {

                    var _sendMsg = sendOrReceive.buildStatusData({
                        type: 'showWB',
                        key: 'showWB',
                        value: {
                            status: '1'
                        }
                    });
                    sendOrReceive.addSendMessage(_sendMsg);
                    /* window.H5SDK.sendDataToClient.gSetData({
                        CID: classConf.course.id,
                        operate: '1',
                        data: [{
                            key: 'showWB',
                            value: '1',
                            ownerUID: classConf.user.id
                        }]
                    });
                      // change
                    window.H5SDK.EventQueue.addEventQueue({
                        type: 'showWB',
                        CID: classConf.course.id,
                        operate: '1',
                        data: [{
                            key: 'showWB',
                            value: '1',
                            ownerUID: classConf.user.id
                        }]
                    });
                    */
                    // toolBox.removeClass('hide');
                    currentTarget.addClass('selected');
                    // screen_draws.removeClass('hide');
                    // btnTool.removeClass('disabled').addClass('fadeIn animated');
                }
            } else if (funcName == 'authorize') {
                if (currentTarget.hasClass('selected')) {
                    currentTarget.removeClass('selected');

                    var _sendMsg2 = sendOrReceive.buildStatusData({
                        type: 'openWbToolAuthority',
                        key: 'openWbToolAuthority',
                        value: {
                            status: '0'
                        }
                    });
                    sendOrReceive.addSendMessage(_sendMsg2);
                    /* window.H5SDK.sendDataToClient.gSetData({
                        CID: classConf.course.id,
                        operate: '1',
                        data: [{
                            key: 'openWbToolAuthority',
                            value: '0',
                            ownerUID: classConf.user.id
                        }]
                    }); */
                } else {

                    if (bindBtn.hasClass('selected')) {
                        currentTarget.addClass('selected');
                        var _sendMsg3 = sendOrReceive.buildStatusData({
                            type: 'openWbToolAuthority',
                            key: 'openWbToolAuthority',
                            value: {
                                status: '1'
                            }
                        });
                        sendOrReceive.addSendMessage(_sendMsg3);
                        /* window.H5SDK.sendDataToClient.gSetData({
                            CID: classConf.course.id,
                            operate: '1',
                            data: [{
                                key: 'openWbToolAuthority',
                                value: '1',
                                ownerUID: classConf.user.id
                            }]
                        }); */
                    } else {
                        alert("please active tools");
                    }
                }
            } else {
                this.handleTool(funcName);
            }
        }
    },

    /**
     * 工具条 tool event bind
     */
    handleTool: function handleTool(funcName) {
        var btnTool = $('.btn-tool:not([data-func="bind"]):not([data-func="authorize"])');
        var curBtn = $('.btn-tool[data-func="' + funcName + '"]');
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('handleTool', funcName);
        btnTool.removeClass('selected');
        curBtn.addClass('selected');
        this.toolDrawFunc(funcName);
    },

    /**
     * 构建工具条配置
     */
    buildToolBar: function buildToolBar() {
        var currentUser = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user;
        var self = this;
        //首先获取配置数据
        var conConf = window.WBSDK.createConf('const');
        var changeConf = window.WBSDK.createConf('change');

        var screen_draws = $('#h5_course_stu_screens .screen-draw-box');
        if (currentUser.type == 'stu') {
            changeConf.pauseDraw.state = true;
        }
        conConf.ownerID.value = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.id;
        conConf.isSVC.value = true;
        this.nowWBTar = window.WBSDK.bindWB('h5_course_draw', conConf, changeConf, handleToolCallback);
        //修改为构建多个画板
        screen_draws.each(function () {
            var draw_id = $(this).attr('id');
            var changeConfStu = window.WBSDK.createConf('change');
            if (currentUser.type == 'stu') {
                changeConfStu.pauseDraw.state = true;
            }
            self.whiteboards[draw_id] = window.WBSDK.bindWB(draw_id, conConf, changeConfStu, handleToolCallback);
        });

        /**
         * handleToolCallback
         */
        function handleToolCallback(type, obj, boardID) {
            /**
             1：Add
             2：Delete
             3：Edit
             4：Clear
             5：Syn
             */
            if (type == 'add') {
                //delete edit clear
                if (obj != undefined) {
                    obj.value.receiveUser = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.id;
                    obj.value.sendUser = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.id;
                    obj.value.sendUserInfo = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user;
                    obj.value.boardID = boardID;
                }

                sendOrReceive.wbAddData({
                    CID: self.classConf.course.id,
                    textBookID: '1',
                    textBookType: '1',
                    page: self.classConf.h5Course.localPage + '',
                    operate: '1',
                    data: [obj]
                });
            } else if (type == 'clear') {
                // window.H5SDK.sendDataToClient.wbClearData({
                //     CID: self.classConf.course.id,
                //     textBookID: '1',
                //     textBookType: '1',
                //     page: self.classConf.h5Course.localPage + '',
                //     operate: '4',
                //     data: []
                // });
                sendOrReceive.wbClearData({
                    CID: self.classConf.course.id,
                    textBookID: '1',
                    textBookType: '1',
                    page: self.classConf.h5Course.localPage + '',
                    operate: '4',
                    data: []
                });

                for (var drawItem in self.whiteboards) {
                    self.whiteboards[drawItem].setData('4', []);
                }
            } else if (type == 'edit') {
                // window.H5SDK.sendDataToClient.wbEditData({
                //     CID: self.classConf.course.id,
                //     textBookID: '1',
                //     textBookType: '1',
                //     page: self.classConf.h5Course.localPage + '',
                //     operate: '3',
                //     data: [obj]
                // });
                sendOrReceive.wbEditData({
                    CID: self.classConf.course.id,
                    textBookID: '1',
                    textBookType: '1',
                    page: self.classConf.h5Course.localPage + '',
                    operate: '3',
                    data: [obj]
                });
                for (var _drawItem in self.whiteboards) {
                    self.whiteboards[_drawItem].setData('3', [obj]);
                }
            } else if (type == 'back') {
                window.H5SDK.sendDataToClient.wbDelData({
                    CID: self.classConf.course.id,
                    textBookID: '1',
                    textBookType: '1',
                    page: self.classConf.h5Course.localPage + '',
                    operate: '2',
                    data: [obj]
                });
                for (var _drawItem2 in self.whiteboards) {
                    self.whiteboards[_drawItem2].setData('2', [obj]);
                }
            } else {}
        }
    },

    /**
     * 在画板上绘制 
    */
    toolDrawFunc: function toolDrawFunc(type) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('toolDrawFunc', type);
        var self = this;
        if (this.nowWBTar == null) {} else {
            this.nowWBTar.draw(type);
            //其他小画板同样的操作类型
            if (type == 'clear') {} else {
                for (var drawItem in self.whiteboards) {
                    self.whiteboards[drawItem].draw(type);
                }
            }
        }
    },

    /***
     * 所有相关工具条画板缩放
     */
    drawBoxResize: function drawBoxResize() {
        var self = this;
        var screen_frames = $('#h5_course_stu_screens .frame');
        screen_frames.each(function () {
            var user_id = $(this).attr('user_id');
            var frameWidth = $(this).width();
            var frameHeight = $(this).height();
            var getPageFontSize = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].getPageFontSize(frameWidth, frameHeight);

            $('#j_screen_draw_' + user_id).css({
                'width': 19.2 * getPageFontSize,
                'height': 10.8 * getPageFontSize
            });
            self.whiteboards['j_screen_draw_' + user_id].wbResize();
        });
    },

    /**
     * 是否显示白板
     */
    showWB: function showWB(b) {
        var toolBox = $('#h5_course_draw');
        var bindBtn = $('.btn-tool[data-func="bind"]');
        var screen_draws = $('#h5_course_stu_screens .screen-draw-box');
        var btnTool = $('.btn-tool:not([data-func="bind"])');
        var userType = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type;
        if (b) {
            $('#h5_course_draw').removeClass('hide');
            bindBtn.addClass('selected');
            screen_draws.removeClass('hide');
            btnTool.removeClass('disabled').addClass('fadeIn animated');
            toolBox.removeClass('hide');
            if (userType == 'tea') {
                $('#mask').css("z-index", "9");
            }
        } else {
            $('#h5_course_draw').addClass('hide');
            bindBtn.removeClass('selected');
            screen_draws.addClass('hide');
            btnTool.addClass('disabled').removeClass('fadeIn animated');
            toolBox.addClass('hide');
            if (userType == 'tea') {
                $('#mask').css("z-index", "10");
            }
        }
    },

    showWbTools: function showWbTools() {
        var user = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user;
        $('.btn-tool[data-func="pencil"]').addClass('selected');
        if (user.type == 'tea') {} else if (user.type == 'stu') {
            $('#h5_tool_box').addClass('hide');
        } else {}
    },

    OpenWbToolAuthority: function OpenWbToolAuthority(b) {
        if (b) {
            $('#h5_tool_box').removeClass('hide');
            this.nowWBTar.updateChangeConf({
                pauseDraw: {
                    state: false
                }
            });
        } else {
            $('#h5_tool_box').addClass('hide');
            this.nowWBTar.updateChangeConf({
                pauseDraw: {
                    state: true
                }
            });
        }
    },

    /*------------------------------------------------run[Type]-----------------------------------------------------------------------------------*/

    /**
    * 关卡点击
    */
    runClickCard: function runClickCard(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runClickCard', JSON.stringify(message));
        var self = this;

        var msgValue = message.data[0].value;
        var cardData = msgValue.cardData;
        var card = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].findCardById(window.cards, cardData.id);

        // window.thisCardId = message.id;

        __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.course_card_id = cardData.id;
        // console.log('-----------window.partId------------',window.partId)

        //关卡状态的变更
        for (var i = 0; i < window.cardsJson.length; i++) {
            window.con_card.getChildAt(i).canClick = false;
            createjs.Tween.removeTweens(window.con_card.getChildAt(i));
        }

        //显示当前关卡的教材内容
        __WEBPACK_IMPORTED_MODULE_2__course__["a" /* h5_course */].init(cardData.id);

        if (message.operate == '1') {
            // card.setScale();
            self.goWayByPath(window.heroArr, msgValue, function () {
                // if (message.operate != '5') {
                __WEBPACK_IMPORTED_MODULE_2__course__["a" /* h5_course */].coursePaging('go', '1');
                __WEBPACK_IMPORTED_MODULE_2__course__["a" /* h5_course */].courseShow();
                // } else {
                //     if (cardData.id != self.cardComplete) {
                //         h5_course.courseShow();
                //     }
                // }
                for (var i = 0; i < window.cardsJson.length; i++) {
                    window.con_card.getChildAt(i).alpha = 0.5;
                    createjs.Tween.removeTweens(window.con_card.getChildAt(i));
                }
                self.setCardDisable(msgValue);
            });
        } else {
            if (cardData.id != self.cardComplete) {
                __WEBPACK_IMPORTED_MODULE_2__course__["a" /* h5_course */].courseShow();
            }
            for (var i = 0; i < window.cardsJson.length; i++) {
                window.con_card.getChildAt(i).alpha = 0.5;
            }
            self.setHeroPosition(msgValue);
            self.setCardDisable(msgValue);
        }

        window.EventQueue.setEventUnlocked();
    },

    /**
    * 背景移动
    */
    runBgMove: function runBgMove(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runBgMove', JSON.stringify(message));
        var msgValue = message.data[0].value;
        window.bg_position_left = msgValue.x;
        window.game_bg.x = -msgValue.x;
        window.game_bg.y = -msgValue.y;
        window.EventQueue.setEventUnlocked();
    },

    /**
    * 进入游戏房间后下发数据
    */
    runIntoRoom: function runIntoRoom(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runIntoRoom', JSON.stringify(message));

        var state = message.state;
        var uid = message.uid;
        var currentUser = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user;
        // let h5_course_tea_out = $('#h5_course_tea_out');

        uid.forEach(function (item) {
            var hero = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].findHeroById(window.heroArr, item);

            hero.setVisible(true);
            __WEBPACK_IMPORTED_MODULE_5__screens__["a" /* screenAc */].showUserScreen(item);

            // if (item == currentUser.id) {
            //     hero.setVisible(true);
            // } else {
            //     if (state == 'enter') {
            //         hero.setVisible(true);
            //         screenAc.showUserScreen(item);
            //     } else {
            //         hero.setVisible(false);
            //         screenAc.hideUserScreen(item);
            //     }

            // }
        });

        // if (message.port == "10005") { // 通知其他人
        //     if (message.data.teaID == message.data.mgs.userId) {//如果为老师
        //         window.game_bg.x = -message.data.mgs.x;
        //         window.game_bg.y = -message.data.mgs.y;
        //         window.bg_position_left = message.data.mgs.x;
        //     }
        //     let mgs = {
        //         state : 'enter',
        //         uid : [message.data.mgs.userId],
        //     }
        //     this.runUpdateUser(mgs)
        // } else {
        //     let mgs = {
        //         state : 'enter',
        //         uid : []
        //     }
        //     this.runUpdateUser(mgs);
        //     for (var i = 0; i < message.data.mgs.length; i++) {
        //         mgs.uid.push(message.data.mgs[i].userId)
        //         if (message.data.mgs[i].userId == message.data.teaID) {
        //             window.game_bg.x = -message.data.mgs[i].x;
        //             window.game_bg.y = -message.data.mgs[i].y;
        //             window.bg_position_left = message.data.mgs[i].x;
        //             return;
        //         }
        //     }
        // }
    },

    /**
     * 退出房间
    */

    runOutRoom: function runOutRoom(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runOutRoom', JSON.stringify(message));
        var state = message.state;
        var uid = message.uid;
        var hero = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].findHeroById(window.heroArr, uid);
        hero.setVisible(false);
        __WEBPACK_IMPORTED_MODULE_5__screens__["a" /* screenAc */].hideUserScreen(uid);
    },

    /**
    * 首次进入教室初始化相应的视图逻辑
    */
    runFirstInto: function runFirstInto(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runFirstInto', JSON.stringify(message));
        // if(message.operate!='5'){
        var msgData = sendOrReceive.buildStatusData({
            type: 'starting',
            key: 'classStatus',
            value: {
                classStatus: '1'
            }
        });

        window.EventQueue.addEventQueue(msgData);
        window.game_bg.x = 0;
        window.game_bg.y = 0;
        // h5_course.init('card1');
        // h5_course.coursePaging('set', 1);

        //判断当前有没有进入到某个关卡中
        $('#h5_course_part').addClass('hide');
        // 所有人初始位置
        for (var i = 0; i < window.heroArr.length; i++) {
            window.heroArr[i].hero_container.x = 10;
            window.heroArr[i].hero_container.y = 100;
            if (i == window.heroArr.length - 1) {
                window.heroArr[i].hero_container.x = window.heroArr[i].hero_container.x + 100;
            }
        }
        //海岛状态初始化
        for (var i = 0; i < window.cardsJson.length; i++) {
            window.con_card.getChildAt(i).canClick = false;
            window.con_card.getChildAt(i).alpha = 0.5;
            createjs.Tween.removeTweens(window.con_card.getChildAt(i));
        }
        window.con_card.getChildAt(0).alpha = 1;
        window.con_card.getChildAt(0).canClick = true;
        window.con_card.getChildAt(0).setAnimate(false);
        window.EventQueue.setEventUnlocked();
        // }
    },

    runNoUse: function runNoUse(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runNoUse', JSON.stringify(message));
        window.EventQueue.setEventUnlocked();
    },

    runStars: function runStars(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runStars', JSON.stringify(message));
        __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.starData = message;
        window.EventQueue.setEventUnlocked();
    },

    runShowWB: function runShowWB(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runShowWB', JSON.stringify(message));
        var showWBInfo = message.data[0];
        if (showWBInfo.value.status == '1') {
            this.showWB(true);
        } else if (showWBInfo.value.status == '0') {
            this.showWB(false);
        }
        window.EventQueue.setEventUnlocked();
    },

    runOpenWbToolAuthority: function runOpenWbToolAuthority(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runOpenWbToolAuthority', JSON.stringify(message));
        var user = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user;
        var authorityInfo = message.data[0];
        var authorizeBtn = $('.btn-tool[data-func="authorize"]');
        if (user.type == 'tea') {
            if (authorityInfo.value.status == '1') {
                authorizeBtn.addClass('selected');
            } else {
                authorizeBtn.removeClass('selected');
            }
        } else if (user.type == 'stu') {
            if (authorityInfo.value.status == '1') {
                this.OpenWbToolAuthority(true);
                if (message.operate == '1') {
                    //新添加学生授权提示
                    __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].tipStuAllow('draw');
                }
            } else {
                this.OpenWbToolAuthority(false);
            }
        } else {
            if (authorityInfo.value.status == '1') {
                authorizeBtn.addClass('selected');
            } else {
                authorizeBtn.removeClass('selected');
            }
        }
        window.EventQueue.setEventUnlocked();
    },

    runWb: function runWb(message) {
        /**
         1：Add
         2：Delete
         3：Edit
         4：Clear
         5：Syn
         */
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runWb', JSON.stringify(message));
        var self = this;
        var user = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user;
        if (message.operate == '1') {
            // 课中
            var boardID = message.data[0].value.boardID;
            var sendUser = message.data[0].value.sendUser;
            var sendUserInfo = message.data[0].value.sendUserInfo;
            if (boardID == "h5_course_draw") {
                if (sendUser != user.id) {
                    if (user.type == 'tea') {
                        // 主画板
                        self.nowWBTar.setData(message.operate, message.data);
                        //老师或者其他用户小屏幕
                        if (self.whiteboards['j_screen_draw_' + sendUser] != undefined) {
                            self.whiteboards['j_screen_draw_' + sendUser].setData(message.operate, message.data);
                        }
                    } else {
                        self.nowWBTar.setData(message.operate, message.data);
                    }
                } else {
                    if (user.type == 'tea') {
                        for (var drawItem in self.whiteboards) {
                            self.whiteboards[drawItem].setData(message.operate, message.data);
                        }
                    }
                }
            } else {
                if (user.type == 'stu') {
                    //往哪个学生上画
                    if (boardID.indexOf(user.id) > 0) {
                        self.nowWBTar.setData(message.operate, message.data);
                    }
                    // self.whiteboards[boardID].setData(message.operate, message.data);
                } else {
                    //老师端公屏中添加笔迹
                    self.nowWBTar.setData(message.operate, message.data);
                    self.whiteboards[boardID].setData(message.operate, message.data);
                }
            }
        } else if (message.operate == '5') {
            // 退出教室重新进入
            var _boardID = message.data[0].value.boardID;
            var _sendUser = message.data[0].value.sendUser;
            var _sendUserInfo = message.data[0].value.sendUserInfo;
            if (_sendUserInfo.type == 'tea') {
                self.nowWBTar.setData(message.operate, message.data);
                for (var _drawItem3 in self.whiteboards) {
                    self.whiteboards[_drawItem3].setData(message.operate, message.data);
                }
            } else if (_sendUserInfo.type == 'stu') {
                if (user.type == 'tea') {
                    // 主画板
                    self.nowWBTar.setData(message.operate, message.data);
                    //老师或者其他用户小屏幕
                    if (self.whiteboards['j_screen_draw_' + _sendUser] != undefined) {
                        self.whiteboards['j_screen_draw_' + _sendUser].setData(message.operate, message.data);
                    }
                } else {
                    self.nowWBTar.setData(message.operate, message.data);
                }
            }
        } else {
            self.nowWBTar.setData(message.operate, message.data);
            for (var _drawItem4 in self.whiteboards) {
                self.whiteboards[_drawItem4].setData(message.operate, message.data);
            }
        }
        window.EventQueue.setEventUnlocked();
    },
    // runWb: function (message) {
    //     /**
    //      1：Add
    //      2：Delete
    //      3：Edit
    //      4：Clear
    //      5：Syn
    //      */
    //     let self = this;
    //     let user = classConf.user;
    //     if (message.operate == '1' || message.operate == '5') {
    //         let boardID = message.data[0].value.boardID;
    //         let sendUser = message.data[0].value.sendUser;
    //         let sendUserInfo = message.data[0].value.sendUserInfo;
    //         if (boardID == "h5_course_draw") {
    //             if (sendUserInfo.type == 'tea') {
    //                 self.nowWBTar.setData(message.operate, message.data);
    //                 for (let drawItem in self.whiteboards) {
    //                     self.whiteboards[drawItem].setData(message.operate, message.data);
    //                 }
    //             } else if (sendUserInfo.type == 'stu') {
    //                 if (sendUser == user.id) { //发送者自己
    //                     self.nowWBTar.setData(message.operate, message.data);
    //                 } else {
    //                     if (user.type == 'stu') {

    //                     } else {
    //                         //老师和其他用户一样
    //                         self.nowWBTar.setData(message.operate, message.data);
    //                     }
    //                 }
    //                 //老师或者其他用户小屏幕
    //                 if (self.whiteboards['j_screen_draw_' + sendUser] != undefined) {
    //                     self.whiteboards['j_screen_draw_' + sendUser].setData(message.operate, message.data);
    //                 }
    //             } else {

    //             }
    //         } else {
    //             if (user.type == 'stu') {
    //                 //往哪个学生上画
    //                 if (boardID.indexOf(user.id) > 0) {
    //                     self.nowWBTar.setData(message.operate, message.data);
    //                 }
    //                 // self.whiteboards[boardID].setData(message.operate, message.data);
    //             } else {
    //                 //老师端公屏中添加笔迹
    //                 self.nowWBTar.setData(message.operate, message.data);
    //                 self.whiteboards[boardID].setData(message.operate, message.data);
    //             }
    //         }
    //     } else {
    //         self.nowWBTar.setData(message.operate, message.data);
    //         for (let drawItem in self.whiteboards) {
    //             self.whiteboards[drawItem].setData(message.operate, message.data);
    //         }
    //     }
    //     window.EventQueue.setEventUnlocked();
    // },


    runWbBack: function runWbBack(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runWbBack', JSON.stringify(message));
        var currentUser = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user;
        if (message.data != null && message.data.length > 0) {
            var self = this;
            message.data.forEach(function (item) {
                if (item.value.boardID == 'h5_course_draw') {
                    self.nowWBTar.changeData({
                        svcID: item.svcID,
                        localID: item.localID,
                        value: item.value
                    });

                    //在四格中的判断
                    if (currentUser.type == 'stu') {
                        /*self.whiteboards['j_screen_draw_' + currentUser.id].setData('1', [{
                         svcID: item.svcID,
                         localID: item.localID,
                         value: item.value
                         }]);*/
                    } else {
                        //老师和其他用户
                        for (var drawItem in self.whiteboards) {
                            self.whiteboards[drawItem].setData('1', [{
                                svcID: item.svcID,
                                localID: item.localID,
                                value: item.value
                            }]);
                        }
                    }
                } else {
                    self.whiteboards[item.value.boardID].changeData({
                        svcID: item.svcID,
                        localID: item.localID,
                        value: item.value
                    });
                    //add：老师端在四格小屏中画的时候，自己的公屏上对应添加笔迹
                    self.nowWBTar.setData('1', [{
                        svcID: item.svcID,
                        localID: item.localID,
                        value: item.value
                    }]);
                }
            });
        }
        window.EventQueue.setEventUnlocked();
    },

    runCl: function runCl(message) {
        //这里是不做处理的，原则上出现这种数据是不合法的，需要注意！
        console.warn('receive cl_data : %s', JSON.stringify(message));
    },

    runClBack: function runClBack(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runClBack', JSON.stringify(message));
        window.EventQueue.setEventUnlocked();
    },

    runColorSet: function runColorSet(message) {
        var self = this;
        if (message.color) {
            var temColor = '#' + message.color;
            __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.pencilColor = temColor;
            self.nowWBTar.updateChangeConf({
                pencil: {
                    'color': temColor //画笔的颜色
                },
                highPencil: {
                    'color': temColor //荧光笔颜色
                },
                rect: {
                    'color': temColor //矩形的颜色
                },
                text: {
                    'fontColor': temColor //文字的颜色
                }
            });
            //四格中的画笔颜色控制
            for (var drawItem in self.whiteboards) {
                self.whiteboards[drawItem].updateChangeConf({
                    pencil: {
                        'color': temColor //画笔的颜色
                    },
                    highPencil: {
                        'color': temColor //荧光笔颜色
                    },
                    rect: {
                        'color': temColor //矩形的颜色
                    },
                    text: {
                        'fontColor': temColor //文字的颜色
                    }
                });
            }
        }
        window.EventQueue.setEventUnlocked();
    },

    /**
     * 回调模板
    */
    runSync: function runSync(message) {
        console.log("-----------runSync-----------------", message);
        /* {
            "type": "sync",
            "CID": "648518346341356238",
            "textBookID": "1",
            "textBookType": "1",
            "page": "1",
            "operate": "1",
            "data": [{
                "localID": 1,
                "value": {
                    "method": "event",
                    "syncAction": {
                        "index": 1,
                        "syncName": "syncAnswerClick",
                        "otherInfor": ""
                    },
                    "sendUser": "800003725",
                    "receiveUser": "800003725",
                    "sendUserInfo": {
                        "id": "800003725",
                        "userID": 800003725,
                        "sex": 0,
                        "type": "stu",
                        "name": "werk",
                        "userRole": "",
                        "userType": "",
                        "courseRole": ""
                    },
                    "classStatus": "2",
                    "questionType": "TC",
                    "recoveryMode": "",
                    "tplate": "TC001"
                },
                "byteData": "",
                "byteDataLength": ""
            }]
        } */
        var frames_loaded = $("iframe[frame_load_status='0']");
        var currentUser = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user; //当前用户
        //frames_loaded.length 为0表示加载完毕

        if (frames_loaded.length == 0) {

            //恢复同步状态
            this.selfRunSyncCount = 0;
            // window.clearTimeout(this.syncTimer);
            // this.syncTimer = 0;

            /**
             * receiveUser
             *
             */
            var classStatus = message.data[0].value.classStatus;

            var user = message.data[0].value.sendUserInfo; //指令发过来的用户

            //新的逻辑
            var otherScreens = $('#h5_course_stu_screens .frame_control');

            if (classStatus == '1') {
                $('.frame_control[role=' + currentUser.id + ']')[0].contentWindow.SDK.actEvent(message);
                otherScreens.each(function (i) {
                    if (otherScreens[i].contentWindow.SDK != undefined) {
                        otherScreens[i].contentWindow.SDK.actEvent(message);
                    }
                });
            } else if (classStatus == '2') {
                // 指令发送者是谁，谁就执行
                $('.frame_control[role=' + user.id + ']').each(function (i) {
                    $('.frame_control[role=' + user.id + ']')[i].contentWindow.SDK.actEvent(message);
                });
            } else if (classStatus == '0') {
                //自己的画面
                $('.frame_control[role=' + currentUser.id + ']')[0].contentWindow.SDK.actEvent(message);
            } else {
                window.EventQueue.setEventUnlocked();
            }
        } else {
            window.setTimeout(function () {
                if (this.selfRunSyncCount >= 20) {
                    //乐观状态控制改为20
                    console.warn('error happened : framesLoad error runSync error!');
                    window.EventQueue.setEventUnlocked();
                } else {
                    this.selfRunSyncCount = this.selfRunSyncCount + 1;
                    this.runSync(message);
                }
            }.bind(this), 1000);
        }
    },

    /**
     * 榜单
    */
    runResultSync: function runResultSync(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runResultSync', JSON.stringify(message));
        if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == 'tea') {
            __WEBPACK_IMPORTED_MODULE_3__result__["a" /* courseResult */].showResult(message);
            //控制学生端榜单
            if (message.operate == '1') {
                // this.sendResultToStu(message);
                this.sendStarData(message);
            }
        } else if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == 'stu') {} else {
            __WEBPACK_IMPORTED_MODULE_3__result__["a" /* courseResult */].showResult(message);
        }
        window.EventQueue.setEventUnlocked();
    },

    runResultSyncStu: function runResultSyncStu(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runResultSyncStu', JSON.stringify(message));
        if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == 'stu') {
            // courseResultStu.showResult(message);
        }
        window.EventQueue.setEventUnlocked();
    },

    /**
     * 上课状态
     */
    runStarting: function runStarting(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runStarting', JSON.stringify(message));
        this.updateRootAndSetPageEnable();

        __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.classStatus = message.data[0].value.classStatus;

        if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == 'tea') {
            __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].closeMask();
        } else {
            __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].showMask();
        }

        //重置结果
        __WEBPACK_IMPORTED_MODULE_3__result__["a" /* courseResult */].resetResult();
        // courseResultStu.resetResult();

        //不管什么情况 所有的人同步svc的页码
        // this.paging('set', classConf.h5Course.svcPage);


        window.EventQueue.setEventUnlocked();
    },

    /**
     * 授权练习
    */
    runPractice: function runPractice(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runPractice', JSON.stringify(message));

        /* {
            "type": "practice",
            "CID": "648518346341356238",
            "operate": "1",
            "data": [{
                "key": "classStatus",
                "value": "2",
                "ownerUID": "72057594037932750",
                "localID": 4
            }]
        } */

        this.updateRootAndSetPageEnable();

        __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.classStatus = message.data[0].value.classStatus;

        if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == 'tea') {
            $('#h5_btn_practice').addClass('hide');
            if (this.isShowTea == '0') {
                __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].showMask();
            } else if (this.isShowTea == '1') {
                __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].closeMask();
            } else {}
        } else {
            __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].closeMask();
            if (message.operate == '1') {
                //新添加学生授权提示
                __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].tipStuAllow('do');
            }
        }

        window.EventQueue.setEventUnlocked();
    },

    /**
     * 对列翻页处理
    */
    runPaging: function runPaging(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runPaging', JSON.stringify(message));
        var currentPage = message.curPage;
        if (currentPage == 0 && __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == 'tea') {
            //如果当前页是0 表示服务器没有数据进行一次page的通知
            __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('first time : give page data to svc');
            window.H5SDK.sendDataToClient.pageData({
                CID: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id,
                textBookID: '1',
                textBookType: '1',
                curPage: __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].toString(Math.max(1, parseInt(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.localPage))),
                reserved: ''
            });
            // this.paging('set', 1);
        }

        // else if (currentPage != 0) {
        //     // this.paging('svc', currentPage);
        // }
        window.EventQueue.setEventUnlocked();
    },

    /**
     * 成员变更
     */
    runUpdateUser: function runUpdateUser(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runUpdateUser', JSON.stringify(message));
        var state = message.state;
        var uid = message.uid;
        var currentUser = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user;
        var h5_course_tea_out = $('#h5_course_tea_out');
        uid.forEach(function (item) {
            var hero = __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].findHeroById(window.heroArr, item);
            if (item == currentUser.id) {
                hero.setVisible(true);
            } else {
                if (state == 'enter') {
                    hero.setVisible(true);
                    __WEBPACK_IMPORTED_MODULE_5__screens__["a" /* screenAc */].showUserScreen(item);
                } else {
                    hero.setVisible(false);
                    __WEBPACK_IMPORTED_MODULE_5__screens__["a" /* screenAc */].hideUserScreen(item);
                }
            }
        });

        //处理匿名用户教师状态
        if (currentUser.type != 'tea' && currentUser.type != 'stu') {
            if (message.role == 'tea') {
                if (state == 'out') {
                    h5_course_tea_out.removeClass('hide');
                } else {
                    h5_course_tea_out.addClass('hide');
                }
            }
        }

        window.EventQueue.setEventUnlocked();
    },

    /**
     * 通用通知
     */
    runGeneralNotice: function runGeneralNotice(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runGeneralNotice', JSON.stringify(message));
        window.EventQueue.setEventUnlocked();
    },

    /**
     * 打开四格模式
    */
    runShowStuWindow: function runShowStuWindow(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runShowStuWindow', JSON.stringify(message));
        var currentUser = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user;
        var showWindowInfo = message.data[0].value;
        var stu_screens = $('#h5_course_stu_screens');
        var h5_btn_showStu = $('#h5_btn_showStu');
        var screenPrevBtn = $('#h5_course_screen_prev');
        var screenNextBtn = $('#h5_course_screen_next');
        var screen_pages = $('#h5_course_screen_pages');
        var screen_count = $('#h5_course_stu_screens .screen').length;
        var shareFourButton = $('#h5_btn_share_four');
        var shareSingleButton = $('#h5_btn_share_single');

        if (currentUser.type == 'stu') {} else {
            if (showWindowInfo == '1') {
                this.isShowTea = '1';
                //控制四格
                stu_screens.removeClass('hidden');
                h5_btn_showStu.html('close four-windows');
                __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].closeMask();

                //判断是否显示分页按钮
                if (screen_count > 4) {
                    screenPrevBtn.removeClass('hide');
                    screenNextBtn.removeClass('hide');
                    screen_pages.removeClass('hide');
                }

                shareFourButton.removeClass('hide');
            } else {
                this.isShowTea = '0';
                //控制四格
                stu_screens.addClass('hidden');
                h5_btn_showStu.html('four-windows');
                if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.classStatus == '2') {
                    __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].showMask();
                }

                //判断是否显示分页按钮
                if (screen_count > 4) {
                    screenPrevBtn.addClass('hide');
                    screenNextBtn.addClass('hide');
                    screen_pages.addClass('hide');
                }

                shareFourButton.addClass('hide');
                shareSingleButton.addClass('hide');
            }
        }

        window.EventQueue.setEventUnlocked();
    },

    /**
     * 打开单例模式
    */
    runShowSingleStuWindow: function runShowSingleStuWindow(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runShowSingleStuWindow', JSON.stringify(message));
        var currentUser = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user;
        var info = message.data[0].value.split('#');
        var screenId = info[1];
        var isShowSingle = info[0];
        var stu_screens = $('#h5_course_stu_screens');
        var shareFourButton = $('#h5_btn_share_four');
        var shareSingleButton = $('#h5_btn_share_single');

        if (currentUser.type == 'stu') {} else {
            if (isShowSingle == '1') {
                this.isShowOneStu = '1';
                stu_screens.addClass('single-block');
                $('#' + screenId).addClass('fullShow');
                $('#' + screenId).find('.view').html('back four-windows');

                shareFourButton.addClass('hide');
                shareSingleButton.removeClass('hide');
            } else {
                this.isShowOneStu = '0';
                stu_screens.removeClass('single-block');
                $('#' + screenId).removeClass('fullShow');
                $('#' + screenId).find('.view').html('single-window');

                shareFourButton.removeClass('hide');
                shareSingleButton.addClass('hide');
            }
        }

        //画板控制,重置画板大小
        this.resetScreenDraw(screenId);
        window.EventQueue.setEventUnlocked();
    },

    /**
     * screen 分页
     */
    runScreenPaging: function runScreenPaging(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runScreenPaging', JSON.stringify(message));
        var currentPage = message.data[0].value;
        this.screenPaging('set', currentPage);
        window.EventQueue.setEventUnlocked();
    },

    runShareFour: function runShareFour(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runShareFour', JSON.stringify(message));
        var currentUser = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user;
        var status = message.data[0].value;
        var stu_screens = $('#h5_course_stu_screens');
        var shareFourButton = $('#h5_btn_share_four');
        var h5_share_four_tip = $('#h5_share_four_tip');

        if (status == '0') {
            this.isShareFour = '0';
            h5_share_four_tip.addClass('hide');
            shareFourButton.html('share to all');
            if (currentUser.type == 'stu') {
                stu_screens.removeClass('share-four-show');
            }
            stu_screens.removeAttr('share-four-status');
        } else if (status == '1') {
            this.isShareFour = '1';
            h5_share_four_tip.removeClass('hide');
            shareFourButton.html('sharing cancel');
            if (currentUser.type == 'stu') {
                stu_screens.addClass('share-four-show');
            }
            stu_screens.attr('share-four-status', '1');
        } else {}

        //画板控制,重置画板大小
        // this.resetScreenDraw();
        window.EventQueue.setEventUnlocked();
    },

    runShareSingle: function runShareSingle(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runShareSingle', JSON.stringify(message));
        var currentUser = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user;
        var info = message.data[0].value.split('#');
        var screenId = info[1];
        var isShareSingle = info[0];
        var stu_screens = $('#h5_course_stu_screens');
        var shareSingleButton = $('#h5_btn_share_single');
        var h5_share_single_tip = $('#h5_share_single_tip');

        if (isShareSingle == '0') {
            this.isShareSingle = '0';
            h5_share_single_tip.addClass('hide');
            shareSingleButton.html('share to all');
            if (currentUser.type == 'stu') {
                stu_screens.removeClass('share-single-show');
                $('#' + screenId).removeClass('share-fullShow');
            }
            $('#' + screenId).removeAttr('share-single-status');
        } else {
            this.isShareSingle = '1';
            h5_share_single_tip.removeClass('hide');
            shareSingleButton.html('sharing cancel');
            if (currentUser.type == 'stu') {
                stu_screens.addClass('share-single-show');
                $('#' + screenId).addClass('share-fullShow');
            }
            $('#' + screenId).attr('share-single-status', '1');
        }

        //画板控制,重置画板大小
        // this.resetScreenDraw();
        window.EventQueue.setEventUnlocked();
    },

    /**
     * 添加语音打分执行逻辑
     */
    runRecordAudio: function runRecordAudio(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runRecordAudio', JSON.stringify(message));
        if (message.operate == '1') {
            if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == 'stu') {

                window.H5Record.record(message);
            }
        }
        window.EventQueue.setEventUnlocked();
    },

    /**
     * 点击完成按钮
     */
    runPartComplete: function runPartComplete(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runPartComplete', JSON.stringify(message));
        var msg = message.data[0].value;
        this.cardComplete = msg.cardId;
        this.coursePrize(message.operate);

        if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == 'tea') {
            __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].closeMask();
        } else {
            __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].showMask();
        }
        this.nowWBTar.draw("clear");
        window.EventQueue.setEventUnlocked();
    },

    /**
     * 课件part分页
     */
    runCoursePaging: function runCoursePaging(message) {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runCoursePaging', JSON.stringify(message));
        var msgData = message.data[0].value;

        // if (message.operate == '5') {
        __WEBPACK_IMPORTED_MODULE_2__course__["a" /* h5_course */].init(msgData.cardId);
        // h5_course.courseShow();
        // }

        __WEBPACK_IMPORTED_MODULE_2__course__["a" /* h5_course */].pageSet(msgData.currentPage);

        window.EventQueue.setEventUnlocked();
    },

    /**
     *  控制星星也展示
    */

    runOpenStarPage: function runOpenStarPage(message) {
        /* {
            "type": "openStarPage",
            "CID": "648518346341356238",
            "operate": "1",
            "data": [{
                "key": "openStarPage",
                "value": {
                    status:'1'
                },
                "ownerUID": "72057594037932750",
                "localID": 2
            }]
        }*/
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('runOpenStarPage', JSON.stringify(message));

        var status = message.data[0].value.status;

        this.openStarPage(status);

        window.EventQueue.setEventUnlocked();
    }

};

window.h5SyncActions = syncActions;
window.h5SyncActions.classConf = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */];



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return eventEnter; });
/* unused harmony export eventBind */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classConf__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sendOrReceive__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__syncActions__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__course__ = __webpack_require__(2);
/**
 * Created by haowerui on 2017/3/23.
 * 说明：
 *      事件代理模块
 *      根据数据池的数据集中处理事件的绑定和处理方式
 *      比如处理特色课程事件处理
 *      教材品质逻辑与参数
 */







var eventBind = {
    iTimer: 0,

    /**
     * 绑定入口
    */
    bind: function bind() {
        __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].event.resize && eventBind.resizeEvent();
        __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].event.tools && eventBind.toolEvent();
        __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].event.mouse && eventBind.mouseEvent();
    },

    /**
     * 重置画板大小
     */
    resizeEvent: function resizeEvent() {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('bind resize event');
        var self = this;
        window.addEventListener('resize', function () {
            //重置画板大小
            clearTimeout(self.iTimer);
            self.iTimer = setTimeout(function () {
                __WEBPACK_IMPORTED_MODULE_3__syncActions__["a" /* syncActions */].initDrawBoxSize();
            }, 300);
        });
    },
    mouseEvent: function mouseEvent() {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('bind mouse event');
        var click_tag = 0;
        var self = this;

        /**
         * 点击授权按钮
         */
        $('#h5_btn_practice').unbind().bind('click', function () {
            if (click_tag == 0) {
                click_tag = 1;
                //add close toolbox
                if ($('#h5_course_draw').hasClass('hide')) {} else {
                    $("#h5_course_tool .btn-tool[data-func='bind']").trigger('click');
                }
                __WEBPACK_IMPORTED_MODULE_3__syncActions__["a" /* syncActions */].handlePractice();
                setTimeout(function () {
                    click_tag = 0;
                }, 200);
            }
        });

        /**
         * 点击四格按钮
         */
        $('#h5_btn_showStu').unbind().bind('click', function () {
            if (click_tag == 0) {
                click_tag = 1;
                __WEBPACK_IMPORTED_MODULE_3__syncActions__["a" /* syncActions */].showStuWindow();
                setTimeout(function () {
                    click_tag = 0;
                }, 200);
            }
        });

        /**
         * 点击单例模式按钮
         */
        $('#h5_course_stu_screens .view').unbind().bind('click', function () {

            var screenId = $(this).parent('.screen').attr('id');

            if (click_tag == 0) {
                click_tag = 1;
                __WEBPACK_IMPORTED_MODULE_3__syncActions__["a" /* syncActions */].seeStuWindow(screenId);
                setTimeout(function () {
                    click_tag = 0;
                }, 200);
            }
        });

        /**
         * 点击教材翻页
         */
        $('#h5_course_page_prev').unbind().bind('click', function () {
            if (click_tag == 0) {
                click_tag = 1;
                if ($(this).hasClass('disabled') || $(this).hasClass('disallow')) {} else {
                    __WEBPACK_IMPORTED_MODULE_4__course__["a" /* h5_course */].coursePaging('prev');
                }
                setTimeout(function () {
                    click_tag = 0;
                }, 200);
            }
        });

        $('#h5_course_page_next').unbind().bind('click', function () {
            if (click_tag == 0) {
                click_tag = 1;
                if ($(this).hasClass('disabled') || $(this).hasClass('disallow')) {} else {
                    __WEBPACK_IMPORTED_MODULE_4__course__["a" /* h5_course */].coursePaging('next');
                }
                setTimeout(function () {
                    click_tag = 0;
                }, 200);
            }
        });

        $('#h5_course_pager_select').bind('change', function () {
            __WEBPACK_IMPORTED_MODULE_3__syncActions__["a" /* syncActions */].paging('jump');
        });

        /**
         * 点击完成按钮
        */
        $('#h5_course_page_ensure').unbind().bind('click', function () {
            var sendMsg = __WEBPACK_IMPORTED_MODULE_2__sendOrReceive__["a" /* sendOrReceive */].buildStatusData({
                type: 'partComplete',
                key: 'partComplete',
                value: {
                    cardId: __WEBPACK_IMPORTED_MODULE_4__course__["a" /* h5_course */].courseCard.id
                }

            });
            __WEBPACK_IMPORTED_MODULE_2__sendOrReceive__["a" /* sendOrReceive */].addSendMessage(sendMsg);
            // if (classConf.h5Course.classStatus == '1' || classConf.h5Course.classStatus == '2') {
            // } else {
            //     //直接入队列执行
            //     window.EventQueue.addEventQueue(sendMsg);
            // }
        });

        /**
         * 点击屏幕翻页 
        */
        $('#h5_course_screen_prev').bind('click', function (e) {
            if (click_tag == 0) {
                click_tag = 1;
                if ($(this).hasClass('disabled')) {} else {
                    __WEBPACK_IMPORTED_MODULE_3__syncActions__["a" /* syncActions */].screenPaging('prev');
                }
                setTimeout(function () {
                    click_tag = 0;
                }, 200);
            }
        });

        $('#h5_course_screen_next').bind('click', function (e) {
            if (click_tag == 0) {
                click_tag = 1;
                if ($(this).hasClass('disabled')) {} else {
                    __WEBPACK_IMPORTED_MODULE_3__syncActions__["a" /* syncActions */].screenPaging('next');
                }
                setTimeout(function () {
                    click_tag = 0;
                }, 200);
            }
        });

        $('#h5_course_screen_pages').on('click', '.num', function (e) {
            var currentPage = $(this).index() + 1;
            __WEBPACK_IMPORTED_MODULE_3__syncActions__["a" /* syncActions */].screenPaging('go', currentPage);
        });

        /**
         * 查看榜单功能
        */
        $('#h5_btn_star_open').unbind().bind('click', function () {
            var status = '';

            if ($(this).attr('data-status') == '0') {
                status = '1';
            } else {
                status = '0';
            }
            var sendMsg = __WEBPACK_IMPORTED_MODULE_2__sendOrReceive__["a" /* sendOrReceive */].buildStatusData({
                type: 'openStarPage',
                value: {
                    status: status
                },
                key: 'openStarPage'
            });

            __WEBPACK_IMPORTED_MODULE_2__sendOrReceive__["a" /* sendOrReceive */].addSendMessage(sendMsg);
        });

        /**
         * 预习模式关闭
        */
        $('#h5_course_part .close_btn').unbind().bind('click', function () {
            $(this).parent().addClass('hide');
        });
        // $('#h5_btn_share_four').bind('click', function (e) {
        //     if (click_tag == 0) {
        //         click_tag = 1;
        //         syncActions.shareFour();
        //         setTimeout(function () {
        //             click_tag = 0
        //         }, 200);
        //     }
        // });

        // $('#h5_btn_share_single').bind('click', function (e) {
        //     if (click_tag == 0) {
        //         click_tag = 1;
        //         syncActions.shareSingle();
        //         setTimeout(function () {
        //             click_tag = 0
        //         }, 200);
        //     }
        // });

    },
    toolEvent: function toolEvent() {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('bind tool event');
        $('#h5_course_tool').on('click', '.btn-tool', function () {
            var that = $(this);
            __WEBPACK_IMPORTED_MODULE_3__syncActions__["a" /* syncActions */].handleWbTools(that);
        });
    }
};

//对外开发的函数各自定义  保护私有变量和私有函数
var eventEnter = function eventEnter() {
    eventBind.bind();
};




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cardsJson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return userJson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return h5courseAudio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return equipmentJson; });
var cardsJson = [{
	id: 'card1',
	name: 'c1',
	position: {
		x: 620 * 1.5,
		y: 70 * 1.5
	},
	info: {
		comeIn: true,
		total: 5,
		src: {
			"1": "01",
			"2": "02",
			"3": "03",
			"4": "04",
			"5": "05"
		}
	},
	pathLength: 100,
	path: [{
		"x": 180 * 1.5,
		"y": 45 * 1.5
	}, {
		"x": 300 * 1.5,
		"y": -10 * 1.5
	}, {
		"x": 500 * 1.5,
		"y": -30 * 1.5
	}],
	rank: '1'
}, {
	id: 'card2',
	name: 'c2',
	position: {
		x: 1150 * 1.5,
		y: 600 * 1.5
	},
	info: {
		comeIn: true,
		total: 5,
		src: {
			"1": "06",
			"2": "07",
			"3": "08",
			"4": "09",
			"5": "10"
		}
	},
	pathLength: 300,
	path: [{
		x: 1030 * 1.5,
		y: 460 * 1.5
	}],
	rank: '2'
}, {
	id: 'card3',
	name: 'c3',
	position: {
		x: 1750 * 1.5,
		y: 90 * 1.5
	},
	info: {
		comeIn: true,
		total: 3,
		src: {
			"1": "11",
			"2": "12",
			"3": "13"
		}
	},
	pathLength: 300,
	path: [{
		"x": 1650 * 1.5,
		"y": -40 * 1.5
	}],
	rank: '3'
}];

//装备
var equipmentJson = [{
	id: 'card1',
	name: 'e1',
	position: {
		x: 40 * 1.5,
		y: 325 * 1.5
	},
	info: {
		getState: false
	},
	imageSuccess: 'chuan1',
	imageError: 'chuan2'
}, {
	id: 'card2',
	name: 'e2',
	position: {
		x: 90 * 1.5,
		y: 280 * 1.5
	},
	info: {
		getState: false
	},
	imageSuccess: 'ying1',
	imageError: 'ying2'
}, {
	id: 'card3',
	name: 'e3',
	position: {
		x: 180 * 1.5,
		y: 325 * 1.5
	},
	info: {
		getState: false
	},
	imageSuccess: 'cap1',
	imageError: 'cap2'
}];

//用户形象
var userJson = {
	id: "21345",
	name: "hello",
	role: "tea",
	rank: "0",
	info: {
		classList: [{
			rank: "0",
			src: "image/img1.png"
		}, {
			rank: "1",
			src: "image/img2.png"
		}, {
			rank: "2",
			src: "image/img3.png"
		}, {
			rank: "3",
			src: "image/img4.png"
		}]
	},
	position: {
		x: 1180,
		y: 650
	}
};

//课程过程中的所有音频素材
var h5courseAudio = [{
	name: "showCup",
	src: "image/upgrade.mp3"
}, {
	name: "updatePrize",
	src: "image/upgrade.mp3"
}];

// window.h5courseAudio = h5courseAudio;
window.cardsJson = cardsJson;
// window.equipmentJson = equipmentJson;
// window.userJson = userJson;
//
// //全局变量
// window.currentCard = null;
// window.User = null;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return loadComm; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classConf__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__aEvent__ = __webpack_require__(5);
/**
 * Created by shaoyongkai on 2017/12/01.
 * update by shaoyongkai on 2017/12/06
 * 说明：
 *      逻辑代理模块
 *      主要用于接收通讯模块下发的数据，进行数据拆包和分发
 *      初始化数据处理，依次加载运行其他模块等
 */







/*消息缓存处理*/
var dataCache = {
    /*是否初始化*/
    isInit: false,

    /*缓存的消息*/
    cache: [],

    /*处理缓存的消息*/
    clear: function clear() {
        console.log('clear cache data for svc when initData is ok!');
        dataCache.isInit = true;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = dataCache.cache[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var v = _step.value;

                logicDataEnter(v.type, v.obj);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        dataCache.cache = [];
    }
};

//逻辑分析模块处理
var logicUnpack = { //根据公司的业务逻辑将从服务器拿到的数据信息解包以便加载不同的模块
    'initFlag': false,

    'conf': { //这里是一些固定的配置信息
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

    initData: function initData(type, obj) {
        //保留所有服务器下发的数据
        type == 'course' && (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].serverData.objCourseInfo = obj);
        type == 'user' && (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].serverData.objUserInfo = obj);
        type == 'url' && (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].serverData.objURLInfo = obj);
        type == 'boardSet' && (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].serverData.objBoardSetInfo = obj);
        type == 'appointMemberList' && (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].serverData.objAppointMemberListInfo = obj);
        type == 'courseAll' && (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].serverData.objCourseAllInfo = obj);
        type == 'userAll' && (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].serverData.objUserAllInfo = obj);

        //每次判断初始化数据是否齐全 齐全之后才进行数据分析，跑流程，注意处理初始化数据未齐全时服务器下发的数据
        if (!logicUnpack.initFlag && __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].serverData.objCourseInfo && __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].serverData.objUserInfo && __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].serverData.objURLInfo && __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].serverData.objBoardSetInfo && __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].serverData.objAppointMemberListInfo) {
            //保证只有一次初始化
            logicUnpack.initFlag = true;

            //更新配置池数据
            logicUnpack.updateConf();

            //


            //初始化report和sdk模块环境
            window.H5SDK.setConfig(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */]);
            window.dataReport.setConfig(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */]);

            //游戏环境
            if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.switchMsgLine == 'game') {
                window.sdk_game.setConfig(__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */]);
            }

            //通知互动教材
            console.log('通知互动教材');
            __WEBPACK_IMPORTED_MODULE_2__view__["a" /* view */].init();

            __WEBPACK_IMPORTED_MODULE_3__app__["a" /* App */].init(function () {
                if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.switchMsgLine == 'game') {
                    window.sdk_game.init(function () {
                        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('开始真正构建教材区域逻辑');
                        __WEBPACK_IMPORTED_MODULE_3__app__["a" /* App */].start();
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__aEvent__["a" /* eventEnter */])();
                    });
                } else {

                    /**
                     * 初始化课程状态
                    */
                    __WEBPACK_IMPORTED_MODULE_3__app__["a" /* App */].start();
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__aEvent__["a" /* eventEnter */])();

                    /*处理缓存的消息*/
                    dataCache.clear();
                }
            });
        }
    },

    //更新配置池
    updateConf: function updateConf() {
        var _ref = [__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course, __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user, __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].url, __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].serverData],
            aliasCourse = _ref[0],
            aliasUser = _ref[1],
            aliasUrl = _ref[2],
            aliasServerData = _ref[3];

        //判断是否支持消息并发新方案改版

        //更新course

        aliasCourse.id = aliasServerData.objCourseInfo.courseId;

        //更新url
        // aliasUrl.h5Course.countNum = aliasServerData.objURLInfo.h5Course.countNum;
        // aliasUrl.h5Course.headUrl = window.MyBase64.decode(aliasServerData.objURLInfo.h5Course.headUrl);
        aliasUrl.h5Course.countNum = 35; //h5course
        aliasUrl.h5Course.headUrl = "https://h5course.51talk.com/dist/999999/01/index.html";

        if (aliasUrl.h5Course.headUrl.indexOf("v") == -1) {
            aliasUrl.h5Course.headUrl = aliasUrl.h5Course.headUrl + '?v=' + new Date().getTime();
        }
        aliasUrl.h5Course.headUrl = aliasUrl.h5Course.headUrl + '&pz=high';

        //===============todo
        aliasCourse.switchMsgLine = 'game';

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

        //更新appointMemberList
        __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].appointMemberList = aliasServerData.objAppointMemberListInfo.list && aliasServerData.objAppointMemberListInfo.list.slice(0) || [];
    }
};

//对外开发的函数各自定义  保护私有变量和私有函数
var logicDataEnter = function logicDataEnter(type, obj) {
    var initKeys = ['course', 'user', 'url', 'boardSet', 'appointMemberList', 'courseAll', 'userAll'];
    if (initKeys.indexOf(type) !== -1) {
        //初始化数据
        logicUnpack.initData(type, obj);
    } else {
        if (!dataCache.isInit) {
            console.warn('storage data from svc when initData is not ok!', type);
            dataCache.cache.push({ type: type, obj: obj });
            return;
        }

        if (window.H5SDK.unpack[type]) {
            window.H5SDK.unpack[type](obj);
        } else {
            console.log('can not find logicUnpack:' + type);
        }
    }
};

//回掉函数
var loadComm = function loadComm() {
    //回掉函数
    __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('set h5sdk callFuc');
    window.H5SDK.callFuc = logicDataEnter;
};



/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changeStyle; });
//改变对象的样式
function changeStyle(obj, type) {
    if (type == "bigToSmall") {
        createjs.Tween.get(obj).to({
            scaleX: 1.1,
            scaleY: 1.1
        }, 200).call(function () {
            obj.scaleX = 1;
            obj.scaleY = 1;
        });
    }
}



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classConf__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sendOrReceive__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pathJson__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__syncActions__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__course__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__animate__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__equipment__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__user__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__hero__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__card__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__btn__ = __webpack_require__(12);
/**
 * Created by shaoyongkai on 2018/02/05.
 * 说明：
 *      应用程序模块
 */













/**
 * 全局资源配置
*/
var resourcesArr = [{
    id: "bg_one",
    src: "image/mapBg_one.png"
}, {
    id: "run_stu",
    src: "image/run-stu.png"
}, {
    id: "card1",
    src: "image/card1.png"
}, {
    id: "right",
    src: "image/right.png"
}, {
    id: "left",
    src: "image/left.png"
}, {
    id: "card2",
    src: "image/card2.png"
}, {
    id: "card3",
    src: "image/card3.png"
}, /*{
    id: "card2_qusetion",
    src: "image/card2_question.png"
   },  {
    id: "cap1",
    src: "image/cap1.png"
   }, */{
    id: "cap2",
    src: "image/cap2.png"
}, /* {
    id: "ying1",
    src: "image/ying1.png"
   }, */{
    id: "ying2",
    src: "image/ying2.png"
}, /*  {
     id: "compass1",
     src: "image/compass1.png"
   }, */{
    id: "compass2",
    src: "image/compass2.png"
}, /*  {
     id: "chuan1",
     src: "image/chuan1.png"
   }, */{
    id: "chuan2",
    src: "image/chuan2.png"
}];
var otherBgImg = [{
    id: "bg_two",
    src: "image/mapBg_two.png"
}, {
    id: "bg_two",
    src: "image/mapBg_three.png"
}];
var thisBgIndex = 0;
/**
 * 画布相关
*/
var stage = void 0; //舞台
var container = void 0; //大容器
var con_bg = void 0; //所有背景
var con_bgImg = void 0; //只放背景图片
var con_btn = void 0; //背景按钮
var bg_width = void 0;
var con_card = void 0; //所有的关卡容器
var con_hero = void 0; //所有英雄容器
var con_equip = void 0; //装备栏容器
var con_user = void 0; //用户

var user = void 0;
var btnRight = void 0;
var btnLeft = void 0;
window.bg_position_left = 0; //背景偏移量
var images = {};
var equipments = []; //存储所有装备对象
var hero_arr = [];
var cards = [];
window.canClickId = 0; // 可以点击海岛的id
window.cardNum = 0;

//元素
var h5_progressbar = $('#h5_progressbar');
var h5_progressbar_num = $('#h5_progressbar_num');

/**
 * app application
 */
var App = {
    setViewStatus: function setViewStatus() {
        var viewStatus = localStorage.getItem('viewStatus');
        if (viewStatus == null) {} else {
            if (viewStatus.split('_')[0] != __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id) {
                localStorage.removeItem('viewStatus');
            }
        }
    },

    bindEvents: function bindEvents() {
        //监听frame加载完成
        var self_frame = $("#h5_course_self_frame");
        var screen_frames = $('#h5_course_stu_screens .frame');
        var showStuButton = $('#h5_btn_showStu');
        self_frame.off('load').on('load', function () {
            __WEBPACK_IMPORTED_MODULE_2__common__["a" /* common */].hidePageLoading();
            __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.pageLoadEndTime = new Date().getTime();
            console.log('页面加载完成的时间点是 classConf.h5Course.pageLoadEndTime----------------->%s', __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.pageLoadEndTime);

            //如果页面加载时间大于20s
            if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.pageLoadEndTime - __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.pageLoadStartTime >= 20000 || $(this)[0].contentWindow.SDK == undefined) {
                console.warn('当前页面加载时间大于20s或资源有问题!');
                //要是404则认为错误
                window.H5SendToClient('showerrorpage', '');
            } else {
                $(this).attr('frame_load_status', '1');
                var pageUrl = $(this).attr('src');
                var hasFourWindow = $(this)[0].contentWindow.h5Template == undefined ? '1' : $(this)[0].contentWindow.h5Template.hasFourWindow;
                var hasAuthorize = $(this)[0].contentWindow.h5Template == undefined ? '1' : $(this)[0].contentWindow.h5Template.hasAuthorize;
                var hasComplete = $(this)[0].contentWindow.h5Template == undefined ? '1' : $(this)[0].contentWindow.h5Template.hasComplete;
                var hasStar = $(this)[0].contentWindow.h5Template == undefined ? '0' : $(this)[0].contentWindow.h5Template.hasStar;

                if (hasFourWindow == '1') {
                    showStuButton.removeClass('hide');
                    if (screen_frames.length > 0) {
                        screen_frames.attr("src", pageUrl);
                        //监听screen frame 加载情况
                        screen_frames.each(function () {
                            $(this).off('load').on('load', function () {
                                $(this).attr('frame_load_status', '1');
                            });
                        });
                    }
                } else {
                    showStuButton.addClass('hide');
                    screen_frames.attr('src', '');
                    screen_frames.attr('frame_load_status', '1');
                }

                //是否显示授权按钮
                if (hasAuthorize == '0') {
                    $('#h5_btn_practice').addClass('hide');
                } else {
                    $('#h5_btn_practice').removeClass('hide');
                }

                //是否可以完成奖励该关卡
                if (hasComplete == '0') {
                    $('#h5_course_page_ensure').addClass('hide');
                } else {
                    $('#h5_course_page_ensure').removeClass('hide');
                }

                //是否为星星模板
                if (hasStar == '1') {
                    $('#h5_btn_star_close').removeClass('hide');
                } else {
                    $('#h5_btn_star_close').addClass('hide');
                }

                //数据上报
                window.dataReport.log.report('H5Source', {
                    action: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.pageLoadAction,
                    pageLoadTime: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.pageLoadEndTime - __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].h5Course.pageLoadStartTime
                });
            }
        });
    },

    start: function start() {

        //设置课程ID
        this.setViewStatus();

        //构建多端
        __WEBPACK_IMPORTED_MODULE_4__syncActions__["a" /* syncActions */].createStudentsScreens();
        __WEBPACK_IMPORTED_MODULE_4__syncActions__["a" /* syncActions */].createResultPanel();
        // syncActions.createResultStuPanel();

        //显示画布工具
        __WEBPACK_IMPORTED_MODULE_4__syncActions__["a" /* syncActions */].showWbTools();

        //调用初始化画布工具
        __WEBPACK_IMPORTED_MODULE_4__syncActions__["a" /* syncActions */].buildToolBar();

        //初始化画板大小
        // syncActions.initDrawBoxSize();

        if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == 'tea') {
            __WEBPACK_IMPORTED_MODULE_2__common__["a" /* common */].logPrint('我是老师进入默认到第一页');
            /**
             * 发送开始上课全局设置协议
             */
            var viewStatus = localStorage.getItem('viewStatus');
            //注意顺序不能颠倒！！！！！！！！！！！！！！！！！！！！！！！
            //先跳到第一页  注意必须先跳再进行发送starting 涉及到root身份，这里set不想传到对面去！！！！！！！！！！！！
            // syncActions.paging('set', 1);

            // h5_course.init('card1');
            // h5_course.coursePaging('set', 1);

            //再发送starting 将身份改为root！！！！！！！！！！！！！！！
            //build data to local queue

            if (viewStatus != null && viewStatus == __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id + '_1') {} else {
                localStorage.setItem('viewStatus', __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.id + '_1');
                // window.EventQueue.addEventQueue({
                //     type: 'firstInto',
                //     CID: classConf.course.id + '',
                //     operate: '1',
                //     data: [{
                //         key: 'firstInto',
                //         value: {classStatus:'1'}
                //     }]
                // });

                var msgData = __WEBPACK_IMPORTED_MODULE_1__sendOrReceive__["a" /* sendOrReceive */].buildStatusData({
                    type: 'firstInto',
                    key: 'firstInto',
                    value: {
                        classStatus: '1'
                    }
                });

                __WEBPACK_IMPORTED_MODULE_1__sendOrReceive__["a" /* sendOrReceive */].addSendMessage(msgData);
                /**
                 * 无用包只是在svc下保证会收到叠加包
                */
                if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].course.switchMsgLine != 'game') {
                    var noUse = msgData = __WEBPACK_IMPORTED_MODULE_1__sendOrReceive__["a" /* sendOrReceive */].buildMsgData({
                        type: 'noUse',
                        value: {}
                    });
                    __WEBPACK_IMPORTED_MODULE_1__sendOrReceive__["a" /* sendOrReceive */].addSendMessage(noUse);
                }
            }
        } else if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == 'stu') {
            __WEBPACK_IMPORTED_MODULE_2__common__["a" /* common */].logPrint('我是stu进入默认到第一页');
            // syncActions.paging('set', 1);

            // h5_course.init('card1');
            // h5_course.coursePaging('set', 1);
        } else {
            __WEBPACK_IMPORTED_MODULE_2__common__["a" /* common */].logPrint('我是其他用户进入, 禁止点击', __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type);
            // common.showMaskForbid();
            // syncActions.paging('set', 1);

            // h5_course.init('card1');
            // h5_course.coursePaging('set', 1);
        }

        //练习和四格按钮控制
        __WEBPACK_IMPORTED_MODULE_4__syncActions__["a" /* syncActions */].showStuButtonAndPracticeButton();

        this.bindEvents();
    },

    init: function init(callback) {
        console.log('app canvas start');
        var self = this;
        //游戏框架构建
        stage = new createjs.Stage("game_canvas");
        container = new createjs.Container(); //大容器
        con_bg = new createjs.Container(); //所有背景
        con_bg.name = "container_bg";

        con_bgImg = new createjs.Container(); //只放背景图片
        con_card = new createjs.Container(); //所有的关卡容器
        con_hero = new createjs.Container(); //所有的英雄容器

        con_btn = new createjs.Container(); //按钮
        con_btn.name = "container_btn";

        con_equip = new createjs.Container(); //装备栏容器
        con_user = new createjs.Container(); //用户
        createjs.Ticker.addEventListener("tick", stageBreakHandler);

        createjs.Ticker.setFPS(30);

        container.addChild(con_bg);
        con_bg.addChild(con_bgImg);
        container.addChild(con_equip);
        container.addChild(con_btn);
        container.addChild(con_user);

        stage.addChild(container);
        createjs.Touch.enable(stage);

        /**
         * 资源预加载
        */
        var loader = new createjs.LoadQueue(false);
        loader.installPlugin(createjs.Sound);
        loader.addEventListener("fileload", handleFileLoad);
        loader.addEventListener("complete", completeHandler);
        loader.addEventListener("progress", loadProgress);
        loader.loadManifest(resourcesArr);

        function loadProgress(e) {
            var per = e.loaded;
            h5_progressbar.removeClass('hide');
            h5_progressbar_num.css({
                width: e.loaded * 100 + '%'
            });

            if (e.loaded >= 1) {
                h5_progressbar.addClass('hide');
            }
        }

        function handleFileLoad(evt) {
            if (evt.item.type == "image") {
                images[evt.item.id] = evt.result;
            }
        }

        function completeHandler() {

            /**
             * 创建初始化背景
            */
            var game_bg = __WEBPACK_IMPORTED_MODULE_2__common__["a" /* common */].setBg({
                images: images['bg_one'],
                x: 0,
                y: 0
            });
            con_bgImg.addChild(game_bg);

            /**
             * 放置关卡
            */
            __WEBPACK_IMPORTED_MODULE_3__pathJson__["a" /* cardsJson */].forEach(function (value, index) {
                var canClick = false;
                if (index == window.canClickId) {
                    canClick = true;
                } else {
                    canClick = false;
                }
                var card = new __WEBPACK_IMPORTED_MODULE_10__card__["a" /* Card */]({
                    id: value.id,
                    image: images[value.id],
                    x: value.position.x,
                    y: value.position.y,
                    canClick: canClick
                });
                if (index == window.canClickId) {
                    card.bitmap.alpha = 1;
                    card.bitmap.setAnimate(false);
                } else {
                    card.bitmap.alpha = 0.5;
                }
                window.cardNum++;
                card.bind('click', function () {

                    if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == "stu") {
                        // window.h5_course.courseCard = value;
                        // 判断是老师是否课中
                        console.log('--------------------sd', card.bitmap.canClick);
                        if (card.bitmap.canClick) {
                            var msgData = __WEBPACK_IMPORTED_MODULE_1__sendOrReceive__["a" /* sendOrReceive */].buildStatusData({
                                type: 'clickCard',
                                key: 'clickCard',
                                value: {
                                    canClickIndex: window.canClickId,
                                    cardData: value
                                }
                            });
                            __WEBPACK_IMPORTED_MODULE_1__sendOrReceive__["a" /* sendOrReceive */].addEventQueue(msgData);
                        }
                    } else {

                        if (card.bitmap.canClick) {
                            //发关卡包到对端
                            var cardData = __WEBPACK_IMPORTED_MODULE_1__sendOrReceive__["a" /* sendOrReceive */].buildStatusData({
                                type: 'clickCard',
                                key: 'clickCard',
                                value: {
                                    canClickIndex: window.canClickId,
                                    cardData: value
                                }

                            });
                            __WEBPACK_IMPORTED_MODULE_1__sendOrReceive__["a" /* sendOrReceive */].addSendMessage(cardData);

                            //发送关卡对应的part部分页
                            // let pageData = sendOrReceive.buildStatusData({
                            //     type: 'coursePaging',
                            //     key: 'coursePaging',
                            //     value: {
                            //         currentPage: common.toString(classConf.h5Course.course_localPage),
                            //         cardId: value.id
                            //     }
                            // });
                            // sendOrReceive.addSendMessage(pageData);
                        }
                    }
                });

                con_card.addChild(card.bitmap);
                window.con_card = con_card;
                cards.push(card);
            });

            con_bg.addChild(con_card);

            /**
             * 添加用户
            */
            var teaArr = [];
            var stuArr = [];

            __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].appointMemberList.forEach(function (item) {
                if (item.role == 'tea') {
                    item.userImg = 'image/girl.png';
                    teaArr.push(item);
                } else {
                    item.userImg = 'image/boy.png';
                    stuArr.push(item);
                }
            });

            for (var i = 0; i < stuArr.length; i++) {
                var stu_hero = new __WEBPACK_IMPORTED_MODULE_9__hero__["a" /* Hero */](2, images['run_stu'], 60, 43, 10, 200, stuArr[i]);
                con_hero.addChild(stu_hero.hero_container);
                hero_arr.push(stu_hero);
            }

            var tea_hero = new __WEBPACK_IMPORTED_MODULE_9__hero__["a" /* Hero */](2, images['run_stu'], 60, 43, 10, 200, teaArr[0]);
            tea_hero.hero_container.x = tea_hero.hero_container.x + 100;
            hero_arr.push(tea_hero);
            con_hero.addChild(tea_hero.hero_container);
            con_bg.addChild(con_hero);

            /**
             *  初始化用户形象
            */

            if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == "stu") {
                user = new __WEBPACK_IMPORTED_MODULE_8__user__["a" /* User */]({
                    container: con_user,
                    x: 1140 * 1.5,
                    y: 600 * 1.5,
                    userInfo: __WEBPACK_IMPORTED_MODULE_3__pathJson__["b" /* userJson */]

                });
                user.callback = function (e) {
                    console.log('我被点击了', e);
                };
                // if (classConf.user.type == "tea") {
                //     user.setDisabled(false);
                // }
                window.gameUser = user;
            }

            /**
             * 创建音频
            */

            __WEBPACK_IMPORTED_MODULE_5__course__["a" /* h5_course */].buildCourseAudio(__WEBPACK_IMPORTED_MODULE_3__pathJson__["c" /* h5courseAudio */]);

            /**
             * 装备栏初始化装备
            */

            if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == "stu") {
                __WEBPACK_IMPORTED_MODULE_3__pathJson__["d" /* equipmentJson */].forEach(function (value, index) {
                    if (!value.info.getState) {} else {}
                    var equipment_error = new __WEBPACK_IMPORTED_MODULE_7__equipment__["a" /* Equipment */]({
                        id: value.id,
                        image: images[value.imageError],
                        x: (120 * index + 100) * 1.5,
                        y: 650 * 1.5
                    });
                    // if (classConf.user.type == "tea") {
                    //     equipment_error.setDisabled(false);
                    // }
                    equipment_error.bitmap.name = value.name;
                    con_equip.addChild(equipment_error.bitmap);
                    equipments.push(equipment_error);
                });
            }

            bg_width = con_bg.getBounds().width;

            /**
             * 控制背景图移动
            */

            window.game_bg = container.getChildByName("container_bg");

            /**
             * 向左按钮
            */

            btnLeft = new __WEBPACK_IMPORTED_MODULE_11__btn__["a" /* Btn */]({
                image: images['left'],
                x: 50,
                y: 50
            });

            btnLeft.bind("click", function () {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__animate__["a" /* changeStyle */])(btnLeft.bitmap, 'bigToSmall');
                var clickFlag = true;
                if (window.bg_position_left >= 40) {
                    window.bg_position_left -= 40;
                    clickFlag = true;
                } else {
                    clickFlag = false;
                }
                if (clickFlag) {
                    if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == "stu") {
                        window.game_bg.x = -window.bg_position_left;
                    } else {
                        var posMsg = __WEBPACK_IMPORTED_MODULE_1__sendOrReceive__["a" /* sendOrReceive */].buildStatusData({
                            type: 'bgMove',
                            key: 'bgMove',
                            value: {
                                x: window.bg_position_left,
                                y: 0
                            }

                        });
                        __WEBPACK_IMPORTED_MODULE_1__sendOrReceive__["a" /* sendOrReceive */].addSendMessage(posMsg);
                    }
                }
            });

            con_btn.addChild(btnLeft.bitmap);

            /**
             * 向右按钮
            */

            btnRight = new __WEBPACK_IMPORTED_MODULE_11__btn__["a" /* Btn */]({
                image: images['right'],
                x: 150,
                y: 50
            });
            btnRight.bind("click", function () {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__animate__["a" /* changeStyle */])(btnRight.bitmap, 'bigToSmall');
                var clickFlag = true;
                if (window.bg_position_left <= bg_width - stage.canvas.width - 40) {
                    window.bg_position_left += 40;
                    clickFlag = true;
                } else {
                    clickFlag = false;
                }
                if (clickFlag) {
                    if (__WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == "stu") {
                        window.game_bg.x = -window.bg_position_left;
                    } else {
                        var posMsg = __WEBPACK_IMPORTED_MODULE_1__sendOrReceive__["a" /* sendOrReceive */].buildStatusData({
                            type: 'bgMove',
                            key: 'bgMove',
                            value: {
                                x: window.bg_position_left,
                                y: 0
                            }

                        });
                        __WEBPACK_IMPORTED_MODULE_1__sendOrReceive__["a" /* sendOrReceive */].addSendMessage(posMsg);
                    }
                }
            });
            con_btn.addChild(btnRight.bitmap);

            window.conBtn = con_btn;

            /**
             * 加载其余背景图片
            */

            loadBgImg(otherBgImg[thisBgIndex].src);

            /**
             * 真正的功能开始
            */

            callback();
        }

        /**
         * 加载单张背景图片
        */
        function loadBgImg(imgSrc) {
            var image = new Image();
            image.src = imgSrc;
            image.onload = function (event) {
                var game_bg = __WEBPACK_IMPORTED_MODULE_2__common__["a" /* common */].setBg({
                    images: imgSrc,
                    x: con_bgImg.getBounds().width,
                    y: 0
                });
                con_bgImg.addChild(game_bg);
                bg_width = con_bg.getBounds().width;
                if (thisBgIndex < otherBgImg.length - 1) {
                    thisBgIndex++;
                    loadBgImg(otherBgImg[thisBgIndex].src);
                }
            };
        }

        /**
         * 跟新舞台
        */
        function stageBreakHandler() {
            stage.update();
        }
    }
};

window.equipments = equipments;
window.heroArr = hero_arr;
window.cards = cards;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Btn; });

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
    if (flag) {
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



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Card; });
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
    this.bitmap.setAnimate = function (remove) {
        createjs.Tween.get(self.bitmap, { loop: true }, { override: remove }).to({
            scaleX: 1.6,
            scaleY: 1.6
        }, 1000).to({
            scaleX: 1.5,
            scaleY: 1.5
        }, 1000);
    };
}

Card.prototype.bind = function (method, callback) {
    this.bitmap.addEventListener(method, function (e) {
        e.stopPropagation();
        callback(e);
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



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Equipment; });
/**
 * 绘制装备
 */
function Equipment(obj) {
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
    if (flag) {
        this.bitmap.alpha = 1;
    } else {
        this.bitmap.alpha = 0.5;
    }
};

Equipment.prototype.setDisabled = function (flag) {
    if (flag) {
        this.bitmap.visible = true;
    } else {
        this.bitmap.visible = false;
    }
};

Equipment.prototype.init = function () {};

Equipment.prototype.bind = function () {
    this.bitmap.addEventListener('click', function (e) {
        e.stopPropagation();
    });
};



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Hero; });
//移动的精灵对象：闯关英雄
function Hero(count, img, height, width, left, top, userInfo) {
	this.userInfo = userInfo;

	this.hero_container = new createjs.Container();
	this.hero_container.x = 10;
	this.hero_container.y = 100;
	this.hero_container.scaleY = 1.5;
	this.hero_container.scaleX = 1.5;
	this.hero_container.visible = false;

	var self = this;

	//加载图片
	var image = new Image();
	image.src = this.userInfo.userImg;
	image.onload = function () {
		self.bitmap = new createjs.Bitmap(self.userInfo.userImg);
		self.bitmap.x = left;
		self.bitmap.y = top - 110;
		self.hero_container.addChild(self.bitmap);
	};

	this.spriteSheet = new createjs.SpriteSheet({
		"animations": {
			"run": [0, count - 1, "run", 0.5],
			"stop": [count - 1]
		},
		"images": [img],
		"frames": {
			//单个帧的高度，宽度，就是png图片里面那么多个帧一个帧的大小
			"height": height,
			"width": width,
			//相对于原始偏移的位置
			"regX": 0,
			"regY": 0,
			//帧数
			"count": count
		}
	});
	this.sprite = new createjs.Sprite(this.spriteSheet);
	this.sprite.x = left + 30;
	this.sprite.y = top;
	this.hero_container.addChild(this.sprite);

	this.sprite.addEventListener('click', function (e) {
		e.stopPropagation();
	});
}

Hero.prototype.setVisible = function (flag) {
	this.hero_container.visible = flag;
	// this.sprite.visible = flag;
};



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_index_less__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logicDataEnter__ = __webpack_require__(7);


//调用开始  模拟客户端发数据
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logicDataEnter__["a" /* loadComm */])();

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return courseResult; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classConf__ = __webpack_require__(0);
/**
 * Created by shaoyongkai on 2017/3/24.
 * add isReportFlag 当前是否上报过数据
 */


// import { dataReport } from "./h5course_report";
/**
 ** 结果模块
 * add rankResultList 榜单结果
 **/
var courseResult = {
    classConf: __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */],
    resultData: {},
    position: 0,
    createResult: function createResult() {
        var members = this.classConf.appointMemberList;
        var h5_course_result = $('#h5_course_result');

        var lis = '';
        if (members) {
            members.forEach(function (item, i) {
                if (item.role == 'stu') {
                    lis += '<li class="flex un-complete">\n                                <div class="flex-content-l"></div>\n                                <div class="flex-content-r">' + item.name + '</div>\n                                <div class="flex-content-f"></div>\n                            </li>';
                }
            });
        }
        var str = '<div class="banner">Result<span class="switch"></span></div>\n                    <div class="names">\n                        <div class="names-banner flex">\n                            <div class="flex-content-l">status</div>\n                            <div class="flex-content-r">name</div>\n                            <div class="flex-content-f">feedback</div>\n                        </div>\n                        <ul class="names-box">' + lis + '</ul>\n                    </div>';
        h5_course_result.html(str);

        this.initResultData();
        this.bindEvents();
    },

    bindEvents: function bindEvents() {
        var h5_course_result = $('#h5_course_result');
        h5_course_result.on('click', '.switch', function (e) {
            e.stopPropagation();
            h5_course_result.toggleClass('open');
        });
        h5_course_result.drag();
    },

    initResultData: function initResultData() {
        var members = this.classConf.appointMemberList;
        this.position = 0;
        var self = this;
        if (members) {
            members.forEach(function (item) {
                if (item.role == 'stu') {
                    self.resultData[item.uid] = {
                        uid: item.uid,
                        name: item.name,
                        isRight: '',
                        errorCount: 0,
                        position: 0,
                        scoreText: ''
                    };
                }
            });
        }
    },

    refreshResultData: function refreshResultData(uid, bol) {
        this.resultData[uid].isRight = bol;
        if (bol == false) {
            this.resultData[uid].errorCount = this.resultData[uid].errorCount + 1;
        } else {
            this.position = this.position + 1;
            this.resultData[uid].position = this.position;
        }
    },

    /**
     * 功能说明：
     * 1、先进行，正确，错误，未答题的用户分组
     * 2、按照错误次数排序 错误次数相同 按照正确顺序排序
     * 3、错误的用户暂不细分
     */
    renderResultList: function renderResultList() {
        // let self = this;

        var statics = {
            right: [],
            wrong: [],
            unComplete: []
        };

        var resultData = this.resultData;
        var resultDataArr = [];

        for (var key in resultData) {
            resultDataArr.push(resultData[key]);
        }

        resultDataArr.forEach(function (item) {
            if (item.isRight === true) {
                statics.right.push(item);
            } else if (item.isRight === false) {
                statics.wrong.push(item);
            } else {
                statics.unComplete.push(item);
            }
        });

        statics.right.sort(function (a, b) {
            if (a.errorCount == b.errorCount) {
                return a.position - b.position;
            } else {
                return a.errorCount - b.errorCount;
            }
        });

        var reNewStatics = statics.right.concat(statics.wrong, statics.unComplete);

        reNewStatics.forEach(function (item, i) {
            var liEle = $('#h5_course_result .names-box li').eq(i);
            liEle.removeClass();
            if (item.isRight === true) {
                liEle.addClass('flex show-result-right');
                if (item.errorCount == 0) {
                    liEle.addClass('num' + (i + 1));
                    /*if(i == 0) {
                        self.rankResultList.push(item);
                    }*/
                }
            } else if (item.isRight === false) {
                liEle.addClass('flex show-result-wrong');
            } else {
                liEle.addClass('flex un-complete');
            }
            liEle.find('.flex-content-r').text(item.name);
            //添加语音分数
            liEle.find('.flex-content-f').text(item.scoreText);
        });
    },

    showResult: function showResult(message) {
        var sendUserInfo = message.data[0].value.sendUserInfo;
        var resultData = message.data[0].value.syncAction.resultData;

        //答对以后不再更新结果
        if (this.resultData[sendUserInfo.id].isRight == true) {
            return;
        }
        this.refreshResultData(sendUserInfo.id, resultData.isRight);
        this.renderResultList();

        //调用模板上报数据
        /*if(message.operate == '1') { //表示课中操作
            if(this.rankResultList.length == 1 && this.isReportFlag == 0) {
                this.isReportFlag = 1;
                dataReport.reportBigData('rank', JSON.stringify(this.rankResultList));
            }
        }*/
    },

    /**
     * 重置相应用户的得分
     */
    refreshScoreData: function refreshScoreData(uid, scoreText) {
        this.resultData[uid].scoreText = scoreText;
    },

    /**
     * 显示语音结果
     */
    showRecordResult: function showRecordResult(message) {
        console.log('showRecordResult', message);
        var sendUser = message.data[0].value.sendUser;
        var result = message.data[0].value.result;
        //显示结果
        this.refreshScoreData(sendUser, result);
        this.renderResultList();
    },

    resetResult: function resetResult() {
        $('#h5_course_result').addClass('open hide');
        // this.rankResultList = [];
        // this.isReportFlag = 0;
        this.initResultData();
        this.renderResultList();
    }
};



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return screenAc; });
/**
 * Created by shaoyongkai on 2017/3/24.
 */

/**
 ** AC屏幕变化
 **/
var screenAc = {

    addStuScreen: function addStuScreen(param) {
        var z = '';
        z += '<div id="j_screen_' + param.uid + '" class="screen hidden" user_state="out" user_id="' + param.uid + '" user_type="' + param.role + '">';
        z += '<iframe class="frame_control frame" load_status="0" user_type="' + param.role + '" user_id="' + param.uid + '" role="' + param.uid + '" src="" scrolling="no"></iframe>';
        z += '<div id="j_screen_draw_' + param.uid + '" class="fadeIn animated screen-draw-box hide" course_draw="j_draw_' + param.uid + '"></div>';
        z += '<div class="frame-mask" ></div>';
        z += '<div class="name" >' + param.name + '</div>';
        z += '<button class="view">single-window</button>';
        z += '</div>';

        var screen = $('.screen');
        var count = $('#j_screen_' + param.uid).length;
        if (count == 0) {
            $('#h5_course_stu_screens').append(z);
        }
    },

    showUserScreen: function showUserScreen(uid) {
        $('#j_screen_' + uid).attr('user_state', 'in').removeClass('hidden');
    },

    hideUserScreen: function hideUserScreen(uid) {
        $('#j_screen_' + uid).attr('user_state', 'out').addClass('hidden');
    },

    /**
     * 控制四格中的元素根据用户角色
     * @param userType
     */
    initScreensByUser: function initScreensByUser(userType) {
        if (userType == 'stu') {
            var screens = $('#h5_course_stu_screens');
            var screenPrevBtn = $('#h5_course_screen_prev');
            var screenNextBtn = $('#h5_course_screen_next');
            var screen_pages = $('#h5_course_screen_pages');
            screens.find('.view').remove();
            screenPrevBtn.remove();
            screenNextBtn.remove();
            screen_pages.remove();
        }
    }
};



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });

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
    this.callback = function () {};
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

User.prototype.setDisabled = function (flag) {
    if (flag) {
        this.container.alpha = 1;
    } else {
        this.container.alpha = 0;
    }
};



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return view; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classConf__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(1);
/**
 * Created by shaoyongkai on 2018/2/11.
 * 说明：
 *      视图模块
 *      根据数据池的数据决定当前课程的外观展示方式
 *      比如工具条展示，处理特色课程外观等
 */




var view = {
    //初始化入口
    init: function init() {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('view init');
        var tpl = "\n            <a id=\"h5_course_close_btn\" href=\"javascript:void(0)\" class=\"close_btn\"></a>\n            <div class=\"h5_course_main\">\n                <!-- \u753B\u677F -->\n                <div id=\"h5_course_draw\" class=\"fadeIn animated draw-box hide\" course_draw=\"j_draw_" + __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.id + "\"></div>\n                <!-- \u753B\u677F -->\n                <!-- h5course sync screen content -->\n                <iframe id=\"h5_course_self_frame\" frame_load_status=\"0\" class=\"frame_control main_frame\" src=\"\" width=\"100%\" height=\"100%\" scrolling=\"no\" user_id=\"" + __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.id + "\" user_type=\"" + __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type + "\" role=\"" + __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.id + "\"></iframe>\n                <div id=\"h5_course_stu_screens\" class=\"screens hidden\"></div>\n                <a id=\"h5_course_screen_prev\" class=\" btn-screen-prev disabled hide\"></a>\n                <a id=\"h5_course_screen_next\" class=\" btn-screen-next hide\"></a>\n                <ol id=\"h5_course_screen_pages\" class=\"h5_course_screen_pages hide\"></ol>\n                <!-- h5course sync screen content -->\n                \n            </div>\n            \n            <!-- h5course sync result -->\n            <div id=\"h5_course_result\" class=\"result open hide\">\n\n            </div>\n\n            <div id=\"h5_course_footer_st\" class=\"h5_course_footer hide\">\n\n                <div id=\"h5_pager_box\" class=\"h5_pager_box\">\n                    <a id=\"h5_course_page_prev\" class=\"btn btn-page-prev disabled\"><i class=\"rect\"></i></a>\n                    <a id=\"h5_course_page_next\" class=\"btn btn-page-next\"><i class=\"rect rect-right\"></i></a>\n                </div>\n\n                <div class=\"h5_btn_box hide\">\n                    <button class=\"btn btn-authorize\" id=\"h5_btn_practice\">authorize</button>\n                    <button id=\"h5_btn_showStu\" class=\"btn showStuButton\">four-windows</button>\n                    <button class=\"btn btn_course_ensure\" id=\"h5_course_page_ensure\">complete</button>\n                    <button id=\"h5_btn_star_close\" class=\"btn hide\">close star</button>\n                </div>\n\n                <!-- h5course tools -->\n                <div id=\"h5_tool_box\" class=\"h5_tool_box\">\n                    <!-- \u5DE5\u5177 -->\n                    <div id=\"h5_course_tool\" class=\"h5_course_tool\">\n                        <div class=\"btn-tool hide\" title=\"Active tools\" data-func=\"bind\"><span class=\"bind\"></span></div>\n                        <div class=\"btn-tool disabled hide\" title=\"Text\" data-func=\"text\"><span class=\"text\"></span></div>\n                        <div class=\"btn-tool disabled hide\" title=\"Active tools\" data-func=\"pencil\"><span class=\"pencil\"></span></div>\n                        <div class=\"btn-tool disabled hide\" title=\"Rectangle\" data-func=\"rect\"><span class=\"rectangle\"></span></div>\n                        <div class=\"btn-tool disabled hide\" title=\"Highlighter\" data-func=\"highPencil\"><span class=\"highlighter\"></span></div>\n                        <div class=\"btn-tool disabled hide\" title=\"Rubber\" data-func=\"rubberOld\"><span class=\"rubber\"></span></div>\n                        <div class=\"btn-tool disabled hide\" title=\"Delete\" data-func=\"clear\"><span class=\"delete\"></span></div>\n                        <div class=\"btn-tool disabled hide\" title=\"Move\" data-func=\"draft\"><span class=\"move\"></span></div>\n                        <div class=\"btn-tool disabled hide\" title=\"Authorize\" data-func=\"authorize\"><span class=\"authorize\"></span></div>\n                    </div>\n                    <!-- \u5DE5\u5177 -->\n                </div>\n\n            </div>\n            \n            <!-- \u4E0D\u540C\u89D2\u8272\u5BF9\u5E94footer -->\n            <div id=\"h5_course_footer_cc\" class=\"h5_course_footer hide\">\n                <div class=\"intro\">i am cc</div>\n            </div>\n            <div id=\"h5_course_footer_CRIT\" class=\"h5_course_footer hide\">\n                <div class=\"intro\">i am CRIT</div>\n            </div>\n            <div id=\"h5_course_footer_tutor\" class=\"h5_course_footer hide\">\n                <div class=\"intro\">i am tutor</div>\n            </div>\n            <div id=\"h5_course_footer_anonymous\" class=\"h5_course_footer hide\">\n                <div class=\"intro\">i am anonymous</div>\n            </div>\n            <div id=\"h5_course_footer_unKnow\" class=\"h5_course_footer hide\">\n                <div class=\"intro\">i am unKnow</div>\n            </div>\n            <!-- \u4E0D\u540C\u89D2\u8272\u5BF9\u5E94footer -->\n                \n        ";
        $('#h5_course_part').html(tpl);
        this.showFooterByUserType();
        __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].viewSet.tools && this.showTools();
    },

    showTools: function showTools() {
        __WEBPACK_IMPORTED_MODULE_1__common__["a" /* common */].logPrint('show tools');

        var isTea = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type && __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type == 'tea';

        var _loop = function _loop(key) {
            __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].viewSet.tools[key] && function () {
                $('.btn-tool[data-func=' + key + ']').removeClass('hide');
            }();
        };

        for (var key in __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].viewSet.commonTools) {
            _loop(key);
        }
        if (isTea) {
            var _loop2 = function _loop2(key) {
                __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].viewSet.tools[key] && function () {
                    $('.btn-tool[data-func=' + key + ']').removeClass('hide');
                }();
            };

            for (var key in __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].viewSet.teaTools) {
                _loop2(key);
            }
        }
    },

    showFooterByUserType: function showFooterByUserType() {
        var userType = __WEBPACK_IMPORTED_MODULE_0__classConf__["a" /* classConf */].user.type;
        if (userType == 'tea') {
            $('#h5_course_footer_st').removeClass('hide').siblings('.h5_course_footer').remove();
        } else if (userType == 'stu') {
            $('#h5_course_footer_st').removeClass('hide').siblings('.h5_course_footer').remove();
        } else {
            $('#h5_course_footer_' + userType).removeClass('hide').siblings('.h5_course_footer').remove();
        }
    }

};



/***/ })
],[16]);