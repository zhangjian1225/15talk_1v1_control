window.mapObj = {
	fileName:"./common/LoginC2SMessage.proto",
	"10000": "HeartbeatC2S",
	"10001": "LoginC2S",// 下发10005 10006
	"10002": "JoinRoomC2S",
	"10003": "MoveC2S",
	"10004": "MoveS2C",
	"10005": "PointInfoByUserS2C",
	"10006": "PointInfoByRoomS2C"
};
window.messagePort = {
	"loginPort": 1,// 登录port
	"msgFwdPort": 3,// 消息转发port
	"gameServerPort": 5,// 游戏服务port
	"heartbeatPort": 7// 心跳
}
