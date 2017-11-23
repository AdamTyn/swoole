<?php

define('_ROOT_', dirname(__FILE__));
require_once _ROOT_.'/func.php';
$ws = new swoole_websocket_server("0.0.0.0", 8888);

$ws->on('open', function (swoole_websocket_server $server, $request) {
});

$ws->on('message', function (swoole_websocket_server $server, $frame) {
    foreach(notice(_ROOT_.'/client/') as $v){
        $server->push($v,$frame->data);
    }
});

$ws->on('close', function (swoole_websocket_server $server, $fd) {
});

$ws->start();