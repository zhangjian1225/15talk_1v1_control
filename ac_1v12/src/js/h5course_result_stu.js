/**
 * Created by shaoyongkai on 2017/3/24.
 */

import {classConf} from './classConf';

/**
 ** 结果模块
 **/
let courseResultStu = {
  classConf: classConf,
  resultData: {},
  position: 0,
  showCount: 4,
  duration: 400,
  createResult: function () {
    let members = this.classConf.appointMemberList;
    let h5CourseResultStu = $('#h5_course_result_stu');
    let lis = '';
    if (members) {
      members.forEach(function (item) {
        if (item.role == 'stu') {
          lis += `<li class="animated bounceIn item hide">
                            <div class="crown"></div>
                            <div class="user-pic">
                                <img src="" class="pic" />
                            </div>
                            <div class="name">${item.name}</div>
                        </li>`;
        }
      });
    }
    let str = `<div class="result-box">
                        <ul class="names-box">${lis}</ul>
                    </div><div class="result-toggle up" data-status="1"></div>`;
    h5CourseResultStu.html(str);
    this.initResultData();
    this.bindEvents();
  },

  bindEvents: function () {
    //学生排行榜折叠展开事件
    $('#h5_course_result_stu').on('click', '.result-toggle', function (e) {
      let element = $(this);
      let status = element.attr('data-status');
      if (status === '1') {
        element.attr('data-status', '0');
        element.removeClass('up').addClass('down');
        $('#h5_course_result_stu').find('.result-box').slideUp();
      } else {
        element.attr('data-status', '1');
        element.removeClass('down').addClass('up');
        $('#h5_course_result_stu').find('.result-box').slideDown();
      }
    });
  },

  initResultData: function () {
    let members = this.classConf.appointMemberList;
    this.position = 0;
    let self = this;
    if (members) {
      members.forEach(function (item) {
        if (item.role == 'stu') {
          self.resultData[item.uid] = {
            uid: item.uid,
            name: item.name,
            isRight: '',
            errorCount: 0,
            position: 0
          };
        }
      });
    }

    //控制结果显示几个
    if (this.classConf.course.subcoursetype == '5') {
      //this.showCount = 1;
    } else if (this.classConf.course.subcoursetype == '6') {
      //this.showCount = 3;
    } else {

    }
  },

  refreshResultData: function (uid, bol) {
    this.resultData[uid].isRight = bol;
    if (bol == false) {
      this.resultData[uid].errorCount = this.resultData[uid].errorCount + 1;
    } else {
      this.position = this.position + 1;
      this.resultData[uid].position = this.position;
    }
  },

  compare(property) {
    return function (a, b) {
      let value1 = a[property];
      let value2 = b[property];
      return value1 - value2;
    };
  },

  playResultAudio: function () {
    $('#j_audio_town')[0].play();
  },

  /**
   * 说明：该功能流程为
   * 1、先统计0错误的人
   * 2、然后在此基础上按照答题顺序
   * 3、重置所有默认样式
   * 4、显示名次
   */
  renderResultList: function () {
    let self = this;
    let initImg = 'image/init_img.jpg';

    let statics = {
      right: []
    };

    let resultData = this.resultData;

    let resultDataArr = [];
    for (let key in resultData) {
      resultDataArr.push(resultData[key]);
    }

    resultDataArr.forEach(function (item) {
      if (item.isRight === true && item.errorCount == 0) {
        //if(statics.right.length < self.showCount) {
        statics.right.push(item);
        //}
      }
    });

    statics.right.sort(this.compare('position'));

    if (statics.right.length != 0 && self.classConf.user.type == 'stu') {
      $('#h5_course_result_stu').removeClass('hide');
    } else {
      $('#h5_course_result_stu').addClass('hide');
    }


    let rankUsers = statics.right.slice(0, self.showCount);

    //console.log('rankUsers---------------->%s', JSON.stringify(rankUsers));

    rankUsers.forEach(function (item, i) {
      let liEle = $('#h5_course_result_stu .names-box li').eq(i);
      liEle.addClass('num' + (i + 1));
      if (item.userSmallImg != '' && item.userSmallImg != null) {
        initImg = item.userSmallImg;
      }
      liEle.find('.pic').attr('src', initImg);
      liEle.find('.name').text(item.name);
      (function (index) {
        setTimeout(function () {
          if (liEle.hasClass('hide')) {
            self.playResultAudio();
          }
          liEle.removeClass('hide');
        }, self.duration * index);
      })(i);
    });
  },

  showResult: function (message) {
    let sendUserInfo = message.data[0].value.sendUserInfo;
    let resultData = message.data[0].value.syncAction.resultData;
    //答对以后不再更新结果
    if (this.resultData[sendUserInfo.id].isRight == true) {
      return;
    }
    this.refreshResultData(sendUserInfo.id, resultData.isRight);
    this.renderResultList();
  },

  resetResult: function () {
    $('#h5_course_result_stu').addClass('hide');
    $('#h5_course_result_stu .names-box li').attr('class', 'animated bounceIn item hide');
    this.initResultData();
    this.renderResultList();
  }
};

export {courseResultStu};
