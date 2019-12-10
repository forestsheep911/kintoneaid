Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function showUtter() {
    let bodyright = $.find('.ocean-portal-body-left')
    let uh = document.createElement("div")
    uh.setAttribute("class", "ocean-portal-widget")
    uh.setAttribute("id", "utter-history")
    $(bodyright).prepend(uh)

    let widget = document.createElement("div")
    widget.setAttribute("class", "gaia-argoui-widget")
    widget.setAttribute("style", "position: relative;")
    $(uh).append(widget)

    let header = document.createElement("div")
    header.setAttribute("class", "gaia-argoui-widget-header gaia-argoui-widget-header-icon")
    header.setAttribute("style", "background-image: url(\"https://static.cybozu.cn/contents/k/image/ocean/cover/compass-select.jpg\"); background-position: left top; background-repeat: no-repeat;")
    $(widget).append(header)

    let menuTitle = document.createElement("h3")
    menuTitle.setAttribute("class", "gaia-argoui-widget-title")
    menuTitle.innerText = "Utter History"
    $(header).append(menuTitle)

    //list
    let listui = document.createElement("ui")
    listui.setAttribute("class", "gaia-argoui-appscrollinglist-list")
    $(widget).append(listui)

    openDB().then(function (promiseValue) {
        let dbobj = promiseValue
        let trans = dbobj.transaction(["utterance_history"], "readwrite")
        let objectStore = trans.objectStore("utterance_history")
        let ind = objectStore.index("cdt")
        ind.openCursor(null, "prev").onsuccess = e => {
            var cursor = event.target.result
            if (cursor) {
                let listlItem = document.createElement("li")
                $(listui).append(listlItem)

                let utterContentAndHref = document.createElement("a")
                utterContentAndHref.setAttribute("style", "margin-left:20px")
                utterContentAndHref.innerText = cursor.value.contentSummary
                utterContentAndHref.href = cursor.value.link
                $(listlItem).append(utterContentAndHref)

                // let contributors = document.createElement("div")
                // contributors.setAttribute("style", "position: absolute; top:0; right:8px; max-width: 200px; white-space: nowrap; overflow:hidden; text-align: right")
                // for (let us = 0; us < cursor.value.mentionUsers.length; us++) {
                //     let contributor = document.createElement("a")
                //     contributor.setAttribute("style", "margin-right: 6px;")
                //     contributor.innerText = "@" + cursor.value.mentionUsers[us].name
                //     contributor.href = cursor.value.mentionUsers[us].href
                //     $(contributors).append(contributor)
                // }
                // $(listlItem).append(contributors)
                let createDateTime = document.createElement("span")
                createDateTime.setAttribute("style", "position: absolute; top:0; right:8px; max-width: 200px; white-space: nowrap; overflow:hidden; text-align: right")
                createDateTime.innerText = cursor.value.CreateDateTime.Format("yyyy-MM-dd hh:mm:ss")
                $(listlItem).append(createDateTime)
                cursor.continue()
            } else {
                // no more results
            }
        }
    })
}