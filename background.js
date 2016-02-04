//確認網址
chrome.tabs.onUpdated.addListener(checkForValidUrl);
function checkForValidUrl(tabId, changeInfo, tab) {
    if(getDomainFromUrl(tab.url).toLowerCase()=="batchremote.jim60105.com"){
        console.log(tab.url);
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

//儲存errorList
var errorList=[];
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.addErrName != undefined)
            errorList[errorList.length] = request.addErrName;
        if (request.chkErrName != undefined) {
            var state = false;
            for (var i in errorList) {
                if (errorList[i] == request.chkErrName) {
                    state = true;
                }
            }
            sendResponse({ignore: state});
        }
    }
);