<?php
$version = $_GET['version'];

/**
 * [getVerion description]  获取版本号
 * @param  [type] $v [description]
 * @return [type]    [description]
 */
function getVerion($v){
    $str = '1.1.4';
    $arr = explode('.',$v);
    $len = count($arr);
    $ver = array_slice($arr,0,$len-1);
    $str = join('.',$ver);
    return  $str;
}
$file = getVerion($version);
$CONFIG = array();
$CONFIG['host'] = '//www.oasgames.com/';
$CONFIG['version'] = '2018062901';

function getCssStye($num){
	$arrcss = array('upgrade','upgrade2.1.0');
	return $arrcss[$num];
}
if($file < '2.1.0'){
	$CONFIG['css'] = getCssStye(0);
}else if($file >= '2.1.0'){
	$CONFIG['css'] = getCssStye(1);
}

?>
