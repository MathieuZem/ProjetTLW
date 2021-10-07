jQuery(function(){
    $(function(){
        $(window).scroll(function() {
            if ($(this).scrollTop()>200) {
                $("#RemonterEnHaut").css("right","10px");
            } else {
                $("#RemonterEnHaut").removeAttr("style");
            }
        });
    });
});