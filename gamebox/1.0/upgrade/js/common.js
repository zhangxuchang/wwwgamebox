// JavaScript Document

var gameid = getParam('gameid',window.location.href).toLocaleLowerCase();
var mulity = getParam('lg',window.location.href).toLocaleLowerCase();
var defaultid = getParam('game',window.location.href).toLocaleLowerCase();
var gamelist = null;

var multiLa = {
		"enus":[
			{"Gamebox_StartUpGame":"启动游戏"},
			{"Gamebox_GameSummery":"游戏简介"},
			{"Gamebox_AccountUU":"UU帐号"},
			{"Gamebox_AccountFacebook":"Facebook帐号"},
			{"Gamebox_AccountOasgames":"OAS帐号"},
			{"Gamebox_Register":"注册"},
			{"Gamebox_Account":"帐号"},
			{"Gamebox_Password":"密码"},
			{"Gamebox_AccountNone":"帐号不能为空"},
			{"Gamebox_PasswordNone":"密码不能为空"},
			{"Gamebox_AccPassError":"帐号或密码错误"},
			{"Gamebox_Login":"登录"},
			{"Gamebox_Return":"返回"},
			{"Gamebox_SMSPassword":"您将会收到一条短信，请使用短信中的代码代替密码登录。"},
			{"Gamebox_FacebookError":"您的Facebook帐号异常，请到Facebook网页处理此问题。"},
			{"Gamebox_Sure":"确定"},
			{"Gamebox_Cancel":"取消"},
			{"Gamebox_MinSize":"最小化"},
			{"Gamebox_MaxSize":"最大化"},
			{"Gamebox_Revert":"还原"},
			{"Gamebox_Close":"关闭"},
			{"Gamebox_PlayedArea":"上次登录区服"},
			{"Gamebox_SearchArea":"搜索区服"},
			{"Gamebox_NoneArea":"没有查找到任何信息"},
			{"Gamebox_UpdateContent":"更新内容"},
			{"Gamebox_AlreadyDownload":"已下载"},
			{"Gamebox_NextTime":"下次再说"},
			{"Gamebox_Update":"升级"},
			{"gamelist":[
				{
					"id":"sq",
					"name":"神曲",
					"type":"Aksiyon Rol Yapma",
					"leftbg":"gameicon/sq/left.png",
					"boxbg":"gameicon/sq/right.jpg",
					"areabg":"gameicon/sq/xia.jpg",
					"logo":"gameicon/sq/logo.png",
					"logobig":"gameicon/sq/logobig.jpg",
					"logosmall":"gameicon/sq/logosmall.jpg",
					"url":"//lotr.oasgames.com/fbapp/interface/serverlist4guanwang.php?uid=200000000000001",
					"des":"Legend Online RPG Tarzı Bir Rol Oluşturma Oyunudur. Şehrinizi Geliştirerek Oyunun Efendisi Olabilir, Heyecan Verici Savaşlarla Eşsiz Bir Oyun Keyfi Yaşayabilirsiniz"
				},{
					"id":"qszg",
					"name":"骑士战歌",
					"type":"Rol Yapma Oyunu",
					"leftbg":"gameicon/qszg/left.png",
					"boxbg":"gameicon/qszg/right.jpg",
					"areabg":"gameicon/qszg/xia.jpg",
					"logo":"gameicon/qszg/logo.png",
					"logobig":"gameicon/qszg/logobig.jpg",
					"logosmall":"gameicon/qszg/logosmall.jpg",
					"url":"//kstr.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid=200000000000001",
					"des":"Orjinal Hikayesi İle Dikkat Çeken Kinght Saga, Gizemli Bir Sihir Dünyası Tarayıcı Oyunudur. Oyuncular Gerçek ve Efsanevi Dünya Arasında Şövalyelik Onurunu Korumak İçin Amansız Bir Mücadeleye Başlarlar."
				},{
					"id":"aj",
					"name":"傲剑",
					"type":"Aksiyon Rol Yapma",
					"leftbg":"gameicon/aj/left.png",
					"boxbg":"gameicon/aj/right.jpg",
					"areabg":"gameicon/aj/xia.jpg",
					"logo":"gameicon/aj/logo.png",
					"logobig":"gameicon/aj/logobig.jpg",
					"logosmall":"gameicon/aj/logosmall.jpg",
					"url":"//kftr.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid=200000000000001",
					"des":"KungFu İlk Türkçe ARPG Uzak Doğu Dövüş Sanatları Oyunudur, Sınırsız PK'nin Ve Ek Sahne Savaşlarının Tadını Çıkartırken Kendinizi Amansız Bir Ölüm Kalım Savaşı İçinde Bulacaksınız!"
				},{
					"id":"ssjj",
					"name":"生死狙击",
					"type":"FPS",
					"leftbg":"gameicon/ssjj/left.png",
					"boxbg":"gameicon/ssjj/right.jpg",
					"areabg":"gameicon/ssjj/xia.jpg",
					"logo":"gameicon/ssjj/logo.png",
					"logobig":"gameicon/ssjj/logobig.jpg",
					"logosmall":"gameicon/ssjj/logosmall.jpg",
					"url":"//fbtr.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid=200000000000001",
					"des":"First Blood Arena Modu, PVE Modu Gibi Efsaneleşmiş Oyun Modlarına ve Gerçekçi Silah Deneyimine Sahip Tam Bir Savaş Oyunu!"
				},{
					"id":"cqb",
					"name":"苍穹变",
					"type":"Aksiyon Rol Yapma",
					"leftbg":"gameicon/cqb/left.png",
					"boxbg":"gameicon/cqb/right.jpg",
					"areabg":"gameicon/cqb/xia.jpg",
					"logo":"gameicon/cqb/logo.png",
					"logobig":"gameicon/cqb/logobig.jpg",
					"logosmall":"gameicon/cqb/logosmall.jpg",
					"url":"//letr.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid=200000000000001",
					"des":"《League Of Elites》 zengin içeriği ile oyuncuları Klan yaşantısının olduğu Canavarlar ve Kaos dolu bir enerji kıtasına taşıyor."
				},{
					"id":"nslm",
					"name":"Chaos Angels",
					"type":"Aksiyon Rol Yapma",
					"leftbg":"gameicon/nslm/left.png",
					"boxbg":"gameicon/nslm/right.jpg",
					"areabg":"gameicon/nslm/xia.jpg",
					"logo":"gameicon/nslm/logo.png",
					"logobig":"gameicon/nslm/logobig.png",
					"logosmall":"gameicon/nslm/logosmall.jpg",
					"url":"//letr.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid=200000000000001",
					"des":"《League Of Elites》 zengin içeriği ile oyuncuları Klan yaşantısının olduğu Canavarlar ve Kaos dolu bir enerji kıtasına taşıyor."
				}
			]}
		],
		"tr":[
			{"Gamebox_StartUpGame":"Oyuna Başla"},
			{"Gamebox_GameSummery":"Oyun Hakkında"},
			{"Gamebox_AccountUU":"UU Hesabı"},
			{"Gamebox_AccountFacebook":"Facebook Hesabı"},
			{"Gamebox_AccountOasgames":"Oas İle Bağlan"},
			{"Gamebox_Register":"Kaydol"},
			{"Gamebox_Account":"Hesabı"},
			{"Gamebox_Password":"Şifre"},
			{"Gamebox_AccountNone":"Lütfen Kullanıcı Adı Giriniz!"},
			{"Gamebox_PasswordNone":"Lütfen Şifre Giriniz!"},
			{"Gamebox_AccPassError":"Hatalı Kullanıcı Adı ve şifre kombinasyonu."},
			{"Gamebox_Login":"Giriş yap"},
			{"Gamebox_Return":"Geri"},
			{"Gamebox_SMSPassword":"Bir kısa mesaj alacaksınız, lütfen mesajdaki şifreyi kullanarak giriş yapınız."},
			{"Gamebox_FacebookError":"Facebook hesabınızda sorun oluştu, lütfen Facebook sitesinden bu sorunu çözün!"},
			{"Gamebox_Sure":"Tamam"},
			{"Gamebox_Cancel":"İptal et"},
			{"Gamebox_MinSize":"Simge Durumuna"},
			{"Gamebox_MaxSize":"Ekranı Kapla"},
			{"Gamebox_Revert":"Aş. Geri Getir"},
			{"Gamebox_Close":"Kapat"},
			{"Gamebox_PlayedArea":"Son Girilen Server"},
			{"Gamebox_SearchArea":"Server Ara"},
			{"Gamebox_NoneArea":"Eşleşme Bulunamadı"},
			{"Gamebox_UpdateContent":"Güncelle"},
			{"Gamebox_AlreadyDownload":"İndirildi"},
			{"Gamebox_NextTime":"Daha Sonra"},
			{"Gamebox_Update":"Geliştir"},
			{"gamelist":[
				{
					"id":"sq",
					"name":"Legend Online",
					"type":"Aksiyon Rol Yapma",
					"leftbg":"gameicon/sq/left.png",
					"boxbg":"gameicon/sq/right.jpg",
					"areabg":"gameicon/sq/xia.jpg",
					"logo":"gameicon/sq/logo.png",
					"logobig":"gameicon/sq/logobig.jpg",
					"logosmall":"gameicon/sq/logosmall.jpg",
					"url":"//lotr.oasgames.com/fbapp/interface/serverlist4guanwang.php?uid=200000000000001",
					"des":"Legend Online RPG Tarzı Bir Rol Oluşturma Oyunudur. Şehrinizi Geliştirerek Oyunun Efendisi Olabilir, Heyecan Verici Savaşlarla Eşsiz Bir Oyun Keyfi Yaşayabilirsiniz"
				},{
					"id":"qszg",
					"name":" Knight Saga",
					"type":"Rol Yapma Oyunu",
					"leftbg":"gameicon/qszg/left.png",
					"boxbg":"gameicon/qszg/right.jpg",
					"areabg":"gameicon/qszg/xia.jpg",
					"logo":"gameicon/qszg/logo.png",
					"logobig":"gameicon/qszg/logobig.jpg",
					"logosmall":"gameicon/qszg/logosmall.jpg",
					"url":"//kstr.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid=200000000000001",
					"des":"Orjinal Hikayesi İle Dikkat Çeken Kinght Saga, Gizemli Bir Sihir Dünyası Tarayıcı Oyunudur. Oyuncular Gerçek ve Efsanevi Dünya Arasında Şövalyelik Onurunu Korumak İçin Amansız Bir Mücadeleye Başlarlar."
				},{
					"id":"aj",
					"name":"KungFu",
					"type":"Aksiyon Rol Yapma",
					"leftbg":"gameicon/aj/left.png",
					"boxbg":"gameicon/aj/right.jpg",
					"areabg":"gameicon/aj/xia.jpg",
					"logo":"gameicon/aj/logo.png",
					"logobig":"gameicon/aj/logobig.jpg",
					"logosmall":"gameicon/aj/logosmall.jpg",
					"url":"//kftr.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid=200000000000001",
					"des":"KungFu İlk Türkçe ARPG Uzak Doğu Dövüş Sanatları Oyunudur, Sınırsız PK'nin Ve Ek Sahne Savaşlarının Tadını Çıkartırken Kendinizi Amansız Bir Ölüm Kalım Savaşı İçinde Bulacaksınız!"
				},{
					"id":"ssjj",
					"name":"First Blood",
					"type":"FPS",
					"leftbg":"gameicon/ssjj/left.png",
					"boxbg":"gameicon/ssjj/right.jpg",
					"areabg":"gameicon/ssjj/xia.jpg",
					"logo":"gameicon/ssjj/logo.png",
					"logobig":"gameicon/ssjj/logobig.jpg",
					"logosmall":"gameicon/ssjj/logosmall.jpg",
					"url":"//fbtr.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid=200000000000001",
					"des":"First Blood Arena Modu, PVE Modu Gibi Efsaneleşmiş Oyun Modlarına ve Gerçekçi Silah Deneyimine Sahip Tam Bir Savaş Oyunu!"
				},{
					"id":"cqb",
					"name":"League Of Elites",
					"type":"Aksiyon Rol Yapma",
					"leftbg":"gameicon/cqb/left.png",
					"boxbg":"gameicon/cqb/right.jpg",
					"areabg":"gameicon/cqb/xia.jpg",
					"logo":"gameicon/cqb/logo.png",
					"logobig":"gameicon/cqb/logobig.jpg",
					"logosmall":"gameicon/cqb/logosmall.jpg",
					"url":"//letr.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid=200000000000001",
					"des":"《League Of Elites》 zengin içeriği ile oyuncuları Klan yaşantısının olduğu Canavarlar ve Kaos dolu bir enerji kıtasına taşıyor."
				},{
					"id":"nslm",
					"name":"Chaos Angels",
					"type":"Aksiyon Rol Yapma",
					"leftbg":"gameicon/nslm/left.png",
					"boxbg":"gameicon/nslm/right.jpg",
					"areabg":"gameicon/nslm/xia.jpg",
					"logo":"gameicon/nslm/logo.png",
					"logobig":"gameicon/nslm/logobig.png",
					"logosmall":"gameicon/nslm/logosmall.jpg",
					"url":"//letr.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid=200000000000001",
					"des":"《League Of Elites》 zengin içeriği ile oyuncuları Klan yaşantısının olduğu Canavarlar ve Kaos dolu bir enerji kıtasına taşıyor."
				}
			]}
		],
		"cn":[
			{"Gamebox_StartUpGame":"启动游戏"},
			{"Gamebox_GameSummery":"游戏简介"},
			{"Gamebox_AccountUU":"UU帐号"},
			{"Gamebox_AccountFacebook":"Facebook帐号"},
			{"Gamebox_AccountOasgames":"OAS帐号"},
			{"Gamebox_Register":"注册"},
			{"Gamebox_Account":"帐号"},
			{"Gamebox_Password":"密码"},
			{"Gamebox_AccountNone":"帐号不能为空"},
			{"Gamebox_PasswordNone":"密码不能为空"},
			{"Gamebox_AccPassError":"帐号或密码错误"},
			{"Gamebox_Login":"登录"},
			{"Gamebox_Return":"返回"},
			{"Gamebox_SMSPassword":"您将会收到一条短信，请使用短信中的代码代替密码登录。"},
			{"Gamebox_FacebookError":"您的Facebook帐号异常，请到Facebook网页处理此问题。"},
			{"Gamebox_Sure":"确定"},
			{"Gamebox_Cancel":"取消"},
			{"Gamebox_MinSize":"最小化"},
			{"Gamebox_MaxSize":"最大化"},
			{"Gamebox_Revert":"还原"},
			{"Gamebox_Close":"关闭"},
			{"Gamebox_PlayedArea":"上次登录区服"},
			{"Gamebox_SearchArea":"搜索区服"},
			{"Gamebox_NoneArea":"没有查找到任何信息"},
			{"Gamebox_UpdateContent":"更新内容"},
			{"Gamebox_AlreadyDownload":"已下载"},
			{"Gamebox_NextTime":"下次再说"},
			{"Gamebox_Update":"升级"},
			{"gamelist":[
				{
					"id":"sq",
					"name":"神曲",
					"type":"Aksiyon Rol Yapma",
					"leftbg":"gameicon/sq/left.png",
					"boxbg":"gameicon/sq/right.jpg",
					"areabg":"gameicon/sq/xia.jpg",
					"logo":"gameicon/sq/logo.png",
					"logobig":"gameicon/sq/logobig.jpg",
					"logosmall":"gameicon/sq/logosmall.jpg",
					"url":"//lotr.oasgames.com/fbapp/interface/serverlist4guanwang.php?uid=200000000000001",
					"des":"Legend Online RPG Tarzı Bir Rol Oluşturma Oyunudur. Şehrinizi Geliştirerek Oyunun Efendisi Olabilir, Heyecan Verici Savaşlarla Eşsiz Bir Oyun Keyfi Yaşayabilirsiniz"
				},{
					"id":"qszg",
					"name":"骑士战歌",
					"type":"Rol Yapma Oyunu",
					"leftbg":"gameicon/qszg/left.png",
					"boxbg":"gameicon/qszg/right.jpg",
					"areabg":"gameicon/qszg/xia.jpg",
					"logo":"gameicon/qszg/logo.png",
					"logobig":"gameicon/qszg/logobig.jpg",
					"logosmall":"gameicon/qszg/logosmall.jpg",
					"url":"//kstr.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid=200000000000001",
					"des":"Orjinal Hikayesi İle Dikkat Çeken Kinght Saga, Gizemli Bir Sihir Dünyası Tarayıcı Oyunudur. Oyuncular Gerçek ve Efsanevi Dünya Arasında Şövalyelik Onurunu Korumak İçin Amansız Bir Mücadeleye Başlarlar."
				},{
					"id":"aj",
					"name":"傲剑",
					"type":"Aksiyon Rol Yapma",
					"leftbg":"gameicon/aj/left.png",
					"boxbg":"gameicon/aj/right.jpg",
					"areabg":"gameicon/aj/xia.jpg",
					"logo":"gameicon/aj/logo.png",
					"logobig":"gameicon/aj/logobig.jpg",
					"logosmall":"gameicon/aj/logosmall.jpg",
					"url":"//kftr.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid=200000000000001",
					"des":"KungFu İlk Türkçe ARPG Uzak Doğu Dövüş Sanatları Oyunudur, Sınırsız PK'nin Ve Ek Sahne Savaşlarının Tadını Çıkartırken Kendinizi Amansız Bir Ölüm Kalım Savaşı İçinde Bulacaksınız!"
				},{
					"id":"ssjj",
					"name":"生死狙击",
					"type":"FPS",
					"leftbg":"gameicon/ssjj/left.png",
					"boxbg":"gameicon/ssjj/right.jpg",
					"areabg":"gameicon/ssjj/xia.jpg",
					"logo":"gameicon/ssjj/logo.png",
					"logobig":"gameicon/ssjj/logobig.jpg",
					"logosmall":"gameicon/ssjj/logosmall.jpg",
					"url":"//fbtr.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid=200000000000001",
					"des":"First Blood Arena Modu, PVE Modu Gibi Efsaneleşmiş Oyun Modlarına ve Gerçekçi Silah Deneyimine Sahip Tam Bir Savaş Oyunu!"
				},{
					"id":"cqb",
					"name":"苍穹变",
					"type":"Aksiyon Rol Yapma",
					"leftbg":"gameicon/cqb/left.png",
					"boxbg":"gameicon/cqb/right.jpg",
					"areabg":"gameicon/cqb/xia.jpg",
					"logo":"gameicon/cqb/logo.png",
					"logobig":"gameicon/cqb/logobig.jpg",
					"logosmall":"gameicon/cqb/logosmall.jpg",
					"url":"//letr.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid=200000000000001",
					"des":"《League Of Elites》 zengin içeriği ile oyuncuları Klan yaşantısının olduğu Canavarlar ve Kaos dolu bir enerji kıtasına taşıyor."
				},{
					"id":"nslm",
					"name":"女神联盟",
					"type":"Aksiyon Rol Yapma",
					"leftbg":"gameicon/nslm/left.png",
					"boxbg":"gameicon/nslm/right.jpg",
					"areabg":"gameicon/nslm/xia.jpg",
					"logo":"gameicon/nslm/logo.png",
					"logobig":"gameicon/nslm/logobig.png",
					"logosmall":"gameicon/nslm/logosmall.jpg",
					"url":"//letr.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid=200000000000001",
					"des":"《League Of Elites》 zengin içeriği ile oyuncuları Klan yaşantısının olduğu Canavarlar ve Kaos dolu bir enerji kıtasına taşıyor."
				}
			]}
		]
};

$(function(){
	gameList = setMultiLanguage("gamelist");	
	toLanguage();
})

function toLanguage(){
	$("a[mulity-key='mulityKey'],h3[mulity-key='mulityKey'],em[mulity-key='mulityKey'],h2[mulity-key='mulityKey'],span[mulity-key='mulityKey'],p[mulity-key='mulityKey']").each(function(index, element) {
        $(this).html(setMultiLanguage($(this).attr("mulity-value")));
    });
	$("input[mulity-key='mulityKey']").each(function(index, element) {
        $(this).val(setMultiLanguage($(this).attr("mulity-value")));
    });
}

function setMultiLanguage(key){
	var curr = multiLa[mulity];
	for(var i=0;i<curr.length;i++){
		for(var name in curr[i]){
			if(name === key)
			return curr[i][key];
		}
	}
}

function returnArea(id){
	for(var i=0;i<gameList.length;i++){
		for(var name in gameList[i]){
			if(name === "id"&&gameList[i]["id"]==id){				
				return gameList[i];
			}
		}
	}
}

function doNothing() {
    window.event.returnValue = false;
    return false;
}

function getParam(name, url) {
    if (url.indexOf('?') != -1) {
        var arr1 = url.split('?');
        var arr2 = arr1[1].split('&');
        for (var i = 0; i < arr2.length; i++) {
            var arr3 = arr2[i].split('=');
            if (arr3[0].replace(/\s/g, "") == name) {
                return decodeURI(arr3[1].replace(/\s/g, ""));
                break;
            }
        }
        return "";
    } else {
        return "";
    }
}
