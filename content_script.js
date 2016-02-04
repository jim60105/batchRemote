//先計算job總數
var batchAmount;
batchAmount = $("form:last").get(0).name.match(/\d+/)[0];

//添加按鈕
var newBar = $('<div style="text-align: center"><div style="margin: 10px auto 0px;width: 970px" id="bar"></div></div>')
var butCheckError = $('<input type="button" value="檢查失敗項" id="butCheckError"/>').click(updateListLocation);
var butClearErrorList = $('<input type="button" value="清除失敗List" id="butClearErrorList"/>').click(clearErrorList);
var butHideSuccess = $('<input type="button" value="隱藏成功項" id="butHideSuccess"/>').click(hideSuccess);
chrome.runtime.sendMessage({action: "checkHideSuccess"}, function(response) {
    if (response.status) {
        hideSuccess();
    }
});

$("body").prepend(newBar);
$("#bar").append(butHideSuccess);
$("#bar").append($('<span style="margin: 0 30px">&nbsp;</span>'));
$("#bar").append(butCheckError);
$("#bar").append($('<span style="margin: 0 30px">&nbsp;</span>'));
$("#bar").append(butClearErrorList);



//移除"重新整理"
$("center").get(0).remove();

//每分鐘重新整理+checkError
var reloadPause = false;
var checkFinish = true;
setInterval(function(){
    if(!reloadPause)
        window.location.reload();
}, 30000);


//隱藏/還原已成功項
function hideSuccess(){
    if ($("#butHideSuccess").get(0).value=="還原成功項"){
        chrome.runtime.sendMessage({action: "cancelHideSuccess"}, function(response) {
            if (response.response == true) {
                for (var i = 0; i <= batchAmount; i++) {
                    if ($("#td" + i + "5").get(0).innerHTML.indexOf("成功") > 0) {
                        $("tr").get(i + 1).style.display = "";
                    }
                }
                $("#butHideSuccess").get(0).value = "隱藏成功項";
            }
        });

    }else {
        chrome.runtime.sendMessage({action: "setHideSuccess"}, function(response) {
            if (response.response == true) {
                for (var i = 0; i <= batchAmount; i++) {
                    if ($("#td" + i + "5").get(0).innerHTML.indexOf("成功") > 0) {
                        $("tr").get(i + 1).style.display = "none";
                    }
                }
                $("#butHideSuccess").get(0).value = "還原成功項";
            }
        });

    }
}

//check失敗狀況
updateListLocation();
function updateListLocation(){
    reloadPause = true;
    checkFinish = false;
    var number = 0;
    var location =  window.location.pathname;
    if(location.indexOf("cpoe")>0){
        location = 0;
    }else if(location.indexOf("eroe")>0){
        location = 1;
    }else{
        location = 2;
    }
    errorCheck(location,number)
}
function errorCheck(location,number){

    if ($("#td" + number + "5").get(0).innerHTML.indexOf("執行中") > 0) {
        var jobName = $("#td" + number + "1").get(0).innerHTML;
        chrome.runtime.sendMessage({chkErrName: jobName, location: location}, function(response) {
            if(!response.ignore){
                confirm(jobName+" 執行失敗!!!!!");
                chrome.runtime.sendMessage({addErrName: jobName, location: location}, function(response) {
                    if(number<batchAmount) {
                        number++;
                        errorCheck(location,number);
                    }else{
                        number=0;
                        reloadPause = false;
                    }
                });
            }else{
                console.log(jobName+" 已check");
                if(number<batchAmount) {
                    number++;
                    errorCheck(location,number);
                }else{
                    number=0;
                    reloadPause = false;
                }
            }
        });
    }else{
        if(number<batchAmount) {
            number++;
            errorCheck(location,number);
        }else{
            number=0;
            reloadPause = false;
        }
    }
}

function clearErrorList(){
    chrome.runtime.sendMessage({action: "clearList"}, function(response) {
        if (response.response == true) {
            console.log("Clear");
        }
    });
}