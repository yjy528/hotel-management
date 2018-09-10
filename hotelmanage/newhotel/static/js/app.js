(function(win) {
        var doc = win.document;
        var docEl = doc.documentElement;
        var tid;

        function refreshRem() {
                var width = docEl.getBoundingClientRect().width;
                var rem;
                if (width >= 1200) { // 最大宽度
                        width = 1200;
                        rem = width / 24;
                }else{
                        rem = width / 7.5;
                }
                docEl.style.fontSize = rem + 'px';
                ///rem用font-size:75px来进行换算
        }

        win.addEventListener('resize', function() {
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 1);
        }, false);
        win.addEventListener('pageshow', function(e) {
                if (e.persisted) {
                        clearTimeout(tid);
                        tid = setTimeout(refreshRem, 1);
                }
        }, false);

        refreshRem();

})(window);
