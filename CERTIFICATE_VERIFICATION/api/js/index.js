$(document).ready(function () {

    $("#popup").hide();

    $("#btnSignIn").click(function (e) {

        openPopup();

    });

    $("#close").click(function (e) {

        closePopup();

        e.preventDefault();

    });

});

function openPopup() {
    var $popup1 = $("#popup");
    $popup1.fadeIn();

}

function closePopup() {

    $("#background").fadeOut();

    $(".popup").hide();

}

function doClear() {
    $("#degreename").val("");
    $("#studentname").val("");
    $("#number").val("");
    $("#numberbook").val("");
}

function doLogin() {
    var mUserName = $("#username").val();
    var mPass = $("#password").val();

    if (mUserName == "admin" && mPass == "admin") {
        window.location = "admin.html";
    } else {
        alert("SAI TÊN ĐĂNG NHẬP HOẶC MẬT KHẨU");
    }
}