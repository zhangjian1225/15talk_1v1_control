/**
 * Created by shaoyongkai on 2018/2/11.
 * 说明：
 *      视图模块
 *      根据数据池的数据决定当前课程的外观展示方式
 *      比如工具条展示，处理特色课程外观等
 */

import { classConf } from "./classConf";
import { common } from "./common";

let view = {
    //初始化入口
    init: function() {
        common.logPrint('view init');
        let tpl = `
            <a id="h5_course_close_btn" href="javascript:void(0)" class="close_btn"></a>
            <div class="h5_course_main">
                <!-- 画板 -->
                <div id="h5_course_draw" class="fadeIn animated draw-box hide" course_draw="j_draw_${classConf.user.id}"></div>
                <!-- 画板 -->
                <!-- h5course sync screen content -->
                <iframe id="h5_course_self_frame" frame_load_status="0" class="frame_control main_frame" src="" width="100%" height="100%" scrolling="no" user_id="${classConf.user.id}" user_type="${classConf.user.type}" role="${classConf.user.id}"></iframe>
                <div id="h5_course_stu_screens" class="screens hidden"></div>
                <a id="h5_course_screen_prev" class=" btn-screen-prev disabled hide"></a>
                <a id="h5_course_screen_next" class=" btn-screen-next hide"></a>
                <ol id="h5_course_screen_pages" class="h5_course_screen_pages hide"></ol>
                <!-- h5course sync screen content -->
                
            </div>
            
            <!-- h5course sync result -->
            <div id="h5_course_result" class="result open hide">

            </div>

            <div id="h5_course_footer_st" class="h5_course_footer hide">

                <div id="h5_pager_box" class="h5_pager_box">
                    <a id="h5_course_page_prev" class="btn btn-page-prev disabled"><i class="rect"></i></a>
                    <a id="h5_course_page_next" class="btn btn-page-next"><i class="rect rect-right"></i></a>
                </div>

                <div class="h5_btn_box hide">
                    <button class="btn btn-authorize" id="h5_btn_practice">authorize</button>
                    <button id="h5_btn_showStu" class="btn showStuButton">four-windows</button>
                    <button class="btn btn_course_ensure" id="h5_course_page_ensure">complete</button>
                    <button id="h5_btn_star_close" class="btn hide">close star</button>
                </div>

                <!-- h5course tools -->
                <div id="h5_tool_box" class="h5_tool_box">
                    <!-- 工具 -->
                    <div id="h5_course_tool" class="h5_course_tool">
                        <div class="btn-tool hide" title="Active tools" data-func="bind"><span class="bind"></span></div>
                        <div class="btn-tool disabled hide" title="Text" data-func="text"><span class="text"></span></div>
                        <div class="btn-tool disabled hide" title="Active tools" data-func="pencil"><span class="pencil"></span></div>
                        <div class="btn-tool disabled hide" title="Rectangle" data-func="rect"><span class="rectangle"></span></div>
                        <div class="btn-tool disabled hide" title="Highlighter" data-func="highPencil"><span class="highlighter"></span></div>
                        <div class="btn-tool disabled hide" title="Rubber" data-func="rubberOld"><span class="rubber"></span></div>
                        <div class="btn-tool disabled hide" title="Delete" data-func="clear"><span class="delete"></span></div>
                        <div class="btn-tool disabled hide" title="Move" data-func="draft"><span class="move"></span></div>
                        <div class="btn-tool disabled hide" title="Authorize" data-func="authorize"><span class="authorize"></span></div>
                    </div>
                    <!-- 工具 -->
                </div>

            </div>
            
            <!-- 不同角色对应footer -->
            <div id="h5_course_footer_cc" class="h5_course_footer hide">
                <div class="intro">i am cc</div>
            </div>
            <div id="h5_course_footer_CRIT" class="h5_course_footer hide">
                <div class="intro">i am CRIT</div>
            </div>
            <div id="h5_course_footer_tutor" class="h5_course_footer hide">
                <div class="intro">i am tutor</div>
            </div>
            <div id="h5_course_footer_anonymous" class="h5_course_footer hide">
                <div class="intro">i am anonymous</div>
            </div>
            <div id="h5_course_footer_unKnow" class="h5_course_footer hide">
                <div class="intro">i am unKnow</div>
            </div>
            <!-- 不同角色对应footer -->
                
        `;
        $('#h5_course_part').html(tpl);
        this.showFooterByUserType();
        classConf.viewSet.tools && this.showTools();
    },

    showTools: function() {
        common.logPrint('show tools');

        let isTea = classConf.user.type && classConf.user.type == 'tea';
        
        for (let key in classConf.viewSet.commonTools) {
            classConf.viewSet.tools[key] && (function () {
                $('.btn-tool[data-func=' + key + ']').removeClass('hide');
            })();
        }
        if (isTea) {
            for (let key in classConf.viewSet.teaTools) {
                classConf.viewSet.tools[key] && (function () {
                    $('.btn-tool[data-func=' + key + ']').removeClass('hide');
                })();
            } 
        }
    },

    showFooterByUserType: function () {
        let userType = classConf.user.type;
        if(userType == 'tea') {
            $('#h5_course_footer_st').removeClass('hide').siblings('.h5_course_footer').remove();
        } else if(userType == 'stu') {
            $('#h5_course_footer_st').removeClass('hide').siblings('.h5_course_footer').remove();
        } else {
            $('#h5_course_footer_' + userType).removeClass('hide').siblings('.h5_course_footer').remove();
        }
    }

};

export { view }
