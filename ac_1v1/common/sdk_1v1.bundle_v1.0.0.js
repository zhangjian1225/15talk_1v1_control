/**
 * 全局变量空间
 * add：暴露H5SendToClient方法供js向c++通信 2018/3/1
 * add: 切换教材协议 restartclassroom
 */

var SDK = {
    classConf: {},
    callFuc: null,
    setConfig: function (conf) {
        console.log('h5sdk init start');
        this.classConf = conf;
    }
};

window.H5SDK = SDK;

/**
 * 工具方法
 */

window.H5SDK.globalCommon = {
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
        var result = {};
        for (var key in source) {
            result[key] = Object.prototype.toString.call(source[key]) === '[object Object]' ? globalCommon.deepCopy(source[key]) : source[key];
        }
        return result;
    },

    /**
     * 首字母大写
     */
    capital: function (name) {
        return name.charAt(0).toUpperCase() + name.substr(1);
    }

};

var globalCommon = window.H5SDK.globalCommon;

/**
 * Created by shaoyongkai on 2017/12/01.
 * 说明：
 *      通讯模块
 *      主要用于与客户端进行IO通讯，并做信令节流和容错机制
 *      之后可以考虑抽象成统一模块
 */

var timeCheck = 10;//定义节流信令的时间间隔
var MAX_NUM = 500;//最大信令存放数
var serverIArr = [];//用于数据节流中进入的服务器相关数据的临时存放
var serverOArr = [];//用于数据节流中输出的服务器相关数据的临时存放
// var callFuc = null;//用于记录回调数据的函数
var firstLoad = true;//添加监视函数
var seeTime = 5000;//5s检测一次

//新版本消息处理参数
var h5JSConf = {
    jsToCTimer: 0,
    jsToCTime: 300,
    cToJsChildTaskEnd: true,
    jsToCArr: [],
    cToJsCacheArr: []
};

//信令节流 统一管理进和出
var checkInfo = {
    timerIn: null,//用于存储消费进入数据的时间函数
    timerOut: null,//用于存储消费输出数据的时间函数
    outLen: 0,//用于记录输出的协议长度
    //生产者
    product: function (io, type, obj) {
        var temData = {
            type: type,
            data: obj
        };

        if (io == 'i') {
            //添加守护进程
            if (firstLoad) {
                firstLoad = false;
                setInterval(function () {
                    if (checkInfo.timerIn != null) {
                        if (serverIArr.length != 0) {
                            window.clearInterval(checkInfo.timerIn);
                            checkInfo.timerIn = null;
                            checkInfo.processCreate('i');
                        }
                    }
                }, seeTime);
            }
            serverIArr.push(temData);
            if (serverIArr.length == 1 || checkInfo.timerIn == null) {
                checkInfo.processCreate('i');
            }
        } else if (io == 'o') {
            //限制输出最大消息数量
            if (serverOArr.length >= MAX_NUM) {
                globalCommon.logOnlinePrint("error happened : serverO's length is maximum!", 'warn');
                return;
            }
            serverOArr.push(temData);
            if (serverOArr.length == 1 || checkInfo.timerOut == null) {
                checkInfo.processCreate('o');
            }
        }
    },
    //进程创建
    processCreate: function (type) {
        //函数节流
        if (type == 'i') {
            checkInfo.timerIn = setInterval(function () {
                try {
                    var tem = checkInfo.deepCopy(serverIArr.shift());
                    if (tem) {
                        checkInfo.consume(type, tem);
                    }
                } catch (e) {
                } finally {
                    if (serverIArr.length == 0 && checkInfo.timerIn) {
                        clearInterval(checkInfo.timerIn);
                        checkInfo.timerIn = null;
                    }
                }
            }, timeCheck)
        } else if (type == 'o') {
            checkInfo.timerOut = setInterval(function () {
                try {
                    var tem = checkInfo.deepCopy(serverOArr.shift());
                    if (tem) {
                        checkInfo.consume(type, tem);
                    }
                } catch (e) {
                } finally {
                    if (serverOArr.length == 0 && checkInfo.timerOut) {
                        clearInterval(checkInfo.timerOut);
                        checkInfo.timerOut = null;
                    }
                }
            })
        }
    },
    //消费者
    consume: function (type, obj) {
        if (type == 'i') {
            //数据是收到的数据  发给调用者
            if (window.H5SDK.callFuc) {
                window.H5SDK.callFuc(obj.type, obj.data);
            } else {
                globalCommon.logOnlinePrint('error happened when send to caller : callback is null', 'warn');
            }
        } else if (type == 'o') {
            //数据是发出的数据
            sendToClient(obj.type, obj.data);
        }
    },
    //深度拷贝
    deepCopy: function (source) {
        var result = {};
        for (var key in source) {
            result[key] = Object.prototype.toString.call(source[key]) === '[object Object]' ? globalCommon.deepCopy(source[key]) : source[key];
        }
        return result;
    }
};

//映射函数  协议开发
var sendDataToClient = {
    //发送数据接口
    //全局设置协议
    gSetData: function (obj) {
        checkInfo.product('o', 'gSetData', obj);
    },

    //白板协议  add
    wbAddData: function (obj) {
        checkInfo.product('o', 'wbAddData', obj);
    },

    //白板协议  delete
    wbDelData: function (obj) {
        checkInfo.product('o', 'wbDelData', obj);
    },

    //白板协议  edit
    wbEditData: function (obj) {
        checkInfo.product('o', 'wbEditData', obj);
    },

    //白板协议  clear
    wbClearData: function (obj) {
        checkInfo.product('o', 'wbClearData', obj);
    },

    //白板协议  request
    wbReqData: function (obj) {
        checkInfo.product('o', 'wbReqData', obj);
    },

    //教材数据协议  add
    clAddData: function (obj) {
        checkInfo.product('o', 'clAddData', obj);
    },

    //教材数据协议  delete
    clDelData: function (obj) {
        checkInfo.product('o', 'clDelData', obj);
    },

    //教材数据协议   edit
    clEditData: function (obj) {
        checkInfo.product('o', 'clEditData', obj);
    },

    //教材数据协议  clear
    clClearData: function (obj) {
        checkInfo.product('o', 'clClearData', obj);
    },

    //教材数据协议   request
    clReqData: function (obj) {
        checkInfo.product('o', 'clReqData', obj);
    },

    //翻页协议  page
    pageData: function (obj) {
        checkInfo.product('o', 'pageData', obj);
    },

    //滚动条协议  scroll
    scrollData: function (obj) {
        checkInfo.product('o', 'scrollData', obj);
    },

    //星星协议  star
    starData: function (obj) {
        checkInfo.product('o', 'starData', obj);
    },

    //通用通知协议  notify
    notifyData: function (obj) {
        checkInfo.product('o', 'notifyData', obj);
    },

    //教材区域通知 courseAreaData
    courseAreaData: function (obj) {
        checkInfo.product('o', 'courseAreaData', obj)
    },

    //切换教材协议
    restartclassroom: function (obj) {
        checkInfo.product('o', 'restartclassroom', obj)
    }
};

//服务器数据入口
window.comm_type_get = function (type, json) {
    var wt = ['user', 'course', 'url', 'appointMemberList', 'courseAll', 'userAll', 'pageData', 'boardSet', 'gSetData', 'toolsColorSet', 'notifyData'];
    if (wt.indexOf(type) != -1) {
        globalCommon.logOnlinePrint('receive data from c++', 'log');
        globalCommon.logOnlinePrint(type, 'log');
        globalCommon.logOnlinePrint(json, 'log');
    }

    //转OBJ
    if (typeof(json) == "string") {
        json = JSON.parse(json);
    }
    checkInfo.product('i', type, json);
};

//服务器数据消费v2
function consumeServerData(data, posi, posj) {
    //先置哨兵为false
    h5JSConf.cToJsChildTaskEnd = false;
    var i = 0,
        j = 0,
        pi = posi,
        pj = posj,
        runArr = [],
        childArr = [],
        childLen = 0,
        childIndex = -1,
        isBFalse = false, //为了区别是不是Base64 decode失败
        isCFalse = false; //为了避免try catch到c++的错误，造成死机制循环

    /**
     * 初始化数据 分两种情况
     * 一种是第一次执行或者完整执行一次consumeServerData后发现cToJsCacheArr还有新的数据加入继续执行
     * 一种是在完整执行一次consumeServerData函数的时候出现错误，继续执行下一次
     */

    if (data == undefined) {
        //第一种情况
        runArr = h5JSConf.cToJsCacheArr.splice(0);
        pi = 0;
        pj = 0;
    } else {
        //第二种情况
        runArr = data;
    }

    var runLen = runArr.length, type = '', value = null;

    // debugger; //设置断点

    try {
        for (i = pi; i < runLen; i++) {
            childIndex = runArr[i].dataIndex;

            console.log('===========test encode================>consumeServerData 当前执行:');
            console.log(childIndex);

            isBFalse = true;
            childArr = JSON.parse(MyBase64.decode(runArr[i].data));
            isBFalse = false;

            childLen = childArr.length;
            for (j = pj; j < childLen; j++) {
                type = childArr[j].type;
                value = childArr[j].value;
                // console.log('~~~~~~~' + childIndex + '~~~~~~~~~~~~' + j + '~~~~~~~~~~');
                if (type != undefined && value != undefined) {
                    window.H5SDK.callFuc(type, JSON.parse(value)); //调用h5接收数据时对应的处理方法
                } else {
                    if (type == undefined) throw "type is undefined!";
                    if (value == undefined) throw "value is undefined!";
                }
            }

            //还原pj，保证下次for时从0开始，避免漏掉数据
            pj = 0;

            //每成功消费一次arr数据和c++握手一次
            isCFalse = true;
            window.comm_type_get_encode_back && window.comm_type_get_encode_back('complete', JSON.stringify({index: childIndex}));
            isCFalse = false;
        }
    } catch (e) {
        console.warn('|-------------consumeServerData---------->消费服务器数据时出错!');
        console.warn(e);

        if (isBFalse) {
            console.log('===========test encode================>consumeServerData Base64出错');
            //假如是Base64造成的出错
            window.comm_type_get_encode_back && window.comm_type_get_encode_back('BaseError', JSON.stringify({
                index: childIndex,
                errorInfo: e
            }));
            window.comm_type_get_encode_back && window.comm_type_get_encode_back('complete', JSON.stringify({index: childIndex}));
            return consumeServerData(runArr.slice(0), ++i, j);
        }

        if (!isCFalse) {//确保不是c++的错误触发try catch机制
            console.log('===========test encode================>consumeServerData 处理数据出错');
            //在消费每一次的数据的时候出现任何问题都要进行告知c++
            window.comm_type_get_encode_back && window.comm_type_get_encode_back('DataError', JSON.stringify({
                index: childIndex,
                errorInfo: e,
                errorPosition: j  //不能直接给错误数据，因为可能是decode或者Json.parse引起的错误，而且数据量还会大
            }));
            //在消费每一次的数据的时候出现任何问题后，确保下一条数据的正确执行  return是为了不会重复消费
            return consumeServerData(runArr.slice(0), i, ++j);
        }

        console.log('===========test encode================>consumeServerData 其他错误！');
    }

    // setTimeout(function () {
    console.log('!!!!!!!!!!!!!!test encode!!!!!!!!!!!!!!!!!!!!!!!!>consumeServerData 结束一次！');
    //保证所有的缓存数据都被消费掉
    if (h5JSConf.cToJsCacheArr.length > 0) {
        //消费数据的同时有新数据传入
        consumeServerData();
    } else {
        //表示这次的消费截止了
        console.log('===========test encode================>consumeServerData 运行完，重设task状态！');
        h5JSConf.cToJsChildTaskEnd = true;
    }
    // },500);
}

//服务器数据入口v2
window.comm_type_get_encode = function (dataIndex, arrStr) {
    try {
        h5JSConf.cToJsCacheArr.push({
            dataIndex: dataIndex,
            data: arrStr
        });
        console.log('===========test encode================>comm_type_get_encode enter:');
        console.log(h5JSConf.cToJsCacheArr.length);
        if (h5JSConf.cToJsChildTaskEnd) {
            console.log('===========test encode================>comm_type_get_encode 上次任务已经结束:');
            //消费cache数据
            consumeServerData();
        } else {
            console.log('===========test encode================>comm_type_get_encode 上次任务尚未结束:');
        }
    } catch (e) {
        console.warn('|-------------comm_type_get_encode---------->消费服务器数据时出错!');
        console.warn(e);
    }
};

//服务器数据出口（c++/mac/ios/....）  用于js向c++通信
var sendToClient = function (type, jsonStr) {
    var wt = ['pageData', 'boardSet', 'gSetData', 'toolsColorSet', 'notifyData'];
    if (wt.indexOf(type) != -1) {
        globalCommon.logOnlinePrint('send data to c++', 'log');
        globalCommon.logOnlinePrint(type, 'log');
        globalCommon.logOnlinePrint(jsonStr, 'log');
    }

    //防止发obj给c++
    if (typeof(jsonStr) == "object") {
        jsonStr = JSON.stringify(jsonStr);
    }

    /**
     * 消息并发新方案改版v2
     * 介绍：每300ms发送消息到服务器
     * classConf 中添加 isSupportEncodeFunc 开关
     * ac 客户端 提供 window.AcJs_get_encode 新方法
     */

    if (SDK.classConf.isSupportEncodeFunc) {
        try {
            h5JSConf.jsToCArr.push({
                type: type,
                value: JSON.parse(jsonStr)
            });
            //判断当前是否在时间段内
            if (h5JSConf.jsToCTimer == 0) {
                //未在时间段内，启动监听
                h5JSConf.jsToCTimer = window.setTimeout(function () {
                    try {
                        var targetData = JSON.stringify(h5JSConf.jsToCArr.splice(0));
                        if (window.AcJs_get_encode) {
                            window.AcJs_get_encode(targetData);
                        } else if (window.webkit) {

                        } else {
                        }
                    } catch (e) {
                        console.warn('-------------isSupportEncodeFunc---------->发送到客户端时出错!');
                        console.warn(e);
                    } finally {
                        //还原状态
                        window.clearTimeout(h5JSConf.jsToCTimer);
                        h5JSConf.jsToCTimer = 0;
                    }
                }, h5JSConf.jsToCTime);
            }
        } catch (e) {
            console.log('failed to send data to client:', Date.now(), e);
        }
    } else {
        if (window.AcJs_get) {
            //ac use
            window.AcJs_get(type, jsonStr);
        } else if (window.webkit) {
            //mac ios use
            window.webkit.messageHandlers.AcJs_get.postMessage(JSON.stringify({type: type, value: jsonStr}));
        } else {
            globalCommon.logOnlinePrint('function is undefined!!!', 'warn');
        }
    }

};

//add：暴露H5SendToClient方法供js向c++通信
window.H5SendToClient = sendToClient;

SDK.sendDataToClient = sendDataToClient;

/**
 * 队列操作
 *
 */
var EventQueue = {
    queueArr: [],

    /**
     * 添加队列
     */
    addEventQueue: function (message) {
        if (message.type) {
            var queue = this.queueArr;
            queue.push(message);
            if (queue.length == 1) {
                this.executeEventQueue();
            }
        }
    },
    /**
     * 释放当前队列
     */
    setEventUnlocked: function () {
        this.executeEventQueue();
    },

    /**
     * 执行对列
     */
    executeEventQueue: function () {
        var queue = this.queueArr;
        if (queue.length) {
            try {
                var message = queue.shift();
                var type = globalCommon.capital(message.type);
                var actionFn = window.h5SyncActions['run' + type];
                if (typeof actionFn === 'function') {
                    actionFn.call(window.h5SyncActions, message);
                } else {
                    //直接解锁
                    console.warn('error', type, JSON.stringify(message));
                    this.setEventUnlocked();
                }
            } catch (e) {
                //如果出错 则直接解锁下次消费
                console.warn('error', type, JSON.stringify(message), e);
                this.setEventUnlocked();
            }
        }
    },
};
SDK.EventQueue = EventQueue;

/**
 * 路由
 */
var router = {

    /**
     * 全局数据
     */
    setGlobalData: function (json) {
        var type = '';
        if (json.data.length > 0) {
            json.data.forEach(function (item) {
                switch (item.key) {
                    case 'classStatus':
                        switch (item.value + '') {
                            case '1':
                                type = 'starting';
                                break;
                            case '2':
                                type = 'practice';
                                break;
                            case '0':
                                type = 'free';
                                break;
                        }
                        json.data = [item];
                        this.adaptData(json, {
                            'type': type
                        });
                        break;
                    case 'showWB':
                        type = 'showWB';
                        json.data = [item];
                        this.adaptData(json, {
                            'type': type
                        });
                        break;
                    case 'openWbToolAuthority':
                        type = 'openWbToolAuthority';
                        json.data = [item];
                        this.adaptData(json, {
                            'type': type
                        });
                        break;
                    case 'showStuWindow':
                        type = 'showStuWindow';
                        json.data = [item];
                        this.adaptData(json, {
                            'type': type
                        });
                        break;
                    case 'showSingleStuWindow':
                        type = 'showSingleStuWindow';
                        json.data = [item];
                        this.adaptData(json, {
                            'type': type
                        });
                        break;
                    case 'screenPaging':
                        type = 'screenPaging';
                        json.data = [item];
                        this.adaptData(json, {
                            'type': type
                        });
                        break;
                    case 'screenSelected':
                        type = 'screenSelected';
                        json.data = [item];
                        this.adaptData(json, {
                            'type': type
                        });
                        break;
                    case 'shareFour':
                        type = 'shareFour';
                        json.data = [item];
                        this.adaptData(json, {
                            'type': type
                        });
                        break;
                    case 'shareSingle':
                        type = 'shareSingle';
                        json.data = [item];
                        this.adaptData(json, {
                            'type': type
                        });
                        break;
                }
            }.bind(this));
        }
    },

    /**
     * 成员变更数据
     */
    updateUserState: function (json) {
        var obj = {
            'type': 'updateUser'
        };
        this.adaptData(json, obj);
    },

    /**
     * 翻页数据
     */
    setPageData: function (json) {
        var obj = {
            'type': 'paging'
        };
        this.adaptData(json, obj);
    },

    /**
     * 滚动条数据
     */
    setScrollBarData: function (json) {
        // json = {
        //     CID: SDK.classConf.course.id,
        //     textBookID: '1',
        //     textBookType: '1',
        //     page: '',
        //     data: {
        //         SXData: {},
        //         SYData: {}
        //     }
        // };
    },

    /**
     * 星星数据
     */
    setStarData: function (json) {
        this.adaptData(json, {
            'type': 'stars'
        });
    },

    /**
     * 通用通知数据
     */
    setGeneralNoticeData: function (json) {
        this.adaptData(json, {
            'type': 'generalNotice'
        });

    },

    /**
     * 白板协议数据
     * Wb-->whiteboard Cl-->Class 画板增删改查，课中同步统一调用此方法
     */
    setWbData: function (json) {
        var type = json.operate;
        /**
         1：Add
         2：Delete
         3：Edit
         4：Clear
         5：Syn
         */
        var obj = {
            'type': 'wb'
        };
        var fixJson = json;

        switch (type + '') {
            case '1':
                if (json.data) {
                    json.data.forEach((item, index) => {
                        json.data[index].value.receiveUser = SDK.classConf.user.id;
                        this.adaptData(json, obj);
                    });
                }
                break;
            case '2':
                this.adaptData(json, obj);
                break;
            case '3':
                this.adaptData(json, obj);
                break;
            case '4':
                this.adaptData(json, obj);
                break;
            case '5':
                if (json.data) {
                    json.data.forEach((item) => {
                        fixJson.data = [];
                        fixJson.data.push(item);
                        this.adaptData(fixJson, obj);
                    });
                }
                break;
        }
    },
    /**
     * 白板数据协议号返回数据
     * 校对id,保证本地与svc服务器ID号一致
     */
    setWbDataSvcID: function (json) {
        this.adaptData(json, {
            'type': 'wbBack'
        });
    },

    /**
     * 课中协议数据
     * Wb-->whiteboard Cl-->Class 画板增删改查，课中同步统一调用此方法
     */
    setClData: function (json) {
        var type = json.operate;
        /**
         1：Add
         2：Delete
         3：Edit
         4：Clear
         5：Syn 同步（第一次进入教室下发，按页码请求下发）
         */
        var obj = {
            'type': 'cl'
        };
        var fixJson = json;

        switch (type + '') {
            case '1':
                if (json.data) {
                    json.data.forEach((item, index) => {
                        json.data[index].value.receiveUser = SDK.classConf.user.id;
                        if (item.value.type == 'sync') {
                            this.adaptData(json, {
                                'type': 'sync'
                            });
                        } else if (item.value.type == 'resultSyncStu') {
                            this.adaptData(json, {
                                'type': 'resultSyncStu'
                            });
                        } else if (item.value.type == 'recordAudio') {
                            this.adaptData(fixJson, {
                                'type': 'recordAudio'
                            });
                        } else if (item.value.type == 'resultRecord') {
                            this.adaptData(fixJson, {
                                'type': 'resultRecord'
                            });
                        } else {

                        }
                    });
                }
                break;
            case '2':
                this.adaptData(json, obj);
                break;
            case '3':
                this.adaptData(json, obj);
                break;
            case '4':
                this.adaptData(json, obj);
                break;
            case '5':
                //新版本数据恢复逻辑修改v2
                if (json.data) {

                    console.log('json.data----------->%s', JSON.stringify(json.data));

                    let syncRecoveryData = [];
                    let otherData = [];
                    let allRecoverData = [];

                    json.data.forEach((item) => {
                        if (item.value.type == 'sync') {
                            syncRecoveryData.push(item);
                        } else {
                            otherData.push(item)
                        }
                    });

                    //sync唯一数据
                    let isRecovery = syncRecoveryData.find(function (item) {
                        return item.value['recoveryMode'] == '1';
                    });

                    if(isRecovery != undefined) {
                        syncRecoveryData = syncRecoveryData.slice(syncRecoveryData.length - 1);
                    }

                    allRecoverData = syncRecoveryData.concat(otherData);

                    console.log('allRecoverData----------->%s', JSON.stringify(allRecoverData));

                    allRecoverData.forEach((item) => {
                        item.value.receiveUser = SDK.classConf.user.id;
                        fixJson.data = [];
                        fixJson.data.push(item);

                        if (item.value.type == 'sync') {
                            item.value.starSend = '1'; //兼容旧的发星星的逻辑
                            this.adaptData(fixJson, {
                                'type': 'sync'
                            });
                        }

                        //学生
                        // else if (item.value.type == 'resultSyncStu') {
                        //     this.adaptData(fixJson, {
                        //         'type': 'resultSyncStu'
                        //     });
                        // } else if (item.value.type == 'recordAudio') {
                        //     this.adaptData(fixJson, {
                        //         'type': 'recordAudio'
                        //     });
                        // } else if (item.value.type == 'resultRecord') {
                        //     this.adaptData(fixJson, {
                        //         'type': 'resultRecord'
                        //     });
                        // }
                        else {

                        }
                    });


                    /*json.data.forEach((item) => {
                        item.value.receiveUser = SDK.classConf.user.id;
                        item.value.starSend = '1'; //兼容旧的发星星的逻辑
                        fixJson.data = [];
                        fixJson.data.push(item);
                        if (item.value.type == 'sync') {
                            this.adaptData(fixJson, {
                                'type': 'sync'
                            });
                        } else if (item.value.type == 'resultSyncStu') {
                            this.adaptData(fixJson, {
                                'type': 'resultSyncStu'
                            });
                        } else if (item.value.type == 'recordAudio') {
                            this.adaptData(fixJson, {
                                'type': 'recordAudio'
                            });
                        } else if (item.value.type == 'resultRecord') {
                            this.adaptData(fixJson, {
                                'type': 'resultRecord'
                            });
                        } else {

                        }
                    });*/


                }
                break;
        }
    },

    /**
     * 白板和课中数据协议号返回数据
     * 校对id,保证本地与svc服务器ID号一致
     */
    setClDataSvcID: function (json) {
        this.adaptData(json, {
            'type': 'clBack'
        });
    },

    /**
     * 白板画笔颜色设置
     */
    setToolsColorData: function (json) {
        this.adaptData(json, {
            'type': 'colorSet'
        })
    },

    adaptData: function (json, obj) {
        var data = $.extend(json, obj);
        SDK.EventQueue.addEventQueue(globalCommon.deepCopy(data));
    }
};
SDK.router = router;

/**
 * Created by shaoyongkai on 2017/12/01.
 * 说明：
 *      主要用于接收通讯模块下发的数据，进行数据拆包和分发
 */
var logicUnpack = {
    //全局设置协议
    gSetData: function (obj) {
        if (obj.data && obj.data.length) {
            SDK.router.setGlobalData(obj);
        }
    },

    //成员变更协议
    memberChange: function (obj) {
        var changeID = [];//记录变动的uid
        try {
            if (obj.state) {
                var keyNameParent = obj.type + 'ID',
                    keyNameChild = obj.type + '_',
                    uid = '';
                SDK.classConf.userList[keyNameParent] || (SDK.classConf.userList[keyNameParent] = []);

                if (obj.state === 'enter') {
                    //成员进入
                    for (var v of obj.data) {
                        //寻找uid
                        uid = v.user.uid + '';
                        changeID.push(uid);
                        //记录在响应数组内
                        SDK.classConf.userList[keyNameParent].push(uid);
                        //更新对应的详细信息对象
                        SDK.classConf.userList[keyNameChild + uid] = v;
                    }
                }
                else if (obj.state === 'out') {
                    //成员离开
                    for (var v of obj.data) {
                        //寻找uid
                        uid = v.user.uid + '';
                        changeID.push(uid);
                        var curIndex = SDK.classConf.userList[keyNameParent].indexOf(uid);
                        if (curIndex != -1) {
                            //删掉数组内id 和 对应的对象
                            SDK.classConf.userList[keyNameParent].splice(curIndex, 1);
                            SDK.classConf.userList[keyNameChild + uid] = null;
                        } else {
                            console.warn('error happened when update userList (out) : remote non-existent id %s', uid);
                        }
                    }
                } else {
                    console.warn('error happened when update userList : unknow handle type %s', obj.state);
                    return;
                }
            }
            else {
                console.warn('error happened when update userList : unknow state when memberChange!');
                console.warn(obj);
                return;
            }
            var temObj = {
                // type: obj.type,
                role: obj.type,
                uid: changeID,//变更的用户id
                state: obj.state
            };
            SDK.router.updateUserState(temObj);
        } catch (e) {
            console.warn('error happened when update userList : %s', e);
        }
    },

    //星星通知协议
    starData: function (obj) {
        SDK.router.setStarData(obj);
    },

    //翻页协议
    pageData: function (obj) {
        if (obj.curPage) {
            SDK.router.setPageData(obj);
        }
    },

    //滚动条协议
    scrollData: function (obj) {
        if (obj.data && obj.data.SXData && obj.data.SXData != '') {
            SDK.router.setScrollBarData(obj);
        }
    },

    //白板协议
    wbData: function (obj) {
        //处理白板数据
        if ((obj.operate && obj.operate == 4) || (obj.data && obj.data.length != 0)) {
            SDK.router.setWbData(obj);
        }
    },

    //白板id返回协议
    wbBackData: function (obj) {
        if (obj.data) {
            SDK.router.setWbDataSvcID(obj);
        }
    },

    //教材数据协议
    clData: function (obj) {
        //处理白板数据
        if ((obj.operate && obj.operate == 4) || (obj.data && obj.data.length != 0)) {
            SDK.router.setClData(obj);
        }
    },

    //教材数据id返回协议
    clBackData: function (obj) {
        if (obj.data) {
            // SDK.router.setClDataSvcID(obj);
        }
    },

    //通用通知协议
    notifyData: function (obj) {
        SDK.router.setGeneralNoticeData(obj);
    },

    //画笔颜色初始化
    toolsColorSet: function (obj) {
        console.log('画笔颜色初始化', obj);
        if (obj.color && obj.color != '0') {
            SDK.router.setToolsColorData(obj);
            SDK.classConf.serverData.objBoardSetInfo = obj;
        }
    },

    /**
     * 语音sdk相关H5回调方法
     */
    H5RecordSuccessStart: function (obj) {
        window.H5Record.recordSuccessStart(obj);
    },

    H5RecordSuccessStop: function (obj) {
        window.H5Record.recordSuccessStop(obj);
    },

    H5RecordSuccessScore: function (obj) {
        window.H5Record.recordSuccessScore(obj);
    },

    H5RecordError: function (obj) {
        globalCommon.logOnlinePrint('H5RecordError', 'log');
        globalCommon.logOnlinePrint(obj, 'log');
    }
};
SDK.unpack = logicUnpack;



