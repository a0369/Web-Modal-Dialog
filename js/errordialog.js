$(document).ready(function () {
    $("body").prepend("<div id='errorMsg' style='display:none; width:0; height:0;'><span></span><div class='modalSBottom'><input type='button' value='Ok' /></div></div>");
});

function errorMsg(msg,title) {
    var errorDlg=new Dialog("errorMsg",title,300,130);

    $("#errorMsg span").html(msg);
    $("#errorMsg input").click(function () {
        errorDlg.hideDialog();
        errorDlg.destroy();
    });

    $("#errorMsg .dialogCloseBtn img").click(function () {
        errorDlg.destroy();
    });
    
    errorDlg.showDialog();
}
