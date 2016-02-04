//先計算job總數
var batchAmount;
batchAmount = $("form:last").get(0).name.match(/\d+/)[0];

//添加按鈕
var newBar = $('<div style="width: 100%" id="bar"></div>')
var butHideSuccess = $('<input type="button" value="隱藏成功項" id="butHideSuccess"/>').click(hideSuccess);
var butCheckError = $('<input type="button" value="檢查失敗項" id="butCheckError"/>').click(errorCheck);
$("body").prepend(newBar);
$("#bar").prepend(butCheckError);
$("#bar").prepend(butHideSuccess);

//每分鐘重新整理+checkError
//setTimeout(function(){ errorCheck(window.location.reload()); }, 60000);


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
var number = 0;

//check失敗狀況
function errorCheck(callback){
    if ($("#td" + number + "5").get(0).innerHTML.indexOf("失敗") > 0) {
        var jobName = $("#td" + number + "1").get(0).innerHTML;
        chrome.runtime.sendMessage({chkErrName: jobName}, function(response) {
            if(!response.ignore){
                alert(jobName+" 執行失敗!!!!!");
                chrome.runtime.sendMessage({addErrName: jobName}, function(response) {
                });
            }else{
                console.log(jobName+" 已check");
            }
            number++;
            if(number<batchAmount)
                errorCheck(callback);
        });
    }else{
        number++;
        if(number<batchAmount) {
            errorCheck(callback);
        }else{
            number=0;
        }
    }
}