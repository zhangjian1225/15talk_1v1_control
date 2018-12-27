/**
 * Created by shaoyongkai on 2017/11/6.
 */


/**
 ** tg模块
 **/
let tg = {
  tgMoved: false,
  highMoved: false,
  lowMoved: false,
  bindEvents: function (type) {
    var that = this;
    if (type === 'tg') {
      $('#h5_course_tg').off('click').on('click', '.tg', function () {
        if (!that.tgMoved) {
          that.tgMoved = true;
          $('#h5_course_tg .tg-content,#h5_course_tg .tg').addClass('active').removeClass('re-active');
        } else {
          that.tgMoved = false;
          $('#h5_course_tg .tg-content,#h5_course_tg .tg').addClass('re-active').removeClass('active');
        }
      });
    }
    else if (type === 'level-tg') {
      $('#highTgBtn').off('click').on('click', function () {
        if (!that.highMoved) {
          that.highMoved = true;
          that.lowMoved = false;
          $('.highTg').addClass('active').removeClass('re-active').css('z-index', '1000');
          $('.lowTg').addClass('re-active').removeClass('active').css('z-index', '1001');
        } else {
          that.highMoved = false
          $('.highTg').addClass('re-active').removeClass('active')
        }
      })

      $('#lowTgBtn').off('click').on('click', function () {
        if (!that.lowMoved) {
          that.lowMoved = true;
          that.highMoved = false;
          $('.lowTg').addClass('active').removeClass('re-active').css('z-index', '1000');
          $('.highTg').addClass('re-active').removeClass('active').css('z-index', '1001');
        } else {
          that.lowMoved = false
          $('.lowTg').addClass('re-active').removeClass('active');
        }
      })
    }

  }
};

export {tg}
