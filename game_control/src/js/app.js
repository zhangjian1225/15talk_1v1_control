/**
 * Created by shaoyongkai on 2018/02/05.
 * 说明：
 *      应用程序模块
 */
import { classConf } from "./classConf";
import { sendOrReceive } from "./sendOrReceive";
import { common } from "./common";
import { cardsJson, equipmentJson, h5courseAudio, userJson } from "./pathJson";
import { syncActions } from "./syncActions";
import { h5_course } from "./course";
import { changeStyle } from "./animate";
import { Equipment } from "./equipment";
import { User } from "./user";
import { Hero } from "./hero";
import { Card } from "./card";
import { Btn } from "./btn";

/**
 * 全局资源配置
*/
let resourcesArr = [{
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
}, */ {
    id: "cap2",
    src: "image/cap2.png"
}, /* {
    id: "ying1",
    src: "image/ying1.png"
}, */ {
    id: "ying2",
    src: "image/ying2.png"
},/*  {
    id: "compass1",
    src: "image/compass1.png"
}, */ {
    id: "compass2",
    src: "image/compass2.png"
},/*  {
    id: "chuan1",
    src: "image/chuan1.png"
}, */ {
    id: "chuan2",
    src: "image/chuan2.png"
}];
let otherBgImg = [{
    id: "bg_two",
    src: "image/mapBg_two.png"
}, {
    id: "bg_two",
    src: "image/mapBg_three.png"
}]
let thisBgIndex = 0;
/**
 * 画布相关
*/
let stage; //舞台
let container; //大容器
let con_bg;//所有背景
let con_bgImg;//只放背景图片
let con_btn; //背景按钮
let bg_width;
let con_card; //所有的关卡容器
let con_hero; //所有英雄容器
let con_equip; //装备栏容器
let con_user; //用户

let user;
let btnRight;
let btnLeft;
window.bg_position_left = 0; //背景偏移量
let images = {};
let equipments = []; //存储所有装备对象
let hero_arr = [];
let cards = [];
window.canClickId = 0;// 可以点击海岛的id
window.cardNum = 0;

//元素
let h5_progressbar = $('#h5_progressbar');
let h5_progressbar_num = $('#h5_progressbar_num');

/**
 * app application
 */
let App = {
    setViewStatus: function () {
        let viewStatus = localStorage.getItem('viewStatus');
        if (viewStatus == null) {

        } else {
            if (viewStatus.split('_')[0] != classConf.course.id) {
                localStorage.removeItem('viewStatus');
            }
        }
    },

    bindEvents: function () {
        //监听frame加载完成
        let self_frame = $("#h5_course_self_frame");
        let screen_frames = $('#h5_course_stu_screens .frame');
        let showStuButton = $('#h5_btn_showStu');
        self_frame.off('load').on('load', function () {
            common.hidePageLoading();
            classConf.h5Course.pageLoadEndTime = new Date().getTime();
            console.log('页面加载完成的时间点是 classConf.h5Course.pageLoadEndTime----------------->%s', classConf.h5Course.pageLoadEndTime);

            //如果页面加载时间大于20s
            if ((classConf.h5Course.pageLoadEndTime - classConf.h5Course.pageLoadStartTime >= 20000) || $(this)[0].contentWindow.SDK == undefined) {
                console.warn('当前页面加载时间大于20s或资源有问题!');
                //要是404则认为错误
                window.H5SendToClient('showerrorpage', '');
            } else {
                $(this).attr('frame_load_status', '1');
                let pageUrl = $(this).attr('src');
                let hasFourWindow = $(this)[0].contentWindow.h5Template == undefined ? '1' : $(this)[0].contentWindow.h5Template.hasFourWindow;
                let hasAuthorize = $(this)[0].contentWindow.h5Template == undefined ? '1' : $(this)[0].contentWindow.h5Template.hasAuthorize;
                let hasComplete = $(this)[0].contentWindow.h5Template == undefined ? '1' : $(this)[0].contentWindow.h5Template.hasComplete;
                let hasStar = $(this)[0].contentWindow.h5Template == undefined ? '0' : $(this)[0].contentWindow.h5Template.hasStar;

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
                if(hasAuthorize == '0') {
                    $('#h5_btn_practice').addClass('hide');
                } else {
                    $('#h5_btn_practice').removeClass('hide');
                }

                //是否可以完成奖励该关卡
                if(hasComplete == '0') {
                    $('#h5_course_page_ensure').addClass('hide');
                } else {
                    $('#h5_course_page_ensure').removeClass('hide');  
                }

                //是否为星星模板
                if(hasStar == '1') { 
                    $('#h5_btn_star_close').removeClass('hide');
                } else {
                    $('#h5_btn_star_close').addClass('hide');
                }

                //数据上报
                window.dataReport.log.report('H5Source', {
                    action: classConf.h5Course.pageLoadAction,
                    pageLoadTime: classConf.h5Course.pageLoadEndTime - classConf.h5Course.pageLoadStartTime
                });
            }

        });
    },

    start: function () {

        //设置课程ID
        this.setViewStatus();

        //构建多端
        syncActions.createStudentsScreens();
        syncActions.createResultPanel();
        // syncActions.createResultStuPanel();

        //显示画布工具
        syncActions.showWbTools();

        //调用初始化画布工具
        syncActions.buildToolBar();

        //初始化画板大小
        // syncActions.initDrawBoxSize();

        if (classConf.user.type == 'tea') {
            common.logPrint('我是老师进入默认到第一页');
            /**
             * 发送开始上课全局设置协议
             */
            let viewStatus = localStorage.getItem('viewStatus');
            //注意顺序不能颠倒！！！！！！！！！！！！！！！！！！！！！！！
            //先跳到第一页  注意必须先跳再进行发送starting 涉及到root身份，这里set不想传到对面去！！！！！！！！！！！！
            // syncActions.paging('set', 1);

            // h5_course.init('card1');
            // h5_course.coursePaging('set', 1);

            //再发送starting 将身份改为root！！！！！！！！！！！！！！！
            //build data to local queue
           
            if (viewStatus != null && viewStatus == classConf.course.id + '_1') {

            } else {
                localStorage.setItem('viewStatus', classConf.course.id + '_1');
                // window.EventQueue.addEventQueue({
                //     type: 'firstInto',
                //     CID: classConf.course.id + '',
                //     operate: '1',
                //     data: [{
                //         key: 'firstInto',
                //         value: {classStatus:'1'}
                //     }]
                // });

                let msgData = sendOrReceive.buildStatusData({
                    type: 'firstInto',
                    key: 'firstInto',
                    value: {
                        classStatus:'1'
                    }
                });

                sendOrReceive.addSendMessage(msgData);
                /**
                 * 无用包只是在svc下保证会收到叠加包
                */
               if (classConf.course.switchMsgLine != 'game') {
                    let noUse = msgData = sendOrReceive.buildMsgData({
                        type: 'noUse',
                        value: {}
                    });
                    sendOrReceive.addSendMessage(noUse);
               }
            }

        } else if (classConf.user.type == 'stu') {
            common.logPrint('我是stu进入默认到第一页');
            // syncActions.paging('set', 1);

            // h5_course.init('card1');
            // h5_course.coursePaging('set', 1);
        } else {
            common.logPrint('我是其他用户进入, 禁止点击', classConf.user.type);
            // common.showMaskForbid();
            // syncActions.paging('set', 1);

            // h5_course.init('card1');
            // h5_course.coursePaging('set', 1);
        }

        //练习和四格按钮控制
        syncActions.showStuButtonAndPracticeButton();

        this.bindEvents();


    },

    init: function (callback) {
        console.log('app canvas start');
        let self = this;
        //游戏框架构建
        stage = new createjs.Stage("game_canvas");
        container = new createjs.Container(); //大容器
        con_bg = new createjs.Container(); //所有背景
        con_bg.name = "container_bg";

        con_bgImg = new createjs.Container();//只放背景图片
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
        let loader = new createjs.LoadQueue(false);
        loader.installPlugin(createjs.Sound);
        loader.addEventListener("fileload", handleFileLoad);
        loader.addEventListener("complete", completeHandler);
        loader.addEventListener("progress", loadProgress);
        loader.loadManifest(resourcesArr);

        function loadProgress(e) {
            let per = e.loaded;
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
            let game_bg = common.setBg({
                images: images['bg_one'],
                x: 0,
                y: 0
            });
            con_bgImg.addChild(game_bg);


            /**
             * 放置关卡
            */
            cardsJson.forEach(function (value, index) {
                var canClick = false;
                if (index == window.canClickId) {
                    canClick = true;
                } else {
                    canClick = false;
                }
                let card = new Card({
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
                    
                    if (classConf.user.type == "stu") {
                        // window.h5_course.courseCard = value;
                        // 判断是老师是否课中
                        console.log('--------------------sd',card.bitmap.canClick)
                        if (card.bitmap.canClick) {
                            let msgData = sendOrReceive.buildStatusData({
                                type: 'clickCard',
                                key:'clickCard',
                                value: {
                                    canClickIndex: window.canClickId,
                                    cardData: value
                                } 
                            });
                            sendOrReceive.addEventQueue(msgData);
                        }

                    } else {

                        if (card.bitmap.canClick) {
                            //发关卡包到对端
                            let cardData = sendOrReceive.buildStatusData({
                                type: 'clickCard',
                                key:'clickCard',
                                value: {
                                    canClickIndex: window.canClickId,
                                    cardData: value
                                }
                                
                            });
                            sendOrReceive.addSendMessage(cardData);

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
            let teaArr = [];
            let stuArr = [];

            classConf.appointMemberList.forEach(function (item) {
                if (item.role == 'tea') {
                    item.userImg = 'image/girl.png';
                    teaArr.push(item);
                } else {
                    item.userImg = 'image/boy.png';
                    stuArr.push(item);
                }
            });

            for (let i = 0; i < stuArr.length; i++) {
                let stu_hero = new Hero(2, images['run_stu'], 60, 43, 10, 200, stuArr[i]);
                con_hero.addChild(stu_hero.hero_container);
                hero_arr.push(stu_hero);
            }

            let tea_hero = new Hero(2, images['run_stu'], 60, 43, 10, 200, teaArr[0]);
            tea_hero.hero_container.x = tea_hero.hero_container.x + 100;
            hero_arr.push(tea_hero);
            con_hero.addChild(tea_hero.hero_container);
            con_bg.addChild(con_hero);


            /**
             *  初始化用户形象
            */

            if (classConf.user.type == "stu") {
                user = new User({
                    container: con_user,
                    x: 1140 * 1.5,
                    y: 600 * 1.5,
                    userInfo: userJson,

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

            h5_course.buildCourseAudio(h5courseAudio);



            /**
             * 装备栏初始化装备
            */

            if (classConf.user.type == "stu") {
                equipmentJson.forEach(function (value, index) {
                    if (!value.info.getState) {

                    } else {

                    }
                    let equipment_error = new Equipment({
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

            btnLeft = new Btn({
                image: images['left'],
                x: 50,
                y: 50
            });

            btnLeft.bind("click", function () {
                changeStyle(btnLeft.bitmap, 'bigToSmall');
                let clickFlag = true;
                if (window.bg_position_left >= 40) {
                    window.bg_position_left -= 40;
                    clickFlag = true;
                } else {
                    clickFlag = false;
                }
                if (clickFlag) {
                    if (classConf.user.type == "stu") {
                        window.game_bg.x = -window.bg_position_left;
                    } else {  
                        let posMsg = sendOrReceive.buildStatusData({
                            type: 'bgMove',
                            key:'bgMove',
                            value: {
                                x: window.bg_position_left,
                                y: 0
                            }
                            
                        });
                        sendOrReceive.addSendMessage(posMsg);
                    }
                }
            });

            con_btn.addChild(btnLeft.bitmap);



            /**
             * 向右按钮
            */

            btnRight = new Btn({
                image: images['right'],
                x: 150,
                y: 50
            });
            btnRight.bind("click", function () {
                changeStyle(btnRight.bitmap, 'bigToSmall');
                let clickFlag = true;
                if (window.bg_position_left <= bg_width - stage.canvas.width - 40) {
                    window.bg_position_left += 40;
                    clickFlag = true;
                } else {
                    clickFlag = false;
                }
                if (clickFlag) {
                    if (classConf.user.type == "stu") {
                        window.game_bg.x = -window.bg_position_left;
                    } else {
                        let posMsg = sendOrReceive.buildStatusData({
                            type: 'bgMove',
                            key:'bgMove',
                            value: {
                                x: window.bg_position_left,
                                y: 0
                            }
                            
                        });
                        sendOrReceive.addSendMessage(posMsg);
                    }
                }
            });
            con_btn.addChild(btnRight.bitmap);

            window.conBtn = con_btn;

            /**
             * 加载其余背景图片
            */

            loadBgImg(otherBgImg[thisBgIndex].src)


            /**
             * 真正的功能开始
            */

            callback();
        }


        /**
         * 加载单张背景图片
        */
        function loadBgImg(imgSrc) {
            let image = new Image();
            image.src = imgSrc;
            image.onload = function (event) {
                let game_bg = common.setBg({
                    images: imgSrc,
                    x: con_bgImg.getBounds().width,
                    y: 0
                });
                con_bgImg.addChild(game_bg);
                bg_width = con_bg.getBounds().width;
                if (thisBgIndex < otherBgImg.length - 1) {
                    thisBgIndex++;
                    loadBgImg(otherBgImg[thisBgIndex].src)
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

export { App }