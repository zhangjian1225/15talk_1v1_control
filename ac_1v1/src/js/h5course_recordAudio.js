/**
 ** 语音模块
 **/

//扩展语音相关方法
import {globalCommon} from "./h5course_globalCommon";
import {classConf} from "./classConf";
import {syncActions} from "./h5course_syncActions";
import {courseResult} from "./h5course_result";

let record = {
    /**
     *
     * @param status 1：开始录音回调 0：停止录音回调 其他：异常调用
     */
    timer: null,
    text: '',
    key: '',
    maxTime: '',
    courseInfo: {},
    result: '',
    report: '0', //数据是否上报

    bind: function () {
        let self = this;

        //语音停止
        $('#h5_record_dialog .btn-stop').bind('click', function () {

            let that = $(this);
            if (that.attr('data-click') == undefined) {
                that.attr('data-click', '1');

                clearInterval(self.timer);
                globalCommon.logPrint('手动点击语音停止' + self.text);

                window.H5SendToClient('recordAudio', {
                    key: self.key,
                    text: self.text, //string
                    maxTime: self.maxTime, //int
                    action: '0', //string
                    report: self.report,
                    other: self.courseInfo
                });

                setTimeout(function () {
                    that.removeAttr('data-click');
                }, 200);
            }
        });
    },

    getSendDataStatus: function () {
        let flag = '0';
        if(classConf.h5Course.classStatus == '0') {
            flag = '0';
        } else {
            flag = '1';
        }
        return flag;
    },

    closeDialog: function () {
        $("#h5_record_dialog").addClass('hide');
        $("#h5_record_dialog .recordIcon").removeClass('hide');
        $("#h5_record_dialog .recordScore").addClass('hide');
        $("#h5_record_dialog .recordText").text('');
        $("#h5_record_dialog .time").text('');
    },

    record: function (message) {
        clearInterval(this.timer);

        let resultData = message.data[0].value.syncAction.otherInfor;
        this.report = this.getSendDataStatus();
        courseResult.resetAudioScore();

        if(resultData.action == '1') {
            this.key = globalCommon.getUUID16('s');
            this.text = resultData.text;
            this.maxTime = resultData.maxTime;
            this.courseInfo = {
                key: this.key,
                course_id: classConf.serverData.objCourseAllInfo.id,
                user_id: classConf.user.id,
                user_type: classConf.user.type,
                page_num: classConf.h5Course.localPage,
                record_text: resultData.text
            };
        }

        // globalCommon.logPrint('key', this.key);

        if(resultData.action == '2') {
            globalCommon.logPrint('直接停止');
            this.recordReset();
        } else {
            globalCommon.logPrint('老师点击正常操作');
            window.H5SendToClient('recordAudio', {
                key: this.key,
                text: this.text, //string
                maxTime: this.maxTime, //int
                action: resultData.action, //string
                report: this.report,
                other: this.courseInfo
            });
        }
    },

    /**
     * 课中翻页重置录音控件
     */
    recordReset: function () {
        clearInterval(this.timer);

        this.closeDialog();
        //直接停止
        window.H5SendToClient('recordAudio', {
            key: this.key,
            text: this.text, //string
            maxTime: this.maxTime, //int
            action: '2', //string
            report: this.report,
            other: this.courseInfo
        });

    },

    /**
     * 客户端回调开始录音
     * @param message
     */
    recordSuccessStart: function (message) {


        //{"key":"s1623d41b921a2e1a","maxTime":5,"text":"hello world"}
        $("#h5_record_dialog .recordIcon").removeClass('hide');
        $("#h5_record_dialog .recordScore").addClass('hide');
        $("#h5_record_dialog .recordText").text(message.text);
        $("#h5_record_dialog").removeClass('hide');
        $("#h5_record_dialog .time").text(message.maxTime);

        /**
         * 倒计时开始
         */
        let timeCount = message.maxTime;
        this.timer = setInterval(function () {
            if(timeCount == 0) {
                clearInterval(this.timer);
                globalCommon.logPrint('倒计时结束');
                //调用客户端stop方法
                /*window.H5SendToClient('recordAudio', {
                    key: message.key,
                    text: message.text, //string
                    maxTime: message.maxTime, //int
                    action: '0', //string
                    report: this.report,
                    other: this.courseInfo
                });*/
            } else {
                timeCount = timeCount - 1;
                globalCommon.logPrint('倒计时' + timeCount);
                $("#h5_record_dialog .time").text(timeCount)
            }
        }.bind(this), 1000);


        /*this.timer = setTimeout(function () {
            //调用客户端stop方法
            window.H5SendToClient('recordAudio', {
                key: message.key,
                text: message.text, //string
                maxTime: message.maxTime, //int
                action: '0', //string
                report: this.report,
                other: this.courseInfo
            });
        }.bind(this), message.maxTime * 1000);*/
    },

    /**
     * 客户端回调停止录音
     * @param score
     */
    recordSuccessStop: function (message) {
        //{"action":"0","key":"s1623d6fe5fd3c1c0","maxTime":5,"other":{"id":"111","name":"wang"},"text":"hello world"}
        // globalCommon.logPrint('收到客户端停止的消息', message);

    },

    /**
     * 有结果返回
     */
    recordSuccessScore: function (message) {

        //{"action":"0","key":"s1623d6fe5fd3c1c0","maxTime":5,"other":{"id":"111","name":"wang"},"score":"0.000000","text":"hello world"}
        //数据上报
        window.dataReport.audioReport.successScore({
            public_key: message.key,
            recordings: message.text,
            record_time: message.maxTime
        });

        let sendDataStatus = this.getSendDataStatus();

        let score = parseFloat(message.score);
        let sendStarFlag = false;
        if (classConf.user.type == 'stu') {
            //发送星星给当前用户
            $("#h5_record_dialog .recordIcon").addClass('hide');
            if (score >= 71 && score <= 100) {
                $("#h5_record_dialog .perfect").removeClass('hide');
                this.result = 'Perfect';
                sendStarFlag = true;
            } else if (score >= 51 && score <= 70) {
                $("#h5_record_dialog .great").removeClass('hide');
                this.result = 'Great';
                sendStarFlag = true;
            } else if (score >= 0 && score <= 50) {
                $("#h5_record_dialog .goodTry").removeClass('hide');
                this.result = 'Good Try';
                sendStarFlag = false;
            } else {

            }

            //发送星星
            if(sendDataStatus == '1') {
                if(sendStarFlag) {
                    window.H5SDK.sendDataToClient.starData({
                        type: 'notify',
                        CID: classConf.course.id,
                        value: {
                            starType: '0', // 0:个人 1：组
                            starAdd: '1',//预留
                            senderID: '',//发送者id
                            receivers: [classConf.user.id],
                            witnesses: [classConf.user.id]
                        }
                    });
                }

                //发送数据到老师端
                syncActions.sendRecordResult(message);
            }

            //关闭打分窗口
            setTimeout(function () {
                this.closeDialog();
            }.bind(this), 3000);
        } else {

        }
    },

    /**
     * 异常回调
     */
    recordError: function () {
        //{"error":"1","errorMsg":"","key":"s162415eb5f725a2d","maxTime":10,"text":"hello"}
        globalCommon.logPrint('recordError');
        clearInterval(this.timer);
    }
};

export {record}