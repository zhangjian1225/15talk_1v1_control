import { classConf } from "./classConf";
import { common } from "./common";
import { syncActions } from "./syncActions";
import { cardsJson } from "./pathJson";
import { sendOrReceive } from "./sendOrReceive";

var h5_course = {
    courseAudios: {},
    courseCard: {},


    init: function (cardId) {
        this.initCardData(cardId);

        // this.bindEvent();
    },

    initCardData: function (cardId) {
        let cardData = common.findCardById(cardsJson, cardId);
        // classConf.h5Course.course_card = cardData;

        this.courseCard = cardData;
    },


    /**
     * 更新对应关卡的装备信息
     */
    updateCardEquip: function () {
        if (classConf.user.type == 'stu') {
            window.gameUser.setUserRank(this.courseCard.rank);
            let equipment = common.findEquipmentById(window.equipments, this.courseCard.id);
            equipment.setVisible(true);
        }
    },


    courseShow: function () {
        $('#h5_course_part').removeClass('hide');
        $('#mask').removeClass('mask-full');
        //初始化画板大小
        $('#h5_course_part').unbind().bind('animationend webkitAnimationEnd', function () {
            syncActions.initDrawBoxSize();
        });

    },

    /**
     * 教材翻页
     */
    coursePaging: function (type, currentPage) {

        let self = this;

        // let practiceButton = $('#h5_btn_practice');

        let userType = classConf.user.type;
        let isSend = false;//是否要发送出去
        let countNum = common.toInt(this.courseCard.info.total);
        
        let temPage = common.toInt(classConf.h5Course.course_localPage);

        switch (type) {
            case 'prev':
                temPage = common.toInt(classConf.h5Course.course_localPage) - 1;
                temPage = (temPage > 0) ? temPage : temPage + 1;
                classConf.h5Course.course_localPage = temPage;
                isSend = true;

                handleRootPageLogic();

                if (userType == 'tea') {
                    //清空画布
                    syncActions.nowWBTar.draw("clear");
                } else if (userType == 'stu') {
                    
                    
                } else {

                }

                break;
            case 'next':
                temPage = common.toInt(classConf.h5Course.course_localPage) + 1;
                temPage = (temPage <= countNum) ? temPage : temPage - 1;
                classConf.h5Course.course_localPage = temPage;
                isSend = true;

                handleRootPageLogic();

                if (userType == 'tea') {
                    //清空画布
                    syncActions.nowWBTar.draw("clear");
                } else if (userType == 'stu') {
                    
                    
                } else {

                }

                break;
            // case 'set':
            //     classConf.h5Course.course_localPage = common.toInt(currentPage);
            //     temPage = common.toInt(currentPage);
            //     isSend = false;
            //     break;
            case 'go':
                classConf.h5Course.course_localPage = common.toInt(currentPage);
                temPage = common.toInt(currentPage);
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
                if(isSend) {
                    // practiceButton.removeClass('hide');
                    //恢复开始上课状态
                    let msgData = sendOrReceive.buildStatusData({
                        type: 'starting',
                        key: 'classStatus',
                        value: {
                            classStatus: '1'
                        }
                    });
                    sendOrReceive.addSendMessage(msgData);
        
                    // 翻页
                    let pageData = sendOrReceive.buildStatusData({
                        type: 'coursePaging',
                        key: 'coursePaging',
                        value: {
                            currentPage: common.toString(classConf.h5Course.course_localPage),
                            cardId: self.courseCard.id
                        }
                    });
                    sendOrReceive.addSendMessage(pageData);
                }
            } else if(userType == 'stu') {
                // 翻页
                let pageData = sendOrReceive.buildStatusData({
                    type: 'coursePaging',
                    key: 'coursePaging',
                    value: {
                        currentPage: common.toString(classConf.h5Course.course_localPage),
                        cardId: self.courseCard.id
                    }
                });
                sendOrReceive.addEventQueue(pageData);
            } else {

            }
        }



        
    },

    pageSet: function (currentPage) {
        let frames = $("iframe[frame_load_status]");
    

        classConf.h5Course.course_localPage = common.toInt(currentPage);

        let btn_page_prev = $('#h5_course_page_prev');
        let btn_page_next = $('#h5_course_page_next');

        let countNum = common.toInt(this.courseCard.info.total);

        let temPage = common.toInt(classConf.h5Course.course_localPage);

        //重新改变加载标示
        frames.attr('frame_load_status', '0');
        // common.showPageLoading();

        //教材开始加载时间
        classConf.h5Course.pageLoadStartTime = new Date().getTime();
        console.log('页面加载开始的时间点是 classConf.h5Course.pageLoadStartTime----------------->%s', classConf.h5Course.pageLoadStartTime);

        //分页按钮处理
        btn_page_prev.removeClass('disabled');
        btn_page_next.removeClass('disabled');
        if (temPage == 1) {
            btn_page_prev.addClass('disabled');
        } else if (temPage == countNum) {
            btn_page_next.addClass('disabled');
        }

        //页面加载地址
        let pageUrl = this.getPageUrl(common.toInt(temPage));
        let targetFrame = $('#h5_course_self_frame');
        targetFrame.attr("src", pageUrl);

    },

    /**
     * 获取课件页面地址
     */
    getPageUrl: function (page) {
        let countNum = common.toInt(this.courseCard.info.total);

        if (page >= countNum) {
            page = countNum;
        }

        let pageNum = this.courseCard.info.src[page];

        let pageUrl = classConf.url.h5Course.headUrl.replace(/\/(\d{2})\//g, function () {
            return '/' + pageNum + '/'
        });

        return pageUrl;
    },

    buildCourseAudio: function (courseAudioObj) {
        courseAudioObj.forEach(function (item) {
            createjs.Sound.registerSound(item.src, item.name);
        });
    },

    //播放单个不循环音频
    playSound: function (soundId) {
        createjs.Sound.play(soundId);
    }
};
window.h5_course = h5_course;
export { h5_course }