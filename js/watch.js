var canvas_word;
var word;
var numW,numH;
var sId;
var randomNum,randomColor;
var colors=['red','yellow','black','blue','green','grey'];

var ws_in = new WebSocket("ws://www.server.doc:8888");
ws_in.onopen = function() {
	console.log("Connected to in server.");
}
ws_in.onmessage = function(e) {
	var tmp = document.getElementById('canvas_in');
	var content = tmp.getContext('2d');
	var image = new Image();
	image.src = e.data;
	image.onload = function() {
		content.drawImage(image, 0, 0, tmp.width, tmp.height);
	};
}

var ws_word = new WebSocket('ws://www.server.doc:9502');
ws_word.onopen = function() {
	console.log("Connected to word server.");
};

ws_word.onmessage = function(e) {
	//clearInterval(sId);
	Initial();
	ShowWord(e.data);
	console.log(e.data);
};

$(function() {
	Initial();
});

$("#btn_enter").on('click', function() {
	// clearInterval(sId);
	// Initial();
	var message = $("#word").val();
	console.log(message);
	SendWord(message);
	$("#word").val('');
});

function Initial() {
	canvas_word = document.getElementById('canvas_word');
	word = canvas_word.getContext('2d');
	numW = canvas_word.width;
	numH = canvas_word.height;
	randomNum = GetRandNum(numH);
	randomColor = GetRandColor('red');
}

function ShowWord(msg) {
	randomColor = GetRandColor(randomColor);
	word.fillStyle = randomColor;
	word.font = "13px arial";
	randomNum = GetRandNum(randomNum);
	word.fillText(msg, numW, randomNum);
	sId = setInterval(function() {
		if (numW > -610) {
			numW--;
			word.clearRect(0, 0, canvas_word.width, numH);
			word.fillText(msg, numW, randomNum);
		} else {
			word.clearRect(0, 0, canvas_word.width, numH);
			clearInterval(sId);
		}
	}, 10);
}

function SendWord(msg) {
	ws_word.send(msg);
}

function GetRandNum(num) {
	var tmp = Math.ceil(Math.random() * numH);
	if (tmp == num) {
		return GetRandNum(tmp);
	} else {
		return tmp;
	}
}

function GetRandColor(color) {
    var tmp2 = Math.random()*6;
    tmp2 = parseInt(tmp2, 10);
    var tmp = colors[tmp2];
    if (tmp == color) {
        return GetRandColor(tmp);
    } else {
        return tmp;
    }
}
