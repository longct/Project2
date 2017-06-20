$(document).ready(function () {
    try {

        if (window.history && window.history.pushState) {
            $(window).on('popstate', function () {
                f_initModules();
            });
        }

    } catch (e) { console.log(e); }
});
function f_initModules() {
    try {
        var urlOld = f_loadUrl();
        if (urlOld != "") {
            loadModulesToMaster(urlOld + "/index.html", urlOld + "/init.css", urlOld + "/init.js", ".main-content", true);
        }
        else
            loadModuleInclude();
    } catch (e) { console.log(e); }
}
function f_loadUrl() {
    var urlfull = window.location.href;
    var start = urlfull.indexOf("#");
    var end = urlfull.length;
    if (start != -1) {
        var str = urlfull.substring(start, urlfull.length);
        return str.replace("#", "");
    }
    else
        return "";
}


function loadModulesToMaster(linkHtml, linkCss, linkJs, addTo, DeleteOld) {
    try {
        if (DeleteOld) {
            $(addTo).empty();
        }
        $.get(linkHtml, function (html) {
            $(addTo).append(html);
            $.get(linkCss, function (css) {
                $.getScript(linkJs, function () {
                    $("<style />").html(css).appendTo(addTo);
                });
            });

        });


    } catch (e) { console.log(e); }
}
function loadModuleInclude() {
    try {
        $.each($("[data-include]"), function (idx, val) {
            var url = $(val).attr("data-include");
            if (url != null && url != "") {
                loadModulesToMaster(url + "/index.html", url + "/init.css", url + "/init.js", $(this).parent(), false);
            }
            $(val).remove();
        });
    } catch (e) {
        console.log(e);
    }
}
function menuClick(tag_, per_) {
    var linkHTML = "modules/" + tag_;
    //if (index == -1) {
    //    mod.push(item);
    //} else {
    //    if (index.length > 0) {
    //        $.each(index, function (key, val) {
    //            mod.splice(val, 1);
    //        })
    //    }
    //    mod.push(item);
    //}
    //if (mod.length == 10) {
    //    mod.shift();
    //}
    loadModulesToMaster(linkHTML + "/index.html", linkHTML + "/init.css", linkHTML + "/init.js", ".main-content", true);

}