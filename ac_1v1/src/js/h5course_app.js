/**
 * Created by shaoyongkai on 2017/4/12.
 * 说明：
 *      测试
 *      add hasFourWindow：是否有四格功能 recordAudioScore：是否有语音功能
 */

import {classConf} from "./classConf";
import {globalCommon} from "./h5course_globalCommon";
// import {record} from "./h5course_recordAudio";
import {syncActions} from "./h5course_syncActions";

// let md5 = require('js-md5');
let App = {
    currentPage: 1,

    bindEvents: function () {
        //监听frame加载完成
        let self_frame = $("#h5_course_self_frame");
        let h5_btn_practice = $('#h5_btn_practice');
        let cacheFrame = $('#h5_course_cache_frame');

        self_frame.off('load').on('load', function () {
            globalCommon.hidePageLoading();
            classConf.h5Course.pageLoadEndTime = new Date().getTime();
            globalCommon.logPrint('页面加载完成的时间点是 classConf.h5Course.pageLoadEndTime', classConf.h5Course.pageLoadEndTime);

            //如果页面加载时间大于20s
            if ((classConf.h5Course.pageLoadEndTime - classConf.h5Course.pageLoadStartTime >= 20000) || $(this)[0].contentWindow.SDK == undefined) {
                console.warn('当前页面加载时间大于20s或资源有问题!');
                //要是404则认为错误
                window.H5SendToClient('showerrorpage', '{}');
            } else {
                $(this).attr('frame_load_status', '1');

                //开始预加载缓存下一页
                let cacheFrameUrl = syncActions.getPageUrl(globalCommon.toInt(classConf.h5Course.localPage) + 1);
                cacheFrame.attr("src", cacheFrameUrl);

                let hasPractice = $(this)[0].contentWindow.h5Template == undefined ? '1' : $(this)[0].contentWindow.h5Template.hasPractice;

                if (hasPractice == '1') {
                    h5_btn_practice.removeClass('hide');
                } else {
                    h5_btn_practice.addClass('hide');
                }

                //有没有语音打分功能
                // let recordAudioScore = $(this)[0].contentWindow.h5Template == undefined ? '0' : $(this)[0].contentWindow.h5Template.recordAudioScore;
                // self.audioResultScore(recordAudioScore);

                //数据上报
                window.dataReport.log.report('H5Source', {
                    action: classConf.h5Course.pageLoadAction,
                    pageLoadTime: classConf.h5Course.pageLoadEndTime - classConf.h5Course.pageLoadStartTime
                });
            }

        });
    },

    /**
     * 不显示语音分数一栏
     */
    /*audioResultScore: function (flag) {
        let scoreItem = $('#h5_course_result .flex-content-f');
        if (flag == '1') {
            scoreItem.removeClass('hide');
        } else {
            scoreItem.addClass('hide');
        }
    },*/

    setViewStatus: function () {
        let viewStatus = localStorage.getItem('viewStatus');
        if (viewStatus == null) {
            // localStorage.setItem('viewStatus', classConf.course.id + '_1');
        } else {
            if (viewStatus.split('_')[0] != classConf.course.id) {
                localStorage.removeItem('viewStatus');
            }
        }
    },

    getStudentsInfo: function () {
        /*let appid = 1002;
        let appkey = 'MD8CAQACCQDDK9jj8qAo5wIDAQABAggwNt7HUrBc4QIFAOIqtZ8CBQDc6ne5AgRA';
        let timestamp = new Date().getTime();
        let appointMember = classConf.appointMemberList;
        let stuLongIds = appointMember.filter(function (item) {
            return item.role === 'stu';
        }).map(function (item) {
            return item.uid;
        });
        let stuIds = '';
        stuLongIds.forEach(function (item, index) {
            stuIds += '&stuLongIds[' + index + ']=' + item
        });
        let sign = 'appid=' + appid + stuIds + '&timestamp=' + timestamp + appkey;

        $.ajax({
            type: 'post',
            url: globalCommon.getProtocol() + '//www.51talkac.com/Ac/UserForH5/getUserInfo',
            // url: globalCommon.getProtocol() + '//' + classConf.course.H5HostUrl +'/Ac/UserForH5/getUserInfo',
            data: {
                'appid': appid,
                'timestamp': timestamp,
                'stuLongIds': stuLongIds,
                'sign': md5(sign)
            },
            dataType: 'json',
            success: function (res) {
                if (res.code == '0') {
                    let stuInfo = res.data;
                    appointMember.forEach(function (item) {
                        if (stuInfo[item.uid]) {
                            item.userImg = stuInfo[item.uid].userImg;
                            item.userSmallImg = stuInfo[item.uid].userSmallImg;
                        }
                    });
                    classConf.appointMemberList = appointMember;
                }
            },
        });*/

        let members = classConf.serverData.objCourseAllInfo['1vmv']['members'];

        let membersLength = members.length;
        let appointMemberList = classConf.appointMemberList;
        let appointLength = appointMemberList.length;

        if (classConf.serverData.objCourseInfo.subcoursetype == '5') {

            for (let i = 0; i < membersLength; i++) {
                let stuInfo = members[i];
                for(let i = 0; i < appointLength; i++) {
                    let appointMember = appointMemberList[i];
                    if (stuInfo['stuId'] == appointMember['uid']) {
                        appointMember['userImg'] = stuInfo['userImg'];
                        appointMember['userSmallImg'] = stuInfo['userThumbImg'];
                    }
                }
            }
        } else if (classConf.serverData.objCourseInfo.subcoursetype == '6') {

            let stuDataArr = [];
            for (let i = 0; i < membersLength; i++) {
                stuDataArr = stuDataArr.concat(members[i]['stuData']);
            }
            // console.log('stuDataArr----------->', stuDataArr);

            for (let i = 0; i < stuDataArr.length; i++) {
                let stuInfo = stuDataArr[i];
                for(let i = 0; i < appointLength; i++) {
                    let appointMember = appointMemberList[i];
                    if (stuInfo['stuId'] == appointMember['uid']) {
                        appointMember['userImg'] = stuInfo['userImg'];
                        appointMember['userSmallImg'] = stuInfo['userThumbImg'];
                    }
                }
            }

        } else {

        }
    },

    start: function () {
        globalCommon.logPrint('App start');

        //H5日志控制加载情况上报
        classConf.h5Course.controllerLoadStartTime = new Date().getTime();
        window.dataReport.log.report('controller', {
            loading_time: classConf.h5Course.controllerLoadStartTime
        });

        //设置课程ID
        this.setViewStatus();

        //请求学生用户信息
        // this.getStudentsInfo();

        //构建多端
        // syncActions.createStudentsScreens();
        // syncActions.createResultPanel();
        // syncActions.createResultStuPanel();

        //调用初始化画布工具
        syncActions.buildToolBar();

        //显示画布工具
        syncActions.showWbTools();

        //初始化画板大小
        syncActions.initDrawBoxSize();

        if (classConf.user.type == 'tea') {
            globalCommon.logPrint('我是老师进入默认到第一页');
            /**
             * 发送开始上课全局设置协议
             */
            let viewStatus = localStorage.getItem('viewStatus');
            //注意顺序不能颠倒！！！！！！！！！！！！！！！！！！！！！！！
            //先跳到第一页  注意必须先跳再进行发送starting 涉及到root身份，这里set不想传到对面去！！！！！！！！！！！！
            syncActions.paging('set', 1);
            //再发送starting 将身份改为root！！！！！！！！！！！！！！！
            //build data to local queue
            window.H5SDK.EventQueue.addEventQueue({
                type: 'starting',
                CID: classConf.course.id + '',
                operate: '1',
                data: [{
                    key: 'classStatus',
                    value: '1'
                }]
            });
            if (viewStatus != null && viewStatus == classConf.course.id + '_1') {

            } else {
                localStorage.setItem('viewStatus', classConf.course.id + '_1');
                window.H5SDK.sendDataToClient.gSetData({
                    CID: classConf.course.id + '',// 教室id 字符串
                    operate: '1',
                    data: [{
                        key: 'classStatus',
                        value: '1',
                        ownerUID: classConf.user.id
                    }]
                });
            }

        } else if (classConf.user.type == 'stu') {
            globalCommon.logPrint('我是stu进入默认到第一页');
            syncActions.paging('set', 1);
        } else {
            globalCommon.logPrint('我是其他用户进入, 禁止点击', classConf.user.type);
            globalCommon.showMaskForbid();
            syncActions.paging('set', 1);
        }

        //练习和四格按钮控制
        syncActions.showStuButtonAndPracticeButton();

        this.bindEvents();
    }
};

//暴露录音模块
/*window.H5Record = record;
record.bind();*/

export {App}




