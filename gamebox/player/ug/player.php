<?php 
    include("info.php");
    $Version = $_GET ['version'];
    $locale = $_GET ['locale'];
    $gameid = $_GET ['gameid'];
    $channel = $_GET ['channel'];
    
    $pass = 0;

	$data = json_decode($info["rec_tasks"],true);


	foreach($data  as  $k=>$task)
	{

 		if(isset($task["gameid"]))
 		{
 			foreach($task["gameid"]  as  $game=>$cur_game)
 			{

 				if ($gameid == $cur_game) 
 				{
 					$pass += 1;
 					break;
 				}
 			}
 		}
 		else
 		{
 			echo 1;
 			$pass += 1;
 		}

 		if(isset($task["version"]))
 		{
 			foreach($task["version"]  as  $ver=>$cur_ver)
 			{

 				if ($Version == $cur_ver) {

 					$pass += 1;
 					break;
 				}
 			}
 		}
 		else
 		{
 			$pass += 1;
 		}


 		if(isset($task["locale"]))
 		{
 			foreach($task["locale"]  as  $loc=>$cur_loc)
 			{

 				if ($locale == $cur_loc) {

 					$pass += 1;
 					break;
 				}
 			}
 		}
 		else
 		{
 			$pass += 1;
 		}


 		if(isset($task["channel"]))
 		{
 			foreach($task["channel"]  as  $cha=>$cur_channel)
 			{
 				if ($channel == $cur_channel) {

 					$pass += 1;
 					break;
 				}
 			}
 		}
 		else
 		{
 			$pass += 1;
 		}

 		if ($pass >= 4 && isset($task["link"])) {
 			
 			Header("Location:".$task["link"]);
 			return;
 		}
 		else
 			$pass = 0;
	}



?>