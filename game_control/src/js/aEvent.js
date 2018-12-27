/**
 * Created by haowerui on 2017/3/23.
 * 说明：
 *      事件代理模块
 *      根据数据池的数据集中处理事件的绑定和处理方式
 *      比如处理特色课程事件处理
 *      教材品质逻辑与参数
 */

import { classConf } from "./classConf";
import { common } from "./common";
import { sendOrReceive } from "./sendOrReceive";
import { syncActions } from "./syncActions";
import { h5_course } from "./course";


let eventBind = {
    iTimer: 0,

    /**
     * 绑定入口
    */
    bind: function () {
        classConf.event.resize && eventBind.resizeEvent();
        classConf.event.tools && eventBind.toolEvent();
        classConf.event.mouse && eventBind.mouseEvent();
    },

    /**
     * 重置画板大小
     */
    resizeEvent: function () {
        common.logPrint('bind resize event');
        let self = this;
        window.addEventListener('resize', function () {
            //重置画板大小
            clearTimeout(self.iTimer);
            self.iTimer = setTimeout(function () {
                syncActions.initDrawBoxSize();
            }, 300);
        });
    },
    mouseEvent: function () {
        common.logPrint('bind mouse event');
        let click_tag = 0;
        let self = this;


        /**
         * 点击授权按钮
         */
        $('#h5_btn_practice').unbind().bind('click', function () {
            if (click_tag == 0) {
                click_tag = 1;
                //add close toolbox
                if ($('#h5_course_draw').hasClass('hide')) { } else {
                    $("#h5_course_tool .btn-tool[data-func='bind']").trigger('click');
                }
                syncActions.handlePractice();
                setTimeout(function () {
                    click_tag = 0
                }, 200);
            }
        });

        /**
         * 点击四格按钮
         */
        $('#h5_btn_showStu').unbind().bind('click', function () {
            if (click_tag == 0) {
                click_tag = 1;
                syncActions.showStuWindow();
                setTimeout(function () {
                    click_tag = 0
                }, 200);
            }
        });

        /**
         * 点击单例模式按钮
         */
        $('#h5_course_stu_screens .view').unbind().bind('click', function () {

            let screenId = $(this).parent('.screen').attr('id');

            if (click_tag == 0) {
                click_tag = 1;
                syncActions.seeStuWindow(screenId);
                setTimeout(function () {
                    click_tag = 0
                }, 200);
            }
        });

        /**
         * 点击教材翻页
         */
        $('#h5_course_page_prev').unbind().bind('click', function () {
            if (click_tag == 0) {
                click_tag = 1;
                if ($(this).hasClass('disabled') || $(this).hasClass('disallow')) {
                } else {
                    h5_course.coursePaging('prev');
                }
                setTimeout(function () {
                    click_tag = 0
                }, 200);
            }
        });

        $('#h5_course_page_next').unbind().bind('click', function () {
            if (click_tag == 0) {
                click_tag = 1;
                if ($(this).hasClass('disabled') || $(this).hasClass('disallow')) {
                } else {
                    h5_course.coursePaging('next');
                }
                setTimeout(function () {
                    click_tag = 0
                }, 200);
            }
        });

        $('#h5_course_pager_select').bind('change', function () {
            syncActions.paging('jump');
        });


        /**
         * 点击完成按钮
        */
        $('#h5_course_page_ensure').unbind().bind('click', function () {
            let sendMsg = sendOrReceive.buildStatusData({
                type: 'partComplete',
                key: 'partComplete',
                value: {
                    cardId: h5_course.courseCard.id
                }

            });
            sendOrReceive.addSendMessage(sendMsg);
            // if (classConf.h5Course.classStatus == '1' || classConf.h5Course.classStatus == '2') {
            // } else {
            //     //直接入队列执行
            //     window.EventQueue.addEventQueue(sendMsg);
            // }
        });


        /**
         * 点击屏幕翻页 
        */
        $('#h5_course_screen_prev').bind('click', function (e) {
            if (click_tag == 0) {
                click_tag = 1;
                if ($(this).hasClass('disabled')) {
                } else {
                    syncActions.screenPaging('prev');
                }
                setTimeout(function () {
                    click_tag = 0
                }, 200);
            }
        });

        $('#h5_course_screen_next').bind('click', function (e) {
            if (click_tag == 0) {
                click_tag = 1;
                if ($(this).hasClass('disabled')) {
                } else {
                    syncActions.screenPaging('next');
                }
                setTimeout(function () {
                    click_tag = 0
                }, 200);
            }
        });

        $('#h5_course_screen_pages').on('click', '.num', function (e) {
            let currentPage = $(this).index() + 1;
            syncActions.screenPaging('go', currentPage);
        });


        /**
         * 查看榜单功能
        */
        $('#h5_btn_star_open').unbind().bind('click', function () {
            let status = '';

            if ($(this).attr('data-status') == '0') {
                status = '1';
            } else {
                status = '0';
            }
            let sendMsg = sendOrReceive.buildStatusData({
                type: 'openStarPage',
                value: {
                    status: status
                },
                key: 'openStarPage'
            });

            sendOrReceive.addSendMessage(sendMsg);

        });

        /**
         * 预习模式关闭
        */
        $('#h5_course_part .close_btn').unbind().bind('click', function () {
            $(this).parent().addClass('hide');
        });
        // $('#h5_btn_share_four').bind('click', function (e) {
        //     if (click_tag == 0) {
        //         click_tag = 1;
        //         syncActions.shareFour();
        //         setTimeout(function () {
        //             click_tag = 0
        //         }, 200);
        //     }
        // });

        // $('#h5_btn_share_single').bind('click', function (e) {
        //     if (click_tag == 0) {
        //         click_tag = 1;
        //         syncActions.shareSingle();
        //         setTimeout(function () {
        //             click_tag = 0
        //         }, 200);
        //     }
        // });


    },
    toolEvent: function () {
        common.logPrint('bind tool event');
        $('#h5_course_tool').on('click', '.btn-tool', function () {
            let that = $(this);
            syncActions.handleWbTools(that);
        });
    }
};

//对外开发的函数各自定义  保护私有变量和私有函数
let eventEnter = function () {
    eventBind.bind();
};

export { eventEnter }
export { eventBind }