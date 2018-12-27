/**
 * Created by shaoyongkai on 2017/3/23.
 * 说明：
 *      add    checkFirstPageLoad 添加第一次进来首屏加载是否成功 checkFirstPageLoad 通过模板中的SDK全局对象判断
 *      remove checkAlternateUrl
 *      remove resetScreenDraw 添加参数 控制处于单例模式的frame
 *      add    isCreateTg 控制教师端tg显示
 *      先暂时关闭四格分享相关逻辑
 *      remove checkFirstPageLoad
 *      模板中使用的方法 isResultPage isPracticePage isCreateTg
 */

import {classConf} from "./classConf";
import {globalCommon} from "./h5course_globalCommon";
import {tg} from "./h5course_tg";

/**
 * 课件交互
 **/
let syncActions = {
    isSync: true,
    currentPage: globalCommon.toInt(classConf.h5Course.localPage),
    nowWBTar: null, //工具条对象
    localIdNum: 0, //消息信令自增标识
    firstTime: true,
    selfRunSyncCount: 0, //乐观锁相关加载次数

    /**
     * 初始化工具条画板大小
     */
    initDrawBoxSize: function () {
        globalCommon.logPrint('initDrawBoxSize');
        let self_frame = $('#h5_course_self_frame');
        let draw_box = $('#h5_course_draw');

        let frameWidth = self_frame.width();
        let frameHeight = self_frame.height();
        let getPageFontSize = globalCommon.getPageFontSize(frameWidth, frameHeight);
        let c_page_width = 19.2 * getPageFontSize;
        let c_page_height = 10.8 * getPageFontSize;
        draw_box.css({
            'width': c_page_width,
            'height': c_page_height
        });

        /*window.H5SDK.sendDataToClient.courseAreaData({
            pX: Math.max(0, Math.floor((frameWidth - c_page_width) / 2)),  // 坐标x
            pY: Math.max(0, Math.floor((frameHeight - c_page_height) / 2)),  // 坐标y
            width: Math.floor(c_page_width),  //宽度
            height: Math.floor(c_page_height)  //高度
        });*/
        //改变画板大小
        this.nowWBTar.wbResize();
    },

    /**
     * 翻页是否可用
     */
    setPageEnable: function (pager) {
        let pagerBox = $('#h5_pager_box .btn');
        let pager_select = $('#h5_course_pager_select');
        if (pager) {
            pagerBox.removeClass('disallow');
            pager_select.removeClass('disallow').removeAttr('disabled');
        } else {
            pagerBox.addClass('disallow');
            pager_select.addClass('disallow').attr('disabled', 'disabled');
        }
    },

    /**
     * 设置翻页数字和按钮变化
     */
    setPage: function (currentPage) {
        let pagePrevBtn = $('#h5_course_page_prev');
        let pageNextBtn = $('#h5_course_page_next');
        let countNum = globalCommon.toInt(classConf.url.h5Course.countNum);
        //首先全部已出disable
        pagePrevBtn.removeClass('disabled');
        pageNextBtn.removeClass('disabled');
        //然后判断合理值
        if (currentPage == 1) {
            pagePrevBtn.addClass('disabled');
        } else if (currentPage == countNum) {
            pageNextBtn.addClass('disabled');
        }

        // let pagerBox = $('#h5_pager_box');
        // pagerBox.find('.pager-num .current').html(currentPage);

        let pager_select = $('#h5_course_pager_select');
        pager_select.val(currentPage);
    },

    handlePractice: function (status) {
        if(status == '1') {
            sendDataToClient.gSetData({
                CID: this.classConf.course.id,
                operate: '1',
                data: [{
                    key: 'classStatus',
                    value: '2',
                    ownerUID: this.classConf.user.id
                }]
            });
            this.addEventQueue({
                type: 'practice',
                CID: this.classConf.course.id,
                operate: '1',
                data: [{
                    key: 'classStatus',
                    value: '2'
                }]
            });
        } else {
            sendDataToClient.gSetData({
                CID: classConf.course.id + '',// 教室id 字符串
                operate: '1',
                data: [{
                    key: 'classStatus',
                    value: '1',
                    ownerUID: classConf.user.id
                }]
            });
            this.addEventQueue({
                type: 'starting',
                CID: classConf.course.id + '',
                operate: '1',
                data: [{
                    key: 'classStatus',
                    value: '1'
                }]
            });
        }
    },

    showStuButtonAndPracticeButton: function () {
        let userType = classConf.user.type;
        let practiceButton = $('#h5_btn_practice');
        let showStuButton = $('#h5_btn_showStu');
        let refreshButton = $('#h5_btn_refresh');
        if (userType === 'stu') {
            practiceButton.remove();
            showStuButton.remove();
            refreshButton.remove();
        } else if (userType === 'tea') {

        }
    },

    /**
     * 控制教师端tg显示
     * @param flag
     * @param html
     */
    isCreateTg: function (flag, html) {
        globalCommon.logPrint('isCreateTg', flag);
        if (flag == '1') {
            $('#h5_course_tg').html(html);
            tg.bindEvents('tg');
        } else {
            $('#h5_course_tg').html('');
        }
    },

    /***
     * 控制教师端level tg显示
     * @param flag
     * @param html
     */
    isCreateLevelTg: function (flag, html) {
      globalCommon.logPrint('isCreateLevelTg', flag);
      if (flag === '1') {
        $('#h5_course_tg_level').html(html);
        tg.bindEvents('level-tg');
      } else {
        $('#h5_course_tg_level').html('');
      }
    },
    /**
     * 发星星
     */
    /*sendStarData: function (message) {
        //测试数据发星星

        let sendUser = message.data[0].value.sendUser;


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

    },*/

    showWbTools: function () {
        let user = classConf.user;
        $('.btn-tool[data-func="pencil"]').addClass('selected');
        if (user.type == 'tea') {

        } else if (user.type == 'stu') {
            $('#h5_tool_box').addClass('hide');
        } else {

        }
    },

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
                if (currentTarget.hasClass('selected')) {
                    window.H5SDK.sendDataToClient.gSetData({
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
                    });

                    // toolBox.addClass('hide');
                    currentTarget.removeClass('selected');
                    //add close do tip


                    // screen_draws.addClass('hide');
                    // btnTool.addClass('disabled').removeClass('fadeIn animated');
                } else {
                    window.H5SDK.sendDataToClient.gSetData({
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

                    // toolBox.removeClass('hide');
                    currentTarget.addClass('selected');
                    // screen_draws.removeClass('hide');
                    // btnTool.removeClass('disabled').addClass('fadeIn animated');
                }
            } else if (funcName == 'authorize') {
                if (currentTarget.hasClass('selected')) {
                    currentTarget.removeClass('selected');
                    window.H5SDK.sendDataToClient.gSetData({
                        CID: classConf.course.id,
                        operate: '1',
                        data: [{
                            key: 'openWbToolAuthority',
                            value: '0',
                            ownerUID: classConf.user.id
                        }]
                    });
                } else {

                    if (bindBtn.hasClass('selected')) {
                        currentTarget.addClass('selected');
                        window.H5SDK.sendDataToClient.gSetData({
                            CID: classConf.course.id,
                            operate: '1',
                            data: [{
                                key: 'openWbToolAuthority',
                                value: '1',
                                ownerUID: classConf.user.id
                            }]
                        });
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
     * 更新root权限及设置老师、学生是否可翻页
     */
    updateRootAndSetPageEnable: function () {
        if (classConf.user.type == 'tea') {
            classConf.h5Course.isRoot = true;
            //老师可翻页
            this.setPageEnable(true);
        } else if (classConf.user.type == 'stu') {
            classConf.h5Course.isRoot = false;
            //学生不可翻页
            this.setPageEnable(false);
        } else {

        }
    },

    /**
     * 是否显示白板
     * @param b
     */
    showWB: function (b) {
        let toolBox = $('#h5_course_draw');
        let bindBtn = $('.btn-tool[data-func="bind"]');
        // let screen_draws = $('#h5_course_stu_screens .screen-draw-box');
        let btnTool = $('.btn-tool:not([data-func="bind"])');
        if (b) {
            $('#h5_course_draw').removeClass('hide');
            bindBtn.addClass('selected');
            // screen_draws.removeClass('hide');
            btnTool.removeClass('disabled').addClass('fadeIn animated');
            toolBox.removeClass('hide');
        } else {
            $('#h5_course_draw').addClass('hide');
            bindBtn.removeClass('selected');
            // screen_draws.addClass('hide');
            btnTool.addClass('disabled').removeClass('fadeIn animated');
            toolBox.addClass('hide');
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

    /**
     * 发送语音结果到教师端
     */
    /*sendRecordResult: function (message) {
        // {"action":"0","key":"s1623d6fe5fd3c1c0","maxTime":5,"other":{"id":"111","name":"wang"},"score":"0.000000","text":"hello world"}
        if (classConf.user.type == 'stu') {
            this.localIdNum = this.localIdNum + 1;

            let resultScore = window.H5Record.result;

            window.H5SDK.sendDataToClient.clAddData({
                CID: classConf.course.id,
                textBookID: '1',
                textBookType: '1',
                page: globalCommon.toString(classConf.h5Course.localPage),
                operate: '1',
                data: [{
                    localID: this.localIdNum,
                    value: {
                        type: 'resultRecord',
                        sendUser: classConf.user.id,
                        score: message.score,
                        result: resultScore
                    },
                    byteData: '',
                    byteDataLength: ''
                }]
            });
        }
    },*/

    /**
     * 模板间接调用队列
     */
    addEventQueue: function (message) {
        window.H5SDK.EventQueue.addEventQueue(message);
    },

    setEventUnlocked: function () {
        window.H5SDK.EventQueue.executeEventQueue();
    },

    runStars: function (message) {
        globalCommon.logPrint('runStars', JSON.stringify(message));
        classConf.h5Course.starData = message;
        window.H5SDK.EventQueue.setEventUnlocked();
    },

    runShowWB: function (message) {
        globalCommon.logPrint('runShowWB', JSON.stringify(message));
        let showWBInfo = message.data[0];
        if (showWBInfo.value == '1') {
            this.showWB(true);
        } else if (showWBInfo.value == '0') {
            this.showWB(false);
        }
        window.H5SDK.EventQueue.setEventUnlocked();
    },

    runOpenWbToolAuthority: function (message) {
        globalCommon.logPrint('runOpenWbToolAuthority', JSON.stringify(message));
        let user = classConf.user;
        let authorityInfo = message.data[0];
        let authorizeBtn = $('.btn-tool[data-func="authorize"]');
        if (user.type == 'tea') {
            if (authorityInfo.value == '1') {
                authorizeBtn.addClass('selected');
            } else {
                authorizeBtn.removeClass('selected');
            }
        } else if (user.type == 'stu') {
            if (authorityInfo.value == '1') {
                this.OpenWbToolAuthority(true);
                if (message.operate == '1') {
                    //新添加学生授权提示
                    globalCommon.tipStuAllow('draw');
                }
            } else {
                this.OpenWbToolAuthority(false);
            }
        } else {
            if (authorityInfo.value == '1') {
                authorizeBtn.addClass('selected');
            } else {
                authorizeBtn.removeClass('selected');
            }
        }
        window.H5SDK.EventQueue.setEventUnlocked();
    },

    runWb: function (message) {
        globalCommon.logPrint('runWb', JSON.stringify(message));
        /**
         1：Add
         2：Delete
         3：Edit
         4：Clear
         5：Syn
         */
        let self = this;
        let user = classConf.user;

        if (message.operate == '1' || message.operate == '5') {
            let boardID = message.data[0].value.boardID;
            let sendUser = message.data[0].value.sendUser;
            let sendUserInfo = message.data[0].value.sendUserInfo;
            if (boardID == "h5_course_draw") {
                if (sendUserInfo.type == 'tea') {
                    self.nowWBTar.setData(message.operate, message.data);
                    // for (let drawItem in self.whiteboards) {
                    //     self.whiteboards[drawItem].setData(message.operate, message.data);
                    // }
                } else if (sendUserInfo.type == 'stu') {
                    if (sendUser == user.id) { //发送者自己
                        self.nowWBTar.setData(message.operate, message.data);
                    } else {
                        if (user.type == 'stu') {

                        } else {
                            //老师和其他用户一样
                            self.nowWBTar.setData(message.operate, message.data);
                        }
                    }
                    //老师或者其他用户小屏幕
                    // if (self.whiteboards['j_screen_draw_' + sendUser] != undefined) {
                    //     self.whiteboards['j_screen_draw_' + sendUser].setData(message.operate, message.data);
                    // }
                } else {

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
                    // self.whiteboards[boardID].setData(message.operate, message.data);
                }
            }
        } else {
            self.nowWBTar.setData(message.operate, message.data);
            // for (let drawItem in self.whiteboards) {
            //     self.whiteboards[drawItem].setData(message.operate, message.data);
            // }
        }
        window.H5SDK.EventQueue.setEventUnlocked();
    },

    runWbBack: function (message) {
        globalCommon.logPrint('runWbBack', JSON.stringify(message));
        // let currentUser = classConf.user;
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
                    // if (currentUser.type == 'stu') {
                    //     /*self.whiteboards['j_screen_draw_' + currentUser.id].setData('1', [{
                    //      svcID: item.svcID,
                    //      localID: item.localID,
                    //      value: item.value
                    //      }]);*/
                    // } else {
                    //     //老师和其他用户
                    //     // for (let drawItem in self.whiteboards) {
                    //     //     self.whiteboards[drawItem].setData('1', [{
                    //     //         svcID: item.svcID,
                    //     //         localID: item.localID,
                    //     //         value: item.value
                    //     //     }]);
                    //     // }
                    // }
                } else {
                    // self.whiteboards[item.value.boardID].changeData({
                    //     svcID: item.svcID,
                    //     localID: item.localID,
                    //     value: item.value
                    // });
                    //add：老师端在四格小屏中画的时候，自己的公屏上对应添加笔迹
                    self.nowWBTar.setData('1', [{
                        svcID: item.svcID,
                        localID: item.localID,
                        value: item.value
                    }]);
                }
            });
        }
        window.H5SDK.EventQueue.setEventUnlocked();
    },

    runCl: function (message) {
        //这里是不做处理的，原则上出现这种数据是不合法的，需要注意！
        globalCommon.logPrint('runCl', JSON.stringify(message));
        console.warn('receive cl_data : %s', JSON.stringify(message));
    },

    runClBack: function (message) {
        globalCommon.logPrint('runClBack', JSON.stringify(message));
        window.H5SDK.EventQueue.setEventUnlocked();
    },

    runColorSet: function (message) {
        globalCommon.logPrint('runColorSet', JSON.stringify(message));
        let self = this;
        if (message.color) {
            let temColor = '#' + message.color;
            self.classConf.h5Course.pencilColor = temColor;
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
        }
        window.H5SDK.EventQueue.setEventUnlocked();
    },

    runSync: function (message) {
        let frames_loaded = $("iframe[frame_load_status='0']");
        let currentUser = classConf.user; //当前用户
        //frames_loaded.length 为0表示加载完毕

        if (frames_loaded.length == 0) {

            //恢复同步状态
            this.selfRunSyncCount = 0;

            // let user = message.data[0].value.user; //指令发过来的用户
            // let user = message.data[0].value.sendUserInfo; //指令发过来的用户

            // todo： (1vN逻辑保证只有四格中显示操作)
            $('.frame_control[role=' + currentUser.id + ']')[0].contentWindow.SDK.actEvent(message);

        } else {
            window.setTimeout(function () {
                if (this.selfRunSyncCount >= 20) {
                    //乐观状态控制改为20
                    console.warn('error happened : framesLoad error runSync error!');
                    window.H5SDK.EventQueue.setEventUnlocked();
                } else {
                    this.selfRunSyncCount = this.selfRunSyncCount + 1;
                    this.runSync(message);
                }
            }.bind(this), 1000);
        }
    },

    runResultSync: function (message) {
        globalCommon.logPrint('runResultSync', JSON.stringify(message));
        /*let starSend = message.data[0].value.starSend;
        let resultData = message.data[0].value.syncAction.resultData;
        // let sendUserInfo = message.data[0].value.sendUserInfo;

        if (classConf.user.type == 'tea') {
            // courseResult.showResult(message);

            //控制学生端榜单
            if (message.operate == '1' && starSend == '0') {
                // if (starSend == '0' && resultData.isRight == true) {
                //todo：修改发送星星逻辑
                // if(courseResult.resultData[sendUserInfo.id].errorCount == 0 && resultData.isRight == true) {
                if(resultData.isRight == true) {
                    //现在是只要答对就发星星
                    this.sendStarData(message);
                }
            }

        } else if (classConf.user.type == 'stu') {
        } else {
            // courseResult.showResult(message);
        }*/
        window.H5SDK.EventQueue.setEventUnlocked();
    },

    /**
     * 上课状态
     */
    runStarting: function (message) {
        globalCommon.logPrint('runStarting', JSON.stringify(message));
        let practiceButton = $('#h5_btn_practice');
        this.updateRootAndSetPageEnable();
        this.classConf.h5Course.classStatus = message.data[0].value;

        if (this.classConf.user.type == 'tea') {
            practiceButton.removeAttr('data-status');
            practiceButton.text('Authorize');

            globalCommon.closeMask();
        } else {
            globalCommon.showMask();
        }


        //不管什么情况 所有的人同步svc的页码
        // this.paging('set', classConf.h5Course.svcPage);
        window.H5SDK.EventQueue.setEventUnlocked();
    },

    runPractice: function (message) {
        globalCommon.logPrint('runPractice', JSON.stringify(message));
        let practiceButton = $('#h5_btn_practice');
        this.updateRootAndSetPageEnable();

        this.classConf.h5Course.classStatus = message.data[0].value;

        if (this.classConf.user.type == 'tea') {
            practiceButton.attr('data-status', '1');
            practiceButton.text('close the authorization');

            globalCommon.showMask();

        } else {
            globalCommon.closeMask();
            if (message.operate == '1') {
                //新添加学生授权提示
                globalCommon.tipStuAllow('do');
            }
        }

        window.H5SDK.EventQueue.setEventUnlocked();
    },

    /**
     * 对列翻页处理
     */
    runPaging: function (message) {
        globalCommon.logPrint('runPaging', JSON.stringify(message));
        let currentPage = message.curPage;
        if (currentPage == 0 && classConf.user.type == 'tea') {
            //如果当前页是0 表示服务器没有数据进行一次page的通知
            globalCommon.logPrint('first time : give page data to svc');
            window.H5SDK.sendDataToClient.pageData({
                CID: classConf.course.id,
                textBookID: '1',
                textBookType: '1',
                curPage: globalCommon.toString(Math.max(1, parseInt(classConf.h5Course.localPage))),
                reserved: ''
            });
            // this.paging('set', 1);
        } else if (currentPage != 0) {
            if(currentPage == classConf.h5Course.localPage) {
                this.paging('svc', currentPage, 'refresh');
            } else {
                this.paging('svc', currentPage);
            }

        }
        window.H5SDK.EventQueue.setEventUnlocked();
    },

    /**
     * 成员变更
     */
    runUpdateUser: function (message) {
        globalCommon.logPrint('runUpdateUser', JSON.stringify(message));
        let state = message.state;
        let currentUser = classConf.user;
        let h5_course_tea_out = $('#h5_course_tea_out');

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

        //处理切换按钮逻辑
        if(classConf.user.type == 'tea') {
            let bookH5List = classConf.serverData.objCourseAllInfo['bookH5List'];
            if(classConf.userList['stuID'] == undefined || classConf.userList['stuID'].length == 0 || bookH5List == undefined || bookH5List.length == 0) {
            // if((bookH5List == undefined || bookH5List.length == 0)) {
                $('#h5_btn_switch').addClass('hide');
            } else {
                $('#h5_btn_switch').removeClass('hide');
            }
        }

        window.H5SDK.EventQueue.setEventUnlocked();
    },

    /**
     * 通用通知
     */
    runGeneralNotice: function (message) {
        globalCommon.logPrint('runGeneralNotice', JSON.stringify(message));
        window.H5SDK.EventQueue.setEventUnlocked();
    },

    /**
     * 语音打分执行逻辑
     */
    /*runRecordAudio: function (message) {
        globalCommon.logPrint('runRecordAudio', JSON.stringify(message));
        if (message.operate == '1') {
            if (classConf.user.type == 'stu') {
                window.H5Record.record(message);
            }
        }
        window.H5SDK.EventQueue.setEventUnlocked();
    },*/

    /**
     * 控制显示教师端结果列表语音分数
     */
    /*runResultRecord: function (message) {
        globalCommon.logPrint('runResultRecord', JSON.stringify(message));
        /!*if (message.operate == '1') {
            if (classConf.user.type == 'tea') {
                courseResult.showRecordResult(message);
            }
        }*!/
        window.H5SDK.EventQueue.setEventUnlocked();
    },*/

    paging: function (type, currentPage, stage) {
        //type为表示是否是翻页的触发类型 svc/prev/next/jump/set  svc翻页数据  prev向前跳页  next向后跳页  jump输入页码跳页  set强制本地设置
        //currentPage 为type为svc和set时的页码
        let that = this;
        let frames = $("iframe[frame_load_status]");
        let userType = classConf.user.type,
            isRoot = classConf.h5Course.isRoot,
            isClassing = classConf.h5Course.classStatus == 1,
            countNum = globalCommon.toInt(classConf.url.h5Course.countNum),
            nowPage = classConf.h5Course.localPage,
            isSend = false;//是否要发送出去

        //防止字符串
        currentPage && (currentPage = parseInt(currentPage, 10));
        let temPage = classConf.h5Course.localPage;
        //根据不同的type结合不同的权限设置数据
        switch (type) {
            case 'svc':
                //不区分老师和学生 也不区分是不是root权限
                classConf.h5Course.svcPage = currentPage;
                classConf.h5Course.localPage = currentPage;
                isSend = false;
                break;
            case 'prev':
                temPage = classConf.h5Course.localPage - 1;
                temPage = (temPage > 0) ? temPage : temPage + 1;
                if (isRoot) {
                    //root
                    handleRootPageLogic();
                    //清空画布
                    this.nowWBTar.draw("clear");
                } else if (userType == 'tea') {

                } else if (userType == 'stu' && !isClassing) {
                    //学生非root状态  （老师不在的时候）
                    classConf.h5Course.localPage = temPage;
                    //隐藏白板及工具条
                    this.showWB(false);
                    this.OpenWbToolAuthority(false);
                } else {

                }
                break;
            case 'next':
                temPage = classConf.h5Course.localPage + 1;
                temPage = (temPage <= countNum) ? temPage : temPage - 1;
                if (isRoot) {
                    //root
                    handleRootPageLogic();
                    //清空画布
                    this.nowWBTar.draw("clear");
                } else if (userType == 'tea') {

                } else if (userType == 'stu' && !isClassing) {
                    //学生非root状态  （老师不在的时候）
                    classConf.h5Course.localPage = temPage;
                    //隐藏白板及工具条
                    this.showWB(false);
                    this.OpenWbToolAuthority(false);
                } else {

                }
                break;
            case 'jump':
                let pager_select = $('#h5_course_pager_select');
                temPage = parseInt(pager_select.val());
                temPage = (temPage <= countNum && temPage > 0) ? temPage : nowPage;
                if (isRoot) {
                    //root
                    handleRootPageLogic();
                    //清空画布
                    this.nowWBTar.draw("clear");
                } else if (userType == 'tea') {

                } else if (userType == 'stu' && !isClassing) {
                    //学生非root状态  （老师不在的时候）
                    classConf.h5Course.localPage = temPage;
                    //隐藏白板及工具条
                    this.showWB(false);
                    this.OpenWbToolAuthority(false);
                } else {

                }
                break;
            case 'set':
                if (isRoot) {
                    //root
                    classConf.h5Course.svcPage = currentPage;
                    isSend = true;
                }
                classConf.h5Course.localPage = currentPage;
                break;
            default:
                break;
        }

        //设置完数据之后再 先看是否要发送数据 然后进行翻页处理
        if (this.firstTime || nowPage != classConf.h5Course.localPage || stage == 'refresh') {

            this.firstTime = false;
            //判断如果翻页有效
            if (isSend) {
                //发送翻页数据到服务器
                window.H5SDK.sendDataToClient.pageData({
                    CID: classConf.course.id,
                    textBookID: '1',
                    textBookType: '1',
                    curPage: globalCommon.toString(classConf.h5Course.localPage),
                    reserved: ''
                });
            }
          if(classConf.user.type === 'tea'){
            syncActions.isCreateTg('0');
            syncActions.isCreateLevelTg('0')
          }

            //重置结果和录音控件
            /*if (classConf.user.type == 'stu') {
                window.H5Record.recordReset();
            } else {
            }*/

            //首先修改样式
            this.setPage(classConf.h5Course.localPage);

            //重新改变加载标示
            frames.attr('frame_load_status', '0');
            globalCommon.showPageLoading();

            //教材开始加载时间
            classConf.h5Course.pageLoadStartTime = new Date().getTime();
            classConf.h5Course.pageLoadAction = '1';
            globalCommon.logPrint('页面加载开始的时间点是 classConf.h5Course.pageLoadStartTime', classConf.h5Course.pageLoadStartTime);

            //页面加载地址
            let pageUrl = this.getPageUrl(globalCommon.toInt(classConf.h5Course.localPage));
            let targetFrame = $('#h5_course_self_frame');
            targetFrame.attr("src", pageUrl);

            if(stage == 'refresh') {
                targetFrame.attr("src", targetFrame.attr('src'));
            }
        }

        function handleRootPageLogic() {
            //处理root的逻辑和当处于练习状态的翻页逻辑
            that.classConf.h5Course.svcPage = temPage;
            that.classConf.h5Course.localPage = temPage;

            if (userType == 'tea') {
                //恢复开始上课状态
                window.H5SDK.sendDataToClient.gSetData({
                    CID: that.classConf.course.id + '',
                    operate: '1',
                    data: [{
                        key: 'classStatus',
                        value: '1',
                        ownerUID: that.classConf.user.id
                    }]
                });
                window.H5SDK.EventQueue.addEventQueue({
                    type: 'starting',
                    CID: that.classConf.course.id + '',
                    operate: '1',
                    data: [{
                        key: 'classStatus',
                        value: '1',
                        ownerUID: that.classConf.user.id
                    }]
                });

            }
            isSend = true;
        }
    },

    /**
     * 获取课件页面地址
     */
    getPageUrl: function (page) {
        let countNum = globalCommon.toInt(classConf.url.h5Course.countNum);

        if (page >= countNum) {
            page = countNum;
        }

        let pageNum = parseInt(page, 10) < 10 ? '0' + page : page;
        let pageUrl = classConf.url.h5Course.headUrl.replace(/\/(\d{2})\//g, function () {
            return '/' + pageNum + '/'
        });
        return pageUrl;
    },

    /**
     * 课件中白板数据封装（h5模板sdk中也会调用）
     */
    buildSvcMsgData: function (json, type) {
        globalCommon.logPrint('c_page buildSvcMsgData', JSON.stringify(json));

        return {
            type: type,
            CID: classConf.course.id,
            textBookID: '1',
            textBookType: '1',
            page: globalCommon.toString(classConf.h5Course.localPage),
            operate: json.operate != undefined ? json.operate : '1',
            // operate: '1',
            data: [{
                localID: '',
                value: json,
                byteData: '',//给空
                byteDataLength: ''//给空
            }]
        }
    },

    /**
     * 发送消息(这是sdk模板中发送过来的)
     */
    addSendMessage: function (message) {
        if (message.data[0].value.sendUser == message.data[0].value.receiveUser) {
            this.localIdNum = this.localIdNum + 1;
            message.data[0].localID = this.localIdNum;
            // message.data[0].value.localID = this.localIdNum;
            window.H5SDK.sendDataToClient.clAddData(message);
        }
    },

    /**
     * 工具条 tool event bind
     */
    handleTool: function (funcName) {
        let btnTool = $('.btn-tool:not([data-func="bind"]):not([data-func="authorize"])');
        let curBtn = $('.btn-tool[data-func="' + funcName + '"]');
        globalCommon.logPrint('handleTool', funcName);
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
        if (currentUser.type == 'stu') {
            changeConf.pauseDraw.state = true;
        }
        conConf.ownerID.value = classConf.user.id;
        conConf.isSVC.value = true;
        this.nowWBTar = window.WBSDK.bindWB('h5_course_draw', conConf, changeConf, handleToolCallback);
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
                window.H5SDK.sendDataToClient.wbAddData({
                    CID: self.classConf.course.id,
                    textBookID: '1',
                    textBookType: '1',
                    page: self.classConf.h5Course.localPage + '',
                    operate: '1',
                    data: [obj]
                });
            } else if (type == 'clear') {
                window.H5SDK.sendDataToClient.wbClearData({
                    CID: self.classConf.course.id,
                    textBookID: '1',
                    textBookType: '1',
                    page: self.classConf.h5Course.localPage + '',
                    operate: '4',
                    data: []
                });
            } else if (type == 'edit') {
                window.H5SDK.sendDataToClient.wbEditData({
                    CID: self.classConf.course.id,
                    textBookID: '1',
                    textBookType: '1',
                    page: self.classConf.h5Course.localPage + '',
                    operate: '3',
                    data: [obj]
                });
            } else if (type == 'back') {
                window.H5SDK.sendDataToClient.wbDelData({
                    CID: self.classConf.course.id,
                    textBookID: '1',
                    textBookType: '1',
                    page: self.classConf.h5Course.localPage + '',
                    operate: '2',
                    data: [obj]
                });
            } else {

            }
        }
    },

    toolDrawFunc: function (type) {
        globalCommon.logPrint('toolDrawFunc', type);
        // let self = this;
        if (this.nowWBTar == null) {

        } else {
            this.nowWBTar.draw(type);
            //其他小画板同样的操作类型
            // if (type == 'clear') {
            //
            // } else {
            //     // for (let drawItem in self.whiteboards) {
            //     //     self.whiteboards[drawItem].draw(type);
            //     // }
            // }
        }
    }

};

window.h5SyncActions = syncActions;
window.h5SyncActions.classConf = classConf;

export {syncActions};
