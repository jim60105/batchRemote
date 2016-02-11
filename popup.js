chrome.runtime.sendMessage({action: "getErrorList"}, function(response) {
    console.log(response);
    try {
        var errorList = response.response;
        for (var i in errorList[0]) {
            $("#cpoe").append($("<tr><td style='border:1px solid black;color: red'>" + errorList[0][i] + "</td></tr>"));
        }
        for (var i in errorList[1]) {
            $("#eroe").append($("<tr><td style='border:1px solid black;color: red'>" + errorList[1][i] + "</td></tr>"));
        }
        for (var i in errorList[2]) {
            $("#else").append($("<tr><td style='border:1px solid black;color: red'>" + errorList[2][i] + "</td></tr>"));
        }
    }catch(e){
        console.log(e);
    }
});