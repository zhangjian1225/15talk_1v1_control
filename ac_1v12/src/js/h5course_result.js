/**
 * Created by shaoyongkai on 2017/3/24.
 * add isReportFlag 当前是否上报过数据
 */

import {classConf} from './classConf';
//import { dataReport } from "./h5course_report";
/**
 ** 结果模块
 * add rankResultList 榜单结果
 **/
let courseResult = {
  classConf: classConf,
  resultData: {},
  position: 0,
  createResult: function () {
    let members = this.classConf.appointMemberList;
    let h5CourseResult = $('#h5_course_result');

    let lis = '';
    if (members) {
      members.forEach(function (item, i) {
        if (item.role == 'stu') {
          lis += `<li class="flex un-complete">
                                <div class="flex-content-l"></div>
                                <div class="flex-content-r">${item.name}</div>
                                <div class="flex-content-f"></div>
                            </li>`;
        }
      });
    }
    let str = `<div class="banner">Result<span class="switch"></span></div>
                    <div class="names">
                        <div class="names-banner flex">
                            <div class="flex-content-l">status</div>
                            <div class="flex-content-r">name</div>
                            <div class="flex-content-f">feedback</div>
                        </div>
                        <ul class="names-box">${lis}</ul>
                    </div>`;
    h5CourseResult.html(str);

    this.initResultData();
    this.bindEvents();
  },

  bindEvents: function () {
    let h5CourseResult = $('#h5_course_result');
    h5CourseResult.on('click', '.switch', function (e) {
      e.stopPropagation();
      h5CourseResult.toggleClass('open');
    });
    h5CourseResult.drag();
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
            position: 0,
            scoreText: ''
          };
        }
      });
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

  /**
   * 功能说明：
   * 1、先进行，正确，错误，未答题的用户分组
   * 2、按照错误次数排序 错误次数相同 按照正确顺序排序
   * 3、错误的用户暂不细分
   */
  renderResultList: function () {
    //let self = this;

    let statics = {
      right: [],
      wrong: [],
      unComplete: []
    };

    let resultData = this.resultData;
    let resultDataArr = [];

    for (let key in resultData) {
      resultDataArr.push(resultData[key]);
    }

    resultDataArr.forEach(function (item) {
      if (item.isRight === true) {
        statics.right.push(item);
      } else if (item.isRight === false) {
        statics.wrong.push(item);
      } else {
        statics.unComplete.push(item);
      }
    });

    statics.right.sort(function (a, b) {
      if (a.errorCount == b.errorCount) {
        return a.position - b.position;
      } else {
        return a.errorCount - b.errorCount;
      }
    });

    let reNewStatics = statics.right.concat(statics.wrong, statics.unComplete);

    reNewStatics.forEach(function (item, i) {
      let liEle = $('#h5_course_result .names-box li').eq(i);
      liEle.removeClass();
      if (item.isRight === true) {
        liEle.addClass('flex show-result-right');
        if (item.errorCount == 0) {
          liEle.addClass('num' + (i + 1));
          /*if(i == 0) {
           self.rankResultList.push(item);
           }*/
        }
      } else if (item.isRight === false) {
        liEle.addClass('flex show-result-wrong');
      } else {
        liEle.addClass('flex un-complete');
      }
      liEle.find('.flex-content-r').text(item.name);
      //添加语音分数
      liEle.find('.flex-content-f').text(item.scoreText);
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

    //调用模板上报数据
    /*if(message.operate == '1') { //表示课中操作
     if(this.rankResultList.length == 1 && this.isReportFlag == 0) {
     this.isReportFlag = 1;
     dataReport.reportBigData('rank', JSON.stringify(this.rankResultList));
     }
     }*/
  },

  /**
   * 重置相应用户的得分
   */
  refreshScoreData: function (uid, scoreText) {
    this.resultData[uid].scoreText = scoreText;
  },

  /**
   * 显示语音结果
   */
  showRecordResult: function (message) {
    console.log('showRecordResult', message);
    let sendUser = message.data[0].value.sendUser;
    let result = message.data[0].value.result;
    //显示结果
    this.refreshScoreData(sendUser, result);
    this.renderResultList();
  },

  /**
   * 新增清除语音分数一栏值hideCourseResult
   */
  resetAudioScore: function () {
    let scoreItem = $('#h5_course_result .names-box .flex-content-f');
    scoreItem.text('');
  },

  /**
   * 隐藏结果列表
   */
  hideCourseResult: function () {
    $('#h5_course_result').addClass('open hide');
  },

  resetResult: function () {
    $('#h5_course_result').addClass('open hide');
    //this.rankResultList = [];
    //this.isReportFlag = 0;
    this.initResultData();
    this.renderResultList();
    this.resetAudioScore();
  }
};

export {courseResult};
