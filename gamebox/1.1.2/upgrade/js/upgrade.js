// JavaScript Document

$(function(){
	/* if (uniqid != undefined && uniqid != null && fileJson != undefined && fileJson != null) {
        //速度
        $("#" + uniqid + " .rate").html(fileJson.speed);
        //运行时间
        $("#" + uniqid + " .nowtime").html(fileJson.lefttime);
        //总大小
        $("#" + uniqid + " #fileSize").html("&nbsp;&nbsp;" + fileJson.totalsize);
		
		
    }*/
	
	initWnd();
})

function initWnd(){
	$("#update").click(function(){
		window.external.UpdateOk();
	})
	$("#cancel").click(function(){
		window.external.UpdateCancel();
	})
}

function BeginUpdate(){
	$(".btn_button").addClass("hide");
	$(".update").removeClass("hide");
}


function EndUpdate(){
}


function UpdateProgreass(num){
	$("#proNum").html(num);
	//用于计算
	var scale = parseInt($(".load-bar").width())/100;
	var curScale = parseInt(num);
	var barWidth = scale * curScale + "px";
	$(" .load-bar-inner").css("width", barWidth)
}
