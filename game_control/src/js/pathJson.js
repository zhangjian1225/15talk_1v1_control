var cardsJson = [{
		id: 'card1',
		name: 'c1',
		position: {
			x: 620*1.5,
			y: 70*1.5
		},
		info: {
			comeIn: true,
			total: 5,
			src: {
				"1": "01",
				"2": "02",
				"3": "03",
				"4": "04",
				"5": "05"
			}
		},
		pathLength: 100,
		path: [{
            "x": 180*1.5,
            "y": 45*1.5
        },{
            "x": 300*1.5,
            "y": -10*1.5
        },{
			"x": 500*1.5,
			"y": -30*1.5
		}],
		rank: '1'
	},
	{
		id: 'card2',
		name: 'c2',
		position: {
			x: 1150*1.5,
			y: 600*1.5
		},
		info: {
			comeIn: true,
			total: 5,
			src: {
				"1": "06",
				"2": "07",
				"3": "08",
				"4": "09",
				"5": "10"
			}
		},
        pathLength: 300,
		path: [{
            x: 1030*1.5,
            y: 460*1.5
		}],
		rank: '2'
	},
	{
		id: 'card3',
		name: 'c3',
		position: {
			x: 1750*1.5,
			y: 90*1.5
		},
		info: {
			comeIn: true,
			total: 3,
			src: {
				"1": "11",
				"2": "12",
				"3": "13"
			}
		},
        pathLength: 300,
		path: [
			{
				"x": 1650*1.5,
				"y": -40*1.5
			}
		],
		rank: '3'
	}
];

//装备
var equipmentJson = [{
		id: 'card1',
		name: 'e1',
		position: {
			x: 40*1.5,
			y: 325*1.5
		},
		info: {
			getState: false
		},
		imageSuccess: 'chuan1',
		imageError: 'chuan2'
	},
	{
		id: 'card2',
		name: 'e2',
		position: {
			x: 90*1.5,
			y: 280*1.5
		},
		info: {
			getState: false
		},
		imageSuccess: 'ying1',
		imageError: 'ying2'
	},
	{
		id: 'card3',
		name: 'e3',
		position: {
			x: 180*1.5,
			y: 325*1.5
		},
		info: {
			getState: false
		},
		imageSuccess: 'cap1',
		imageError: 'cap2'
	}
];

//用户形象
var userJson = {
	id: "21345",
	name: "hello",
	role: "tea",
	rank: "0",
	info: {
		classList: [{
				rank: "0",
				src: "image/img1.png"
			},
			{
				rank: "1",
				src: "image/img2.png"
			},
			{
				rank: "2",
				src: "image/img3.png"
			},
			{
				rank: "3",
				src: "image/img4.png"
			}
		]
	},
	position: {
		x: 1180,
		y: 650
	}
};

//课程过程中的所有音频素材
var h5courseAudio = [{
	name: "showCup",
	src: "image/upgrade.mp3"
}, {
	name: "updatePrize",
	src: "image/upgrade.mp3"
}];

// window.h5courseAudio = h5courseAudio;
window.cardsJson = cardsJson;
// window.equipmentJson = equipmentJson;
// window.userJson = userJson;
//
// //全局变量
// window.currentCard = null;
// window.User = null;

export {
	cardsJson,
	userJson,
	h5courseAudio,
	equipmentJson
}