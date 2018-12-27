(function (w) {
	/**
 	*  UTF8编码的字节
 	*/
	function writeUTF(str, isGetBytes) {
		var back = [];
		var byteSize = 0;
		for (var i = 0; i < str.length; i++) {
			var code = str.charCodeAt(i);
			if (0x00 <= code && code <= 0x7f) {
				byteSize += 1;
				back.push(code);
			} else if (0x80 <= code && code <= 0x7ff) {
				byteSize += 2;
				back.push((192 | (31 & (code >> 6))));
				back.push((128 | (63 & code)))
			} else if ((0x800 <= code && code <= 0xd7ff)
				|| (0xe000 <= code && code <= 0xffff)) {
				byteSize += 3;
				back.push((224 | (15 & (code >> 12))));
				back.push((128 | (63 & (code >> 6))));
				back.push((128 | (63 & code)))
			}
		}
		for (i = 0; i < back.length; i++) {
			back[i] &= 0xff;
		}
		if (isGetBytes) {
			return back
		}
		if (byteSize <= 0xff) {
			return [0, byteSize].concat(back);
		} else {
			return [byteSize >> 8, byteSize & 0xff].concat(back);
		}
	}

	/**
 	* 读取UTF8编码的字节，并专为Unicode的字符串
 	*/
	function readUTF(arr) {
		if (typeof arr === 'string') {
			return arr;
		}
		var UTF = '', _arr = arr.slice(2)
		for (var i = 0; i < _arr.length; i++) {
			var one = _arr[i].toString(2),
				v = one.match(/^1+?(?=0)/);
			if (v && one.length == 8) {
				var bytesLength = v[0].length;
				var store = _arr[i].toString(2).slice(7 - bytesLength);
				for (var st = 1; st < bytesLength; st++) {
					store += _arr[st + i].toString(2).slice(2)
				}
				UTF += String.fromCharCode(parseInt(store, 2));
				i += bytesLength - 1
			} else {
				UTF += String.fromCharCode(_arr[i])
			}
		}
		return UTF
	}

	// var isLogin = false;
	var isIntoRoom = false;


	/**
	 * socket模块
	*/
	var sdk = {
		classConf: '',
		dataType: '',//传输数据类型
		webSocket: '',


		/**
		* 建立socket连接
		*/

		webSocket: function (wsUri, dataType, callback) {
			var self = this;
			self.dataType = dataType;
			self.webSocket = new WebSocket(wsUri);
			self.webSocket.onopen = function (evt) {
				if (self.dataType == 'buffer') {
					// 表示被传输二进制的内容的类型 是"blob"或者"arraybuffer"
					self.webSocket.binaryType = 'arraybuffer';
				}
				console.log('--------------websocket建立连接--------------');
				/**
				 * 初始化登录
				*/
				self.doSend({
					portParent: 1
				});
			};
			self.webSocket.onclose = function (evt) {
				console.warn('--------------websocket关闭连接--------------');
			};
			self.webSocket.onmessage = function (evt) {
				self.onMessage(evt, callback);
			};
			self.webSocket.onerror = function (evt) {
				console.error('--------------websocket连接失败错误--------------');
			};
		},


		/**
		* 发送数据方法
		*/

		doSend: function (message) {
			if (this.dataType == 'buffer') {
				this.sendRunData(message);
			}
		},




		/**
		* 接收消息
		*/

		onMessage: function (evt, callback) {
			if (this.dataType == 'buffer') {
				this.buildRecData(evt, callback);
			}
		},


		/**
		* 生成ProtoBuf包
		*/

		buildPackage: function (message) {
			// if (message.type != "game_server_login" || message.type != "game_server_intoRoom") {
			// 	var messageMethod = mapObj[message.portChild];
			// 	var data = message.data;
			// }
			//构建模块
			var ProtoBuf = dcodeIO.ProtoBuf;
			//加载proto文件
			var proto = ProtoBuf.loadProtoFile(mapObj.fileName);
			var protoModule;
			/* if (!isLogin) {
				//加载proto中的模块
				var protoFun = proto.build(mapObj["10001"]);
				//实例化模块
				protoModule = new protoFun();
				protoModule.set("userId", this.classConf.user.id);
			} else {
				if (!isIntoRoom) {
					//加载proto中的模块
					var protoFun = proto.build(mapObj["10002"]);
					//实例化模块
					protoModule = new protoFun();
					protoModule.set("roomId", this.classConf.course.id);
				} else { */
			var protoFun = proto.build(mapObj[message.portChild]);
			protoModule = new protoFun();
			if (messageMethod == "MoveC2S") {
				protoModule.point = {
					x: data.x,
					y: data.y
				}
			}
			/* 	}
			} */
			// console.log(protoModule)
			return protoModule;
		},


		/**
		* 拼接包向服务器发送
		*/

		sendRunData: function (message) {
			var portParent = message.portParent;
			var dataView;
			var self = this;
			var portUpFun = {

				/**
				 * 功能开关将二进制转为10进制
				*/
				func: function (data) {
					var num = parseInt(data, 2);
					return num;
				},


				/* 
				* 初始化登录
				*/
				initLogin: function () {
					var uIdChange = writeUTF(self.classConf.user.id);// utf-8编码
					var roomIdInit = writeUTF(self.classConf.course.id);
					var length = uIdChange.length + roomIdInit.length + 8;
					dataView = new DataView(new ArrayBuffer(length));
					dataView.setUint32(0, length, false);
					dataView.setUint32(4, portParent, false);
					for (var i = 0; i < uIdChange.length; i++) {
						dataView.setUint8(i + 8, uIdChange[i]);
					}
					for (var j = 0; j < roomIdInit.length; j++) {
						dataView.setUint8(j + uIdChange.length + 8, roomIdInit[j]);
					}
				},


				/**
				 * 消息转发 
				*/

				messageForward: function () {
					var str = message.body;
					var bodyStr = writeUTF(str);
					var Bodylength = bodyStr.length;
					var targetUtf8 = writeUTF(message.target) // 功能开关
					var targetLength = targetUtf8.length;
					var length = Bodylength + targetLength + 15;
					dataView = new DataView(new ArrayBuffer(length));
					dataView.setUint32(0, length, false);
					dataView.setUint32(4, portParent, false);
					dataView.setUint8(8, this.func(message.func));
					for (var i = 0; i < targetLength; i++) {
						dataView.setUint8(i + 9, targetUtf8[i]);
					}
					dataView.setUint16(targetLength+9, message.dataNum);
					dataView.setUint16(targetLength+13, message.meta);

					for (var j = 0; j < Bodylength; j++) {
						dataView.setUint8(j + targetLength + 15, bodyStr[j]);
					}
				},


				/**
				 * 游戏服务
				*/

				gameServer: function () {
					var protoData = sdk.buildPackage(message);
					var buffer = protoData.toArrayBuffer();
					var msgDecView = new DataView(buffer);
					var length = buffer.byteLength + 8;
					var dataViewChild = new DataView(new ArrayBuffer(length));
					dataViewChild.setUint32(0, length, false);
					// if (!isLogin) {
					// 	dataViewChild.setUint32(4, 10001, false);
					// } else {
					// 	if (!isIntoRoom) {
					// 		dataViewChild.setUint32(4, 10002, false);
					// 	} else {
					var portChild = message.portChild;
					dataViewChild.setUint32(4, portChild, false);
					// 	}
					// }
					// 设置包体
					for (var i = 0; i < length - 8; i++) {
						dataViewChild.setUint8(i + 8, msgDecView.getUint8(i));
					}
					// 构建外层包
					var allLength = length + 12;
					dataView = new DataView(new ArrayBuffer(allLength))
					dataView.setUint32(0, allLength, false);
					dataView.setUint32(4, portParent, false);
					dataView.setUint32(8, 0, false);
					for (var j = 0; j < length; j++) {
						dataView.setUint8(j + 12, dataViewChild.getUint8(j));
					}
				},


				/**
				 * 心跳上行
				*/

				heartBeakUp: function () {
					dataView = new DataView(new ArrayBuffer(16));
					dataView.setUint32(0, 16, false);
					dataView.setUint32(4, portParent, false);
					dataView.setFloat64(8, message.startTime, false);
				},


				/**
				 * 查询数据
				*/

				queryData: function () {
					dataView = new DataView(new ArrayBuffer(14));
					dataView.setUint32(0, 14, false);
					dataView.setUint32(4, portParent, false);
					dataView.setUint32(8, message.dataNum, false);
					dataView.setUint16(12, message.meta, false);
				},


				/**
				 * 删除数据
				*/

				deleteData: function () {
					var bodyUtf8 = writeUTF(message.body); 
					var length = bodyUtf8.length;
					var totleLen = length + 14;
					dataView = new DataView(new ArrayBuffer(totleLen));
					dataView.setUint32(0, totleLen, false);
					dataView.setUint32(4, portParent, false);
					dataView.setUint32(8, message.dataNum, false);
					dataView.setUint16(12, message.meta, false);
					for (var i = 0; i < length; i++) {
						dataView.setUint8(i + 14, bodyUtf8[i]);
					}
				}
			}

			switch (portParent) {
				case 1:
					portUpFun.initLogin();
					break;
				case 3:
					portUpFun.messageForward();
					break;
				case 5:
					portUpFun.gameServer();
					break;
				case 7:
					portUpFun.heartBeakUp();
					break;
				case 11:
					portUpFun.queryData();
					break;
				case 13:
					portUpFun.deleteData();
					break;
				default:
					console.log('port为其他');
					break;
			}


			/**
			 * 发送数据包
			*/
			this.webSocket.send(dataView.buffer);
		},


		/**
		* 处理接收的数据
		*/

		buildRecData: function (evt, callback) {
			//返回来的二进制流数据
			var buffer = evt.data;
			var msgDecView = new DataView(buffer);
			//获取buffer包的长度
			var length = msgDecView.getInt32(0);
			var port = msgDecView.getInt32(4);
			var self = this;
			var portDownFun = {

				/**
				* 初始登录下行
				*/

				initLoginDowm: function () {
					console.log("--------------初始登录成功--------------");

					callback(); //app start

			
					// 初始化登录
					// self.doSend({
					// 	type: "game_server_login",
					// 	portParent: 5
					// })

					// 发送心跳包
					setInterval(function(){
						self.doSend({
							portParent: 7,
							startTime: new Date().getTime()
						});
					},45000)
				},


				/**
				* 消息转发 下行
				*/

				messageForwardDowm: function () {
					var childBuf = new DataView(buffer.slice(12, length));
					var arr = [];
					for (var m = 0; m < length - 12; m++) {
						arr[m] = childBuf.getUint8(m);
					}
					var bodyJSON = JSON.parse(readUTF(arr));
					window.sdk_game.router.setClData(bodyJSON);
				},


				/**
				* 游戏服务 下行
				*/

				gameServerDowm: function () {
					//查看包体里边的数据
					var childBuf = buffer.slice(12, length);
					var childView = new DataView(childBuf);
					// 消息号
					var messageNum = childView.getInt32(4);
					var childLength = childView.getInt32(0);
					var childBody = childBuf.slice(8, childLength);
					// 开始解码
					var ProtoBuf = dcodeIO.ProtoBuf;
					var proto = ProtoBuf.loadProtoFile(mapObj.fileName);
					var protoFun = proto.build(mapObj[messageNum]);
					var p = protoFun.decode(childBody);
					var teaID = ''; //获取老师id
					for (var i = 0; i < self.classConf.appointMemberList.length; i++) {
						if (self.classConf.appointMemberList[i].role == "tea") {
							teaID = self.classConf.appointMemberList[i].uid;
						}
					}
					/**
					 * 区分游戏服务类型
					*/
					/* if (messageNum == "10001") { // 登录游戏服务
						console.log("----------登录游戏服务---------")
						isLogin = true;
						if (!isIntoRoom) {
							self.doSend({
								type: "game_server_intoRoom",
								portParent: 5
							})
						}
					} else  */
					if (messageNum == "10004") { // 背景移动下发
						var bodyJSON = {
							type: 'bgMove',
							data: p.point[0]
						}
						// window.sdk_game.router.setGameData(bodyJSON)
					} else if (messageNum == "10005") {//通知别人 10005 10006 为进入房间后主动下发
						isIntoRoom = true;
						var bodyJSON = {
							messageNum: '10005',
							data: p
						}
						window.sdk_game.router.setMemberIntoRoom(bodyJSON)
					} else if (messageNum == "10006") {// 其他人的消息
						console.log("----------进入房间---------")
						var bodyJSON = {
							messageNum: '10006',
							data: p.point
						}
						window.sdk_game.router.setMemberIntoRoom(bodyJSON);
						// 获取所有操作数据包
						self.doSend({
							portParent: 11,
							dataNum: -1,
							meta: 0
						})
					}
				},

				/**
				 * 心跳 下行
				*/

				heartBeakUpDowm: function () {
					var rspCode = msgDecView.getInt32(8);// 默认值
					var startTime= msgDecView.getFloat64(12); // 上行发送时间
					var endTime= msgDecView.getFloat64(20); // 下行收到时间
					console.log('收到心跳下行包，默认值为'+rspCode+'上行时间'+startTime+'下行时间'+endTime);
				},


				/**
				 * 退出教室下行
				*/

				roomOutDown: function () {
					var uidData = new DataView(buffer.slice(8, length));
					var arr = [];
					for (var i = 0; i < length - 8; i++) {
						arr[i] = uidData.getUint8(i)
					}
					var uid = readUTF(arr);
					console.log('------------' + uid + '-------------退出教室');
					window.sdk_game.router.setMemberOutRoom(uid);
				},


				/**
				 * 查询下行
				*/

				queryDataDown: function () {
					console.log('-----------获取操作数据包----------------');
					// 返回存放包的数组长度
					var sortNum = msgDecView.getInt16(8);
					var arr = [];
					var offset = 10;
					var dataNum = [];
					var meta = [];
					// 解析数据
					for (var n = 0; n < sortNum; n++) {
						dataNum.push(msgDecView.getInt16(offset));
						offset += 4;
						meta.push(msgDecView.getInt16(offset));
						offset += 2;
						var size = msgDecView.getInt16(offset);
						offset += 2;
						var everyArr = [];
						for (var m = 0; m < size; m++) {
							everyArr[m] = msgDecView.getUint8(offset)
							offset++;
						}
						arr[n] = JSON.parse(readUTF(everyArr))
					};
					window.sdk_game.router.setFilterArr(arr)
				},


				/**
				 * 删除下行
				*/

				deleteDataDown: function () {
					console.log('----------删除下行-----------');
					var dataNum = msgDecView.getUint32(8);
					var meta = msgDecView.getInt16(12);
					var arr = [];
					var childBuf = new DataView(buffer.slice(14, length));
					for (var m = 0; m < length - 14; m++) {
						arr[m] = childBuf.getUint8(m);
					}
					var bodyJSON = JSON.parse(readUTF(arr));
					window.sdk_game.router.setClData(bodyJSON);
				}

			}

			switch (port) {
				case 2:
					portDownFun.initLoginDowm();
					break;
				case 4:
					portDownFun.messageForwardDowm();
					break;
				case 6:
					portDownFun.gameServerDowm();
					break;
				case 8:
					portDownFun.heartBeakUpDowm();
					break;
				case 10:
					portDownFun.roomOutDown();
					break;
				case 12:
					portDownFun.queryDataDown();
					break;
				case 14:
					portDownFun.deleteDataDown();
					break;
				default:
					console.log('下发port为其他');
					break;
			}
		},


		/**
		* 设置classConf
		*/

		setConfig: function (classConf) {
			this.classConf = classConf;
		},


		/**
		* 初始化请求socket地址
		*/

		init: function (callback) {
			// 请求ws地址
			var self = this;
			// http://39.107.83.34:8080/login.uc    http://172.16.16.176:8080/login.uc
			$.ajax({
				url: "http://172.16.16.176:8080/login.uc",
				data: {
					userId: self.classConf.user.id,
					roomId: self.classConf.course.id,
					device: "adf"// 设备类型
				},
				success: function (datas) {
					var data = JSON.parse(datas)
					var wsUrl = "ws://" + data.address + ":" + data.port + "/websocket";
					console.log('socket地址',wsUrl)
					sdk.webSocket(wsUrl, 'buffer', callback);
				},
				error: function () {
					console.error("请求ws地址失败")
				}
			})
		}
	}

	window.sdk_game = sdk;

	/**
	 * 工具方法
	 */

	var globalCommon = {
		logOnlinePrint: function (content, type) {
			let head = '=========window pc log=========> ';
			if (Object.prototype.toString.call(content) == '[object Object]') {
				content = JSON.stringify(content);
			}
			let tem = head + content;
			switch (type) {
				case 'warn':
					console.warn(tem);
					break;
				case 'error':
					console.error(tem);
					break;
				default:
					console.log(tem);
					break;
			}
		},

		deepCopy: function (source) {
			var result = {};
			for (var key in source) {
				result[key] = Object.prototype.toString.call(source[key]) === '[object Object]' ? globalCommon.deepCopy(source[key]) : source[key];
			}
			return result;
		},

	    /**
	     * 首字母大写
	     */
		capital: function (name) {
			return name.charAt(0).toUpperCase() + name.substr(1);
		},

		unique: function (arr) {
			var result = [], hash = {};
			for (var i = 0, elem; (elem = arr[i]) != null; i++) {
				if (!hash[elem]) {
					result.push(elem);
					hash[elem] = true;
				}
			}
			return result;
		}

	};

	window.sdk_game.globalCommon = globalCommon;

	/**
	 * 路由
	 */
	var router = {

	    /**
	     * 全局数据
	    */
		setGlobalData: function (json) {

		},

		setGameData: function (message) {
			this.adaptData(message, {});
		},

		/**
		 * 进入房间
		*/
		setMemberIntoRoom: function (json) {
			// type: obj.type,
			// role: obj.type,
			// uid: changeID,//变更的用户id
			// state: obj.state

			var message = {

			}

			if (json.messageNum == '10005') {
				message = {
					type: 'intoRoom',
					state: 'enter',
					uid: [json.data.userId]
				}
			} else if (json.messageNum == '10006') {

				var userIds = [];
				for (var i = 0; i < json.data.length; i++) {
					userIds.push(json.data[i].userId);
				}

				message = {
					type: 'intoRoom',
					state: 'enter',
					uid: userIds
				}
			} else {

			}

			this.adaptData(message, {});
		},

		/**
		 * 退出房间
		*/
		setMemberOutRoom: function (userId) {
			message = {
				type: 'outRoom',
				state: 'out',
				uid: userId
			}
			this.adaptData(message, {});
		},

		/**
		 * 处理课中收到的数据包
		*/ 
		setClData: function (message) {
			/* {
				"type": "firstInto",
				"CID": "648518346341356238",
				"textBookID": "1",
				"textBookType": "1",
				"page": "1",
				"operate": "1",
				"data": [{
					"localID": 1,
					"value": {
						"operate": "1",
						"value": "1"
					},
					"byteData": "",
					"byteDataLength": ""
				}]
			} */

			if(message.type == 'wb') {
				if(message.data.length >= 1) {
					if(message.data[0].value.sendUser != window.sdk_game.classConf.user.id) {
						message.data[0].value.receiveUser = window.sdk_game.classConf.user.id;
						// 各端同步localIDmessage.data[0].value.localID
						window.sendOrReceive.localIdNum = message.data[0].value.localIDNum;
						this.adaptData(message, {});
					} else {
						window.sendOrReceive.localIdNum = message.data[0].value.localIDNum;
						this.adaptData(message, {});
					}
				} else {
					this.adaptData(message, {});
				}
			} else {
				message.data[0].value.receiveUser = window.sdk_game.classConf.user.id;
				// 各端同步localIDmessage.data[0].value.localID
				window.sendOrReceive.localIdNum = message.data[0].value.localIDNum;
				this.adaptData(message, {});
			}
		},

		/**
		 * 处理重新进入教室的数据包
		*/ 
		setFilterArr: function (arr) {
			console.log('获取的数据------------------>%s', JSON.stringify(arr));
			var syncArr = []; // 执行队列的数据包
			var runArr = [];
			var currentCardPageNum = '';
			var currentCardId = '';
			for(var i=0; i<arr.length; i++){
				/* 这儿需要修改 */
				if(window.sendOrReceive.localIdNum == window.gTypes.length){
					window.sendOrReceive.localIdNum = arr[i].data[0].value.localIdNum;
				} else if(arr[i].data[0].value.localIdNum > window.sendOrReceive.localIdNum){
					window.sendOrReceive.localIdNum = arr[i].data[0].value.localIdNum;
				}
				
				arr[i].operate = '5';
				if(arr[i].type== "clickCard") {
					currentCardId = arr[i].data[0].value.cardData.id;
				}
				if(arr[i].type== "coursePaging") {
					currentCardPageNum = arr[i].data[0].value.currentPage;
				}
				if (arr[i].type== "sync") {
					arr[i].data[0].value.receiveUser = window.sdk_game.classConf.user.id;
					syncArr.push(arr[i]);
				} else {
					runArr.push(arr[i]);
				}
			}

			for(var j=0; j<runArr.length; j++){
				if(runArr[j].type== "practice") {
					if(runArr[j].data[0].value.currentPage != currentCardPageNum ){
						runArr.splice(j, 1);
					}
				}
			}
			var syncArrList = syncArr.filter(function (item) {
				return currentCardId == item.data[0].value.currentCardId && currentCardPageNum == item.data[0].value.currentCardPageNum;
			});

			var courseQueueArr = runArr.concat(syncArrList);

			courseQueueArr.sort(function (a, b) {
				return a.data[0].value.localIDNum - b.data[0].value.localIDNum;
			});
			console.log('筛选之后的数据------------------>%s', JSON.stringify(courseQueueArr));
			for (var i = 0; i < courseQueueArr.length; i++) {
				this.adaptData(courseQueueArr[i], {});
			}

		},
		
		adaptData: function (json, obj) {
			var data = $.extend(json, obj);
			window.EventQueue.addEventQueue(globalCommon.deepCopy(data));
		}
	};
	window.sdk_game.router = router;

})(window);




