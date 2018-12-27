import { classConf } from "./classConf";
import { common } from "./common";
import { h5_course } from "./course";
import { courseResult } from "./result";
import { eventBind } from "./aEvent";
import { screenAc } from "./screens";


let syncActions = {
    isSync: true,
    whiteboards: {},
    isShowTea: '0',
    isShowOneStu: '0',
    currentPage: common.toInt(classConf.h5Course.localPage),
    nowWBTar: null, //工具条对象
    localIdNum: 0,
    isComplete: '0',
    severType: classConf.course.switchMsgLine,
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

    createStudentsScreens: function () {
        let appointMemberList = classConf.appointMemberList;
        let currentUser = classConf.user;
        if (currentUser.type == 'stu') {

        } else {
            if (appointMemberList && appointMemberList.length > 0) {

                appointMemberList.forEach(function (item) {
                    if (item.role == 'tea') {

                    } else {
                        screenAc.addStuScreen({
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
    buildScreenPages: function () {
        let screens = $('#h5_course_stu_screens .screen');
        let screen_pages = $('#h5_course_screen_pages');
        let countNum = screens.length;
        let screenPageSize = common.toInt(classConf.h5Course.screenPageSize);
        let numStr = '<li class="num active">1</li>';
        if (countNum % screenPageSize == 0) {
            countNum = countNum / screenPageSize;
        } else {
            countNum = common.toInt(countNum / screenPageSize) + 1;
        }
        for (let i = 2; i <= countNum; i++) {
            numStr += `<li class="num">${i}</li>`;
        }
        screen_pages.html(numStr);
    },

    createResultPanel: function () {
        //add: 老师端显示结果列表
        if (classConf.user.type == 'tea') {
            courseResult.createResult();
        }
    },

    /**
     * 构建学生端结果列表
     */
    createResultStuPanel: function () {
        if (classConf.user.type == 'stu') {
            // courseResultStu.createResult();
        }
    },

    showStuButtonAndPracticeButton: function () {
        let userType = classConf.user.type;
        let practiceButton = $('#h5_btn_practice');
        let showStuButton = $('#h5_btn_showStu');
        let shareFourButton = $('#h5_btn_share_four');
        let shareSingleButton = $('#h5_btn_share_single');
        let completeButton = $('#h5_course_page_ensure');
        let starBtn = $('#h5_btn_star_open');
        if (userType === 'stu') {
            practiceButton.remove();
            showStuButton.remove();
            shareFourButton.remove();
            shareSingleButton.remove();
            completeButton.remove();
            starBtn.remove();
        } else if (userType === 'tea') {

        }
    },

    isResultPage: function (obj) {
        common.logPrint('isResultPage', obj);
        let user = classConf.user;
        let h5_course_result = $('#h5_course_result');
        if (obj) {
            if (user.type == 'tea') {
                h5_course_result.removeClass('hide');
            } else if (user.type == 'stu') {

            } else {
                h5_course_result.removeClass('hide');
            }
        } else {
            h5_course_result.addClass('hide');
        }
    },

    /**
     * 是否显示结果
     */
    isPracticePage: function (obj) {
        common.logPrint('isPracticePage', obj);
        let practiceButton = $('#h5_btn_practice');
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
    isCreateTg: function (flag, html) {
        common.logPrint('isCreateTg', flag);
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
    initDrawBoxSize: function () {
        common.logPrint('initDrawBoxSize');
        let self_frame = $('#h5_course_self_frame');
        let draw_box = $('#h5_course_draw');

        let frameWidth = self_frame.width();
        let frameHeight = self_frame.height();
        let getPageFontSize = common.getPageFontSize(frameWidth, frameHeight);
        let c_page_width = 19.2 * getPageFontSize;
        let c_page_height = 10.8 * getPageFontSize;
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
    updateRootAndSetPageEnable: function () {
        // 学生老师隐藏关闭按钮
        let closeBtn = $('#h5_course_close_btn');
        closeBtn.addClass('hide');

        if (classConf.user.type == 'tea') {
            classConf.h5Course.isRoot = true;
            //老师可翻页
            this.setPageEnable(true);
            // window.con_btn.alpha = 1;
        } else if (classConf.user.type == 'stu') {
            classConf.h5Course.isRoot = false;
            //学生不可翻页
            this.setPageEnable(false);
        } else {

        }
    },

    /**
     * 翻页是否可用
     */
    setPageEnable: function (pager) {
        let pagerBox = $('#h5_pager_box .btn');
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
    shareSingle: function () {
        common.logPrint('shareSingle');
        let screenId = $('.fullShow').attr('id');
        if (this.isShareSingle == '0') {
            window.H5SDK.sendDataToClient.gSetData({
                CID: classConf.course.id,
                operate: '1',
                data: [{
                    key: 'shareSingle',
                    value: '1#' + screenId,
                    ownerUID: classConf.user.id
                }]
            });
            window.H5SDK.EventQueue.addEventQueue({
                type: 'shareSingle',
                CID: classConf.course.id,
                operate: '1',
                data: [{
                    key: 'shareSingle',
                    value: '1#' + screenId,
                    ownerUID: classConf.user.id
                }]
            });
        } else if (this.isShareSingle == '1') {
            window.H5SDK.sendDataToClient.gSetData({
                CID: classConf.course.id,
                operate: '1',
                data: [{
                    key: 'shareSingle',
                    value: '0#' + screenId,
                    ownerUID: classConf.user.id
                }]
            });
            window.H5SDK.EventQueue.addEventQueue({
                type: 'shareSingle',
                CID: classConf.course.id,
                operate: '1',
                data: [{
                    key: 'shareSingle',
                    value: '0#' + screenId,
                    ownerUID: classConf.user.id
                }]
            });
        } else {

        }
    },


    /**
     * 点击open star
    */
    openStarPage: function (status) {
        let self_frame = $("#h5_course_star_frame");
        let h5_course_star_page = $("#h5_course_star_page");
        let h5_btn_star_open = $('#h5_btn_star_open');

        if (status == '1') {
            h5_btn_star_open.attr('data-status', '1');

            self_frame.attr('src', classConf.h5Course.starSrc);
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

    handlePractice: function () {
        common.logPrint('handlePractice');
        let practiceButton = $('#h5_btn_practice');
        practiceButton.addClass('hide');

        // let sendMsg = sendOrReceive.buildStatusData({
        //     operate: '1',
        //     classStatus: '2'
        // }, 'practice');

        let sendMsg = sendOrReceive.buildStatusData({
            type: 'practice',
            key: 'classStatus',
            value: {
                currentPage: common.toString(classConf.h5Course.course_localPage),
                classStatus: '2'
            }
        });
        sendOrReceive.addSendMessage(sendMsg);
    },

    /**
     * 显示四格窗口
    */
    showStuWindow: function () {
        if (this.isShowTea == '0') {

            let msgData = sendOrReceive.buildStatusData({
                type: 'showStuWindow',
                key: 'showStuWindow',
                value: '1'
            });

            window.EventQueue.addEventQueue(msgData);

        } else if (this.isShowTea == '1') {

            let msgData = sendOrReceive.buildStatusData({
                type: 'showStuWindow',
                key: 'showStuWindow',
                value: '0'
            });

            window.EventQueue.addEventQueue(msgData);

            //删除单例
            if (this.isShowOneStu == '1') {
                let full_screen_id = $(".fullShow").attr('id');

                let msgData = sendOrReceive.buildStatusData({
                    type: 'showSingleStuWindow',
                    key: 'showSingleStuWindow',
                    value: '0#' + full_screen_id
                });

                window.EventQueue.addEventQueue(msgData);
            }

        } else {

        }
    },

    /**
     * 查看单个学生窗口
     */
    seeStuWindow: function (screenId) {
        if (this.isShowOneStu == '0') {
            window.EventQueue.addEventQueue({
                type: 'showSingleStuWindow',
                CID: classConf.course.id,
                operate: '1',
                data: [{
                    key: 'showSingleStuWindow',
                    value: '1#' + screenId,
                    ownerUID: classConf.user.id
                }]
            });
        } else if (this.isShowOneStu == '1') {
            window.EventQueue.addEventQueue({
                type: 'showSingleStuWindow',
                CID: classConf.course.id,
                operate: '1',
                data: [{
                    key: 'showSingleStuWindow',
                    value: '0#' + screenId,
                    ownerUID: classConf.user.id
                }]
            });
        }
    },

    /**
     * 重置画板大小
     */
    resetScreenDraw: function (screenId) {
        let screen_frame = $('#' + screenId + ' .frame');
        let self = this;
        let screen_ratio = 1920 / 1080;
        let user_id = screen_frame.attr('user_id');
        let screen_c_page_width = screen_frame.width();
        let screen_c_page_height = screen_frame.width() / screen_ratio;
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
    coursePrize: function (operate) {
        var self = this;

        $('#mask').addClass('mask-full');

        if (operate == '1') {
            $('#h5_course_part').addClass('zoomOut');
            $("#h5_course_prizes_shade").removeClass('hide');
            $("#h5_course_prizes").removeClass('hide');
            h5_course.playSound("showCup");
            setTimeout(function () {
                $('#h5_course_part').removeClass('zoomOut').addClass('hide');
                $("#h5_course_prizes").addClass('zoomOut');
                setTimeout(function () {
                    $("#h5_course_prizes_shade").addClass('hide');
                    $("#h5_course_prizes").removeClass('zoomOut').addClass('hide');
                    h5_course.updateCardEquip();
                }, 500);
            }, 4000);
        } else {
            if (this.cardComplete == classConf.h5Course.course_card_id) {
                $('#h5_course_part').addClass('hide');
                $("#h5_course_prizes_shade").addClass('hide');
                $("#h5_course_prizes").addClass('hide');
                h5_course.updateCardEquip();
            }
        }
    },

    sendResultToStu: function (message) {
        let resultMessageValue = message.data[0].value;
        resultMessageValue.type = 'resultSyncStu';
        this.localIdNum = this.localIdNum + 1;
        window.H5SDK.sendDataToClient.clAddData({
            CID: classConf.course.id,
            textBookID: '1',
            textBookType: '1',
            page: common.toString(classConf.h5Course.localPage),
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
    screenPaging: function (type, currentPage) {
        let userType = classConf.user.type;
        let screenPrevBtn = $('#h5_course_screen_prev');
        let screenNextBtn = $('#h5_course_screen_next');
        let temPage = common.toInt(classConf.h5Course.screenLocalPage);
        let screens = $('#h5_course_stu_screens .screen');
        let countNum = screens.length; //记录数
        let screenPageSize = common.toInt(classConf.h5Course.screenPageSize);
        let screenPageCount = Math.ceil(countNum / screenPageSize);//计算出总共页数
        let isSend = false;
        //根据不同的type结合不同的权限设置数据
        switch (type) {
            case 'prev':
                temPage = common.toInt(classConf.h5Course.screenLocalPage) - 1;
                temPage = (temPage > 0) ? temPage : temPage + 1;
                classConf.h5Course.screenLocalPage = temPage;
                isSend = true;
                break;
            case 'next':
                temPage = common.toInt(classConf.h5Course.screenLocalPage) + 1;
                temPage = (temPage <= screenPageCount) ? temPage : temPage - 1;
                classConf.h5Course.screenLocalPage = temPage;
                isSend = true;
                break;
            case 'set':
                classConf.h5Course.screenLocalPage = common.toInt(currentPage);
                temPage = common.toInt(currentPage);
                isSend = false;
                break;
            case 'go':
                classConf.h5Course.screenLocalPage = common.toInt(currentPage);
                temPage = common.toInt(currentPage);
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
        for (let i = (temPage - 1) * screenPageSize; i < screenPageSize * temPage; i++) {
            let screen_item = screens.eq(i);
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
    sendStarData: function (message) {
        let sendUser = message.data[0].value.sendUser;

        let resultData = message.data[0].value.syncAction.resultData;

        if (resultData.isRight == true) {
            window.H5SDK.sendDataToClient.starData({
                type: 'notify',
                CID: classConf.course.id,
                value: {
                    starType: '0', // 0:个人 1：组
                    starAdd: '1',//预留
                    senderID: '',//发送者id
                    receivers: [sendUser],
                    witnesses: [sendUser]
                }
            });
        }

    },

    /**
     * 海岛是否可点击
     */
    setCardDisable: function (msgValue) {
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
    setHeroPosition: function (msgValue) {
        let count = msgValue.cardData.path.length;
        let path = msgValue.cardData.path[count - 1];
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
    goWayByPath: function (heroArr, message, callback) {
        let runCount = 0;
        var cardData = message.cardData
        heroArr.forEach(function (item, index) {
            // item(某一个hero对象)
            item.sprite.gotoAndPlay("run");
            let hero_teen = createjs.Tween.get(item.hero_container);

            cardData.path.forEach(function (value) {
                let path_x = value.x;
                let path_y = value.y;

                if (item.userInfo.role == 'tea') {
                    path_x = path_x + 100;
                } else {
                    path_x = path_x;
                }

                let paths = {
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
    handleWbTools: function (currentTarget) {
        // let toolBox = $('#h5_course_draw');
        let funcName = currentTarget.attr('data-func');
        // let screen_draws = $('#h5_course_stu_screens .screen-draw-box');
        let bindBtn = $('.btn-tool[data-func="bind"]');
        // let btnTool = $('.btn-tool:not([data-func="bind"])');

        if (currentTarget.hasClass('disabled')) {

        } else {
            //bind和authorize做特殊处理
            if (funcName == 'bind') {
                if (currentTarget.hasClass('selected')) { // 白板显示状态
                    let sendMsg = sendOrReceive.buildStatusData({
                        type: 'showWB',
                        key: 'showWB',
                        value: {
                            status:'0'
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

                    let sendMsg = sendOrReceive.buildStatusData({
                        type: 'showWB',
                        key: 'showWB',
                        value: {
                            status:'1'
                        }
                    });
                    sendOrReceive.addSendMessage(sendMsg);
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

                    let sendMsg = sendOrReceive.buildStatusData({
                        type: 'openWbToolAuthority',
                        key: 'openWbToolAuthority',
                        value: {
                            status: '0'
                        }
                    });
                    sendOrReceive.addSendMessage(sendMsg);
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
                        let sendMsg = sendOrReceive.buildStatusData({
                            type: 'openWbToolAuthority',
                            key: 'openWbToolAuthority',
                            value: {
                                status:'1'
                            }
                        });
                        sendOrReceive.addSendMessage(sendMsg);
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
    handleTool: function (funcName) {
        let btnTool = $('.btn-tool:not([data-func="bind"]):not([data-func="authorize"])');
        let curBtn = $('.btn-tool[data-func="' + funcName + '"]');
        common.logPrint('handleTool', funcName);
        btnTool.removeClass('selected');
        curBtn.addClass('selected');
        this.toolDrawFunc(funcName);
    },

    /**
     * 构建工具条配置
     */
    buildToolBar: function () {
        let currentUser = classConf.user;
        let self = this;
        //首先获取配置数据
        let conConf = window.WBSDK.createConf('const');
        let changeConf = window.WBSDK.createConf('change');

        let screen_draws = $('#h5_course_stu_screens .screen-draw-box');
        if (currentUser.type == 'stu') {
            changeConf.pauseDraw.state = true;
        }
        conConf.ownerID.value = classConf.user.id;
        conConf.isSVC.value = true;
        this.nowWBTar = window.WBSDK.bindWB('h5_course_draw', conConf, changeConf, handleToolCallback);
        //修改为构建多个画板
        screen_draws.each(function () {
            let draw_id = $(this).attr('id');
            let changeConfStu = window.WBSDK.createConf('change');
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
            if (type == 'add') { //delete edit clear
                if (obj != undefined) {
                    obj.value.receiveUser = classConf.user.id;
                    obj.value.sendUser = classConf.user.id;
                    obj.value.sendUserInfo = classConf.user;
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

                for (let drawItem in self.whiteboards) {
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
                for (let drawItem in self.whiteboards) {
                    self.whiteboards[drawItem].setData('3', [obj]);
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
                for (let drawItem in self.whiteboards) {
                    self.whiteboards[drawItem].setData('2', [obj]);
                }
            } else {

            }
        }
    },

    /**
     * 在画板上绘制 
    */
    toolDrawFunc: function (type) {
        common.logPrint('toolDrawFunc', type);
        let self = this;
        if (this.nowWBTar == null) {

        } else {
            this.nowWBTar.draw(type);
            //其他小画板同样的操作类型
            if (type == 'clear') {

            } else {
                for (let drawItem in self.whiteboards) {
                    self.whiteboards[drawItem].draw(type);
                }
            }
        }
    },

    /***
     * 所有相关工具条画板缩放
     */
    drawBoxResize: function () {
        let self = this;
        let screen_frames = $('#h5_course_stu_screens .frame');
        screen_frames.each(function () {
            let user_id = $(this).attr('user_id');
            let frameWidth = $(this).width();
            let frameHeight = $(this).height();
            let getPageFontSize = common.getPageFontSize(frameWidth, frameHeight);

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
    showWB: function (b) {
        let toolBox = $('#h5_course_draw');
        let bindBtn = $('.btn-tool[data-func="bind"]');
        let screen_draws = $('#h5_course_stu_screens .screen-draw-box');
        let btnTool = $('.btn-tool:not([data-func="bind"])');
        let userType = classConf.user.type;
        if (b) {
            $('#h5_course_draw').removeClass('hide');
            bindBtn.addClass('selected');
            screen_draws.removeClass('hide');
            btnTool.removeClass('disabled').addClass('fadeIn animated');
            toolBox.removeClass('hide');
            if (userType == 'tea') {
                $('#mask').css("z-index", "9")
            }
        } else {
            $('#h5_course_draw').addClass('hide');
            bindBtn.removeClass('selected');
            screen_draws.addClass('hide');
            btnTool.addClass('disabled').removeClass('fadeIn animated');
            toolBox.addClass('hide');
            if (userType == 'tea') {
                $('#mask').css("z-index", "10")
            }
        }
    },

    showWbTools: function () {
        let user = classConf.user;
        $('.btn-tool[data-func="pencil"]').addClass('selected');
        if (user.type == 'tea') {

        } else if (user.type == 'stu') {
            $('#h5_tool_box').addClass('hide');
        } else {

        }
    },

    OpenWbToolAuthority: function (b) {
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
    runClickCard: function (message) {
        common.logPrint('runClickCard', JSON.stringify(message));
        let self = this;

        var msgValue = message.data[0].value;
        var cardData = msgValue.cardData;
        let card = common.findCardById(window.cards, cardData.id);

        // window.thisCardId = message.id;

        classConf.h5Course.course_card_id = cardData.id;
        // console.log('-----------window.partId------------',window.partId)

        //关卡状态的变更
        for (var i = 0; i < window.cardsJson.length; i++) {
            window.con_card.getChildAt(i).canClick = false;
            createjs.Tween.removeTweens( window.con_card.getChildAt(i));
        }

        //显示当前关卡的教材内容
        h5_course.init(cardData.id);

        if (message.operate == '1') {
            // card.setScale();
            self.goWayByPath(window.heroArr, msgValue, function () {
                // if (message.operate != '5') {
                h5_course.coursePaging('go', '1');
                h5_course.courseShow();
                // } else {
                //     if (cardData.id != self.cardComplete) {
                //         h5_course.courseShow();
                //     }
                // }
                for (var i = 0; i < window.cardsJson.length; i++) {
                    window.con_card.getChildAt(i).alpha = 0.5;
                    createjs.Tween.removeTweens( window.con_card.getChildAt(i));
                }
                self.setCardDisable(msgValue);
            });
        } else {
            if (cardData.id != self.cardComplete) {
                h5_course.courseShow();
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
    runBgMove: function (message) {
        common.logPrint('runBgMove', JSON.stringify(message));
        let msgValue = message.data[0].value;
        window.bg_position_left = msgValue.x;
        window.game_bg.x = -msgValue.x;
        window.game_bg.y = -msgValue.y;
        window.EventQueue.setEventUnlocked();
    },

    /**
    * 进入游戏房间后下发数据
    */
    runIntoRoom: function (message) {
        common.logPrint('runIntoRoom', JSON.stringify(message));

        let state = message.state;
        let uid = message.uid;
        let currentUser = classConf.user;
        // let h5_course_tea_out = $('#h5_course_tea_out');

        uid.forEach(function (item) {
            let hero = common.findHeroById(window.heroArr, item);

            hero.setVisible(true);
            screenAc.showUserScreen(item);

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

   runOutRoom: function (message) {
        common.logPrint('runOutRoom', JSON.stringify(message));
        let state = message.state;
        let uid = message.uid;
        let hero = common.findHeroById(window.heroArr, uid);
        hero.setVisible(false);
        screenAc.hideUserScreen(uid);
    
   },


    /**
    * 首次进入教室初始化相应的视图逻辑
    */
    runFirstInto: function (message) {
        common.logPrint('runFirstInto', JSON.stringify(message));
        // if(message.operate!='5'){
            let msgData = sendOrReceive.buildStatusData({
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
                createjs.Tween.removeTweens( window.con_card.getChildAt(i));
            }
            window.con_card.getChildAt(0).setAnimate(false);
            window.con_card.getChildAt(0).alpha = 1;
            window.con_card.getChildAt(0).canClick = true;
            window.EventQueue.setEventUnlocked();
        // }
    },


    runNoUse: function (message) {
        common.logPrint('runNoUse', JSON.stringify(message));
        window.EventQueue.setEventUnlocked();
    },


    runStars: function (message) {
        common.logPrint('runStars', JSON.stringify(message));
        classConf.h5Course.starData = message;
        window.EventQueue.setEventUnlocked();
    },

    runShowWB: function (message) {
        common.logPrint('runShowWB', JSON.stringify(message));
        let showWBInfo = message.data[0];
        if (showWBInfo.value.status == '1') {
            this.showWB(true);
        } else if (showWBInfo.value.status == '0') {
            this.showWB(false);
        }
        window.EventQueue.setEventUnlocked();
    },

    runOpenWbToolAuthority: function (message) {
        common.logPrint('runOpenWbToolAuthority', JSON.stringify(message));
        let user = classConf.user;
        let authorityInfo = message.data[0];
        let authorizeBtn = $('.btn-tool[data-func="authorize"]');
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
                    common.tipStuAllow('draw');
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


    runWb: function (message) {
        /**
         1：Add
         2：Delete
         3：Edit
         4：Clear
         5：Syn
         */
        common.logPrint('runWb', JSON.stringify(message));
        let self = this;
        let user = classConf.user;
        if (message.operate == '1') {// 课中
            let boardID = message.data[0].value.boardID;
            let sendUser = message.data[0].value.sendUser;
            let sendUserInfo = message.data[0].value.sendUserInfo;
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
                        for (let drawItem in self.whiteboards) {
                            self.whiteboards[drawItem].setData(message.operate, message.data);
                        }
                    }
                }
            } else{
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
        } else if (message.operate == '5') {// 退出教室重新进入
            let boardID = message.data[0].value.boardID;
            let sendUser = message.data[0].value.sendUser;
            let sendUserInfo = message.data[0].value.sendUserInfo;
            if (sendUserInfo.type == 'tea') {
                self.nowWBTar.setData(message.operate, message.data);
                for (let drawItem in self.whiteboards) {
                    self.whiteboards[drawItem].setData(message.operate, message.data);
                }
            } else if (sendUserInfo.type == 'stu') {
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
            }
        } else {
            self.nowWBTar.setData(message.operate, message.data);
            for (let drawItem in self.whiteboards) {
                self.whiteboards[drawItem].setData(message.operate, message.data);
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


    runWbBack: function (message) {
        common.logPrint('runWbBack', JSON.stringify(message));
        let currentUser = classConf.user;
        if (message.data != null && message.data.length > 0) {
            let self = this;
            message.data.forEach((item) => {
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
                        for (let drawItem in self.whiteboards) {
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

    runCl: function (message) {
        //这里是不做处理的，原则上出现这种数据是不合法的，需要注意！
        console.warn('receive cl_data : %s', JSON.stringify(message));
    },

    runClBack: function (message) {
        common.logPrint('runClBack', JSON.stringify(message));
        window.EventQueue.setEventUnlocked();
    },

    runColorSet: function (message) {
        let self = this;
        if (message.color) {
            let temColor = '#' + message.color;
            classConf.h5Course.pencilColor = temColor;
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
            for (let drawItem in self.whiteboards) {
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
    runSync: function (message) {
        console.log("-----------runSync-----------------", message)
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
        let frames_loaded = $("iframe[frame_load_status='0']");
        let currentUser = classConf.user; //当前用户
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
            let classStatus = message.data[0].value.classStatus;

            let user = message.data[0].value.sendUserInfo; //指令发过来的用户

            //新的逻辑
            let otherScreens = $('#h5_course_stu_screens .frame_control');

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
    runResultSync: function (message) {
        common.logPrint('runResultSync', JSON.stringify(message));
        if (classConf.user.type == 'tea') {
            courseResult.showResult(message);
            //控制学生端榜单
            if (message.operate == '1') {
                // this.sendResultToStu(message);
                this.sendStarData(message);
            }
        } else if (classConf.user.type == 'stu') {
        } else {
            courseResult.showResult(message);
        }
        window.EventQueue.setEventUnlocked();
    },

    runResultSyncStu: function (message) {
        common.logPrint('runResultSyncStu', JSON.stringify(message));
        if (classConf.user.type == 'stu') {
            // courseResultStu.showResult(message);
        }
        window.EventQueue.setEventUnlocked();
    },

    /**
     * 上课状态
     */
    runStarting: function (message) {
        common.logPrint('runStarting', JSON.stringify(message));
        this.updateRootAndSetPageEnable();

        classConf.h5Course.classStatus = message.data[0].value.classStatus;

        if (classConf.user.type == 'tea') {
            common.closeMask();
        } else {
            common.showMask();
        }

        //重置结果
        courseResult.resetResult();
        // courseResultStu.resetResult();

        //不管什么情况 所有的人同步svc的页码
        // this.paging('set', classConf.h5Course.svcPage);


        window.EventQueue.setEventUnlocked();
    },

    /**
     * 授权练习
    */
    runPractice: function (message) {
        common.logPrint('runPractice', JSON.stringify(message));

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

        classConf.h5Course.classStatus = message.data[0].value.classStatus;

        if (classConf.user.type == 'tea') {
            $('#h5_btn_practice').addClass('hide');
            if (this.isShowTea == '0') {
                common.showMask();
            } else if (this.isShowTea == '1') {
                common.closeMask();
            } else {

            }
        } else {
            common.closeMask();
            if (message.operate == '1') {
                //新添加学生授权提示
                common.tipStuAllow('do');
            }
        }

        window.EventQueue.setEventUnlocked();
    },

    /**
     * 对列翻页处理
    */
    runPaging: function (message) {
        common.logPrint('runPaging', JSON.stringify(message));
        let currentPage = message.curPage;
        if (currentPage == 0 && classConf.user.type == 'tea') {
            //如果当前页是0 表示服务器没有数据进行一次page的通知
            common.logPrint('first time : give page data to svc');
            window.H5SDK.sendDataToClient.pageData({
                CID: classConf.course.id,
                textBookID: '1',
                textBookType: '1',
                curPage: common.toString(Math.max(1, parseInt(classConf.h5Course.localPage))),
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
    runUpdateUser: function (message) {
        common.logPrint('runUpdateUser', JSON.stringify(message));
        let state = message.state;
        let uid = message.uid;
        let currentUser = classConf.user;
        let h5_course_tea_out = $('#h5_course_tea_out');
        uid.forEach(function (item) {
            let hero = common.findHeroById(window.heroArr, item);
            if (item == currentUser.id) {
                hero.setVisible(true);
            } else {
                if (state == 'enter') {
                    hero.setVisible(true);
                    screenAc.showUserScreen(item);
                } else {
                    hero.setVisible(false);
                    screenAc.hideUserScreen(item);
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
    runGeneralNotice: function (message) {
        common.logPrint('runGeneralNotice', JSON.stringify(message));
        window.EventQueue.setEventUnlocked();
    },

    /**
     * 打开四格模式
    */
    runShowStuWindow: function (message) {
        common.logPrint('runShowStuWindow', JSON.stringify(message));
        let currentUser = classConf.user;
        let showWindowInfo = message.data[0].value;
        let stu_screens = $('#h5_course_stu_screens');
        let h5_btn_showStu = $('#h5_btn_showStu');
        let screenPrevBtn = $('#h5_course_screen_prev');
        let screenNextBtn = $('#h5_course_screen_next');
        let screen_pages = $('#h5_course_screen_pages');
        let screen_count = $('#h5_course_stu_screens .screen').length;
        let shareFourButton = $('#h5_btn_share_four');
        let shareSingleButton = $('#h5_btn_share_single');

        if (currentUser.type == 'stu') {

        } else {
            if (showWindowInfo == '1') {
                this.isShowTea = '1';
                //控制四格
                stu_screens.removeClass('hidden');
                h5_btn_showStu.html('close four-windows');
                common.closeMask();

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
                if (classConf.h5Course.classStatus == '2') {
                    common.showMask();
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
    runShowSingleStuWindow: function (message) {
        common.logPrint('runShowSingleStuWindow', JSON.stringify(message));
        let currentUser = classConf.user;
        let info = message.data[0].value.split('#');
        let screenId = info[1];
        let isShowSingle = info[0];
        let stu_screens = $('#h5_course_stu_screens');
        let shareFourButton = $('#h5_btn_share_four');
        let shareSingleButton = $('#h5_btn_share_single');

        if (currentUser.type == 'stu') {

        } else {
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
    runScreenPaging: function (message) {
        common.logPrint('runScreenPaging', JSON.stringify(message));
        let currentPage = message.data[0].value;
        this.screenPaging('set', currentPage);
        window.EventQueue.setEventUnlocked();
    },

    runShareFour: function (message) {
        common.logPrint('runShareFour', JSON.stringify(message));
        let currentUser = classConf.user;
        let status = message.data[0].value;
        let stu_screens = $('#h5_course_stu_screens');
        let shareFourButton = $('#h5_btn_share_four');
        let h5_share_four_tip = $('#h5_share_four_tip');

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
        } else {

        }

        //画板控制,重置画板大小
        // this.resetScreenDraw();
        window.EventQueue.setEventUnlocked();
    },

    runShareSingle: function (message) {
        common.logPrint('runShareSingle', JSON.stringify(message));
        let currentUser = classConf.user;
        let info = message.data[0].value.split('#');
        let screenId = info[1];
        let isShareSingle = info[0];
        let stu_screens = $('#h5_course_stu_screens');
        let shareSingleButton = $('#h5_btn_share_single');
        let h5_share_single_tip = $('#h5_share_single_tip');

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
    runRecordAudio: function (message) {
        common.logPrint('runRecordAudio', JSON.stringify(message));
        if (message.operate == '1') {
            if (classConf.user.type == 'stu') {

                window.H5Record.record(message);
            }
        }
        window.EventQueue.setEventUnlocked();
    },

    /**
     * 点击完成按钮
     */
    runPartComplete: function (message) {
        common.logPrint('runPartComplete', JSON.stringify(message));
        let msg = message.data[0].value;
        this.cardComplete = msg.cardId;
        this.coursePrize(message.operate);

        if (classConf.user.type == 'tea') {
            common.closeMask();
        } else {
            common.showMask();
        }
        this.nowWBTar.draw("clear");
        window.EventQueue.setEventUnlocked();
    },

    /**
     * 课件part分页
     */
    runCoursePaging: function (message) {
        common.logPrint('runCoursePaging', JSON.stringify(message));
        let msgData = message.data[0].value;

        // if (message.operate == '5') {
        h5_course.init(msgData.cardId);
        // h5_course.courseShow();
        // }

        h5_course.pageSet(msgData.currentPage);

        window.EventQueue.setEventUnlocked();
    },


    /**
     *  控制星星也展示
    */

    runOpenStarPage: function (message) {
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
        common.logPrint('runOpenStarPage', JSON.stringify(message));

        let status = message.data[0].value.status;

        this.openStarPage(status);

        window.EventQueue.setEventUnlocked();
    }


}

window.h5SyncActions = syncActions;
window.h5SyncActions.classConf = classConf;

export { syncActions };