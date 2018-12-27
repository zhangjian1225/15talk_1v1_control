/**
 * Created by haoweirui on 2017/3/25.
 * 说明：
 *      白板sdk，提供下列功能                 启用状态                           调用方式                            参数 //说明                                         特别说明
 *          |____生成配置文件表接口              √                          createConf(type)                       const  //返回固定配置信息
 *          |                                                                                                  normal //返回可变更配置信息
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____绑定div 并初始化接口            √         bindWB(targetID,constConf,changeConf,callback)         targetID  //需要绑定的div的id
 *          |                                                                                                  constConf //上面生成并按需修改后的固定配置信息
 *          |                                                                                                  changeConf//上面生成并按需修改后的可变更配置信息
 *          |                                                                                                  callback  //白板数据返回调用函数
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____调用工具接口                   √                      draw(toolsType,callback)                   toolsType //工具类型  value见特别说明                pencil/highPencil/rect/rubberOld/rubberNew/draft/seal/text/back/clear
 *          |                                                                                                   callback  //调用成功的回调 toolsType为seal时必须
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____更改白板配置接口                √                    updateChangeConf(changeConf)                 changeConf //要更新的可配置信息                      注意仅支持一级key  例如{a:'',b:{c:''}},支持只传a:''或者b:{},不支持直接传c:''
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____缩放接口接口                   √                            wbResize()                                                                             当白板div大小变化时调用
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____数据传入显示接口                √                           setData(Arr)                          Arr  //要显示的数据数组
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____数据id修改接口                 √                          changeData(obj)                        obj  //要修改的id信息
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____数据获取接口                   √                             getData()                                                                              返回当前绑定白板的所有信息
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____修改印章数据接口                ×                 changeSealSource(sealConf,callback)             sealConf  //关于印章的信息
 *          |                                                                                                   callback  //印章加载完成的回调
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 *          |____生成图片接口                   ×          buildCurrentImg(width,height,rotate,callback)          width     //宽度                                   宽高比必须固定
 *          |                                                                                                   height    //高度                                   宽高比必须固定
 *          |                                                                                                   rotate    //背景图片旋转打印                         目前仅支持90度的倍数范围是-270到270
 *          |                                                                                                   callback  //生成的图片数据回调
 *          |_________________________________________________________________________________________________________________________________________________________________________________________________________________________________
 */
(function (root, $) {
    root.WBSDK = (function () {
        var toolsOpen = [];
        var version = '2.0';
        var check = function () {
            var sUserAgent = navigator.userAgent.toLowerCase(),
                bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
                bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
                bIsMidp = sUserAgent.match(/midp/i) == "midp",
                bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
                bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
                bIsAndroid = sUserAgent.match(/android/i) == "android",
                bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
                bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                clientInfo.type = 'mobile';
                clientInfo.eventName.mouseDown = 'touchstart';
                clientInfo.eventName.mouseMove = 'touchmove';
                clientInfo.eventName.mouseUp = 'touchend';
                clientInfo.eventName.mouseOut = false;
            } else {
                clientInfo.type = 'pc';
            }
        }
        var clientInfo = {
            type : 'pc',//pc mobile
            eventName : {
                mouseDown : 'mousedown',
                mouseMove : 'mousemove',
                mouseUp : 'mouseup',
                mouseOut : 'mouseout'
            }
        };
        check();
        var gerFuc = {//通用方法
            initBoard: function (targetID, constConf, changeConf, callback) {
                //首先记录绑定初始化数据
                //可变数据记录
                this.changeConf = changeConf;
                //const数据记录  可枚举和查看，但不可修改和删除
                Object.defineProperties(this, {
                    targetID: {
                        value: targetID,
                        enumerable: true,
                        configurable: false,
                        writable: false
                    },
                    constConf: {
                        value: constConf,
                        enumerable: true,
                        configurable: false,
                        writable: false,
                    },
                    callback: {
                        value: callback,
                        enumerable: true,
                        configurable: false,
                        writable: false,
                    }
                })
                //绑定事件
                var allTools = ['pencil', 'highPencil', 'rect', 'text', 'rubberOld', 'seal', 'back', 'clear', 'reEdit', 'rubberNew', 'draft'];
                var _self = this;
                //初始化开发工具集
                $.each(allTools, function (i, v) {
                    if (_self.constConf[v] && _self.constConf[v].value) {//not undefined or false
                        _self.toolsOpen.push(v);
                    }
                })
                //判断是否处于寻找当前目标元素的模式
                if (_self.toolsOpen.indexOf('reEdit') !== -1 || _self.toolsOpen.indexOf('rubberNew') !== -1 || _self.toolsOpen.indexOf('draft') !== -1) {
                    _self.isSearch = true;//有以上三种情况之一就要支持移动鼠标查找当前数据的操作
                }

                _self.conf.canvas.parentCon = $('#' + _self.targetID);
                //生成canvas元素
                _self.conf.canvas.target = document.createElement('canvas');//结果层
                _self.conf.canvas.target.id = _self.targetID + '_canvas';
                _self.conf.canvas.targetBak = document.createElement('canvas');//过程层
                _self.conf.canvas.targetBak.id = _self.targetID + '_canvasBak';
                _self.conf.canvas.targetImg = document.createElement('canvas');//图片层
                _self.conf.canvas.targetImg.id = _self.targetID + '_canvasImg';
                //插入canvas元素
                var parentDNode = document.getElementById(targetID);
                parentDNode.appendChild(_self.conf.canvas.target);
                parentDNode.appendChild(_self.conf.canvas.targetBak);
                parentDNode.appendChild(_self.conf.canvas.targetImg);
                //设置canvas元素属性
                _self.conf.canvas.parentCon.css('overflow', 'hidden');
                $('#' + _self.conf.canvas.target.id).css(_self.conf.cssInfo.canvas);
                $('#' + _self.conf.canvas.targetBak.id).css(_self.conf.cssInfo.canvasBak);
                $('#' + _self.conf.canvas.targetImg.id).css(_self.conf.cssInfo.canvasImg);
                //获取canvas元素上下文对象
                _self.conf.canvas.targetContext = _self.conf.canvas.target.getContext('2d');
                _self.conf.canvas.targetBakContext = _self.conf.canvas.targetBak.getContext('2d');
                _self.conf.canvas.targetImgContext = _self.conf.canvas.targetImg.getContext('2d');
                ;//图片层

                //文字相关
                _self.conf.paintBoard.input = $('<div id="' + targetID + '_input" autofocus="autofocus" tabindex="-1"></div>').appendTo(_self.conf.canvas.parentCon);//输入框容器
                _self.conf.paintBoard.edit = $('<span id="' + targetID + '_edit" contenteditable="true"></span>').appendTo(_self.conf.paintBoard.input);//输入框
                _self.conf.paintBoard.inputBak = $('<div id="' + targetID + '_inputBak"></span><div>').appendTo(_self.conf.canvas.parentCon);
                _self.conf.paintBoard.editBak = $('<span id="' + targetID + '_editBak">').appendTo(_self.conf.paintBoard.inputBak);
                _self.conf.paintBoard.input.css(_self.conf.cssInfo.input);
                _self.conf.paintBoard.edit.css(_self.conf.cssInfo.edit);
                _self.conf.paintBoard.inputBak.css(_self.conf.cssInfo.inputBak);
                _self.conf.paintBoard.editBak.css(_self.conf.cssInfo.editBak);

                //如果当前模式是绘制模式 防止建立多余的监听机制
                if (_self.constConf.paintModule.value == 'draw') {
                    //建立文本编辑过程中的键盘事件  两个事件必须同时监听否则会出现监听不到的现象
                    // _self.conf.paintBoard.edit.on('keyup', function (e) {
                    //     gerFuc.key_event.call(_self, document.getElementById(_self.targetID + '_edit'), e);
                    // });
                    // _self.conf.paintBoard.edit.on('keydown', function (e) {
                    //     gerFuc.key_event.call(_self, document.getElementById(_self.targetID + '_edit'), e);
                    // });

                    //绑定画布的鼠标事件
                    gerFuc.bindEvent.call(_self, $('#' + _self.conf.canvas.targetBak.id));
                    //绑定文本操作中的事件
                    gerFuc.bindEvent.call(_self, _self.conf.paintBoard.input);

                    //更新当前的默认画笔
                    if (_self.constConf.firstTool && _self.constConf.firstTool.value != '') {
                        _self.curDrawType = _self.constConf.firstTool.value;
                        if (_self.toolsOpen.indexOf(_self.constConf.firstTool.value) !== -1) {
                            gerFuc.draw.call(_self, _self.curDrawType);
                            console.log('[ %s ]---------------------------------> init default tool : %s', getTimeNow(), _self.constConf.firstTool.value);
                        } else {
                            console.error('[ %s ]---------------------------------> error happened when init default tool , unopened tool is used to init current tool : %s', getTimeNow(), _self.constConf.firstTool);
                            return;
                        }
                    } else {
                        console.warn('[ %s ]---------------------------------> there is no default tool type when init default tool!', getTimeNow());
                    }
                }


                gerFuc.drawBackImg.call(_self);//首先绘制背景图片
                //调用一次，为conf复制
                gerFuc.review.call(_self, _self.conf.canvas.parentCon.width(), _self.conf.canvas.parentCon.height());
                _self.isInited = true;
            },
            review: function (wid, hei) {
                //-----------------------屏蔽缩放屏幕时的文字错乱---------------------------
                if (this.conf.paintBoard.input && this.conf.paintBoard.input.css('display') != 'none') {
                    gerFuc.write_end.call(this);
                }
                //-----------------------屏蔽缩放屏幕时的文字错乱---------------------------

                //一些别名
                var temCanvas = this.conf.canvas.target,
                    temCanvasBak = this.conf.canvas.targetBak;

                //设置画布的位置属性
                temCanvas.width = wid;
                temCanvas.height = hei;
                temCanvasBak.width = wid;
                temCanvasBak.height = hei;
                this.conf.paintBoard.inputBak.css('top', hei + 'px');
                //------------------修改---------start------------
                this.conf.canvas.targetImg.style.top = hei + 'px';
                //------------------修改---------end------------
                //获取offset信息，防止绘制的偏移现象
                var offset = this.conf.canvas.parentCon.offset();
                //更新当前的属性信息
                this.conf.canvas.width = wid;
                this.conf.canvas.height = hei;
                this.conf.canvas.left = offset.left;
                this.conf.canvas.top = offset.top;
                //更新数据池的信息

                //用于如果resize之后的重绘本地数据信息
                gerFuc.repaint.call(this);
            },
            bindEvent: function (target) {
                var _self = this;
                target.unbind();
                clientInfo.eventName.mouseDown && target.bind(clientInfo.eventName.mouseDown, gerFuc.mousedown.bind(_self));
                clientInfo.eventName.mouseMove && target.bind(clientInfo.eventName.mouseMove, gerFuc.mousemove.bind(_self));
                clientInfo.eventName.mouseUp && target.bind(clientInfo.eventName.mouseUp, gerFuc.mouseup.bind(_self));
                clientInfo.eventName.mouseOut && target.bind(clientInfo.eventName.mouseOut, gerFuc.mouseout.bind(_self));
            },
            drawBackImg: function (width, height, rotate, callback) {
                if (typeof width == 'function') {
                    callback = width;
                    width = this.conf.canvas.width;
                } else {
                    width = width || this.conf.canvas.width;
                }
                if (typeof height == 'function') {
                    callback = height;
                    height = this.conf.canvas.height;
                } else {
                    height = height || this.conf.canvas.height;
                }
                if (typeof rotate == 'function') {
                    callback = rotate;
                    rotate = 0;
                } else {
                    height = height || 0;
                }
                if (!callback) {
                    //先将背景图放在容器的背景
                    if (this.changeConf.background.module === 'default') {
                        this.conf.canvas.parentCon.css({
                            'background-image': 'url("' + this.changeConf.background.source + '")',
                            'background-size': '100% 100%',
                            '-moz-background-size': '100% 100%',
                            '-webkit-background-size': '100% 100%'
                        });
                    } else if (this.changeConf.background.module === 'real') {
                        this.conf.canvas.parentCon.css({
                            'background-image': 'url("' + this.changeConf.background.source + '")',
                            'background-size': 'auto auto',
                            '-moz-background-size': 'auto auto',
                            '-webkit-background-size': 'auto auto'
                        });
                    }
                    //记录当前的背景信息，防止配置文件被更改
                    this.curBackGIMG.module = this.changeConf.background.module;
                    this.curBackGIMG.source = this.changeConf.background.source;
                }
                else {
                    try {
                        //真实绘图，打印图片

                        //首先暂停绘制
                        this.changeConf.pauseDraw.state = true;

                        //负责绘制canvas的背景图片
                        var temImg = document.createElement('img');
                        var _self = this;
                        temImg.onload = function () {
                            //------------------修改---------start------------
                            //先将本地的画布大小记录并修改为用户想要的尺寸
                            var temW = this.conf.canvas.width,
                                temH = this.conf.canvas.height;
                            _self.conf.canvas.width = width;
                            _self.conf.canvas.height = height;
                            _self.conf.canvas.targetImg.width = 0;
                            _self.conf.canvas.targetImg.width = width;
                            _self.conf.canvas.targetImg.height = height;
                            var base = width / temImg.height;
                            if (rotate !== 0) {
                                _self.conf.canvas.centerPX = Math.round(width / 2);
                                _self.conf.canvas.centerPY = Math.round(height / 2);
                                _self.conf.canvas.targetImgContext.save();//保存状态
                                if (Math.abs(rotate) == 90 || Math.abs(rotate) == 270 || Math.abs(rotate) == 180) {
                                    _self.conf.canvas.targetImgContext.translate(_self.conf.canvas.centerPX, _self.conf.canvas.centerPY);//设置画布上的(0,0)位置，也就是旋转的中心点
                                } else {
                                    console.error('[ %s ]---------------------------------> error happened when build current canvas to base64 images : nonsupport rotate number', getTimeNow());
                                    _self.conf.canvas.targetImgContext.restore();//恢复状态
                                    return;
                                }

                                _self.conf.canvas.targetImgContext.rotate(rotate * Math.PI / 180);
                                _self.conf.canvas.targetImgContext.translate(-_self.conf.canvas.centerPX, -_self.conf.canvas.centerPY);//恢复画布的中心点
                            } else {
                                _self.conf.canvas.centerPX = 0;
                                _self.conf.canvas.centerPY = 0;
                            }

                            _self.conf.canvas.targetImgContext.globalCompositeOperation = 'source-over';


                            //为了保持和当前背景图片一致，使用WEBSDK的对象下的背景数据
                            if (_self.curBackGIMG.module === 'default') {
                                if (Math.abs(rotate) == 90 || Math.abs(rotate) == 270) {
                                    _self.conf.canvas.targetImgContext.drawImage(temImg, _self.conf.canvas.centerPX - temImg.width / 2 * base, _self.conf.canvas.centerPY - temImg.height / 2 * base,
                                        height, width);
                                } else if (Math.abs(rotate) == 180) {
                                    _self.conf.canvas.targetImgContext.drawImage(temImg, _self.conf.canvas.centerPX - temImg.height / 2 * base, _self.conf.canvas.centerPY - temImg.width / 2 * base,
                                        width, height);
                                } else {
                                    _self.conf.canvas.targetImgContext.drawImage(temImg, 0, 0, width, height);
                                }
                                // _self.conf.canvas.targetImgContext.drawImage(temImg,_self.conf.canvas.centerPX-temImg.width/2,_self.conf.canvas.centerPY-temImg.height/2,_self.conf.canvas.width,_self.conf.canvas.height+1000);
                                // _self.conf.canvas.targetImgContext.drawImage(temImg,0,0,);
                            } else if (_self.curBackGIMG.module === 'real') {
                                if (Math.abs(rotate) == 90 || Math.abs(rotate) == 270) {
                                    _self.conf.canvas.targetImgContext.drawImage(temImg, _self.conf.canvas.centerPX - temImg.width / 2 * base, _self.conf.canvas.centerPY - temImg.height / 2 * base);
                                } else if (Math.abs(rotate) == 180) {
                                    _self.conf.canvas.targetImgContext.drawImage(temImg, _self.conf.canvas.centerPX - temImg.height / 2 * base, _self.conf.canvas.centerPY - temImg.width / 2 * base);
                                } else {
                                    _self.conf.canvas.targetImgContext.drawImage(temImg, -temImg.width / 2 * base, -temImg.height / 2 * base);
                                }
                                _self.conf.canvas.targetImgContext.drawImage(temImg, _self.conf.canvas.centerPX - temImg.width / 2, _self.conf.canvas.centerPY - temImg.height / 2);
                                // _self.conf.canvas.targetImgContext.drawImage(temImg,0,0,temImg.width,temImg.height,-_self.conf.canvas.centerPX,-_self.conf.canvas.centerPY,temImg.width,temImg.height);
                            }
                            if (rotate !== 0) {
                                _self.conf.canvas.centerPX = 0;
                                _self.conf.canvas.centerPY = 0;
                                _self.conf.canvas.targetImgContext.restore();//恢复状态
                            }
                            //启动绘制背景图片的模式  目标画布为img
                            gerFuc.repaint.call(_self, 1, _self.conf.canvas.targetImgContext);

                            //再恢复本地的尺寸数据
                            _self.conf.canvas.width = temW;
                            _self.conf.canvas.height = temH;

                            callback(_self.conf.canvas.targetImg.toDataURL('img/png'));

                            //恢复绘制
                            _self.changeConf.pauseDraw.state = false;
                            //------------------修改---------end------------
                        }
                        temImg.onerror = function () {
                            //重新加入背景图片
                            gerFuc.drawBackImg.call(_self);
                            //去除canvas背景重绘
                            gerFuc.repaint.call(_self);
                            callback(_self.conf.canvas.target.toDataURL('img/png'));
                        }
                        //为了保持和当前背景图片一致，使用_self的对象下的背景数据
                        temImg.src = _self.curBackGIMG.source;
                    } catch (e) {
                        console.error('[ %s ]---------------------------------> error happened when build current canvas to base64 images : %s', getTimeNow(), e);
                    }

                }
            },
            buildImg: function (width, height, rotate, callback) {
                //将背景图片绘制到canvas上
                return gerFuc.drawBackImg.call(this, width, height, rotate, callback);
            },
            setSealIMG: function (callback) {
                if (!callback) {
                    console.warn('[ %s ]---------------------------------> there is no callback function,something will be wrong!', getTimeNow());
                }
                try {
                    if (this.changeConf.seal.source !== '' || this.changeConf.seal.type !== '') {
                        if (this.changeConf.seal.source !== '' && this.changeConf.seal.type !== '') {
                            if (!this.conf.canvas.seal.img[this.changeConf.seal.type]) {
                                this.conf.canvas.seal.img[this.changeConf.seal.type] = document.createElement('img');
                                var _self = this;
                                this.conf.canvas.seal.img[this.changeConf.seal.type].onload = function () {
                                    _self.conf.canvas.seal.curType = _self.changeConf.seal.type;
                                    if (callback) {
                                        callback('success');
                                    }
                                };
                                this.conf.canvas.seal.img[_self.seal.type].onerror = function () {
                                    this.conf.canvas.seal.img[_self.changeConf.seal.type] = null;
                                    if (callback) {
                                        callback('error');
                                    }
                                };

                                this.conf.canvas.seal.img[this.changeConf.seal.type].src = this.changeConf.seal.source;
                            } else {
                                this.conf.canvas.seal.curType = this.changeConf.seal.type;
                                if (callback) {
                                    callback('success');
                                }
                            }
                        } else {
                            if (callback) {
                                callback('error');
                            }
                            console.error('[ %s ]---------------------------------> error happened when draw seal type : there is some changeConf for seal lost', getTimeNow());
                        }
                    } else {
                        if (callback) {
                            callback('error');
                        }
                        console.error('[ %s ]---------------------------------> error happened when draw seal type : there is some changeConf for seal lost', getTimeNow());
                    }
                } catch (e) {
                    if (callback) {
                        callback('error');
                    }
                    console.error('[ %s ]---------------------------------> error happened when change seal\'s source : %s', getTimeNow(), e);
                }
            },
            draw: function (graphType, callback) {
                //处理操作信息
                if (graphType == 'back') {
                    if(this.backObj){
                        var targetId = this.backObj.targetID;//取当前的要删除的对象
                        if (targetId) {//防止空
                            gerFuc.handle_back.call(this, targetId);//调用撤销函数
                        }else{
                            console.error('[ %s ]----------->error happened when back: backObj is null', getTimeNow());
                        }
                    }
                    if (callback) {
                        callback('success');
                    }
                }
                else if (graphType == 'clear') {
                    gerFuc.handle_clear.call(this);//清空
                    if (callback) {
                        callback('success');
                    }
                }
                else {
                    this.curDrawType = graphType;//record current draw type 记录当前的画笔类型
                    //如果是图章工具
                    if (graphType === 'seal') {
                        gerFuc.setSealIMG.call(this, callback);
                    } else {
                        if (callback) {
                            callback('success');
                        }
                    }
                }
            },
            mousedown: function (e) {
                e = e || window.event || arguments.callee.caller.arguments[0];
                var winEvent = e;
                if(clientInfo.type == "mobile"){
                    e = e.touches?e.touches[0]:(e.originalEvent?(e.originalEvent.touches[0]?e.originalEvent.touches[0]:e.originalEvent.changedTouches[0]):e);
                }
                //更新outEvent
                this.outEvent = false;
                if (this.constConf.paintModule.value == 'draw' && !this.changeConf.pauseDraw.state) {//if canvas can be allowed to draw now
                    var context = this.conf.canvas.targetBakContext,
                        canvasW = this.conf.canvas.width,
                        canvasH = this.conf.canvas.height;
                    //paint the words to the board when we edit words but not click board  防止在编辑文字时，未点击画布其他位置将文字打印在画布上
                    if (this.conf.paintBoard.input.css('display') != 'none' && this.curDrawType != 'text') {
                        var id_cur = (e.target || e.srcElement).id;
                        if (id_cur != this.targetID + '_input' && id_cur != this.targetID + '_edit') {
                            gerFuc.write_end.call(this);
                        }
                    }
                    this.downEvent = true;//record down event 记录down事件

                    //update offset data
                    var offset = this.conf.canvas.parentCon.offset();
                    this.conf.canvas.left = offset.left;
                    this.conf.canvas.top = offset.top;

                    //update mouse data
                    this.mouseData.startX = Math.round(e.clientX + document.body.scrollLeft - this.conf.canvas.left);
                    this.mouseData.startY = Math.round(e.clientY + document.body.scrollTop - this.conf.canvas.top);

                    //单独处理矩形区域的点，避免溢出看不到绘制的边线
                    if (this.curDrawType === 'rect') {
                        var lineBW = Math.round(this.changeConf.rect.size * canvasW / this.constConf.baseSize.value);
                        this.mouseData.startX = (this.mouseData.startX - lineBW) >= 0 ? this.mouseData.startX : lineBW;
                        this.mouseData.startY = (this.mouseData.startY - lineBW) >= 0 ? this.mouseData.startY : lineBW;
                    }

                    //更新鼠标信息
                    this.mouseData.minX = this.mouseData.startX;
                    this.mouseData.minY = this.mouseData.startY;
                    this.mouseData.maxX = this.mouseData.startX;
                    this.mouseData.maxY = this.mouseData.startY;

                    //clear container of all points 先清空一次鼠标数据
                    this.mouseData.pointArr.length = 0;

                    var _self = this;
                    switch (_self.curDrawType) {
                        //每一个case基本模式都一样，先记录点信息，然后设置canvas的特定属性，之后就是canvas的固定写法
                        case 'pencil':
                            var lineWid = Math.round(_self.changeConf.pencil.size * canvasW / this.constConf.baseSize.value);
                            //set context 设置绘制配置信息
                            context.strokeStyle = _self.changeConf.pencil.color;
                            context.lineWidth = lineWid;
                            context.moveTo(_self.mouseData.startX, _self.mouseData.startY);
                            _self.mouseData.pointArr.push({'x': _self.mouseData.startX, 'y': _self.mouseData.startY});
                            context.beginPath();
                            break;
                        case 'highPencil':
                            context.moveTo(_self.mouseData.startX, _self.mouseData.startY);

                            _self.mouseData.pointArr.push({'x': _self.mouseData.startX, 'y': _self.mouseData.startY});
                            context.save();
                            context.beginPath();
                            context.globalAlpha = _self.changeConf.highPencil.alpha;
                            context.globalCompositeOperation = 'xor';
                            context.strokeStyle = _self.changeConf.highPencil.color;
                            context.lineWidth = _self.changeConf.highPencil.size * canvasW / this.constConf.baseSize.value;
                            break;
                        case 'rect':
                            var lineWid = Math.round(_self.changeConf.rect.size * canvasW / this.constConf.baseSize.value);
                            //set context 设置绘制配置信息
                            context.strokeStyle = _self.changeConf.rect.color;
                            context.lineWidth = lineWid;
                            context.moveTo(_self.mouseData.startX, _self.mouseData.startY);

                            _self.mouseData.pointArr.push({'x': _self.mouseData.startX, 'y': _self.mouseData.startY});
                            break;
                        case 'rubberOld':
                            var sizerub = _self.changeConf.rubberOld.size;
                            _self.mouseData.pointArr.push({'x': _self.mouseData.startX, 'y': _self.mouseData.startY});
                            context.clearRect(_self.mouseData.startX - sizerub / 2, _self.mouseData.startY - sizerub / 2, sizerub, sizerub);
                            break;
                        case 'rubberNew':
                            var tem_e = _self.curTarget;
                            if (tem_e) {
                                //统一颜色
                                gerFuc.reInitColor.call(_self);
                                //修改当前的笔迹颜色
                                tem_e.color = _self.changeConf.targetSelect.color;
                                //所有笔迹重新绘制
                                gerFuc.repaint.call(_self);
                            }
                            break;
                        case 'text':
                            var target = e.target || e.srcElement;
                            if (target.id == _self.targetID + '_input') {//拖拽
                                //标记哨兵 表明现在正在处于拖拽状态
                                _self.textData.signTextDrag = true;
                                //设置为只读状态
                                _self.conf.paintBoard.edit.readOnly = 'true';
                                //设置当前状态下的最大宽高
                                _self.conf.paintBoard.input.css({
                                    'min-width': _self.conf.paintBoard.input.scrollWidth + 'px',
                                    'min-height': _self.conf.paintBoard.input.scrollHeight + 'px'
                                });
                                //阻止事件的默认事件以及向上冒泡
                                winEvent.preventDefault();
                                winEvent.stopPropagation();
                            }
                            else if (target.id == _self.targetID + '_edit') {//输入
                                //更改哨兵
                                _self.textData.signTextDrag = false;
                                //可写
                                _self.conf.paintBoard.edit.readOnly = '';
                                //阻止冒泡
                                e.stopPropagation();
                            } else {
                                if (_self.conf.paintBoard.input.css('display') == "none") {
                                    if (_self.toolsOpen.indexOf('reEdit') !== -1 && _self.curTarget != null && _self.curTarget.drawingType == 4) {//重写
                                        //reedit module
                                        gerFuc.reEditText.call(_self, e);
                                    }
                                    else {//写文字
                                        //first time to text
                                        gerFuc.write_start.call(_self, _self.mouseData.startX, _self.mouseData.startY);
                                    }
                                }
                                else {//打印
                                    gerFuc.write_end.call(_self);
                                    gerFuc.clearConText.call(_self);
                                    _self.textData.signTextDrag = false;
                                }
                            }
                            break;
                        case 'draft':
                            if (_self.curTarget && _self.curTarget.drawingType != 10) {
                                //必须记录的两个重要信息 初始的位置信息
                                _self.dragData.initialLeft = _self.curTarget.drag_left;
                                _self.dragData.initialTop = _self.curTarget.drag_top;
                                _self.curTarget.color = _self.changeConf.targetSelect.color;
                                //先隐藏这笔，但是要画在蒙版上
                                _self.curTarget.display = 0;
                                gerFuc.repaint.call(_self);
                                _self.curTarget.display = 1;
                                _self.curTarget.handle(_self.conf.canvas, _self.constConf.baseSize.value, _self.textData.inputBorder, context);
                            }
                            break;
                        case 'seal'://新增印章 黑鸟
                            //只监听最后的抬起
                            break;
                        default :
                            break;
                    }
                    if (_self.curDrawType != 'text') {
                        winEvent.preventDefault();
                        winEvent.stopPropagation();
                    }
                }
            },
            mousemove: function (e) {
                e = e || window.event || arguments.callee.caller.arguments[0];
                var winEvent = e;
                if(clientInfo.type == "mobile"){
                    e = e.touches?e.touches[0]:(e.originalEvent?(e.originalEvent.touches[0]?e.originalEvent.touches[0]:e.originalEvent.changedTouches[0]):e);
                }
                //更新outEvent
                this.outEvent = false;
                var context = this.conf.canvas.targetBakContext,
                    canvasW = this.conf.canvas.width,
                    canvasH = this.conf.canvas.height;
                //calculate the point {x,y} to line to
                var x = Math.round(e.clientX + document.body.scrollLeft - this.conf.canvas.left);
                var y = Math.round(e.clientY + document.body.scrollTop - this.conf.canvas.top);
                this.mouseData.nowX = x;
                this.mouseData.nowY = y;
                if (this.downEvent) {//in the event of down event is alive 判断如果down事件被点击
                    this.mouseData.minX = (x < this.mouseData.minX) ? x : this.mouseData.minX;
                    this.mouseData.maxX = (x > this.mouseData.maxX) ? x : this.mouseData.maxX;
                    this.mouseData.minY = (y < this.mouseData.minY) ? y : this.mouseData.minY;
                    this.mouseData.maxY = (y > this.mouseData.maxY) ? y : this.mouseData.maxY;

                    var _self = this;
                    switch (_self.curDrawType) {
                        case 'pencil':
                            context.lineTo(x, y);
                            context.stroke();
                            _self.mouseData.pointArr.push({'x': x, 'y': y});
                            break;
                        case 'highPencil':
                            context.lineTo(x, y);
                            context.stroke();
                            _self.mouseData.pointArr.push({'x': x, 'y': y});
                            break;
                        case 'rect':
                            context.beginPath();
                            gerFuc.clearConText.call(_self);
                            context.moveTo(_self.mouseData.startX, _self.mouseData.startY);
                            context.lineTo(x, _self.mouseData.startY);
                            context.lineTo(x, y);
                            context.lineTo(_self.mouseData.startX, y);
                            context.lineTo(_self.mouseData.startX, _self.mouseData.startY);
                            context.lineTo(x, _self.mouseData.startY);
                            context.stroke();
                            break;
                        case 'rubberOld':
                            var sizerub = _self.changeConf.rubberOld.size;
                            _self.mouseData.pointArr.push({'x': x, 'y': y});
                            _self.conf.canvas.targetContext.clearRect(x - sizerub / 2, y - sizerub / 2, sizerub, sizerub);
                            break;
                        case 'rubberNew':
                            _self.curTarget = gerFuc.e_search.call(_self, x, y);
                            var targetCr = _self.curTarget;
                            gerFuc.reInitColor.call(_self);
                            if (targetCr) {
                                targetCr.color = _self.changeConf.targetSelect.color;
                            }
                            gerFuc.repaint.call(_self);
                            break;
                        case 'text':
                            if (_self.textData.signTextDrag)//编辑过程中的拖拽
                            {
                                //_self.textData.pointXTD maybe == _self.mouseData.startX and maybe not
                                _self.conf.paintBoard.input.css({
                                    'left': _self.textData.pointXTD + x - _self.mouseData.startX + 'px',
                                    'top': _self.textData.pointYTD + y - _self.mouseData.startY + 'px'
                                });
                                //_self.textData.pointLeftTD and _self.textData.pointTopTD used to avoid tea turn page when stu is dragging text
                                _self.textData.pointLeftTD = _self.textData.pointXTD + x - _self.mouseData.startX;
                                _self.textData.pointTopTD = _self.textData.pointYTD + y - _self.mouseData.startY;
                            }
                            break;
                        case 'draft':
                            //这里做移动操作
                            //improve safety
                            if (_self.curTarget) {
                                gerFuc.clearConText.call(_self);
                                var s = _self.curTarget.canvasWidth / canvasW;
                                _self.curTarget.drag_left = Math.round((x - _self.mouseData.startX) * s + _self.dragData.initialLeft);
                                _self.curTarget.drag_top = Math.round((y - _self.mouseData.startY) * s + _self.dragData.initialTop);
                                _self.curTarget.handle(_self.conf.canvas, _self.constConf.baseSize.value, _self.textData.inputBorder, context);
                            }
                            break;
                        case 'seal'://新增印章 黑鸟
                            //只监听最后的抬起
                            break;
                        default:
                            break;
                    }
                }
                else if (!this.changeConf.pauseDraw.state && this.isSearch && !this.textData.signREdit) {//新功能中的down未触发，移动鼠标，高亮当前的笔迹
                    this.curTarget = null;
                    this.curTarget = gerFuc.e_search.call(this, x, y);
                    if (this.curTarget) {//当前鼠标区域存在笔迹
                        var a = this.curDrawType == 'rubberNew',//新版橡皮擦 new rubber
                            //draft module but current target type is not Highlighter pen
                            b = this.curDrawType == 'draft' && this.curTarget.drawingType != 10,//当前对象不是荧光笔且处于拖拽模式
                            //text module but current target type is text
                            c = this.curDrawType == 'text' && this.curTarget.drawingType == 4,//处于编辑模式切当前为文字文字
                            //different id from last color changed target
                            d = this.curTarget.id != this.colorChangeId;
                        if ((a || b || c) && d) {
                            gerFuc.reInitColor.call(this);
                            this.colorChange = true;
                            if (this.curTarget.drawingType != 4)//not text
                            {
                                this.colorName = this.curTarget.color;
                                this.curTarget.color = this.changeConf.targetSelect.color;
                            }
                            else//text
                            {
                                this.colorName = this.curTarget.font_color;
                                this.curTarget.font_color = this.changeConf.targetSelect.color;
                            }
                            gerFuc.repaint.call(this);
                            this.colorChangeId = this.curTarget.id;
                        }
                    }
                    else if (this.colorChange) {//当前鼠标区域没有笔迹，但是之前的操作有笔迹颜色的变化
                        //回复颜色
                        gerFuc.reInitColor.call(this);
                        //重绘
                        gerFuc.repaint.call(this);
                        //修改哨兵
                        this.colorChange = false;
                        this.colorChangeId = -1;
                    }
                }
                //除去文本的默认事件处理  文本之前已经处理，不再统一处理，涉及到拖拽
                if (this.curDrawType != 'text') {
                    winEvent.preventDefault();
                    winEvent.stopPropagation();
                }
            },
            mouseup: function (e) {
                e = e || window.event || arguments.callee.caller.arguments[0];
                var winEvent = e;
                if(clientInfo.type == "mobile"){
                    e = e.touches?e.touches[0]:(e.originalEvent?(e.originalEvent.touches[0]?e.originalEvent.touches[0]:e.originalEvent.changedTouches[0]):e);
                }
                if (!this.changeConf.pauseDraw.state && this.downEvent) {
                    var re;
                    var canvasW = this.conf.canvas.width,
                        canvasH = this.conf.canvas.height;
                    //处理文本的拖拽的过程中文本区域超出canvas的区域
                    if (this.curDrawType == 'text') {
                        re = gerFuc.inputRange.call(this);//获取纠正数据
                        this.conf.paintBoard.edit.focus();
                    }
                    //down事件完毕
                    this.downEvent = false;
                    var x = 0,
                        y = 0;

                    //avoid window.event is undefined
                    //避免window.event为undefined
                    x = (e.clientX) ? (Math.round(e.clientX + document.body.scrollLeft - this.conf.canvas.left)) : this.mouseData.nowX;
                    y = (e.clientY) ? (Math.round(e.clientY + document.body.scrollTop - this.conf.canvas.top)) : this.mouseData.nowY;

                    //单独处理矩形区域的点，避免溢出看不到绘制的边线
                    if (this.curDrawType === 'rect') {
                        //策略：先对0做纠正，然后再比较当前的点信息加边宽和canvas的宽高对比，调节当前的点
                        var lineWid = Math.round(this.changeConf.rect.size * canvasW / this.constConf.baseSize.value);
                        x = (x - lineWid) >= 0 ? x : lineWid;
                        y = (y - lineWid) >= 0 ? y : lineWid;

                        x = (x + lineWid - this.conf.canvas.width) <= 0 ? x : this.conf.canvas.width - lineWid;
                        y = (y + lineWid - this.conf.canvas.height) <= 0 ? y : this.conf.canvas.height - lineWid;
                    }

                    if (this.curDrawType === 'seal') {
                        //先对当前的x y做处理  保证不超出当前的  为后面的居中操作做合法数据
                        x = x - this.changeConf.seal.width / 2 > 0 ? x : this.changeConf.seal.width / 2;
                        y = y - this.changeConf.seal.height / 2 > 0 ? y : this.changeConf.seal.height / 2;

                        x = canvasW - x - this.changeConf.seal.width / 2 >= 0 ? x : canvasW - this.changeConf.seal.width / 2;
                        y = canvasH - y - this.changeConf.seal.height / 2 >= 0 ? y : canvasH - this.changeConf.seal.height / 2;

                        //居中显示
                        x -= this.changeConf.seal.width / 2;
                        y -= this.changeConf.seal.height / 2;

                        this.mouseData.minX = x;
                        this.mouseData.maxX = x + this.changeConf.seal.width;
                        this.mouseData.minY = y;
                        this.mouseData.maxY = y + this.changeConf.seal.height;
                    } else {
                        this.mouseData.minX = (x < this.mouseData.minX) ? x : this.mouseData.minX;
                        this.mouseData.maxX = (x > this.mouseData.maxX) ? x : this.mouseData.maxX;
                        this.mouseData.minY = (y < this.mouseData.minY) ? y : this.mouseData.minY;
                        this.mouseData.maxY = (y > this.mouseData.maxY) ? y : this.mouseData.maxY;
                    }

                    //计算当前的笔迹的矩形区域
                    var child_div_W = Math.max(Math.round(this.mouseData.maxX - this.mouseData.minX), 10 * canvasW / this.constConf.baseSize.value);
                    var child_div_H = Math.max(Math.round(this.mouseData.maxY - this.mouseData.minY), 10 * canvasW / this.constConf.baseSize.value);

                    this.mouseData.pointArr.push({'x': x, 'y': y});

                    //mouse's move is effective or not  屏蔽无意义的点击，防抖处理
                    var effectMove = this.mouseData.minX != this.mouseData.maxX || this.mouseData.minY != this.mouseData.maxY;

                    var _self = this;
                    switch (_self.curDrawType) {
                        case 'pencil':
                            /*封装obj*/
                            if (effectMove) {
                                var obj = {
                                    'handleType': 0,//add
                                    'drawingType': 0,//pen
                                    'localID': _self.localIDHead + _self.localID,
                                    'svcID': -1,
                                    'specialValue': {
                                        'ownerID': _self.constConf.ownerID.value,
                                        'color': _self.changeConf.pencil.color,
                                        'size': _self.changeConf.pencil.size,
                                        'canvasWidth': canvasW,
                                        'canvasHeight': canvasH,
                                        'child_div_W': child_div_W,//current handwriting's area  笔迹的矩形区域
                                        'child_div_H': child_div_H,//current handwriting's area  笔迹的矩形区域
                                        'margin_left': _self.mouseData.minX,//current handwriting's position  笔迹矩形区域的边距
                                        'margin_top': _self.mouseData.minY,//current handwriting's position   笔迹矩形区域的边距
                                        'point': _self.mouseData.pointArr.slice(0)//container of points  点信息
                                    }
                                };
                                //发送给callback
                                gerFuc.objFactory.call(_self,'add',_self.localID,obj);

                                //显示该笔迹
                                gerFuc.showPaint.call(_self, obj, 'local');

                                //清除过程层笔迹
                                gerFuc.clearConText.call(_self);
                            }
                            break;
                        case 'highPencil':
                            if (effectMove) {
                                /*封装obj*/
                                var obj = {
                                    'handleType': 0,//add
                                    'drawingType': 10,//sign pen
                                    'localID': _self.localIDHead + _self.localID,
                                    'svcID': -1,
                                    'specialValue': {
                                        'ownerID': _self.constConf.ownerID.value,
                                        'color': _self.changeConf.highPencil.color,
                                        'size': _self.changeConf.highPencil.size,
                                        'alpha': _self.changeConf.highPencil.alpha,
                                        'canvasWidth': canvasW,
                                        'canvasHeight': canvasH,
                                        'child_div_W': child_div_W,//current handwriting's area  笔迹的矩形区域
                                        'child_div_H': child_div_H,//current handwriting's area  笔迹的矩形区域
                                        'margin_left': _self.mouseData.minX,//current handwriting's position  笔迹矩形区域的边距
                                        'margin_top': _self.mouseData.minY,//current handwriting's position  笔迹矩形区域的边距
                                        'point': _self.mouseData.pointArr.slice(0)//container of points 点信息
                                    }
                                };
                                //发送给callback
                                gerFuc.objFactory.call(_self,'add',_self.localID,obj);
                                //显示该笔迹
                                gerFuc.showPaint.call(_self, obj, 'local');

                                //恢复一次
                                _self.conf.canvas.targetBakContext.restore();
                                //清除过程层笔迹
                                gerFuc.clearConText.call(_self);
                            }
                            break;
                        case 'rect':
                            if (effectMove) {
                                child_div_W = _self.mouseData.maxX - _self.mouseData.minX;
                                child_div_H = _self.mouseData.maxY - _self.mouseData.minY;

                                /*封装obj*/
                                var obj = {
                                    'handleType': 0,//add
                                    'drawingType': 2,//rectangle
                                    'localID': _self.localIDHead + _self.localID,
                                    'svcID': -1,
                                    'specialValue': {
                                        'ownerID': _self.constConf.ownerID.value,
                                        'color': _self.changeConf.rect.color,
                                        'size': _self.changeConf.rect.size,
                                        'canvasWidth': canvasW,
                                        'canvasHeight': canvasH,
                                        'child_div_W': child_div_W,//current handwriting's area  笔迹的矩形区域
                                        'child_div_H': child_div_H,//current handwriting's area  笔迹的矩形区域
                                        'margin_left': _self.mouseData.minX,//current handwriting's position  笔迹矩形区域的边距
                                        'margin_top': _self.mouseData.minY,//current handwriting's position  笔迹矩形区域的边距
                                        'point': _self.mouseData.pointArr.slice(0)//container of points  点信息
                                    }
                                };
                                //发送给callback
                                gerFuc.objFactory.call(_self,'add',_self.localID,obj);
                                //显示该笔迹
                                gerFuc.showPaint.call(_self, obj, 'local');

                                //清除过程层笔迹
                                gerFuc.clearConText.call(_self);
                            }
                            break;
                        case 'rubberOld':
                            /*封装obj*/
                            var obj = {
                                'handleType': 0,//add
                                'drawingType': 3,//rubber
                                'localID': _self.localIDHead + _self.localID,
                                'svcID': -1,
                                'specialValue': {
                                    'ownerID': _self.constConf.ownerID.value,
                                    'color': _self.changeConf.pencil.color,
                                    'size': _self.changeConf.rubberOld.size,
                                    'canvasWidth': canvasW,
                                    'canvasHeight': canvasH,
                                    'child_div_W': child_div_W,//current handwriting's area  笔迹的矩形区域
                                    'child_div_H': child_div_H,//current handwriting's area  笔迹的矩形区域
                                    'margin_left': _self.mouseData.minX,//current handwriting's position  笔迹矩形区域的边距
                                    'margin_top': _self.mouseData.minY,//current handwriting's position  笔迹矩形区域的边距
                                    'point': _self.mouseData.pointArr.slice(0)//container of points  点信息
                                }
                            };
                            //发送给callback
                            gerFuc.objFactory.call(_self,'add',_self.localID,obj);
                            var sizerub = _self.changeConf.rubberOld.size;
                            //清除最后一个点
                            _self.conf.canvas.targetContext.clearRect(x - sizerub / 2, y - sizerub / 2, sizerub, sizerub);
                            //显示该笔迹
                            gerFuc.showPaint.call(_self, obj, 'local');
                            break;
                        case 'rubberNew':
                            var tem_e = gerFuc.e_search.call(_self, x, y);
                            if (tem_e) {
                                /*封装obj*/
                                var obj = {
                                    'handleType': 0,//add
                                    'drawingType': 500,//new handle
                                    'localID': _self.localIDHead + _self.localID,
                                    'svcID': -1,
                                    'specialValue': {
                                        'localID': tem_e.id,
                                        'type': 0 //new rubber
                                    }
                                };
                                //发送给callback
                                gerFuc.objFactory.call(_self,'add',_self.localID,obj);
                                //回复颜色
                                switch (tem_e.drawingType) {
                                    case 0://pencil
                                        tem_e.color = _self.changeConf.pencil.color;
                                        break;
                                    case 2://rect
                                        tem_e.color = _self.changeConf.rect.color;
                                        break;
                                    case 4://text
                                        tem_e.color = _self.changeConf.text.fontColor;
                                        break;
                                    case 10:
                                        tem_e.color = _self.changeConf.targetSelect.color;
                                        break;
                                }

                                //显示
                                gerFuc.showPaint.call(_self, obj, 'local');

                                gerFuc.repaint.call(_self);
                            }
                            else {
                                gerFuc.reInitColor.call(_self);
                                gerFuc.repaint.call(_self);
                            }
                            break;
                        case 'text':
                            if (_self.textData.signTextDrag) {
                                var input = document.getElementById(_self.targetID + '_input'),
                                    edit = document.getElementById(_self.targetID + '_edit'),
                                    inputBak = document.getElementById(_self.targetID + '_inputBak');
                                var bor = 2 * _self.textData.inputBorder;//获取input的border宽度
                                var minW = Math.round(_self.changeConf.text.fontSize * canvasW / _self.constConf.baseSize.value);//设置的默认的显示的输入框大小
                                //获取当前的偏移值
                                _self.textData.pointLeftTD = _self.textData.pointXTD + x - _self.mouseData.startX;
                                _self.textData.pointTopTD = _self.textData.pointYTD + y - _self.mouseData.startY;
                                //纠正当前的偏移值
                                _self.textData.pointXTD = _self.textData.pointLeftTD + re.shiftX;
                                _self.textData.pointYTD = _self.textData.pointTopTD + re.shiftY;
                                //获取当前的文本的宽高
                                _self.textData.inputMaxWid = canvasW - _self.textData.pointXTD - bor;
                                _self.textData.inputMaxHei = canvasH - _self.textData.pointYTD - bor;
                                //重置容器的最大的宽高
                                input.style.maxWidth = _self.textData.inputMaxWid + 'px';
                                input.style.maxHeight = _self.textData.inputMaxHei + 'px';
                                inputBak.style.maxWidth = _self.textData.inputMaxWid + 'px';
                                inputBak.style.maxHeight = _self.textData.inputMaxHei + 'px';
                                //根据纠正的值重置边距位置
                                input.style.left = _self.textData.pointXTD + 'px';
                                input.style.top = _self.textData.pointYTD + 'px';
                                //设置最小的宽高
                                input.style.minWidth = minW + 'px';
                                input.style.minHeight = minW + 'px';
                                //还原
                                _self.textData.signTextDrag = false;
                                //可写
                                edit.readOnly = '';
                            }
                            break;
                        case 'draft':
                            if (effectMove) {
                                if (x - _self.mouseData.startX != 0 || y - _self.mouseData.startY != 0) {//是否移动了
                                    if (_self.curTarget && !_self.textData.signREdit) {
                                        //if current target over or not， four kinds 拖拽时是否超出画布，四个方向四种情况
                                        var s = canvasW / _self.curTarget.canvasWidth;
                                        if (s * (_self.curTarget.margin_left + _self.curTarget.drag_left) < 0) {
                                            _self.curTarget.drag_left = Math.round(0 - _self.curTarget.margin_left);
                                        }
                                        if (s * (_self.curTarget.margin_top + _self.curTarget.drag_top) < 0) {
                                            _self.curTarget.drag_top = Math.round(0 - _self.curTarget.margin_top);
                                        }
                                        if (s * (_self.curTarget.margin_left + _self.curTarget.drag_left + _self.curTarget.child_div_W) > canvasW) {
                                            _self.curTarget.drag_left = Math.round((canvasW - 10) / s - _self.curTarget.child_div_W - _self.curTarget.margin_left);
                                        }
                                        if (s * (_self.curTarget.margin_top + _self.curTarget.drag_top + _self.curTarget.child_div_H) > canvasH) {
                                            _self.curTarget.drag_top = Math.round(canvasH / s - _self.curTarget.child_div_H - _self.curTarget.margin_top);
                                        }

                                        gerFuc.clearConText.call(_self);

                                        var obj = {
                                            'handleType': 0,//add
                                            'drawingType': 500,//new handle
                                            'localID': _self.localIDHead + _self.localID,
                                            'svcID': -1,
                                            'specialValue': {
                                                'localID': _self.curTarget.id,
                                                'type': 1,//drag
                                                'drag_left': _self.curTarget.drag_left,//x轴拖拽的距离
                                                'drag_top': _self.curTarget.drag_top//y轴拖拽的距离
                                            }
                                        };
                                        //发送给callback
                                        gerFuc.objFactory.call(_self,'add',_self.localID,obj);
                                        gerFuc.showPaint.call(_self, obj, 'local');

                                        _self.curTarget.handle(_self.conf.canvas, _self.constConf.baseSize.value, _self.textData.inputBorder, _self.conf.canvas.targetContext);
                                    }
                                }
                            } else {
                                gerFuc.repaint.call(_self);
                            }
                            break;
                        case 'seal'://新增印章 黑鸟
                            if (_self.conf.canvas.seal.curType != '' && _self.conf.canvas.seal.img[_self.conf.canvas.seal.curType]) {
                                //只监听最后的抬起
                                var obj = {
                                    'handleType': 0,//add
                                    'drawingType': 20,//seal 图章
                                    'localID': _self.localIDHead + _self.localID,
                                    'svcID': -1,
                                    'specialValue': {
                                        'ownerID': _self.constConf.ownerID.value,
                                        'width': _self.changeConf.seal.width,
                                        'height': _self.changeConf.seal.height,
                                        'sealType': _self.conf.canvas.seal.curType,
                                        'canvasWidth': canvasW,
                                        'canvasHeight': canvasH,
                                        'child_div_W': _self.changeConf.seal.width,//current handwriting's area  笔迹的矩形区域
                                        'child_div_H': _self.changeConf.seal.height,//current handwriting's area  笔迹的矩形区域
                                        'margin_left': _self.mouseData.minX,//current handwriting's position  笔迹矩形区域的边距
                                        'margin_top': _self.mouseData.minY//current handwriting's position   笔迹矩形区域的边距
                                    }
                                };
                                //发送给callback
                                gerFuc.objFactory.call(_self,'add',_self.localID,obj);
                                //直接显示在结果层上显示该笔迹
                                gerFuc.showPaint.call(_self, obj, 'local');
                            }
                            break;
                        default :
                            break;
                    }
                    try {
                        if (this.curDrawType != 'text') {
                            gerFuc.clearConText.call(this);
                            winEvent.preventDefault();
                            winEvent.stopPropagation();
                        }
                    } catch (e) {

                    }
                }
                else if(this.changeConf.pauseDraw.state && this.downEvent){
                    var _self = this;
                    //如果没画完老师就不允许绘制了 此时丢掉当前笔画 并回归状态
                    this.downEvent = false;
                    //清除过程层笔迹
                    gerFuc.clearConText.call(_self);
                }
                this.outEvent = false;
            },
            mouseout: function (e) {
                var target = e.target || e.srcElement;
                var winEvent = e;
                if(clientInfo.type == "mobile"){
                    e = e.touches?e.touches[0]:(e.originalEvent?(e.originalEvent.touches[0]?e.originalEvent.touches[0]:e.originalEvent.changedTouches[0]):e);
                }
                //out事件发生
                this.outEvent = true;

                /*编辑时无视鼠标划出，防止失效*/
                if(!this.textData.signTextDrag)
                {
                    gerFuc.mouseup.call(this, e);
                }

                winEvent.preventDefault();
                winEvent.stopPropagation();
            },
            key_event: function (that, e) {
                //-------------------处理拖住过程中的输入-------------------
                if (this.textData.signTextDrag) {
                    gerFuc.mouseup.call(this);
                }
                //-------------------处理拖住过程中的输入-------------------
                //防止直接复制网页的文字，显示网页乱码
                that.innerText = that.innerText.toString();
                //赋值
                this.textData.textInput = that.innerText;
                //策略
                //用一个属性相同的input和edit来决定看是否超出了canvas的区域
                document.getElementById(this.targetID + '_editBak').innerText = '';
                document.getElementById(this.targetID + '_editBak').innerText = this.textData.textInput;
                var b = Math.round(4 * this.conf.canvas.width / this.constConf.baseSize.value);//border  4是相对与baseSize来说的边框宽度
                if ((document.getElementById(this.targetID + '_inputBak').scrollHeight - 2*b) > parseInt(document.getElementById(this.targetID + '_inputBak').style.maxHeight.replace('px','')) && e.keyCode != 8 && e.keyCode != 46) {
                    //超出了高度  不再允许写入但是允许删除
                    //恢复到之前的文字
                    that.innerText = this.textData.lastTextInput;
                    //移动光标到尾部
                    gerFuc.keyAction.call(this, that);
                    e.preventDefault();
                } else {
                    //没有超出canvas的高度
                    this.textData.lastTextInput = this.textData.textInput;
                    this.textData.textInput = '';
                }
                gerFuc.keyAction.call(this, that);
                document.getElementById(this.targetID + '_editBak').innerText = "";
            },
            write_start: function (x, y) {//x y current point
                var input = document.getElementById(this.targetID + '_input'),
                    edit = document.getElementById(this.targetID + '_edit'),
                    editBak = document.getElementById(this.targetID + '_editBak'),
                    inputBak = document.getElementById(this.targetID + '_inputBak'),
                    canvasW = this.conf.canvas.width,
                    canvasH = this.conf.canvas.height;
                //获取焦点
                edit.autofocus = "true";

                edit.innerText = "";
                this.textData.textInput = "";

                //for set initial input's width and height
                var w = Math.round(this.changeConf.text.fontSize * canvasW / this.constConf.baseSize.value);//根据当前的画布大小和文字的大小动态形成默认的编辑区域的宽度
                var h = Math.round((this.changeConf.text.fontSize + 10) * canvasW / this.constConf.baseSize.value);//根据当前的画布的大小和文字的大小动态形成编辑区域的高度  10是防止出现滚动条的调节值
                var b = Math.round(4 * canvasW / this.constConf.baseSize.value);//border  4是相对与baseSize来说的边框宽度
                //to avoid edit over input 防止刚开始点击时出现的输入框超出canvas的区域 做值得纠正：举例：右下角点击，出现的边框位置纠正
                y = ((y + h + 2 * b) > canvasH) ? (canvasH - h - 2 * b) : y;
                x = ((x + w + 2 * b) > canvasW) ? (canvasW - w - 2 * b) : x;
                //记录css的值
                this.textData.inputBorder = b;
                this.textData.inputMaxWid = canvasW - x - 2 * b;
                this.textData.inputMaxHei = canvasH - y - 2 * b;
                this.textData.fontSize = w;
                //设置css
                input.style.border = 'dashed ' + b + 'px blue';
                input.style.zIndex = 5;
                input.style.maxWidth = this.textData.inputMaxWid + 'px';
                input.style.maxHeight = this.textData.inputMaxHei + 'px';
                input.style.display = 'block';
                input.style.left = x + 'px';
                input.style.top = y + 'px';

                edit.style.minWidth = w + 'px';
                edit.style.display = 'block';
                edit.style.font = 'bold ' + w + "px " + this.changeConf.text.fontStyle;

                inputBak.style.border = 'dashed ' + b + 'px blue';
                inputBak.style.maxWidth = this.textData.inputMaxWid + 'px';
                inputBak.style.maxHeight = this.textData.inputMaxHei + 'px';
                editBak.style.font = 'bold ' + w + "px " + this.changeConf.text.fontStyle;
                //记录当前的初始值
                this.textData.pointXTD = x;
                this.textData.pointYTD = y;
                this.textData.pointLeftTD = x;
                this.textData.pointTopTD = y;
            },
            write_writing: function () {//text but something else is alive,text must be drawed to pain board 已废弃
                if (this.conf.paintBoard.css('display') != 'none') {
                    gerFuc.write_end.call(this);
                }
            },
            write_end: function () {//text end
                var canvasW = this.conf.canvas.width,
                    canvasH = this.conf.canvas.height,
                    input = document.getElementById(this.targetID + '_input'),
                    edit = document.getElementById(this.targetID + '_edit'),
                    editBak = document.getElementById(this.targetID + '_editBak'),
                    inputBak = document.getElementById(this.targetID + '_inputBak');
                var child_w = parseInt(input.scrollWidth),//取编辑器的宽
                    child_h = parseInt(input.scrollHeight);//取编辑器的高
                //隐藏编辑器
                input.style.display = "none";

                var theString = "";//用于存储待处理的文字串
                var changedStr = '';//用于存储处理完的文字串
                var replacedStr = '';//用于存储处理完的文字串
                //一些标记，标记当前未处理串中是否存在各种标签
                var sign_div = -1,//是否存在<div>
                    sign_br = -1,//是否存在<br>
                    sign_div_end = -1,//是否存在</div>
                    sign_for = 0,//for循环
                    sign_len = 0;//avoid dead loop 避免死循环，保证循环能释放
                theString = edit.innerHTML;//取元数据
                theString = gerFuc.removeDanger.call(this, theString);//移除js脚本或者html代码，避免xss攻击

                sign_len = theString.length;
                //因为鉴于使用的是maxHeight,所以会存在以下的各种情况，换行：<div>********</div>  <br>  需要将这几种情况修改掉，替换为换行符
                if (theString.indexOf('<div>') != -1 || theString.indexOf('<br>') != -1) {//there is a line break  存在其中一种情况，存在换行
                    for (sign_for = 0; sign_for < sign_len; sign_for++) {
                        //判断存在哪一种情况
                        sign_div = theString.indexOf('<div>');
                        sign_br = theString.indexOf('<br>');
                        sign_div_end = theString.indexOf('</div>');

                        if (sign_div == -1) {//there is not any div  不存在<div>
                            if (sign_br == -1) {//there is not any div and br 不存在<br>
                                theString = theString.replace(/<\/div>/g, ''); //不管有没有，干掉</div> 容错
                                break;
                            }
                            else {//only br  只有<br>的情况
                                theString = theString.replace(/<br>/g, '\n');
                                break;
                            }
                        } else {//some div is here 存在<div>
                            if (sign_br == -1) {//there is not any br 表明<div></div>之间不存在<br>
                                theString.replace(/<div>/g, '\n').replace(/<\/div>/g, '');
                                break;
                            } else {//some br is here   两种情况都存在
                                if (sign_br < sign_div) {//br is head  这种情况<br>在前
                                    theString = theString.replace(/<br>/, '\n');
                                } else {//div first  这种情况<div>在前
                                    if (sign_br < sign_div_end) {//br between <div> and </div>  这种情况<div><br></div>
                                        theString.replace(/<div>/, '\n').replace(/<\/div>/, '').replace(/<br>/, '');
                                    } else {//br out <div></div> 这种情况<div></div><br>
                                        theString.replace(/<div>/, '\n').replace(/<\/div>/, '');
                                    }
                                }
                            }
                        }
                    }
                    //强制在处理一次，避免出错
                    if (theString.indexOf('<div>') != -1) {
                        theString = theString.replace(/<div>/g, '\n').replace(/<\/div>/g, '').replace(/<br>/g, '');
                    } else {
                        theString = theString.replace(/<br>/g, '\n');
                    }
                }
                //下面开始拿上面处理过的数据，从相同属性的input和edit中过一遍，找到换行的结点插入换行符
                if (theString != '') {
                    var str_temp = "";
                    var recordI = 0;//avoid dead loop  避免死循环
                    var curHeight = 0;//current height  当前的高度

                    editBak.innerText = "";
                    for (var i = 0; i < theString.length; i++, recordI++) {
                        if (theString.charAt(i) != "\n" && theString.charAt(i) != "\r\n")//当前的字符不是换行符
                        {//no any \n
                            editBak.innerText += theString.charAt(i);
                            //策略：
                            //先判断当前的clientHeight和上一个curHeight比较是不是变化了，如果变化了还不足以说明已经还行了，因为一些操作也能造成这种现象
                            //再拿text.fontSize/3和上面两者之间的差值作比较，以确保现在是换行
                            //这样做的理由是如果真的是换行的话，一定会大于text.fontSize/3
                            if (curHeight != 0 && inputBak.clientHeight > curHeight &&
                                Math.abs(inputBak.clientHeight - curHeight) > this.changeConf.text.fontSize / 3)//sign of \n
                            {
                                str_temp += '\n';
                                changedStr += str_temp;
                                str_temp = theString.charAt(i);
                            } else {//no any \n 当前的字符还不是可以换行的字符
                                str_temp += theString.charAt(i);
                            }
                            if (i + 1 == theString.length) {//end  当前为最后一个字符
                                changedStr += str_temp;
                            }
                            //更新记录当前的高度
                            curHeight = inputBak.clientHeight;
                        }
                        else//当前的字符是换行符
                        {//handle of \n
                            str_temp += '\n';
                            changedStr += str_temp;
                            str_temp = "";
                            //换行后从头再来
                            editBak.innerText = '';
                            curHeight = inputBak.clientHeight;
                        }
                    }
                    //回复现场
                    editBak.innerText = "";
                    replacedStr = changedStr;
                }
                var _self = this;
                //区别是重写还是第一次写文字
                if (!_self.textData.signREdit) {
                    //第一次写文字，避免写空
                    if (theString != '') {//avoid null
                        var obj = {
                            'handleType': 0,//add
                            'drawingType': 4,//text
                            'localID': _self.localIDHead + _self.localID,
                            'svcID': -1,
                            'specialValue': {
                                'ownerID': _self.constConf.ownerID.value,
                                'font': {
                                    'font_color': _self.changeConf.text.fontColor,
                                    'font_size': Math.round(_self.changeConf.text.fontSize * canvasW / _self.constConf.baseSize.value),
                                    'font_style': _self.changeConf.text.fontStyle
                                },
                                'canvasWidth': canvasW,
                                'canvasHeight': canvasH,
                                'child_div_W': child_w,//current handwriting's area 笔迹的矩形区域
                                'child_div_H': child_h,//current handwriting's area 笔迹的矩形区域
                                'margin_left': _self.textData.pointXTD,//current handwriting's position 笔迹的矩形区域的边距
                                'margin_top': _self.textData.pointYTD,//current handwriting's position 笔迹的矩形区域的边距
                                'str_text':root.MyBase64.encode(replacedStr)//text   将处理完的文字发送到对端，一、避免再次解析 二、保持两端的一致性
                            }
                        };
                        //发送给callback
                        gerFuc.objFactory.call(_self,'add',_self.localID,obj);
                        //本端显示
                        gerFuc.showPaint.call(this, obj, 'local');
                    }
                }
                else {//重写
                    var s = this.curTarget.canvasWidth / canvasW;
                    //新的笔迹区域的宽高
                    this.curTarget.child_div_W = Math.round(child_w * s);
                    this.curTarget.child_div_H = Math.round(child_h * s);
                    //在重写中拖拽的距离
                    this.curTarget.drag_left = Math.round((this.textData.pointXTD) * s - this.curTarget.margin_left);
                    this.curTarget.drag_top = Math.round((this.textData.pointYTD) * s - this.curTarget.margin_top);


                    var obj = {
                        'handleType': 0,//add
                        'drawingType': 500,//new handle
                        'localID': _self.localIDHead + _self.localID,
                        'svcID': -1,
                        'specialValue': {
                            'localID': _self.curTarget.id,
                            'type': 2,//reedit
                            'font': {
                                'font_color': _self.changeConf.text.fontColor,
                                'font_size': Math.round(_self.changeConf.text.fontSize * s),
                                'font_style': _self.changeConf.text.fontStyle
                            },
                            'child_div_W': _self.curTarget.child_div_W,//current handwriting's area 笔迹的矩形区域
                            'child_div_H': _self.curTarget.child_div_H,//current handwriting's area 笔迹的矩形区域
                            'drag_left': _self.curTarget.drag_left,//drafted distance x轴拖拽的距离
                            'drag_top': _self.curTarget.drag_top,//drafted distance y轴拖拽的距离
                            'str_text': root.MyBase64.encode(replacedStr)//edited text 将处理完的文字发送到对端，一、避免再次解析 二、保持两端的一致性
                        }
                    };
                    //发送给callback
                    gerFuc.objFactory.call(_self,'add',_self.localID,obj);
                    //显示这一笔
                    this.curTarget.display = 1;
                    //本端显示
                    gerFuc.showPaint.call(this, obj, 'local');
                    //更新哨兵
                    this.textData.signREdit = false;
                }
                //downEvent结束
                this.downEvent = false;
                //重置，为下一次的输入
                edit.innerText = '';
            },
            inputRange: function () {
                //文字操作时，用来判断是否需要调整边框的位置 ，避免溢出canvas画布
                var input = this.conf.paintBoard.input,
                    canvasW = this.conf.canvas.width,
                    canvasH = this.conf.canvas.height;

                var inputWid = parseInt(input[0].scrollWidth),
                    inputHei = parseInt(input[0].scrollHeight),
                    inputLeft = parseInt(input.css('left').replace('px', '')),
                    inputTop = parseInt(input.css('top').replace('px', ''));

                var shiftLeft = 0, shiftTop = 0;
                var b = 2 * this.textData.inputBorder;

                //right over
                if ((inputLeft + inputWid + b >= canvasW)) {
                    shiftLeft = canvasW - inputLeft - inputWid - b;
                }
                //bottom over
                if (inputTop + inputHei + b >= canvasH) {
                    shiftTop = canvasH - inputTop - inputHei - b;
                }
                //left over
                if (inputLeft < 0) {
                    shiftLeft = 0 - inputLeft;
                }
                //top over
                if (inputTop < 0) {
                    shiftTop = 0 - inputTop;
                }
                return {shiftX: shiftLeft, shiftY: shiftTop};
            },
            removeDanger: function (str) {//避免xss攻击
                var a = str;
                a = a.replace(/&nbsp;/g, ' ');
                a = a.replace(/&amp;/g, '&');
                a = a.replace(/&quot;/g, '\\');
                a = a.replace(/&#039;/g, '\'');
                a = a.replace(/&lt;/g, '<');
                a = a.replace(/&gt;/g, '>');
                return a;
            },
            keyAction: function (that) {//光标到最后
                var textbox = that;
                var sel = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(textbox);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
            },
            objFactory: function (type,localID,value) {
                if(this.isToSvc){
                    var obj = null;
                    var boardID=this.targetID;
                    value.WBDataType='wb';
                    obj = {
                        'localID': localID+'',
                        'value': value,
                        'byteData': '',
                        'byteDataLength': ''
                    };
                    this.callback(type, obj, boardID);
                }
            },
            reEditText: function (e) {//用于重写文字的start
                e = e || window.event || arguments.callee.caller.arguments[0];
                var input = document.getElementById(this.targetID + '_input'),
                    edit = document.getElementById(this.targetID + '_edit'),
                    inputBak = document.getElementById(this.targetID + '_inputBak'),
                    editBak = document.getElementById(this.targetID + '_editBak'),
                    canvasW = this.conf.canvas.width,
                    canvasH = this.conf.canvas.height;

                if (this.curTarget) {
                    if (this.curTarget.handleType == 0 && this.curTarget.drawingType == 4) {//如果当前双击的目标是文字
                        //标记当前的编辑状态是重写状态
                        this.textData.signREdit = true;
                        //先在结果层暂时隐藏这一段文字，显示在过程层上
                        this.curTarget.display = 0;
                        //显示其他的笔迹
                        gerFuc.repaint.call(this);

                        var tem_text = this.curTarget.point_Arr_text,
                            s = this.conf.canvas.width / this.curTarget.canvasWidth;
                        var b = Math.round(4 * canvasW / this.constConf.baseSize.value);//border
                        //更新本地记录的相关值信息
                        this.textData.inputBorder = b;
                        this.textData.inputMaxWid = canvasW - (this.curTarget.drag_left + this.curTarget.margin_left) * s - 2 * b;
                        this.textData.inputMaxHei = canvasH - (this.curTarget.drag_top + this.curTarget.margin_top) * s - 2 * b;
                        this.textData.fontSize = Math.round(this.curTarget.font_size * s);
                        //根据当前比划的数据信息设置新的属性
                        input.style.border = 'dashed ' + this.textData.inputBorder + 'px red';
                        input.style.zIndex = 5;
                        input.style.display = 'block';
                        input.style.maxWidth = this.textData.inputMaxWid + 'px';
                        input.style.maxHeight = this.textData.inputMaxHei + 'px';
                        input.style.left = (this.curTarget.margin_left + this.curTarget.drag_left) * s + 'px';
                        input.style.top = (this.curTarget.margin_top + this.curTarget.drag_top) * s + 'px';

                        edit.style.display = 'block';
                        edit.style.font = 'bold ' + this.textData.fontSize + "px " + this.changeConf.text.fontStyle;

                        editBak.style.font = 'bold ' + this.textData.fontSize + "px " + this.changeConf.text.fontStyle;

                        inputBak.style.border = 'dashed ' + this.textData.inputBorder + 'px red';
                        inputBak.style.maxWidth = this.textData.inputMaxWid + 'px';
                        inputBak.style.maxHeight = this.textData.inputMaxHei + 'px';
                        //值输入
                        edit.innerText = tem_text;
                        //make cursor end  将光标移到最后
                        gerFuc.keyAction.call(this, edit);
                        //记录当前的位置信息
                        this.textData.pointXTD = (this.curTarget.margin_left + this.curTarget.drag_left) * s;
                        this.textData.pointYTD = (this.curTarget.margin_top + this.curTarget.drag_top) * s;
                        //记录当前的位置信息
                        this.textData.pointLeftTD = this.textData.pointXTD;
                        this.textData.pointTopTD = this.textData.pointYTD;
                    }
                }
            },
            reInitColor: function () {//恢复所有比划的颜色
                var temArr = this.recordConArr;
                for (var i = 0, j = temArr.length; i < j; i++) {
                    if (temArr[i].id == this.colorChangeId) {
                        if (temArr[i].drawingType != 4) {
                            temArr[i].color = this.colorName;
                        }
                        else {//text
                            temArr[i].font_color = this.colorName;
                        }
                    }
                }
            },
            e_search: function (x, y) {//寻找当前鼠标位置下的笔迹对象
                var e;
                var s;
                var i, j;
                var offset = this.conf.canvas.parentCon.offset();
                this.conf.canvas.left = offset.left;
                this.conf.canvas.top = offset.top;
                for (i = 0, j = this.recordConArr.length; i < j; i++) {
                    e = this.recordConArr[i];
                    s = this.conf.canvas.width / e.canvasWidth;
                    if (e.handleType == 0 && e.drawingType != 500 && e.drawingType != 3 && e.display == 1) {
                        if (e.drawingType != 10 || this.curDrawType != 'draft') {
                            if (x >= (e.margin_left + e.drag_left) * s && y >= (e.margin_top + e.drag_top) * s) {
                                if (x <= (e.margin_left + e.child_div_W + e.drag_left) * s && y <= (e.margin_top + e.child_div_H + e.drag_top) * s) {
                                    return e;
                                }
                            }
                        }
                    }
                }
                return null;
            },
            showPaint: function (obj, type) {//用于根据分析数据对象来实现数据可视化  type  'local':初始化显示本地数据  'svc': 初始化显示svc数据
                try {
                    //防止是字符串
                    obj.svcID&&(obj.svcID=parseInt(obj.svcID));
                    if (obj.handleType == 0) {//add
                        //本地数据   则本地id +1
                        type == 'local' && this.localID++;
                        if ([0, 2, 3, 4, 10, 20, 500].indexOf(obj.drawingType) != -1) {//legal drawingType  合法的或者当前版本已知的操作type
                            if (obj.drawingType != 500) {//tradition drawingType  旧版本的操作
                                var tem_e = new paint(version, obj.localID, obj);//创建当前笔迹对象
                                tem_e.init_paint(obj);//初始化当前笔迹对象的属性
                                //如果已经有序的数据操作加入操作列表
                                if (this.constConf.isSVC.value && obj.svcID != -1) {
                                    this.changeData({
                                        localID: obj.localID,
                                        svcID: obj.svcID,
                                        targetID: obj.localID
                                    });
                                } else if (!this.constConf.isSVC.value) {
                                    this.orderList.push({
                                        localID: obj.localID,
                                        svcID: obj.svcID,
                                        targetID: obj.localID
                                    });
                                }

                                this.recordConArr.push(tem_e);//加入对应的对象列表
                                //绘制分发
                                tem_e.handle(this.conf.canvas, this.constConf.baseSize.value, this.textData.inputBorder, this.conf.canvas.targetContext);
                            } else//new drawingType  500段的新功能
                            {
                                var _self = this;
                                //从数据池中根据localID寻找到当前的数据
                                var tem_e = gerFuc.searchByID.call(_self, obj.specialValue.localID);
                                if (tem_e != null) {
                                    //重置当前笔迹对象的属性
                                    tem_e.init_paint(obj);
                                    //绘制所有
                                    gerFuc.repaint.call(_self);
                                } else {
                                    console.error('[ %s ]----------->error happened when new rubber: error id is %s', getTimeNow(), obj.specialValue.type);
                                }
                                //如果已经有序的数据操作加入操作列表
                                if (this.constConf.isSVC.value && obj.svcID != -1) {
                                    this.changeData({
                                        localID: obj.localID,
                                        svcID: obj.svcID,
                                        targetID: obj.specialValue.localID
                                    });
                                } else if (!this.constConf.isSVC.value) {
                                    this.orderList.push({
                                        localID: obj.localID,
                                        svcID: obj.svcID,
                                        targetID: obj.specialValue.localID
                                    });
                                }
                            }
                        }
                    } else if (obj.handleType == 1) {//delete
                        if (obj.drawingType == 1) { //back
                            gerFuc.draw.call(this, 'back', 1);
                        }else if (obj.drawingType == 2)  //clear
                            gerFuc.draw.call(this, 'clear', 1);
                    } else if (obj.handleType == 2) {//change

                    }
                } catch (e) {
                    console.error('[ %s ]----------->error happened when Paint update: %s', getTimeNow(), e);
                }
            },
            searchByID: function (id) {//根据id在this.recordConArr中寻找当前笔迹的原始数据
                var i, j;
                var temArr = this.recordConArr;
                for (i = 0, j = temArr.length; i < j; i++) {
                    if (temArr[i].id == id && temArr[i].changeCount != 0) {
                        return temArr[i];
                    }
                }
                return null;
            },
            handle_back: function (target_id) {
                //回退操作
                //策略
                //先回退当前笔迹的修改操作：比如拖拽，新橡皮的擦出，重写等
                //再回退笔迹
                var i, j;
                for (i = 0, j = this.recordConArr.length; i < j; i++) {
                    if (this.recordConArr[i].id == target_id && this.recordConArr[i].changeCount != 0) {//find target
                        gerFuc.clearConText.call(this, 1);
                        var tem_e = this.recordConArr[i];
                        tem_e.changeCount--;//先将当前笔迹的改变总量-1
                        if (tem_e.changeCount == 0)//init state  表示当前的笔迹已经么可以回退的改变了 ，直接隐藏当前的笔迹
                        {
                            tem_e.display = 0;
                            this.svcId--;//id-1
                        }
                        else {//there are some change after init  表示当前的笔迹还存在可以回退的改变 比如拖拽，新橡皮的擦出，重写等
                            var del = tem_e.Arr_data_handle.pop();//pop最近的历史记录
                            if (del.drawingType == 500 && del.specialValue.type == 0)
                                tem_e.display = 1;
                            else {
                                var obj = tem_e.Arr_data_handle[tem_e.Arr_data_handle.length - 1];
                                tem_e.init_paint(obj, 1);
                            }
                        }
                        gerFuc.repaint.call(this);
                    }
                }
                //回退结束 回归回退的对象
                this.backObj=null;
            },
            handle_clear: function () {//清空操作
                var target_e;
                for (var i = 0, j = this.recordConArr.length; i < j; i++) {
                    target_e = this.recordConArr[i];
                    //全部隐藏掉
                    target_e.display = 0;
                    //全部改变总量置为0
                    target_e.changeCount = 0;
                }
                //操作序列置为空
                this.orderList.length = 0;
                gerFuc.repaint.call(this);
                this.svcId = 1;
            },
            clearConText: function (type) {//type为undefined清空过程层，不为undefined清空过程层和结果层
                try {
                    if (!type)
                        this.conf.canvas.targetBakContext.clearRect(0, 0, this.conf.canvas.width, this.conf.canvas.height);
                    else {
                        this.conf.canvas.targetContext.clearRect(0, 0, this.conf.canvas.width, this.conf.canvas.height);
                        this.conf.canvas.targetBakContext.clearRect(0, 0, this.conf.canvas.width, this.conf.canvas.height);
                    }
                } catch (e) {

                }
            },
            repaint: function (type, target) {//重绘
                if (!type) {
                    //是否先清空再绘制
                    gerFuc.clearConText.call(this, 1);
                }
                var e;
                var i = 0, j = this.recordConArr.length;
                var targetContext = target || this.conf.canvas.targetContext;
                while (i < j) {
                    e = this.recordConArr[i];
                    e.handle(this.conf.canvas, this.constConf.baseSize.value, this.textData.inputBorder, targetContext);
                    i++;
                }
            },
            getOffset: function (Node, offset) {
                if (!offset) {
                    offset = {};
                    offset.top = 0;
                    offset.left = 0;
                }
                if (Node == document.body) {//if current node is body，end
                    return offset;
                }
                offset.top += Node.offsetTop;
                offset.left += Node.offsetLeft;
                return this.getOffset(Node.parentNode, offset);//up and account
            },
            quickSort: function (arr) {
                if (arr.length <= 1) {
                    return arr;
                }
                var pivotIndex = Math.floor(arr.length / 2);
                var pivot = arr.splice(pivotIndex, 1)[0];
                var left = [];
                var right = [];
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].svcID < pivot.svcID) {
                        left.push(arr[i]);
                    } else {
                        right.push(arr[i]);
                    }
                }
                return gerFuc.quickSort(left).concat([pivot], gerFuc.quickSort(right));
            }
        }
        var createConf = function (type) {
            if (type) {
                var reObj = {};//要返回的配置信息
                if (type === 'const') {
                    reObj = {
                        ownerID: {
                            value: '',
                            info: '使用白板的用户id'
                        },
                        isSVC: {
                            value: true,
                            info: '是否是svc转发数据，影响撤销时的id处理'
                        },
                        paintModule: {
                            value: 'draw',
                            info: 'const初次设置后不可修改：可选值"draw"/"show",白板的模式,"draw"表示支持绘制和显示,"show"表示仅支持显示'
                        },
                        //要开放的画笔配置
                        //--------start--------------工具：合法值为key
                        pencil: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持画笔功能'
                        },
                        highPencil: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持荧光笔'
                        },
                        rect: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持矩形'
                        },
                        text: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持文字'
                        },
                        rubberOld: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持区域擦除'
                        },
                        seal: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持印章'
                        },
                        //注意下面的功能  任意一个开启之后，在移动鼠标的时候，当前鼠标下的最近绘制的笔迹都会变得高亮，如果不使用这些功能，建议关闭，否则会浪费很大的cpu，下个版本会优化相关的查询算法
                        rubberNew: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持整个目标清除 , 可触发search'
                        },
                        draft: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持拖动 , 可触发search'
                        },
                        //--------end--------------工具：合法值为key

                        reEdit: {
                            value: true,
                            info: 'const初次设置后不可修改：可选值 true/false , 是否支持文字重写 , 可触发search'
                        },

                        //默认的画笔类型   注意必须是上面开放过的画笔类型,否则将抛出异常
                        firstTool: {
                            value: 'pencil',
                            info: 'const初次设置后不可修改：可选值 "pencil"/"highPencil"/"rect"/"text"/"rubberOld"/"seal"/"rubberNew"/"draft"/"reEdit" , ' +
                            '默认的画笔类型，必须是开放过的画笔，否则会抛出异常'
                        },

                        baseSize: {
                            value: 800,
                            info: 'const初次设置后不可修改：可选值 非0正整数 , 表示白板中的相对大小基值，参考rem的fontSize , 例如：800时设置为4，则400时变为2,1600时变为8'
                        }
                    }
                }
                else if (type === 'change') {
                    reObj = {
                        pauseDraw: {
                            state: false,
                            info: '是否暂停绘制(true/false 当为true时只显示但暂时不支持绘制)'
                        },
                        pencil: {
                            'color': '#FF0000',//画笔的颜色
                            'size': 3,//画笔的大小
                            'info': '画笔颜色 画笔大小'
                        },
                        highPencil: {
                            'color': '#FF0000',//荧光笔颜色
                            'size': 20,//荧光笔的大小
                            'alpha': 0.5,//荧光笔的透明度
                            'info': '荧光笔颜色  荧光笔大小  荧光笔透明度'
                        },
                        rect: {
                            'color': '#FF0000',//矩形的颜色
                            'size': 3,//矩形边框的大小
                            'info': '矩形边框颜色  矩形边框大小'
                        },
                        text: {
                            'fontStyle': 'songti',//文字的样式
                            'fontSize': 30, //文字的大小
                            'fontColor': '#FF0000',//文字的颜色
                            'info': '文字样式css  文字大小  文字颜色'
                        },
                        rubberOld: {
                            'size': 30,//橡皮的大小
                            'info': '区域擦除工具的区域大小'
                        },
                        seal: {
                            width: 30,//印章的宽度
                            height: 30,//印章的高度
                            type: 'star',//用于标识当前图章的类型  每一个图章对应一个type 要确保唯一性，一个图章被选择多次，传递同一个type，不能为空！
                            source: '',//印章的图片url，相对于index.html  支持base64图片 不支持url的base64编码
                            info: '印章宽度  印章高度  印章类型(用于标识当前图章的类型  每一个图章对应一个type 要确保唯一性，一个图章被选择多次，传递同一个type，不能为空)  ' +
                            '印章图片url(相对于index.html  支持base64图片 不支持url的base64编码)'
                        },
                        targetSelect: {//鼠标移动时的当前选中的画笔的颜色
                            'color': '#0000FF',
                            'info': '鼠标移动时的当前选中的图形的颜色'
                        },
                        background: {
                            module: 'close',//模式    default: 自动充满  real：真实大小
                            source: '', //支持base64图片和url地址  不支持url的base64编码
                            info: '背景样式模式("close"/"default"/"real" close: 无背景  default: 自动充满  real：真实大小)'
                        }
                    }
                }
                else {
                    console.error('[ %s ]---------------------------------> illegal type happened when create conf of board!', getTimeNow());
                }
                return reObj;
            } else {
                console.warn('[ %s ]---------------------------------> there is no type when create conf of board!', getTimeNow());
                return {};
            }
        };
        var getTimeNow = function () {
            var date = new Date();
            var headDes = date.toLocaleTimeString() + ' ' + date.getMilliseconds() + 'ms';
            return headDes;
        };
        var paint = function (version, id, obj) {
            //parent class
            this.Arr_data_handle = new Array();//record every change's all data to back 用于存储所有的历史记录信息
            this.version_type = version;//版本信息
            this.id = id;//服务器id
            this.handleType = obj.handleType;
            this.drawingType = obj.drawingType;
        }
        //初始化信息
        paint.prototype.init_paint = function (obj, type) {//init paint data  为当前的对象赋值
            if (!type)
                this.Arr_data_handle.push(obj);//入栈
            if (obj.handleType == 0) {//add
                if (obj.drawingType != 500) {//旧操作
                    this.canvasWidth = obj.specialValue.canvasWidth;//记录当前的笔迹的相对的画布大小
                    this.canvasHeight = obj.specialValue.canvasHeight;//记录当前的笔迹的相对的画布大小
                    //it maybe change after,but now set 1
                    this.changeCount = 1;//记录更改的次数 默认为1（出生）
                    //1 will show, 0 won't  控制是否显示
                    this.display = 1;

                    this.child_div_W = obj.specialValue.child_div_W;//笔记区域的大小
                    this.child_div_H = obj.specialValue.child_div_H;//笔记区域的大小
                    this.margin_left = obj.specialValue.margin_left;//笔记区域的边距
                    this.margin_top = obj.specialValue.margin_top;//笔记区域的边距
                    this.drag_left = 0;//笔迹的拖拽的距离
                    this.drag_top = 0;//笔迹的拖拽的距离
                    //记录笔迹的属性style
                    if (obj.drawingType == 4)//text 文本
                    {
                        this.font_color = obj.specialValue.font.font_color;
                        this.font_size = obj.specialValue.font.font_size;
                        this.font_style = obj.specialValue.font.font_style;
                        this.point_Arr_text = root.MyBase64.decode(obj.specialValue.str_text);
                    } else if (obj.drawingType == 20) {//seal 印章
                        this.sealWidth = obj.specialValue.width;
                        this.sealHeight = obj.specialValue.height;
                        this.sealType = obj.specialValue.sealType;
                    }
                    else {
                        this.color = obj.specialValue.color;
                        this.size = obj.specialValue.size;
                        this.point_Arr_text = obj.specialValue.point;
                    }
                    if (obj.drawingType == 10) {
                        //荧光笔 有透明度属性
                        this.alpha = obj.specialValue.alpha;
                    }
                } else {
                    //new handle 新操作（具有在已有笔迹的基础上更改性质的操作）

                    if (!type)
                        this.changeCount++;//没更改一次，更新哨兵一次
                    switch (obj.specialValue.type) {
                        case 0://new rubber 新橡皮
                            this.display = 0;
                            break;
                        case 1://drag  拖拽
                            this.drag_left = obj.specialValue.drag_left;
                            this.drag_top = obj.specialValue.drag_top;
                            break;
                        case 2://reedit 重写
                            this.child_div_W = obj.specialValue.child_div_W;
                            this.child_div_H = obj.specialValue.child_div_H;
                            this.drag_left = obj.specialValue.drag_left;
                            this.drag_top = obj.specialValue.drag_top;
                            this.point_Arr_text = root.MyBase64.decode(obj.specialValue.str_text);
                            break;
                        default :
                            break;
                    }
                }
            }
            else if (obj.handleType == 1) {
                /*delete*/
            } else if (obj.handleType == 2) {
                /*change*/
            }
        }

        //按类型操作
        paint.prototype.handle = function (canvasData, baseSize, inputBorder, target_context) {//Message Dispatch 进行分发，实现绘制
            try {
                if (this.display == 1) {
                    switch (this.drawingType) {
                        case 0://pen
                            this.canvas_pencil(canvasData, baseSize, target_context);
                            break;
                        case 2://rectangle
                            this.canvas_square(canvasData, baseSize, target_context);
                            break;
                        case 10://Highlighter pen
                            this.canvas_sign(canvasData, baseSize, target_context);
                            break;
                        case 20://seal
                            this.canvas_seal(canvasData, baseSize, target_context);
                            break;
                        case 4://text
                            this.canvas_write(canvasData, baseSize, inputBorder, target_context);
                            break;
                        case 3://old rubber
                            this.canvas_rubber(canvasData, baseSize, target_context);
                            break;
                        default :
                            break;
                    }
                }
            } catch (e) {
                console.error('[ %s ]--------------------------------->error happened when paint.prototype.handle : %s', getTimeNow(), e);
            }

        }
        //    下面所有的绘制策略都是
        //    先计算缩放比例，用于之后对点信息或者文字大小信息的缩放
        //    根据对象设置当前的绘制属性
        //画笔

        paint.prototype.canvas_pencil = function (canvasData, baseSize, target_context) {
            var s = canvasData.width / this.canvasWidth;
            var s2 = canvasData.width / baseSize;
            var _self = this;
            var lineWid = Math.round(_self.size * s2);
            target_context.lineCap = 'round';
            target_context.lineJoin = "round";
            target_context.strokeStyle = _self.color;
            //-----------------------修改为本地写死--------------------------
            //target_context.lineWidth = this.size*s2;
            target_context.lineWidth = lineWid;
            //-----------------------修改为本地写死--------------------------
            target_context.moveTo((this.point_Arr_text[0].x + this.drag_left) * s - canvasData.centerPX, (this.point_Arr_text[0].y + this.drag_top) * s - canvasData.centerPY);
            target_context.beginPath();
            for (var i = 1; i < this.point_Arr_text.length; i++) {
                target_context.lineTo((this.point_Arr_text[i].x + this.drag_left) * s - canvasData.centerPX, (this.point_Arr_text[i].y + this.drag_top) * s - canvasData.centerPY);
            }
            target_context.stroke();
        }

        //长方形
        paint.prototype.canvas_square = function (canvasData, baseSize, target_context) {
            var s = canvasData.width / this.canvasWidth;
            var s2 = canvasData.width / baseSize;
            var _self = this;
            var lineWid = Math.round(_self.size * s2);
            var CX = canvasData.centerPX,
                CY = canvasData.centerPY;
            target_context.strokeStyle = _self.color;
            target_context.lineJoin = "round";
            //-----------------------修改为本地写死--------------------------
            //target_context.lineWidth = this.size*s2;
            target_context.lineWidth = lineWid;
            //-----------------------修改为本地写死--------------------------
            target_context.moveTo((this.point_Arr_text[0].x + this.drag_left) * s - CX, (this.point_Arr_text[0].y + this.drag_top) * s - CY);
            target_context.beginPath();
            target_context.lineTo((this.point_Arr_text[1].x + this.drag_left) * s - CX, (this.point_Arr_text[0].y + this.drag_top) * s - CY);
            target_context.lineTo((this.point_Arr_text[1].x + this.drag_left) * s - CX, (this.point_Arr_text[1].y + this.drag_top) * s - CY);
            target_context.lineTo((this.point_Arr_text[0].x + this.drag_left) * s - CX, (this.point_Arr_text[1].y + this.drag_top) * s - CY);
            target_context.lineTo((this.point_Arr_text[0].x + this.drag_left) * s - CX, (this.point_Arr_text[0].y + this.drag_top) * s - CY);
            target_context.closePath();
            target_context.stroke();
        }

        //荧光笔
        paint.prototype.canvas_sign = function (canvasData, baseSize, target_context) {
            target_context.save();
            var s = canvasData.width / this.canvasWidth;
            var CX = canvasData.centerPX,
                CY = canvasData.centerPY;
            target_context.lineCap = 'round';
            target_context.lineJoin = "round";
            target_context.strokeStyle = this.color;
            target_context.globalAlpha = this.alpha;
            target_context.globalCompositeOperation = 'source-over';
            target_context.lineWidth = this.size * canvasData.width / baseSize;
            target_context.moveTo((this.point_Arr_text[0].x + this.drag_left) * s - CX, (this.point_Arr_text[0].y + this.drag_top) * s - CY);
            target_context.beginPath();
            for (var i = 2; i < this.point_Arr_text.length; i++) {
                target_context.lineTo((this.point_Arr_text[i].x + this.drag_left) * s - CX, (this.point_Arr_text[i].y + this.drag_top) * s - CY);
            }
            target_context.stroke();
            target_context.restore();
        }

        //文字
        paint.prototype.canvas_write = function (canvasData, baseSize, inputBorder, target_context) {
            var theString = this.point_Arr_text;
            var s = canvasData.width / this.canvasWidth;
            var hei_point = (this.margin_top + this.drag_top) * s;
            var wid_point = (this.margin_left + this.drag_left) * s + inputBorder;
            var words = [];
            var i, j;

            target_context.font = 'bold ' + Math.round(this.font_size * s) + "px " + this.font_style;
            target_context.fillStyle = this.font_color;

            theString.replace(/\r\n/g, '\n');
            words = theString.split(/\n/);

            for (i = 0, j = words.length; i < j; i++) {
                hei_point += (this.font_size + 2.5) * s;
                target_context.fillText(words.shift(), wid_point - canvasData.centerPX, hei_point - canvasData.centerPY);
            }
        }

        //旧版橡皮擦
        paint.prototype.canvas_rubber = function (canvasData, baseSize, target_context) {
            var s = canvasData.width / this.canvasWidth;
            var sizerub = this.size * s;
            target_context.lineCap = 'round';
            target_context.lineJoin = "round";
            for (var i = 0; i < this.point_Arr_text.length; i++) {
                target_context.clearRect((this.point_Arr_text[i].x) * s - sizerub / 2 - canvasData.centerPX, (this.point_Arr_text[i].y) * s - sizerub / 2, sizerub, sizerub - canvasData.centerPY);
            }
        }

        //印章
        paint.prototype.canvas_seal = function (canvasData, baseSize, target_context) {
            var s = canvasData.width / this.canvasWidth;
            var type = this.sealType;
            var sealWidth = this.sealWidth * s,
                sealHeight = this.sealHeight * s,
                source = canvasData.seal.img[type];
            target_context.globalCompositeOperation = 'source-over';

            target_context.drawImage(source, (this.margin_left + this.drag_left) * s - canvasData.centerPX, (this.margin_top + this.drag_top) * s - canvasData.centerPY, sealWidth, sealHeight);
        }
        //白板类
        var WEBBoard = function (ownerID) {
            this.toolsOpen = ['back', 'clear'];//用于记录开发的画笔
            this.isSearch = false;//用于 表示当前是否处于要查找每条数据的模式
            this.conf = {
                'canvas': {
                    //canvas info
                    'parentCon': null,//canvas的父容器的对象
                    'target': null, //结果层
                    'targetContext': null, //结果层的2d对象
                    //------------------修改---------start------------
                    'targetImg': null,
                    //------------------修改---------end------------
                    'targetImgContext': null,
                    //------------------修改---------start------------
                    'centerPX': 0,//画布中心点
                    'centerPY': 0,//画布中心点
                    //------------------修改---------end------------

                    'targetBak': null, //过程层
                    'targetBakContext': null, //过程层的2d对象

                    'width': 0, //宽度
                    'height': 0, //高度

                    'left': 0, //左边距
                    'top': 0, //上边距
                    'seal': {
                        curType: '',
                        img: {}//存储每一种图章的的图片对象信息
                    }
                },
                'paintBoard': {
                    'input': null,//progress input for drag 文本输入框容器的对象
                    'edit': null,//progress edit 文字输入框的对象
                    //策略：建立一个用户看不到的和input和edit完全相同的输入框和容器，输入已经输入的文字，判断何时换行
                    'inputBak': null,//for show words(when newline) 用于识别单词何时换行
                    'editBak': null//for show words(when newline) 用于识别单词何时换行
                },
                'cssInfo': {
                    canvas: {
                        'position': 'absolute',
                        'top': '0px',
                        'left': '0px',
                        'z-index': 1
                    },
                    canvasBak: {
                        'position': 'absolute',
                        'top': '0px',
                        'left': '0px',
                        'z-index': 2
                    },
                    canvasImg: {
                        'position': 'absolute'
                    },
                    input: {
                        'min-width': '0px',
                        '_width': '0px',
                        'min-height': '0px',
                        '_height': '0px',
                        'display': 'none',
                        'position': 'absolute',
                        'overflow': 'hidden'
                    },
                    edit: {
                        'border': '0px',
                        'background-color': 'transparent',
                        'cursor': 'text',
                        'word-break': 'break-all',
                        'white-space': 'pre-wrap',
                        'word-wrap': 'break-word',
                        'overflow': 'hidden',
                        'margin': '0px 0px 0px 0px'
                    },
                    inputBak: {
                        'z-index': '-1',
                        'position': 'absolute',
                        'min-width': '0px',
                        '_width': '0px',
                        'min-height': '0px',
                        '_height': '0px'
                    },
                    editBak: {
                        'width': '0px',
                        'border': '0px',
                        'word-break': 'break-all',
                        'white-space': 'pre-wrap',
                        'word-wrap': 'break-word',
                        'overflow': 'hidden',
                        'position': 'relative',
                        'margin': '0px 0px 0px 0px'
                    }
                }
            };
            this.isInited = false;//是否初始化或者是否初始化成功的标志
            this.recordConArr = [];//record all paint handle 记录所有的绘制数据信息
            this.orderList = [];//record all order according time 存储操作序列 先后顺序
            this.backObj=null;//记录当前需要删除的对象
            this.localIDHead = ownerID+new Date().getTime()+'_';//区别服务器id的头
            this.localID = 0;//local id 维护确保每一条笔迹有不同的id号  为了寻找本地数据更换服务器id
            this.curBackGIMG = {//用于记录当前的背景图片的信息，防止confInfo的信息被改动后的不一致现象
                module: '',
                source: ''
            };

            this.curDrawType = 'pencil';//used to remember current draw type,first time used to set default handle type 记录当前的画笔类型
            //record current target name 记录当前的笔迹对象
            this.curTarget = null;

            //move之前是否触发了down事件防止没有点击操作时的move事件执行
            //down event is made or not before move event
            this.downEvent = false;
            //当up事件被触发,用于检测是否为移出画布被触发
            //out event is made or not when up event is alive
            this.outEvent = false;
            this.isToSvc=true;//是不是向svc发送
            //表示鼠标移动时上一步是否有颜色变化
            //last time there is a color change or not
            this.colorChange = false;
            this.colorName = '';//用来记录被改变的画笔之前的颜色
            this.colorChangeId = -1;//record last color changed target id 记录上一个颜色变化的id

            this.dragData = {
                //initial left and top
                initialLeft: 0,//记录目标对象的初始左偏移
                initialTop: 0,//记录目标对象的初始右偏移
            };

            this.textData = {
                signTextDrag: false,//writing drag or not? 区分是否在文字编辑的过程中进行了文本框的移动
                signREdit: false,//sign of reedit 文本编辑是否处于重写模式
                inputBorder: 0,  //用于拖动的外边框的宽度
                inputMaxWid: 0, //编辑框容器的最大的宽度，用于自动换行
                inputMaxHei: 0, //编辑框容器的最大的高度，用于自动换行
                fontSize: 0, //文字的大小
                //record text input to avoid height is overtop 记录当前已经输入的文本信息，用于当输入文字超出最大高度时的文本还原
                textInput: '',
                //记录上一次已经输入的文本信息，用于当输入文字超出最大高度时的文本还原
                lastTextInput: '',
                //record mouse point when text for click to drag 记录鼠标信息，用于拖拽
                pointXTD: 0,
                pointYTD: 0,
                //record input left and top
                pointLeftTD: 0,//文字输入框左上角位置
                pointTopTD: 0,//文字输入框左上角位置
            };
            this.mouseData = {//鼠标信息

                //开始位置
                startX: 0,
                startY: 0,
                //当前位置
                nowX: 0,
                nowY: 0,
                //结束的位置
                endX: 0,
                endY: 0,
                //一次过程中最小的x坐标
                minX: 0,
                //一次过程中最小的y坐标
                minY: 0,
                //一次过程中最大的x坐标
                maxX: 0,
                //一次过程中最大的y坐标
                maxY: 0,
                //记录所有的点信息
                pointArr: []//record all mouse point data
            }
        };
        WEBBoard.prototype.draw = function (toolType, isToSvc, callback) {
            //首先判断合法性，进行不同的返回
            if (this.isInited) {
                if (this.toolsOpen.indexOf(toolType) !== -1) {
                    console.log('[ %s ]---------------------------------> change current tool : %s', getTimeNow(), toolType);
                    ((isToSvc == undefined)&&(this.isToSvc=true))||(this.isToSvc=isToSvc);
                    if(toolType=='back'){
                        if(this.orderList.length > 0) {
                            //首先清空当前要删除的对象数组
                            this.backObj=this.orderList.pop();
                            if(this.isToSvc){
                                var tID=this.backObj.svcID+'';
                                var boardID=this.targetID;
                                this.callback('back', tID ,boardID);//删除的协议的服务器id
                            }
                        }
                    }else if(toolType=='clear'){
                        var boardID=this.targetID;
                        if(this.isToSvc){
                            this.callback('clear',boardID);
                        }
                    }
                    gerFuc.draw.call(this, toolType, callback);
                } else {
                    console.error('[ %s ]---------------------------------> error happened when change current tool , unopened tool or undefined tool is used : %s', getTimeNow(), toolType);
                    if (callback) {
                        callback('error');
                    }
                }
            }
            else {
                console.error('[ %s ]---------------------------------> error happened when change current tool , please init white board first!', getTimeNow());
                return false;
            }
        };
        WEBBoard.prototype.updateChangeConf = function (changeConf) {
            for (var i in changeConf) {
                if (this.changeConf[i] != undefined) {
                    if (typeof changeConf[i] == 'object') {
                        for (var j in changeConf[i]) {
                            if (this.changeConf[i][j] != undefined) {
                                this.changeConf[i][j] = changeConf[i][j];
                            } else {
                                console.error('[ %s ]---------------------------------> error happened when updateChangeConf : undefined key: {%s : %s}', getTimeNow(), i, j);
                            }
                        }
                    } else {
                        console.error('[ %s ]---------------------------------> error happened when updateChangeConf : it is not a key:value', getTimeNow());
                    }
                } else {
                    console.error('[ %s ]---------------------------------> error happened when updateChangeConf : undefined key: %s', getTimeNow(), i);
                }
            }
            console.log(this.changeConf);
        };
        WEBBoard.prototype.wbResize = function () {
            if (!this.conf.canvas.parentCon) {
                console.error('[ %s ]---------------------------------> error happened when resize canvas : white board is not inited!', getTimeNow());
                return;
            }
            if (this.conf.canvas.width !== this.conf.canvas.parentCon.width() || this.conf.canvas.height !== this.conf.canvas.parentCon.height()) {
                //只判断宽度的变化，因为宽高比必须固定
                gerFuc.review.call(this, this.conf.canvas.parentCon.width(), this.conf.canvas.parentCon.height());
            }
        };
        WEBBoard.prototype.setData = function (type,ArrObj) {
            var _self = this;
            var wbAH=['1','3','5'];
            if(type=='4'){
                //清空
                gerFuc.draw.call(this,'clear');
            }else if(type=='2'){
                //回退
                this.backObj=this.orderList.pop();
                gerFuc.draw.call(this,'back');
            }
            else if(wbAH.indexOf(type)!==-1){
                //其他
                $.each(ArrObj, function (i, v) {
                    //组建排序数据
                    var objOrder={
                        svcID:v.svcID,//svc返回的服务器id
                        localID:v.value.localID,//该协议的本地id
                        value:v.value,//自己封装别人不关心
                    };
                    gerFuc.showPaint.call(_self, v.value, 'svc');
                    //修改排序
                    _self.changeData(objOrder);
                })
            }else{
                console.error('[ %s ]---------------------------------> error happened when setData : unknow operate happened : %s', getTimeNow(),type);
            }
        };
        WEBBoard.prototype.changeData = function (obj) {
            try {
                var localID = this.localIDHead+obj.localID,
                    svcID = parseInt(obj.svcID),
                    targetID = '';//操作的图形id
                //寻找targetID 操作的图形id
                if (obj.targetID == undefined) {
                    if (obj.value) {
                        var tem = obj.value;
                        if (typeof tem == 'string') {
                            tem = JSON.parse(tem);
                        }
                        targetID = tem.specialValue.localID != undefined ? tem.specialValue.localID : tem.localID;
                    } else {
                        console.error('[ %s ]---------------------------------> error happened when changeData : can\'t get targetID ', getTimeNow());
                    }
                } else {
                    targetID = obj.targetID;
                }
                var orderObj = {
                    localID: localID,
                    svcID: svcID,
                    targetID: targetID
                }
                this.orderList.push(orderObj);

                var newList = gerFuc.quickSort(this.orderList);//快速排序

                //更新this.orderList
                this.orderList = [];
                this.orderList = newList.slice(0);
                //防止内存泄漏
                newList = null;
                //delete newList;
            } catch (e) {
                console.error('[ %s ]---------------------------------> error happened when changeData : %s', getTimeNow(), e);
            }
        };
        WEBBoard.prototype.getData = function () {
            return this.recordConArr;
        };
        WEBBoard.prototype.changeSealSource = function (sealConf, callback) {
            gerFuc.setSealIMG.call(this, callback);
        };
        WEBBoard.prototype.buildCurrentImg = function (width, height, rotate, callback) {
            //rotate 只支持90，-90,180，-180,270，-270
            if (this.conf.canvas.target !== null) {
                console.log('[ %s ]---------------------------------> build current canvas to base64 images', getTimeNow());
                gerFuc.buildImg.call(this, width, height, rotate, callback);
            } else {
                console.error('[ %s ]---------------------------------> error happened when build current canvas to base64 images : please init white board first!', getTimeNow());
            }
        };

        return {
            createConf: function (type) {
                var a = createConf(type);
                return a;
            },
            bindWB: function (targetID, constConf, changeConf, callback) {
                var curTar = new WEBBoard(constConf.ownerID.value);
                gerFuc.initBoard.call(curTar, targetID, constConf, changeConf, callback);

                return curTar;
            }
        }
    })();
    root.MyBase64 = {
        // 转码表
        table : [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
            'I', 'J', 'K', 'L', 'M', 'N', 'O' ,'P',
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', '0', '1', '2', '3',
            '4', '5', '6', '7', '8', '9', '+', '/'
        ],
        UTF16ToUTF8 : function(str) {
            var res = [], len = str.length;
            for (var i = 0; i < len; i++) {
                var code = str.charCodeAt(i);
                if (code > 0x0000 && code <= 0x007F) {
                    // 单字节，这里并不考虑0x0000，因为它是空字节
                    // U+00000000 – U+0000007F  0xxxxxxx
                    res.push(str.charAt(i));
                } else if (code >= 0x0080 && code <= 0x07FF) {
                    // 双字节
                    // U+00000080 – U+000007FF  110xxxxx 10xxxxxx
                    // 110xxxxx
                    var byte1 = 0xC0 | ((code >> 6) & 0x1F);
                    // 10xxxxxx
                    var byte2 = 0x80 | (code & 0x3F);
                    res.push(
                        String.fromCharCode(byte1),
                        String.fromCharCode(byte2)
                    );
                } else if (code >= 0x0800 && code <= 0xFFFF) {
                    // 三字节
                    // U+00000800 – U+0000FFFF  1110xxxx 10xxxxxx 10xxxxxx
                    // 1110xxxx
                    var byte1 = 0xE0 | ((code >> 12) & 0x0F);
                    // 10xxxxxx
                    var byte2 = 0x80 | ((code >> 6) & 0x3F);
                    // 10xxxxxx
                    var byte3 = 0x80 | (code & 0x3F);
                    res.push(
                        String.fromCharCode(byte1),
                        String.fromCharCode(byte2),
                        String.fromCharCode(byte3)
                    );
                } else if (code >= 0x00010000 && code <= 0x001FFFFF) {
                    // 四字节
                    // U+00010000 – U+001FFFFF  11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
                } else if (code >= 0x00200000 && code <= 0x03FFFFFF) {
                    // 五字节
                    // U+00200000 – U+03FFFFFF  111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
                } else /** if (code >= 0x04000000 && code <= 0x7FFFFFFF)*/ {
                    // 六字节
                    // U+04000000 – U+7FFFFFFF  1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
                }
            }

            return res.join('');
        },
        UTF8ToUTF16 : function(str) {
            var res = [], len = str.length;
            var i = 0;
            for (var i = 0; i < len; i++) {
                var code = str.charCodeAt(i);
                // 对第一个字节进行判断
                if (((code >> 7) & 0xFF) == 0x0) {
                    // 单字节
                    // 0xxxxxxx
                    res.push(str.charAt(i));
                } else if (((code >> 5) & 0xFF) == 0x6) {
                    // 双字节
                    // 110xxxxx 10xxxxxx
                    var code2 = str.charCodeAt(++i);
                    var byte1 = (code & 0x1F) << 6;
                    var byte2 = code2 & 0x3F;
                    var utf16 = byte1 | byte2;
                    res.push(
                        String.fromCharCode(utf16)
                    );
                } else if (((code >> 4) & 0xFF) == 0xE) {
                    // 三字节
                    // 1110xxxx 10xxxxxx 10xxxxxx
                    var code2 = str.charCodeAt(++i);
                    var code3 = str.charCodeAt(++i);
                    var byte1 = (code << 4) | ((code2 >> 2) & 0x0F);
                    var byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);
                    utf16 = ((byte1 & 0x00FF) << 8) | byte2
                    res.push(String.fromCharCode(utf16));
                } else if (((code >> 3) & 0xFF) == 0x1E) {
                    // 四字节
                    // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
                } else if (((code >> 2) & 0xFF) == 0x3E) {
                    // 五字节
                    // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
                } else /** if (((code >> 1) & 0xFF) == 0x7E)*/ {
                    // 六字节
                    // 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
                }
            }

            return res.join('');
        },
        encode : function(str) {
            if (!str) {
                return '';
            }
            var utf8    = this.UTF16ToUTF8(str); // 转成UTF8
            var i = 0; // 遍历索引
            var len = utf8.length;
            var res = [];
            while (i < len) {
                var c1 = utf8.charCodeAt(i++) & 0xFF;
                res.push(this.table[c1 >> 2]);
                // 需要补2个=
                if (i == len) {
                    res.push(this.table[(c1 & 0x3) << 4]);
                    res.push('==');
                    break;
                }
                var c2 = utf8.charCodeAt(i++);
                // 需要补1个=
                if (i == len) {
                    res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
                    res.push(this.table[(c2 & 0x0F) << 2]);
                    res.push('=');
                    break;
                }
                var c3 = utf8.charCodeAt(i++);
                res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
                res.push(this.table[((c2 & 0x0F) << 2) | ((c3 & 0xC0) >> 6)]);
                res.push(this.table[c3 & 0x3F]);
            }

            return res.join('');
        },
        decode : function(str) {
            if (!str) {
                return '';
            }

            var len = str.length;
            var i   = 0;
            var res = [];

            while (i < len) {
                var code1 = this.table.indexOf(str.charAt(i++));
                var code2 = this.table.indexOf(str.charAt(i++));
                var code3 = this.table.indexOf(str.charAt(i++));
                var code4 = this.table.indexOf(str.charAt(i++));

                var c1 = (code1 << 2) | (code2 >> 4);
                var c2 = ((code2 & 0xF) << 4) | (code3 >> 2);
                var c3 = ((code3 & 0x3) << 6) | code4;

                res.push(String.fromCharCode(c1));

                if (code3 != 64) {
                    res.push(String.fromCharCode(c2));
                }
                if (code4 != 64) {
                    res.push(String.fromCharCode(c3));
                }

            }

            return this.UTF8ToUTF16(res.join(''));
        }
    };
}(window, jQuery));






































