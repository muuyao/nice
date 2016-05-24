;
(function($) {
    $.fn.share = function(options) {
        var $head = $(document.head);

        var defaults = {
            url: location.href,
            title: $head.find('[name=title], [name=Title]').attr('content') || document.title,
            image: '',
            appkey: ''
        };


        var globals = $.extend({}, defaults, options);

        var platActions = {
            weibo: 'http://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{APPKEY}}',
            wechat: 'javascript:;'
        };

        this.each(function() {
            var that = this;
            var $shareMenus = $(that).find('.share-item');

            $.each($shareMenus, function(i, menu){
                if($(menu).data('plat') === 'wechat'){
                    wechatEvent(menu);
                } else {
                    var url = makeUrl(menu);
                    $(menu).prop('href', url);
                }
            });
        });

        /**
         * 获取url
         * @param  {[type]} $menu [description]
         * @return {[type]}       [description]
         */
        function makeUrl(menu){
            var plat = $(menu).data('plat');
            var platAction = platActions[plat];
            var data;

            if(options[plat]){
                data = $.extend({}, defaults, options.defaults, options[plat]);
            } else {
                data = $.extend({}, defaults, options);
            }


            for(var key in data){
                if(data.hasOwnProperty(key)){
                    var value = encodeURIComponent(data[key]);
                    platAction = platAction.replace(new RegExp('{{'+key.toUpperCase()+'}}', 'g'), value);
                }
            }

            return platAction;
        }

        /**
         * 创建wechat时间
         * @param  {[type]} $menu [description]
         * @return {[type]}       [description]
         */
        function wechatEvent(menu){
            $(menu).on('click', function(){
                var $wechat = $('.wechat-qrcode-modal');
                $wechat.find('.wechat-qrcode-img').qrcode({
                    text: location.href
                });
                $wechat.find('.close').on('click', function(){
                    $wechat.hide();
                });
                $wechat.show();
            })
        }
    };
})(jQuery)
