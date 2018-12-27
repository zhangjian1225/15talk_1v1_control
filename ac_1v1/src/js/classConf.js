/**
 * Created by shaoyongkai on 2017/3/23.
 * 说明：
 *      该模块用于数据配置存储，供各模块get和set
 */
const H5AGRREEMENTID = 400;

let classConf = {
    boardDataCache: [],//storage server data when draw handle is not ready 缓冲池，用于当教材和白板没有准备好的时候存储服务器下发的数据
    isSupportEncodeFunc: false, //是否支持新版本服务器数据处理机制
    serverData: {//服务器的数据，用于存储最开始从客户端接收到的数据
        objCourseInfo: null,//class info 教室的信息
        objUserInfo: null,//user info 用户的信息
        objURLInfo: null,//url info 课件信息 比如url
        objBoardSetInfo: null,//board info 白板信息
        objAppointMemberListInfo: null,//appoint info 预约成员信息
        objCourseAllInfo: null,//courseAll info 课程原始信息，未经客户端处理过的信息
        objUserAllInfo: null,//userAll info 用户的原始信息 未经客户端处理过的信息
    },
    user: {
        id: '',//用户的id
        userID: '',//记录短id  暂时不用，已经淘汰，做备份
        sex: '',//用户的性别
        type: '',//'stu'/'tea' 用户的类型  stu tea cc CRIT tutor(助教) anonymous(匿名用户)  unKnow(未知类型 什么也不能做)
        name: '',//用户的姓名
        //下面这些暂时不用关心
        userRole: '',//detailed user's role 用户的详细角色信息
        userType: '',//user's power stu/administrator/tea/... 和权限相关的类型
        courseRole: '',//user's type in course 教室内的角色
    },
    course: {
        type: '',//1v1 1vN 教室的类型
        id: '',//课程id
        courseStyle: 0,//detailed course style 教室的详细类型
        language: '',//当前教室的语言  Cn中文 En英文
        textType: '',//当前只有互动教材  支持pdf和H5Course
        teaLogin: false,//true/false 老师是否已经进入教室
        isMulti: false,//代表是否是多视频教室
        subcoursetype: '-1', //5:一对四|6:一对十二|7:其他|8:体验课 todo 课程字类型
        H5HostUrl: 'www.51talkac.com' //数据上报动态域名
    },
    url: {
        h5Course: {
            countNum: '',
            headUrl: '/575114/01/index.html',//H5那边先自己给
            headUrlSub: []
        }
    },
    appointMemberList: [
        //所有的预约用户信息  有可能为空，需要做灾害措施,每一项都是一个对象 {}
    ],
    userList: {
        //包括成员的变更信息和具体信息
    },
    boardSet: {
        tools: { //根据这个来判断采用哪些工具
            //工具条信息
            pen: false,//画笔
            signpen: false,//荧光笔
            rec: false,//矩形
            rub: false,//旧版橡皮擦
            newrub: false,//新版橡皮擦
            text: false,//文字
            draft: false,//拖拽
            back: false,//回退
            clear: false//清空
        },
        showPlugLog: false,
        color: '#ff0000',
        canvasColor: 'rgba(202, 232, 174, 0.2)'//画布的颜色配置
    },
    viewSet: {//根据这个来加载模块
        tools: {
            bind: true,
            pencil: true,//画笔
            highPencil: true,//荧光笔
            rect: true,//矩形
            rubberOld: true,//旧版橡皮擦
            newrub: true,//新版橡皮擦
            text: true,//文字
            draft: true,//拖拽
            back: true,//回退
            clear: true,//清空
            authorize: true
        },
        commonTools: {
            pencil: true,//画笔
            rect: true,//矩形
        },
        teaTools: {
            bind: true,
            highPencil: true,//荧光笔
            text: true,//文字
            draft: true,//拖拽
            clear: true,//清空
            authorize: true
        }
    },
    event: {//事件绑定 根据这些来判断是否要绑定这些事件
        resize: false,
        mouse: true,
        tools: false
    },
    h5Course: {
        agreementID: H5AGRREEMENTID,//互动教材协议的type  互动教材传递协议的时候用白板哪个图形协议
        classStatus: '0', //未开始上课 0未上课 1开始上课 2开始练习
        localPage: '1',  //用户本地的当前页码
        svcPage: '1',    //服务端的当前页码
        isRoot: false, //是否是  root状态，是否能像svc发数据，例如学生在练习状态为root老师在上课时为root
        starData: "",
        pencilColor: '', //存储用户画笔颜色
        currentCourseQuality: 'high',
        controllerLoadStartTime: '', //控制器开始加载时间
        pageLoadStartTime: '', //教材开始加载的时间
        pageLoadEndTime: '', //教材加载完毕的时间
        pageLoadAction: '1'
    }
};


export {classConf}