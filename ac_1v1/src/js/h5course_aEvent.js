/**
 * Created by haowerui on 2017/3/23.
 * 说明：
 *      事件代理模块
 *      根据数据池的数据集中处理事件的绑定和处理方式
 *      比如处理特色课程事件处理
 *      教材品质逻辑与参数
 */

import { classConf } from "./classConf";
import { globalCommon } from "./h5course_globalCommon";
import { syncActions } from "./h5course_syncActions";

let eventBind = {
    //绑定入口
    bind: function () {
        classConf.event.resize && eventBind.resizeEvent();
        classConf.event.tools && eventBind.toolEvent();
        classConf.event.mouse && eventBind.mouseEvent();
    },

    iTimer: 0,

    resizeEvent: function () {
        globalCommon.logPrint('bind resize event');
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
        globalCommon.logPrint('bind mouse event');
        let click_tag = 0;

        $('#h5_btn_refresh').bind('click', function () {
            let $that =  $(this);
            let click_status = $that.attr('data_click_status');
            if (click_status == undefined || click_status == '') {
                $(this).attr('data_click_status', '1');

                syncActions.paging('jump', classConf.h5Course.localPage, 'refresh');

                // syncActions.paging('next');
                // syncActions.paging('prev');

                setTimeout(function () {
                    $that.removeAttr('data_click_status');
                }, 200);
            }
        });

        $('#h5_btn_practice').bind('click', function () {

            let status = $('#h5_btn_practice').attr('data-status');

            if (click_tag == 0) {
                click_tag = 1;
                //add close toolbox
                if ($('#h5_course_draw').hasClass('hide')) {
                } else {
                    $("#h5_course_tool .btn-tool[data-func='bind']").trigger('click');
                }

                if(status == undefined || status == '') {
                    // $('#h5_btn_practice').attr('data-status', '1');
                    syncActions.handlePractice('1');
                } else {
                    // $('#h5_btn_practice').removeAttr('data-status');
                    syncActions.handlePractice('0');
                }

                setTimeout(function () {
                    click_tag = 0
                }, 200);
            }
        });

        $('#h5_course_page_prev').bind('click', function (e) {
            if (click_tag == 0) {
                click_tag = 1;
                if ($(this).hasClass('disabled') || $(this).hasClass('disallow')) {
                } else {
                    syncActions.paging('prev');
                }
                setTimeout(function () {
                    click_tag = 0
                }, 200);
            }
        });

        $('#h5_course_page_next').bind('click', function (e) {
            if (click_tag == 0) {
                click_tag = 1;
                if ($(this).hasClass('disabled') || $(this).hasClass('disallow')) {
                } else {
                    syncActions.paging('next');
                }
                setTimeout(function () {
                    click_tag = 0
                }, 200);
            }
        });

        $('#h5_course_pager_select').bind('change', function () {
            syncActions.paging('jump');
        });

        $('#h5_btn_switch').bind('click', function () {
            $('#h5_material_dialog').removeClass('hide');
        });

        $('#h5_material_dialog').on('click', '.btn-close', function () {
            $('#h5_material_dialog').addClass('hide');
        });

        $('#h5_material_dialog').on('click', '.btn-switch', function () {
            let courseId = $(this).attr('data-id');
            let selectCourse = classConf.serverData.objCourseAllInfo['bookH5List'].find(function (item) {
              return item.id == courseId;
            });
            window.H5SDK.sendDataToClient.restartclassroom({
              type: '0',
              data: selectCourse
            });
        });
    },

    toolEvent: function () {
        globalCommon.logPrint('bind tool event');
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
