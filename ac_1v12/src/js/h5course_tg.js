/**
 * Created by shaoyongkai on 2017/11/6.
 *  tg模块
 */
let tg = {
  tgMoved: false,
  bindEvents: function () {
    $('#h5_course_tg').off('click').on('click', '.tg', function () {
      if (!this.tgMoved) {
        this.tgMoved = true;
        $('#h5_course_tg .tg-content,#h5_course_tg .tg').addClass('active').removeClass('re-active');
      } else {
        this.tgMoved = false;
        $('#h5_course_tg .tg-content,#h5_course_tg .tg').addClass('re-active').removeClass('active');
      }
    });
  }
};

export {tg};
