//先計算job總數
var batchAmount;
batchAmount = $("form:last").get(0).name.match(/\d+/)[0];

//添加按鈕
var newItem = $('<div><input type="button" value="隱藏成功項" id="butHideSuccess"/></div>').click(hideSuccess);
$("body").prepend(newItem);

//隱藏/還原已成功項
function hideSuccess(){
    if ($("#butHideSuccess").get(0).value=="還原成功項"){
        for (var i = 0; i <= batchAmount; i++) {
            if ($("#td" + i + "5").get(0).innerHTML.indexOf("成功") > 0) {
                $("tr").get(i + 1).style.display = "";
            }
        }
        $("#butHideSuccess").get(0).value = "隱藏成功項";
    }else {
        for (var i = 0; i <= batchAmount; i++) {
            if ($("#td" + i + "5").get(0).innerHTML.indexOf("成功") > 0) {
                $("tr").get(i + 1).style.display = "none";
            }
        }
        $("#butHideSuccess").get(0).value = "還原成功項";
    }
}
