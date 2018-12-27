/**
 * Created by windsolider
 * modified on 2017/7/24 
 **/

#h5course开发框架安装及使用
* 安装 npm install /npm i
* 开发环境 npm run dev
* 生产环境 npm run build
- - - - - -
#h5course项目模块功能说明
* h5course.js模块作为项目的入口模版，所有h5course下的功能模块都打包生成到h5course.js入口文件下
* h5course_app.js模块：与上层通信(ac客户端js数据层)入口模块，接口http://ac26.51talk.com/Ac/UserForH5/getUserInfo为php数据接口组提供，根据用户长id获取用户信息（主要用来获取用户头像信息提供给成绩结果页展示）。具体接口信息详见AC接口文档.doc文档中2.4.1根据用户长ID查询用户信息接口章节（p14-p15）
* h5course_report.js模块：上报页面加载时间，暂时未投入使用
* vendor.js模块：公用的第三方类库、插件，目前只包含jQuery,后期根据需要增加
* h5course_globalCommon模块：通用方法模块，有很多方法暂时未用到，考虑后期扩展而添加，主要使用logPrint模块控制日志输出。
* h5course_fit模块：根据屏幕分辨率对页面尺寸进行适配
* h5course_notify.js模块：提供给协议接收方调用的接口
* h5course_receiveProtocal模块：统一接受协议数据，并对协议数据进行类型包装
* h5course_aComm.js模块：客户端通信模块，
* h5course_aEvent.js模 块：事件绑定模块（画板工具按钮、授权、翻页、翻屏、分享等功能）
* h5course_aLogicUnpack.js模块：逻辑分析模块，分析客户端下发的协议，并更新数据池中数据状态
* h5course_aView.js模块：视图层模块，控制教学区的工具条、练习等模式切换按钮的展现
- - - - - -
#上线须知
* 更改aLogicUnpack中的aliasUrl.h5Course.countNum为线上页码
* 关闭webpack.config.prod.js中的ftp上传代码，打开压缩插件部分代码
* 更改h5course_globalCommon.js中的isDev为false,线上环境不输出log
- - - - - -
#172.16.0.107测试服务器相关
* 账号root密码ccs2017
* nginx配置路径 /etc/nginx/conf.d/h5course.conf  /etc/nginx/conf.d/h5test.conf
* 测试课件地址 /data/h5course /data/h5test，h5test路径下b2s为b2s测试课件，课件地址可根据需求创建或更改路径，课件内容也可根据需求更改
* 注：修改完nginx配置以后使用nginx -s reload重启服务 

