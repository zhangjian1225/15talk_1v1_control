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
window.EventQueue = EventQueue;
