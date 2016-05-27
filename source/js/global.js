;(function(){
    var $body = $('body'),
        $window = $(window),

        scrollHeight = 150;

    function initListener(){
        $window.scroll(function(){
            showHeaderTitle();
        });
    }

    // 显示header page title
    function showHeaderTitle(){
        var $headerTitle = $('.header-page-title');
        if($window.scrollTop() > scrollHeight){
            $headerTitle.removeClass('hidden');
        } else {
            $headerTitle.addClass('hidden');
        }
    }

    // 显示 back top
    function showBackTop(){

    }

    initListener();
})()
