import { classConf } from "./classConf";
import { common } from "./common";
let gTypes =  [
    'openStarPage',
    'shareSingle',
    'shareFour',
    'screenSelected',
    'screenPaging',
    'showSingleStuWindow',
    'showStuWindow',
    'openWbToolAuthority',
    'showWB', 
    'starting',
    'free',
    'firstInto',
    'practice',
    'clickCard',
    'coursePaging',
    'partComplete',
    'bgMove'/* ,
    'sync' */
]
window.gTypes = gTypes;
let sendOrReceive = {
    localIdNum: gTypes.length, // gTypes数组长度
    /**
     * 模板间接调用队列
     */
    addEventQueue: function (message) {
        window.EventQueue.addEventQueue(message);
    },

    setEventUnlocked: function () {
        window.EventQueue.executeEventQueue();
    },


    /**
     * 课件中白板数据封装（h5模板sdk中也会调用）
     */
    buildMsgData: function (json, type) {
        json['currentCardId'] = classConf.h5Course.course_card_id;
        json['currentCardPageNum'] = classConf.h5Course.course_localPage;

        return {
            type: type,
            CID: classConf.course.id,
            textBookID: '1',
            textBookType: '1',
            page: common.toString(classConf.h5Course.localPage),
            operate: json.operate != undefined ? json.operate : '1',
            // operate: '1',
            data: [{
                // localID: '',
                value: json,
                byteData: '',//给空
                byteDataLength: ''//给空
            }]
        }
    },

    /**
     * 构建状态覆盖式数据
     */
    buildStatusData: function (json) {

        return {
            type: json.type,
            CID: classConf.course.id,
            operate: json.operate != undefined ? json.operate : '1',
            data: [{
                key: json.key,
                value: json.value,
                ownerUID: classConf.user.id
            }]
        }

    },

    addSendMessage: function (message) {
        common.logPrint('---------addSendMessage---------', JSON.stringify(message));

        
        if (message.data[0].value.sendUser == message.data[0].value.receiveUser) {

            this.localIdNum = this.localIdNum + 1;
            message.data[0].value.localIDNum = this.localIdNum;

            if (classConf.course.switchMsgLine == 'game') {// 发送socket包
                let func = "00001000";
                let meta = 1;
                let dataNum = 1;
                let typeIndex =gTypes.indexOf(message.type) + 1;
                if ( typeIndex >= 0) {
                    dataNum  = typeIndex;
                    meta = typeIndex;
                } else {
                    meta = gTypes.length+1;
                    dataNum = this.localIdNum;
                }

                //关系过程
                window.sdk_game.doSend({
                    portParent: 3,
                    func: func,
                    target: classConf.course.id,
                    dataNum: dataNum,
                    meta: meta,
                    body: JSON.stringify(message)
                });

            } else {
                let typeIndex = gTypes.indexOf(message.type);
                let sendData = {};
                
                this.addEventQueue(message);
                
                if (typeIndex >= 0) {
                    let msgVal = message.data[0].value;
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
    wbAddData: function (message) {
        let self = this;
        this.localIdNum = this.localIdNum + 1;
        message.data[0].value.localIDNum = this.localIdNum;
        if(classConf.course.switchMsgLine == 'game') {
            message.type = 'wb';
            window.sdk_game.doSend({
                portParent: 3,
                func: "00001000",
                target: classConf.course.id,
                dataNum: self.localIdNum ,
                meta:gTypes.length + 2,
                body: JSON.stringify(message)
            });

        } else {
            window.H5SDK.sendDataToClient.wbAddData(message);
        }
    },

    wbClearData: function (message) {
        let self = this;
        this.localIdNum = this.localIdNum + 1;
        // message.data[0].value.localIDNum = this.localIdNum;
        if(classConf.course.switchMsgLine == 'game') {
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

    wbEditData: function (message) {
        let self = this;
        this.localIdNum = this.localIdNum + 1;
        message.data[0].value.localIDNum = this.localIdNum;
        if(classConf.course.switchMsgLine == 'game') {
            message.type = 'wb';
            window.sdk_game.doSend({
                portParent: 3,
                func: "00001000",
                target: classConf.course.id,
                dataNum: self.localIdNum,
                meta: gTypes.length + 2,
                body: JSON.stringify(message)
            });

        } else {
            window.H5SDK.sendDataToClient.wbAddData(message);
        }
    }
    
}

window.sendOrReceive = sendOrReceive;
export { sendOrReceive }