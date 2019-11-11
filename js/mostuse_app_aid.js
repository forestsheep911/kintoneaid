let showApps = function (mostapp, puckered) {
    let bodyright = $.find('.ocean-portal-body-right')
    // console.log(bodyright)
    let rp = document.createElement("div")
    rp.setAttribute("class", "ocean-portal-widget")
    rp.setAttribute("id", "mostusedapp")
    $(bodyright).prepend(rp)

    let appList = document.createElement("div")
    appList.setAttribute("class", "gaia-argoui-widget ocean-portal-applist-widget")
    $(rp).append(appList)

    let appHeader = document.createElement("div")
    appHeader.setAttribute("class", "gaia-argoui-widget-header gaia-argoui-widget-header-icon")
    appHeader.setAttribute("style", "background-image: url(\"https://static.cybozu.com/contents/k/image/icon/app/diamond.png\"); background-position: left top; background-repeat: no-repeat;")
    $(appList).append(appHeader)

    let appheadername = document.createElement("H3")
    appheadername.setAttribute("class", "gaia-argoui-widget-title")
    appheadername.innerText = chrome.i18n.getMessage("mostUsedAppName")
    $(appHeader).append(appheadername)

    //list
    let listui = document.createElement("ui")
    listui.setAttribute("class", "gaia-argoui-appscrollinglist-list")
    $(appList).append(listui)

    for (var i in mostapp) {
        let listli1 = document.createElement("li")
        $(listui).append(listli1)
        let b1 = document.createElement("a")
        b1.setAttribute("class", "gaia-argoui-appscrollinglist-item")
        b1.href = mostapp[i].apphref
        $(listli1).append(b1)
        let bspan1 = document.createElement("span")
        bspan1.setAttribute("class", "gaia-argoui-appscrollinglist-name")
        bspan1.innerText = mostapp[i].appname + "(" + mostapp[i].viewtimes + ")"
        $(b1).append(bspan1)
    }

    // pucker button
    let invisibleButton = document.createElement("a")
    invisibleButton.setAttribute("title", "收起")
    invisibleButton.setAttribute("class", "max-min-block")
    invisibleButton.onclick = () => {
        let mostAppPuckered
        $(invisibleButton).toggleClass("puckered")
        if ($(invisibleButton).hasClass('puckered')) {
            mostAppPuckered = true
            invisibleButton.setAttribute("title", "展开")
            listui.style.display = "none"
        } else {
            mostAppPuckered = false
            invisibleButton.setAttribute("title", "收起")
            listui.style.display = "block"
        }
        chrome.runtime.sendMessage(null, {
            saveMostAppPuckered: true,
            value: mostAppPuckered
        }, null, function (response) {
            console.log(response)
        })
    }
    appHeader.appendChild(invisibleButton)
    if (puckered) {
        $(invisibleButton).toggleClass("puckered")
        invisibleButton.setAttribute("title", "展开")
        listui.style.display = "none"
    }
}