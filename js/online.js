var canvas_word;
var word;
var numW,numH;
var sId;
var randomNum,randomColor;
var colors=['red','yellow','black','blue','green','grey'];

var ws_out = new WebSocket("ws://www.server.doc:8888");
var back = document.getElementById('canvas_out');
var backcontext = back.getContext('2d');
var video = document.getElementById("video");
var success = function(stream){
    video.src = window.URL.createObjectURL(stream);
}
ws_out.onopen = function(){
    SendImg();
}

var ws_word = new WebSocket('ws://www.server.doc:9502');
ws_word.onopen = function() {
    console.log("Connected to word server.");
};

ws_word.onmessage = function(e) {
   // clearInterval(sId);
    Initial();
    ShowWord(e.data);
    console.log(e.data);
};

var SendImg = function(){
    try{
        backcontext.drawImage(video,0,0, back.width, back.height);
    }catch(e){
        if (e.name == "NS_ERROR_NOT_AVAILABLE") {
            return setTimeout(SendImg, 100);
        } else {
            throw e;
        }
    }
    if(video.src){
        ws_out.send(back.toDataURL("image/jpeg", 0.75));
    }
    setTimeout(SendImg, 1);
}
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia || navigator.msGetUserMedia;
navigator.getUserMedia({video:true, audio:false}, success, console.log);

$(function() {
    Initial();
});

$("#btn_enter").on('click', function() {
    var message = $("#word").val();
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
    var tmp1=Math.random()*6
    var tmp2 = Math.random()*6;
    tmp2 = parseInt(tmp2, 10);
    var tmp = colors[tmp2];
    if (tmp == color) {
        return GetRandColor(tmp);
    } else {
        return tmp;
    }
}