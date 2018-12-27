###AC_1v1控制器
> 用于AC一对一互动教材控制器   


h5course开发框架安装及使用
-----------------

 1. 安装
    - npm install /npm i
    - webpack-dev-server 需要全局安装，即npm i webpack-dev-server -g
    - webpack			   需要全局安装，即npm i webpack -g
    
 2. 开发环境（本地）  
    执行命令：npm run loc  
    说明：用于开发者本地开发及初步测试使用，用浏览器模拟AC客户端，可以同时开老师和学生两个tab页执行互动。
    (模板开发者在本地使用，需要修改：（1）本地根目录下增加jquery文件 (2)webpack.loc.conf中路由修改成自己的，H5COURSE_HEADURL改成自己的)
    
 2. 开发/测试环境（测试平台）  
    执行命令：npm run dev  
    说明：用于开发者把控制器代码编译后上传至测试平台，用AC客户端测试效果，也供测试人员测试。
    
 3. 生产环境  
    执行命令：npm run build  
    说明：用于发布正式版使用。上线自动编译会执行该命令。
    
项目结构说明
----------------- 
```
├── build  #webpack编译相关文件目录
├── common  #公用抽取的js文件，备份用，实际上服务器上有一个共用目录统一存放抽取的js文件
│   ├───—report_1v1.bundle_v1.0.0.js  #数据上报抽取的js
│   ├───—sdk_1v1.bundle_v1.0.0.js  #AC与H5交互抽取的js
│   ├───—sdk_1v1.bundle_v1.0.0_local.js  #AC与H5交互抽取的js，本地开发用.
│   └────vendor.bundle_v1.0.0.js  #公用的第三方类库、插件，目前包含jQuery和画布相关
│
├── dist  #编译后的文件存放目录
│
├── src #源码目录
│   ├───—css  #样式文件目录
│   │     ├───—animate.less #动画样式
│   │     ├───—h5course.less #样式入口
│   │     ├───—layout.less  #一般样式写在此
│   │     ├───—result.less #结果相关样式
│   │     └────tg.less 
│   ├───—fonts
│   ├───—image
│   ├───—js 
│   │     ├───—classConf.js  #数据配置模块
│   │     ├───—h5course.js #入口模块
│   │     ├───—h5course_aEvent.js #事件定义模块 
│   │     ├───—h5course_aLogicUnpack.js 
│   │     ├───—h5course_app.js 
│   │     ├───—h5course_aView.js  #视图模块,控制教学区的工具条、练习等模式切换按钮等
│   │     ├───—h5course_globalCommon.js #全局通用模块
│   │     ├───—h5course_recordAudio.js #录音模块（暂未使用）
│   │     ├───—h5course_result.js #学生答题结果在老师端显示模块（暂未使用）
│   │     ├───—h5course_syncActions.js #执行逻辑模块
│   │     └────h5course_tg.js 
│   ├───—index.html  #入口页面
│   └────index.local.html  #入口页面(本地开发使用)
│
├── sync  #模板开发sdk存放目录
├── test  #画板测试目录
├── .gitignore #忽略文件
├── package.json #项目配置文件
└── README.md #项目的说明文档，markdown 格式
```

h5course项目模块功能说明
-----------------

 1. h5course.js模块作为项目的入口模版，所有h5course下的功能模块都打包生成到h5course.js入口文件下
 2. classConf.js模块：数据配置
 3. h5course_aView.js模块：视图层模块，控制教学区的工具条、练习等模式切换按钮、显示的模块

 
上线自动编译
-----------------
- 利用了git的tag命令发布版本。  
- git push代码后，服务器执行npm run build进行自动编译，控制器要发布正式平台需登录ccs后台操作。

```
 # 上线自动编译举例
 # 例如：发布 1.0.3 版本命令 (注意发布新版本要修版本号和注释说明)
 
 git tag -a 1.0.3 -m "编译配置文件抽取，功能无变化"
 git push origin 1.0.3
 
 登录ccs后台操作点击发布按钮发布即可。
```