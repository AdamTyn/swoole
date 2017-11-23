<?php

define('_ROOT_', dirname(__FILE__));
require_once _ROOT_.'/func.php';
$ws = new swoole_websocket_server("0.0.0.0", 9502);

$ws->on('open', function (swoole_websocket_server $server, $request) {
    echo '-----open-----';
    echo "\n";
    if(!file_exists(_ROOT_.'/client/'.$request->fd.'.client')){
        @file_put_contents(_ROOT_.'/client/'.$request->fd.'.client',$request->fd);
    }
});

$ws->on('message', function (swoole_websocket_server $server, $frame) {
    echo '-----message-----';
    foreach(notice(_ROOT_.'/client/') as $v){
        $server->push($v,$frame->data);
    }
    echo "\n";
});

$ws->on('close', function (swoole_websocket_server $server, $fd) {
    echo '-----close-----';
    echo "\n";
    @unlink(_ROOT_.'/client/'.$fd.'.client');
});

$ws->start();
