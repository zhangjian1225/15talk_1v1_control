/**
 * Created by shaoyongkai on 2017/3/24.
 */

/**
 ** AC屏幕变化
 **/
var screenAc = {

    addStuScreen: function (param) {
        var z = '';
        z += '<div id="j_screen_' + param.uid + '" class="screen hidden" user_state="out" user_id="' + param.uid + '" user_type="' + param.role + '">';
        z += '<iframe class="frame_control frame" load_status="0" user_type="' + param.role + '" user_id="' + param.uid + '" role="' + param.uid + '" src="" scrolling="no"></iframe>';
        z += '<div id="j_screen_draw_'+ param.uid + '" class="fadeIn animated screen-draw-box hide" course_draw="j_draw_'+ param.uid + '"></div>';
        z += '<div class="frame-mask" ></div>';
        z += '<div class="name" >' + param.name +'</div>';
        z += '<button class="view">single-window</button>';
        z += '</div>';

        var screen = $('.screen');
        var count = $('#j_screen_' + param.uid).length;
        if (count == 0) {
            $('#h5_course_stu_screens').append(z);
        }
    },

    showUserScreen: function (uid) {
        $('#j_screen_' + uid).attr('user_state', 'in').removeClass('hidden');
    },

    hideUserScreen: function (uid) {
        $('#j_screen_' + uid).attr('user_state', 'out').addClass('hidden');
    },

    /**
     * 控制四格中的元素根据用户角色
     * @param userType
     */
    initScreensByUser: function (userType) {
        if(userType == 'stu') {
            let screens = $('#h5_course_stu_screens');
            let screenPrevBtn = $('#h5_course_screen_prev');
            let screenNextBtn = $('#h5_course_screen_next');
            let screen_pages = $('#h5_course_screen_pages');
            screens.find('.view').remove();
            screenPrevBtn.remove();
            screenNextBtn.remove();
            screen_pages.remove();
        }
    }
};

export { screenAc }
