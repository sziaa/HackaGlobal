// JavaScript Document
$(document).ready(function(e) {
    $(window).scroll(function(e) {
        var top = $(this).scrollTop();
		parallax = top/4;
		position = "0px " + parallax + "px";
		$("#main").css("background-position",position);
    });
});


$(document).ready(function(e) {
    $(window).scroll(function(e) {
        var top = $(this).scrollTop();
		parallax = (top)/4;
		position = "center " + -parallax + "px";
		$("#events-main").css("background-position",position);
    });
});