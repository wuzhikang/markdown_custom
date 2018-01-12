var on_off={
    Highlight:true,//代码高亮开关
    linenum:true,//行号开关
    nav:true//目录开关
};

on_off.Highlight&&hljs.initHighlightingOnLoad();//代码高亮

on_off.linenum &&//添加行号
    $(function () {
        $('pre code').each(function () {
            var lines = $(this).text().split('\n').length - 1;
            var $numbering = $('<ul/>').addClass('pre-numbering');
            $(this)
                .addClass('has-numbering')
                .parent()
                .prepend($numbering);
            for (i = 1; i <= lines; i++) {
                $numbering.append($('<li/>').text(i));
            }
        });
    });

// 类似Java的hash生成方式，为一段文字生成一段基本不会重复的数字
function _hashCode(txt) {
     var hash = 0;
     if (txt.length == 0) return hash;
     for (i = 0; i < txt.length; i++) {
          char = txt.charCodeAt(i);
          hash = ((hash<<5)-hash)+char;
          hash = hash & hash; // Convert to 32bit integer
     }
     return hash;
}
on_off.nav && (function () {// 生成目录列表
    var bool;
    document.addEventListener("DOMContentLoaded", function () {
        var outline = document.createElement("ul");
        outline.setAttribute("id", "outline-list");
        outline.style.cssText = "border: 1px solid #ccc;";
        document.body.insertBefore(outline, document.body.childNodes[0]);
        // 获取所有标题
        var headers = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
        for (var i = 0; i < headers.length; i++) {
            var header = headers[i];
            var hash = _hashCode(header.textContent);
            // MarkdownPad2无法为中文header正确生成id，这里生成一个
            header.setAttribute("id", header.tagName + hash);
            // 找出它是H几，为后面前置空格准备
            var prefix = parseInt(header.tagName.replace('H', ''), 10);
            outline.appendChild(document.createElement("li"));
            var a = document.createElement("a");
            // 为目录项设置链接
            a.setAttribute("href", "#" + header.tagName + hash)
            // 目录项文本前面放置对应的空格
            a.innerHTML = new Array(prefix * 4).join('&nbsp;') + header.textContent;
            bool=outline.lastChild.appendChild(a);
        }
        outline.style.cssText = " width: 220px;left: 0;top: 0;bottom: 0;border-right: solid 2px #82de08;position: fixed;overflow: auto;margin: 0;padding: 0 10px;white-space: nowrap;"
    })
    setTimeout(function () {
        bool&&(document.getElementsByTagName('body')[0].style.marginLeft = '260px')
    }, 500)
})();
 

//<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
//<script src="http://lib.sinaapp.com/js/jquery/1.10.2/jquery-1.10.2.min.js"></script>