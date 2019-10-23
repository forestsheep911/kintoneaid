chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message)
    sendResponse("most use app list has been recived")
    if (message.enable) {
        showApps(message.apps)
    }
})

let showApps = function(mostapp) {
    console.log("show most use app block")
    console.log(document.readyState)
    let bodyright = $.find('.ocean-portal-body-right')
    console.log(bodyright)
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
    appheadername.innerText = "Most used App"
    $(appHeader).append(appheadername)

    let appHeaderShowNumber = document.createElement("button")
    appHeaderShowNumber.setAttribute("class", "ocean-portal-applist-newapp gaia-argoui-widget-control")
    appHeaderShowNumber.setAttribute("title", "set show number")
    appHeaderShowNumber.setAttribute("type", "button")
    $(appHeaderShowNumber).on("click", () => {
            console.log("number button clicked")
        })
        // $(appHeader).append(appHeaderShowNumber)



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
}

setTimeout(() => {
    console.log("a")
    chrome.runtime.sendMessage(null, "", null, function(response) {})
}, 1000)

window.addEventListener('popstate', function(e) {
    console.log("popstate")
    console.log($('#mostusedapp'))
    if ($('#mostusedapp').length > 0) {
        console.log("already have mua")
    } else {
        console.log("no mua")
        setTimeout(() => {
            chrome.runtime.sendMessage(null, "", null, function(response) {})
        }, 1000);
    }
})

window.onhashchange = () => {
    console.log("onhashchange")
}