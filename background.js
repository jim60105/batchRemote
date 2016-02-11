//確認網址
chrome.tabs.onUpdated.addListener(checkForValidUrl);
function checkForValidUrl(tabId, changeInfo, tab) {
    if(getDomainFromUrl(tab.url).toLowerCase()=="webbatch.vghtc.gov.tw" || getDomainFromUrl(tab.url).toLowerCase()=="cc3fweb"){
        console.log(tab.url);
        chrome.pageAction.show(tabId);
    }
};

function getDomainFromUrl(url){
    var host = "null";
    if(typeof url == "undefined" || null == url)
        url = window.location.href;
    var regex = /.*\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if(typeof match != "undefined" && null != match)
        host = match[1];
    return host;
}

//msgListener
var errorList=[[],[],[]];   //cpoe,eroe,else
var hide = false;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //儲存errorList
        if (request.addErrName != undefined) {
            errorList[request.location][errorList[request.location].length] = request.addErrName;
            sendResponse({});
        }
        if (request.chkErrName != undefined) {
            var state = false;
            for (var i in errorList[request.location]) {
                if (errorList[request.location][i] == request.chkErrName) {
                    state = true;
                }
            }
            sendResponse({ignore: state});
        }

        //清除ErrorList
        if (request.action == "clearList") {
            errorList=[[],[],[]];
            sendResponse({response: true});
            alert("已清除失敗List");
        }

        //設定/隱藏 成功項之狀態
        if (request.action == "setHideSuccess") {
            hide = true;
            sendResponse({response: true});
        }
        if (request.action == "cancelHideSuccess") {
            hide = false;
            sendResponse({response: true});
        }
        if (request.action == "checkHideSuccess") {
            sendResponse({status: hide});
        }

        //popup顯示ErrorList
        if (request.action == "getErrorList") {
            sendResponse({response: errorList});
        }
    }
);