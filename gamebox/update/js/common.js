// JavaScript Document
var url = window.location.href;
var gameid = getParam('gameid',url).toLocaleLowerCase();
var mulity = getParam('lg',url).toLocaleLowerCase();
var defaultid = getParam('game',url).toLocaleLowerCase();

var multiLa = {
		//中文
		"cn":{
			"Gamebox_Sure":"确定",
			"Gamebox_Cancel":"取消",
			"Gamebox_UpdateContent":"更新内容",
			"Gamebox_AlreadyDownload":"已下载",
			"Gamebox_NextTime":"下次再说",
			"Gamebox_Update":"升级",
			"Gamebox_Skip":"跳过该版本",
			"Gamebox_Latest":"已是最新版本，无需更新！",
			"Gamebox_ChangeLog":""
		},
		//土语
		"tr":{
			"Gamebox_Sure":"Onayla",
			"Gamebox_Cancel":"İptal",
			"Gamebox_UpdateContent":"Güncelleme içeriği",
			"Gamebox_AlreadyDownload":"İndirildi",
			"Gamebox_NextTime":"Daha sonra",
			"Gamebox_Update":"Günceleniyor",
			"Gamebox_Skip":"Bu sürümü atla",
			"Gamebox_Latest":"Mevcut sürüm en yüksek, güncellenemez!",	
			"Gamebox_ChangeLog":"<p class='content_t'>1.1.3.1046</p><p>1. Oyuncuların hızlı giriş görevlerini tamamlayamadıkları sorunlar düzeltildi.</p><p>2. Kurulumda geliştirmeler yapıldı.</p><p>3. En yeni sürüm kontrol özelliği eklendş.</p><p>4. 'Bu sürümü atla' özelliği eklendi.</p>"	
		},
		//葡萄牙语
		"pt":{
			"Gamebox_Sure":"Confirmar",
			"Gamebox_Cancel":"Cancelar",
			"Gamebox_UpdateContent":"Conteúdo de Atualização",
			"Gamebox_AlreadyDownload":"Baixado",
			"Gamebox_NextTime":"Avisar Depois",
			"Gamebox_Update":"Elevar",
			"Gamebox_Skip":"Pular esta versão",
			"Gamebox_Latest":"Já é a versão mais recente, não é necessário atualizar.",
			"Gamebox_ChangeLog":""
		},
		"br":{
			"Gamebox_Sure":"Confirmar",
			"Gamebox_Cancel":"Cancelar",
			"Gamebox_UpdateContent":"Conteúdo de Atualização",
			"Gamebox_AlreadyDownload":"Baixado",
			"Gamebox_NextTime":"Avisar Depois",
			"Gamebox_Update":"Elevar",
			"Gamebox_Skip":"Pular esta versão",
			"Gamebox_Latest":"Já é a versão mais recente, não é necessário atualizar.",
			"Gamebox_ChangeLog":""
		},
		//波语
		"pl":{
			"Gamebox_Sure":"Potwierdź",
			"Gamebox_Cancel":"Anuluj",
			"Gamebox_UpdateContent":"Treść aktualizacji",
			"Gamebox_AlreadyDownload":"Już pobrano",
			"Gamebox_NextTime":"Przypomnij później",
			"Gamebox_Update":"Ulepsz",
			"Gamebox_Skip":"Pomiń tą wersję",
			"Gamebox_Latest":"Ta wersja jest najnowsza. Nie ma potrzeby jej aktualizowania.",
			"Gamebox_ChangeLog":"<p class='content_t'>1.1.3.1046</p><p>1. Rozwiązanie problemu z ukończeniem zadania pobrania rejestratora.</p><p>2. Dodano opcję gry na wielu kartach oraz inteligentny wybór serwera.</p><p>3. Optymalizacja procesu instalacji.</p><p>4. Opcja wycisznia.</p>"
		},
		////西语
		"es":{
			"Gamebox_Sure":"Confirmar",
			"Gamebox_Cancel":"Cancelar",
			"Gamebox_UpdateContent":"Contenido de Actualización",
			"Gamebox_AlreadyDownload":"Descargado",
			"Gamebox_NextTime":"Después",
			"Gamebox_Update":"Actualizar",
			"Gamebox_Skip":"Saltar Versión",
			"Gamebox_Latest":"Es la versión más reciente, no requiere actualizar.",
			"Gamebox_ChangeLog":""
			
		},
		//德语
		"de":{
			"Gamebox_Sure":"Okay",
			"Gamebox_Cancel":"Abbrechen",
			"Gamebox_UpdateContent":"Aktualisierte Inhalte",
			"Gamebox_AlreadyDownload":"Heruntergeladen",
			"Gamebox_NextTime":"Jetzt nicht",
			"Gamebox_Update":"Hochstufen",
			"Gamebox_Skip":"Überspringen",
			"Gamebox_Latest":"Neuste Version bereits installiert, keine Aktualisierung nötig",
			"Gamebox_ChangeLog":""
		},
		//希腊语
		"el":{
			"Gamebox_Sure":"Επιβ",
			"Gamebox_Cancel":"Ακύρωση",
			"Gamebox_UpdateContent":"Ενημέρωση περιεχομένου",
			"Gamebox_AlreadyDownload":"Έχει γίνει ήδη λήψη",
			"Gamebox_NextTime":"Ακύρωση",
			"Gamebox_Update":"Αναβάθμιση",
			"Gamebox_Skip":"Παράλειψη έκδοσης",
			"Gamebox_Latest":"Έχετε την τελευταία έκδοση, δεν χρειάζεται ενημέρωση!",
			"Gamebox_ChangeLog":""
		},
		//瑞典
		"sv":{
			"Gamebox_Sure":"OK",
			"Gamebox_Cancel":"Avbryt",
			"Gamebox_UpdateContent":"Uppdateringsinnehåll",
			"Gamebox_AlreadyDownload":"Nedladdad",
			"Gamebox_NextTime":"Avbryt",
			"Gamebox_Update":"Uppgradera",
			"Gamebox_Skip":"Skippa den här versionen",
			"Gamebox_Latest":"Du har den senaste versionen, inga uppdateringar behöver göras",
			"Gamebox_ChangeLog":""
		},
		//荷兰
		"nl":{
			"Gamebox_Sure":"Bevestig",
			"Gamebox_Cancel":"Annuleer",
			"Gamebox_UpdateContent":"Update inhoud",
			"Gamebox_AlreadyDownload":"Reeds gedownload",
			"Gamebox_NextTime":"Annuleer",
			"Gamebox_Update":"Upgrade",
			"Gamebox_Skip":"Sla deze versie over",
			"Gamebox_Latest":"Nieuwste versie geinstalleerd, hoeft niet te updaten",
			"Gamebox_ChangeLog":""
		},
		//阿拉伯
		"ar":{
			"Gamebox_Sure":"تأكيد",
			"Gamebox_Cancel":"إلغاء",
			"Gamebox_UpdateContent":"مكونات التحديث",
			"Gamebox_AlreadyDownload":"تم التحميل",
			"Gamebox_NextTime":"ذكرني في المرة القادمة",
			"Gamebox_Update":"ترقية",
			"Gamebox_Skip":"تخطي هذه النسخة",
			"Gamebox_Latest":"لديك اخر نسخة تحديث بالفعل ، لا تحتاج للتحديث.",
			"Gamebox_ChangeLog":""
		},

        "en":{
            "Gamebox_Sure":"OK",
            "Gamebox_Cancel":"Cancel",
            "Gamebox_UpdateContent":"Update content",
            "Gamebox_AlreadyDownload":"Downloaded",
            "Gamebox_NextTime":"We will see",
            "Gamebox_Update":"Upgrade",
            "Gamebox_Skip":"Skip this version",
            "Gamebox_Latest":"No new updates available!",
            "Gamebox_ChangeLog":""
        },
	    //法语
	    "fr":{
		    "Gamebox_Sure":"OK",
		    "Gamebox_Cancel":"Annuler",
		    "Gamebox_UpdateContent":"Mettre à jour le contenu",
		    "Gamebox_AlreadyDownload":"Téléchargement terminé",
		    "Gamebox_NextTime":"Me rappeler",
		    "Gamebox_Update":"Mise à jour",
		    "Gamebox_Skip":"Sauter cette version",
		    "Gamebox_Latest":"Version à jour, inutile de mettre à jour",
		    "Gamebox_ChangeLog":""
	    }
};

$(function(){
	toLanguage();
	var url = window.location.href,
		lang = getParam('lg',url);

	if(lang == 'ar'){
		$('#wrap').addClass('wrap_ar');
	}

	$('.close_dialog').click(function(){
		window.external.WINIE_DialogClose();
	});	
});
function toLanguage(){
	$("div[mulity-key='mulityKey'],a[mulity-key='mulityKey'],h3[mulity-key='mulityKey'],em[mulity-key='mulityKey'],h2[mulity-key='mulityKey'],span[mulity-key='mulityKey'],p[mulity-key='mulityKey']").each(function(index, element) {
        $(this).html(setMultiLanguage($(this).attr("mulity-value")));
    });
	$("input[mulity-key='mulityKey']").each(function(index, element) {
        $(this).val(setMultiLanguage($(this).attr("mulity-value")));
    });
};
function setMultiLanguage(key){
	return multiLa[mulity][key];
};
function doNothing() {
    window.event.returnValue = false;
    return false;
};
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
/**
 * [description] base64解码
 * @return {[type]} [description] (Base64.encode(str),Base64.decode(str))
 */
if(typeof Base64 == 'undefined'){
;(function(global){"use strict";if(global.Base64)return;var version="2.1.2";var buffer;if(typeof module!=="undefined"&&module.exports){buffer=require("buffer").Buffer}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var b64tab=function(bin){var t={};for(var i=0,l=bin.length;i<l;i++)t[bin.charAt(i)]=i;return t}(b64chars);var fromCharCode=String.fromCharCode;var cb_utob=function(c){if(c.length<2){var cc=c.charCodeAt(0);return cc<128?c:cc<2048?fromCharCode(192|cc>>>6)+fromCharCode(128|cc&63):fromCharCode(224|cc>>>12&15)+fromCharCode(128|cc>>>6&63)+fromCharCode(128|cc&63)}else{var cc=65536+(c.charCodeAt(0)-55296)*1024+(c.charCodeAt(1)-56320);return fromCharCode(240|cc>>>18&7)+fromCharCode(128|cc>>>12&63)+fromCharCode(128|cc>>>6&63)+fromCharCode(128|cc&63)}};var re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;var utob=function(u){return u.replace(re_utob,cb_utob)};var cb_encode=function(ccc){var padlen=[0,2,1][ccc.length%3],ord=ccc.charCodeAt(0)<<16|(ccc.length>1?ccc.charCodeAt(1):0)<<8|(ccc.length>2?ccc.charCodeAt(2):0),chars=[b64chars.charAt(ord>>>18),b64chars.charAt(ord>>>12&63),padlen>=2?"=":b64chars.charAt(ord>>>6&63),padlen>=1?"=":b64chars.charAt(ord&63)];return chars.join("")};var btoa=global.btoa||function(b){return b.replace(/[\s\S]{1,3}/g,cb_encode)};var _encode=buffer?function(u){return new buffer(u).toString("base64")}:function(u){return btoa(utob(u))};var encode=function(u,urisafe){return!urisafe?_encode(u):_encode(u).replace(/[+\/]/g,function(m0){return m0=="+"?"-":"_"}).replace(/=/g,"")};var encodeURI=function(u){return encode(u,true)};var re_btou=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g");var cb_btou=function(cccc){switch(cccc.length){case 4:var cp=(7&cccc.charCodeAt(0))<<18|(63&cccc.charCodeAt(1))<<12|(63&cccc.charCodeAt(2))<<6|63&cccc.charCodeAt(3),offset=cp-65536;return fromCharCode((offset>>>10)+55296)+fromCharCode((offset&1023)+56320);case 3:return fromCharCode((15&cccc.charCodeAt(0))<<12|(63&cccc.charCodeAt(1))<<6|63&cccc.charCodeAt(2));default:return fromCharCode((31&cccc.charCodeAt(0))<<6|63&cccc.charCodeAt(1))}};var btou=function(b){return b.replace(re_btou,cb_btou)};var cb_decode=function(cccc){var len=cccc.length,padlen=len%4,n=(len>0?b64tab[cccc.charAt(0)]<<18:0)|(len>1?b64tab[cccc.charAt(1)]<<12:0)|(len>2?b64tab[cccc.charAt(2)]<<6:0)|(len>3?b64tab[cccc.charAt(3)]:0),chars=[fromCharCode(n>>>16),fromCharCode(n>>>8&255),fromCharCode(n&255)];chars.length-=[0,0,2,1][padlen];return chars.join("")};var atob=global.atob||function(a){return a.replace(/[\s\S]{1,4}/g,cb_decode)};var _decode=buffer?function(a){return new buffer(a,"base64").toString()}:function(a){return btou(atob(a))};var decode=function(a){return _decode(a.replace(/[-_]/g,function(m0){return m0=="-"?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode};if(typeof Object.defineProperty==="function"){var noEnum=function(v){return{value:v,enumerable:false,writable:true,configurable:true}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum(function(){return decode(this)}));Object.defineProperty(String.prototype,"toBase64",noEnum(function(urisafe){return encode(this,urisafe)}));Object.defineProperty(String.prototype,"toBase64URI",noEnum(function(){return encode(this,true)}))}}})(this);
}

