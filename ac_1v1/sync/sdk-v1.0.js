
(function () {

    var h5SyncActions = parent.window.h5SyncActions;

    if (h5SyncActions && h5SyncActions.isSync) {

        var sdk = {

            reportSwitch: '1',

            /**
             * 获取配置信息
             */
            getClassConf: function () {
                return h5SyncActions.classConf;
            },

            getUserType: function () {
                return this.getClassConf().user.type;
            },

            /**
             * 构建发送数据
             */
            buildSvcMsgData: function (obj, type) {

                /**
                 * type SyncEvt
                 * obj
                 sendUser: '',
                 receiveUser: '',
                 index: $(e.currentTarget).data('syncactions'),
                 eventType: 'click',
                 method: 'event',
                 syncName: 'syncItemClick'
                 */

                /**
                 * type resultSync
                 * obj
                 sendUser: message.data[0].value.sendUser,
                 receiveUser: message.data[0].value.receiveUser,
                 index: $('#container').data('syncresult'),
                 resultData:{isRight:'right'},
                 syncName: 'syncResultClick'
                 */

                var classConf = this.getClassConf();
                var classStatus = classConf.h5Course.classStatus;
                var message = {};
                switch (type) {
                    case 'sync':
                        var syncAction = {
                            index: obj.index,
                            syncName: obj.syncName,
                            funcType: obj.funcType,
                            otherInfor: obj.otherInfor == undefined ? '' : obj.otherInfor
                        };
                        var receiveUser = '';
                        var sendUser = '';
                        var sendUserInfo = '';
                        var starSend = '';

                        if (obj.method == 'drag') {
                            syncAction = {
                                index: obj.index,
                                syncName: obj.syncName,
                                left: obj.left,
                                top: obj.top,
                                pageX: obj.pageX,
                                pageY: obj.pageY
                            };
                        }

                        if(obj.sendUser != obj.receiveUser) {
                            sendUser = obj.sendUser;
                            receiveUser = obj.receiveUser;
                            sendUserInfo = obj.sendUserInfo;
                            starSend = obj.starSend;
                        } else {
                            sendUser = classConf.user.id;
                            receiveUser = classConf.user.id;
                            sendUserInfo = classConf.user;
                            starSend = '0';
                        }

                        message = {
                            method: obj.method ? obj.method : '',
                            syncAction: syncAction,
                            user: classConf.user,
                            sendUser: sendUser,
                            receiveUser: receiveUser,
                            sendUserInfo: sendUserInfo,
                            classStatus: classStatus,
                            starSend: starSend,
                            type: 'sync',
                            questionType: obj.questionType ? obj.questionType : '',
                            tplate: obj.tplate
                        };
                        break;
                    case 'resultSync':

                        var receiveUser = obj.receiveUser;
                        var sendUser = obj.sendUser;
                        var sendUserInfo = obj.sendUserInfo;
                        var starSend = obj.starSend;

                        // if(obj.sendUser != obj.receiveUser) {
                        //     receiveUser = obj.receiveUser;
                        // } else {
                        //     receiveUser = classConf.user.id;
                        // }

                        message = {
                            operate: obj.operate,
                            syncAction: {
                                index: obj.index,
                                resultData: obj.resultData,
                                syncName: obj.syncName
                            },
                            user: classConf.user,
                            sendUser: sendUser,
                            receiveUser: receiveUser,
                            sendUserInfo: sendUserInfo,
                            classStatus: classStatus,
                            starSend: starSend,
                            type: 'resultSync',
                            questionType: obj.questionType ? obj.questionType : '',
                            tplate: obj.tplate
                        };
                        // console.log('resultSync 22222222222222222-----333333333333------------------------------>%s', JSON.stringify(message));

                        break;
                    default:
                        message = {};
                }

                if(this.reportSwitch == '1') {
                    var qTypes = ['TM', 'TS', 'TF', 'TX', 'T', 'TB', 'TD'];
                    if ( type == 'sync' ) {
                        if ( qTypes.indexOf(message.questionType) != -1 && h5SyncActions.classConf.h5Course.classStatus != '0' ) {
                            parent.window.dataReport && parent.window.dataReport.tracking.sendTemplateInfo(message, type)
                        }
                    } else if ( type == 'resultSync' ) {
                        if ( h5SyncActions.classConf.h5Course.classStatus == '2' ) {
                            parent.window.dataReport && parent.window.dataReport.tracking.sendTemplateInfo(message, type)
                        }
                    } 
                }

                return h5SyncActions.buildSvcMsgData(message, type);
                
            },

            actEvent: function (message) {
                var method = message.data[0].value.method;
                var syncAction = message.data[0].value.syncAction;
                var index = syncAction.index;
                var syncName = syncAction.syncName;

                //事件触发目标元素target

                var targetEle = $("[data-syncactions=" + index + "]");

                if (method == 'event') {
                    targetEle.trigger(syncName, message);
                    return false;
                }

                if (method == 'drag') {
                    var pos = {
                        left: syncAction.left,
                        top: syncAction.top,
                        pageX: syncAction.pageX,
                        pageY: syncAction.pageY
                    };
                    targetEle.trigger(syncName, pos);
                    return false;
                }
            },

            //新添加结果时间触发
            actResultEvent: function (message) {
                var syncAction = message.data[0].value.syncAction;
                var index = syncAction.index;
                var syncName = syncAction.syncName;

                //事件触发目标元素target
                var targetEle = $("[data-syncresult=" + index + "]");

                //syncResultClick
                targetEle.trigger(syncName, message);
            },

            setEventLock: function () {
                h5SyncActions.setEventUnlocked();
            },

            bindSyncEvt: function (obj) {
                /**
                 * obj
                 sendUser: '',
                 receiveUser: '',
                 index: $(e.currentTarget).data('syncactions'),
                 eventType: 'click',
                 method: 'event',
                 syncName: 'syncItemClick'
                 */

                var message = this.buildSvcMsgData(obj, 'sync');

                var classStatus = message.data[0].value.classStatus;
                if (classStatus == '1' || classStatus == '2') {
                    h5SyncActions.addSendMessage(message);
                    h5SyncActions.addEventQueue(message); // trigger event click ---> bindSyncResultEvt
                } else {
                    h5SyncActions.addEventQueue(message);
                }
            },

            //新添加结果同步数据封装
            bindSyncResultEvt: function (obj) {
                var message = this.buildSvcMsgData(obj, 'resultSync');
                var classStatus = message.data[0].value.classStatus;
                if (classStatus == '2') {
                    h5SyncActions.addEventQueue(message);
                }
            }

        };
        window.SDK = sdk;
    } else {
        window.SDK = {
            getUserType: function () {
                return "tea";
            },
            setEventLock: function () {
            },
            log: function () {
                console.log('---------sdk log------------');
            }
        };
    }
})();