let puckeredImgUrl = "url(" + chrome.extension.getURL('icon/ddown.png') + ")"
let unPuckeredImgUrl = "url(" + chrome.extension.getURL('icon/dup.png') + ")"

window.onload = function () {
    // console.log("after onload")
}

window.addEventListener('popstate', function (e) {
    // console.log("popstate")
})

window.onhashchange = () => {
    console.log("onhashchange")
    setTimeout(() => {
        // easy at
        console.log("start easy at inject in hash change")
        chrome.runtime.sendMessage(null, {
            "easyat": true
        }, null, function (response) {})
        // big user icon
        console.log("start big user icon inject in hash change")
        chrome.runtime.sendMessage(null, {
            "bigusericon": true
        }, null, function (response) {})
    }, 1400)
}

function regionLinkUp() {
    // region link move to up
    try {
        let regionLink = this.document.getElementsByClassName("kintone-portal-content-space")[0]
        let regionLinkHrefs = regionLink.getElementsByTagName("a")
        // change style
        regionLink.style.float = "left"
        regionLink.style.color = "#ffffff"
        regionLink.style.marginTop = "4px"
        for (let i = 0; i < regionLinkHrefs.length; i++) {
            regionLinkHrefs[i].style.color = "#ffffff"
            regionLinkHrefs[i].target = "_blank"
            regionLinkHrefs[i].rel = "noopener noreferrer"
        }
        // insert into up line
        let navi = this.document.getElementsByClassName("gaia-header-toolbar-navigation")[0]
        let naviRight = navi.getElementsByClassName("gaia-header-toolbar-right")[0]
        let naviRightLinks = navi.getElementsByClassName("gaia-header-toolbar-links")[0]
        naviRight.insertBefore(regionLink, naviRightLinks)
    } catch (error) {}
}

function optionButtonUp() {
    // remove portal title and move option button to up
    try {
        let portalTitleBar = this.document.getElementsByClassName("ocean-portal-index-header")[0]
        let portalOptionMenu = this.document.getElementsByClassName("gaia-argoui-coveroptionmenubutton")[0]
        let navi = this.document.getElementsByClassName("gaia-header-toolbar-navigation")[0]
        let naviRight = navi.getElementsByClassName("gaia-header-toolbar-right")[0]
        portalOptionMenu.style.width = "48px"
        portalOptionMenu.style.height = "48px"
        naviRight.appendChild(portalOptionMenu)
        portalTitleBar.style.display = "none"
    } catch (error) {}
}

function puckerAnnouncement(puckered) {
    try {
        let ann = this.document.getElementsByClassName("ocean-portal-announcement")[0]
        let annHeader = ann.getElementsByClassName("gaia-argoui-widget-header")[0]
        let annBody = ann.getElementsByClassName("gaia-argoui-widget-body")[0]
        let annFooter = ann.getElementsByClassName("gaia-argoui-widget-footer")[0]
        let invisibleButton = document.createElement("a")
        invisibleButton.setAttribute("title", "收起")
        invisibleButton.setAttribute("class", "max-min-block")
        invisibleButton.onclick = () => {
            $(invisibleButton).toggleClass("puckered")
            let annPuckered
            if ($(invisibleButton).hasClass('puckered')) {
                annPuckered = true
                invisibleButton.style.backgroundImage = puckeredImgUrl
                invisibleButton.setAttribute("title", "展开")
                annBody.style.display = "none"
                annFooter.style.display = "none"
            } else {
                annPuckered = false
                invisibleButton.style.backgroundImage = unPuckeredImgUrl
                invisibleButton.setAttribute("title", "收起")
                annBody.style.display = "block"
                annFooter.style.display = "block"
            }
            savePuckeredInfo("announcement", annPuckered)
        }
        annHeader.appendChild(invisibleButton)
        if (puckered) {
            $(invisibleButton).toggleClass("puckered")
            invisibleButton.style.backgroundImage = puckeredImgUrl
            invisibleButton.setAttribute("title", "展开")
            annBody.style.display = "none"
            annFooter.style.display = "none"
        } else {
            invisibleButton.style.backgroundImage = unPuckeredImgUrl
        }
        // Announcement edit button position
        let annEditButton = this.document.getElementsByClassName("ocean-portal-announcement-edit")
        annEditButton[0].style.right = "48px"
    } catch (error) {}
}

function puckerNotification(puckered) {
    try {
        let noti = this.document.getElementsByClassName("ocean-portal-ntflist")[0]
        let notiHeader = noti.getElementsByClassName("gaia-argoui-widget-header")[0]
        let notiMenu = noti.getElementsByClassName("gaia-argoui-widget-menu")[0]
        let notiBody = noti.getElementsByClassName("gaia-argoui-widget-body")[0]
        let notiFooter = noti.getElementsByClassName("gaia-argoui-widget-footer")[0]
        let invisibleButton = document.createElement("a")
        invisibleButton.setAttribute("title", "收起")
        invisibleButton.setAttribute("class", "max-min-block")
        invisibleButton.onclick = () => {
            let notiPuckered
            $(invisibleButton).toggleClass("puckered")
            if ($(invisibleButton).hasClass('puckered')) {
                notiPuckered = true
                invisibleButton.style.backgroundImage = puckeredImgUrl
                invisibleButton.setAttribute("title", "展开")
                notiMenu.style.display = "none"
                notiBody.style.display = "none"
                notiFooter.style.display = "none"
            } else {
                notiPuckered = false
                invisibleButton.style.backgroundImage = unPuckeredImgUrl
                invisibleButton.setAttribute("title", "收起")
                notiMenu.style.display = "block"
                notiBody.style.display = "block"
                notiFooter.style.display = "block"
            }
            savePuckeredInfo("notification", notiPuckered)
        }
        notiHeader.appendChild(invisibleButton)
        if (puckered) {
            $(invisibleButton).toggleClass("puckered")
            invisibleButton.style.backgroundImage = puckeredImgUrl
            invisibleButton.setAttribute("title", "展开")
            notiMenu.style.display = "none"
            notiBody.style.display = "none"
            notiFooter.style.display = "none"
        } else {
            invisibleButton.style.backgroundImage = unPuckeredImgUrl
        }
    } catch (error) {}
}

function puckerAssigned(puckered) {
    try {
        let assigned = this.document.getElementsByClassName("ocean-portal-assigned")[0]
        let assHeader = assigned.getElementsByClassName("gaia-argoui-widget-header")[0]
        let assBody = assigned.getElementsByClassName("gaia-argoui-widget-body")[0]
        let invisibleButton = document.createElement("a")
        invisibleButton.setAttribute("title", "收起")
        invisibleButton.setAttribute("class", "max-min-block")
        invisibleButton.onclick = () => {
            let assPuckered
            $(invisibleButton).toggleClass("puckered")
            if ($(invisibleButton).hasClass('puckered')) {
                assPuckered = true
                invisibleButton.style.backgroundImage = puckeredImgUrl
                invisibleButton.setAttribute("title", "展开")
                assBody.style.display = "none"
            } else {
                assPuckered = false
                invisibleButton.style.backgroundImage = unPuckeredImgUrl
                invisibleButton.setAttribute("title", "收起")
                assBody.style.display = "block"
            }
            savePuckeredInfo("assigned", assPuckered)
        }
        assHeader.appendChild(invisibleButton)
        if (puckered) {
            $(invisibleButton).toggleClass("puckered")
            invisibleButton.style.backgroundImage = puckeredImgUrl
            invisibleButton.setAttribute("title", "展开")
            assBody.style.display = "none"
        } else {
            invisibleButton.style.backgroundImage = unPuckeredImgUrl
        }
    } catch (error) {}
}

function puckerSpace(puckered) {
    try {
        let space = this.document.getElementsByClassName("ocean-portal-space")[0]
        let spaceHeader = space.getElementsByClassName("gaia-argoui-widget-header")[0]
        let spaceMenu = space.getElementsByClassName("gaia-argoui-widget-menu")[0]
        let spaceBody = space.getElementsByClassName("gaia-argoui-widget-body")[0]
        let invisibleButton = document.createElement("a")
        invisibleButton.setAttribute("title", "收起")
        invisibleButton.setAttribute("class", "max-min-block")
        invisibleButton.onclick = () => {
            let spacePuckered
            $(invisibleButton).toggleClass("puckered")
            if ($(invisibleButton).hasClass('puckered')) {
                spacePuckered = true
                invisibleButton.style.backgroundImage = puckeredImgUrl
                invisibleButton.setAttribute("title", "展开")
                spaceMenu.style.display = "none"
                spaceBody.style.display = "none"
            } else {
                spacePuckered = false
                invisibleButton.style.backgroundImage = unPuckeredImgUrl
                invisibleButton.setAttribute("title", "收起")
                spaceMenu.style.display = "block"
                spaceBody.style.display = "block"
            }
            savePuckeredInfo("space", spacePuckered)
        }
        spaceHeader.appendChild(invisibleButton)
        if (puckered) {
            $(invisibleButton).toggleClass("puckered")
            invisibleButton.style.backgroundImage = puckeredImgUrl
            invisibleButton.setAttribute("title", "展开")
            spaceMenu.style.display = "none"
            spaceBody.style.display = "none"
        } else {
            invisibleButton.style.backgroundImage = unPuckeredImgUrl
        }
        // Announcement edit button position
        let spaceAddButton = this.document.getElementsByClassName("ocean-portal-spacelist-newspace")
        spaceAddButton[0].style.right = "48px"
    } catch (error) {}
}

function puckerApp(puckered) {
    try {
        let app = this.document.getElementsByClassName("ocean-portal-app")[0]
        let appHeader = app.getElementsByClassName("gaia-argoui-widget-header")[0]
        let appMenu = app.getElementsByClassName("gaia-argoui-widget-menu")[0]
        let appBody = app.getElementsByClassName("gaia-argoui-widget-body")[0]
        let invisibleButton = document.createElement("a")
        invisibleButton.setAttribute("title", "收起")
        invisibleButton.setAttribute("class", "max-min-block")
        invisibleButton.onclick = () => {
            let appPuckered
            $(invisibleButton).toggleClass("puckered")
            if ($(invisibleButton).hasClass('puckered')) {
                appPuckered = true
                invisibleButton.style.backgroundImage = puckeredImgUrl
                invisibleButton.setAttribute("title", "展开")
                appMenu.style.display = "none"
                appBody.style.display = "none"
            } else {
                appPuckered = false
                invisibleButton.style.backgroundImage = unPuckeredImgUrl
                invisibleButton.setAttribute("title", "收起")
                appMenu.style.display = "block"
                appBody.style.display = "block"
            }
            savePuckeredInfo("app", appPuckered)
        }
        appHeader.appendChild(invisibleButton)
        if (puckered) {
            $(invisibleButton).toggleClass("puckered")
            invisibleButton.style.backgroundImage = puckeredImgUrl
            invisibleButton.setAttribute("title", "展开")
            appMenu.style.display = "none"
            appBody.style.display = "none"
        } else {
            invisibleButton.style.backgroundImage = unPuckeredImgUrl
        }
        // Announcement edit button position
        let appAddButton = this.document.getElementsByClassName("ocean-portal-applist-newapp")
        appAddButton[0].style.right = "48px"
    } catch (error) {}
}

function savePuckeredInfo(field, boolValue) {
    if (localStorage.kaidPuckered) {
        let puckerJson = JSON.parse(localStorage.kaidPuckered)
        puckerJson[field] = boolValue
        localStorage.kaidPuckered = JSON.stringify(puckerJson)
    } else {
        let jsonPass = {}
        jsonPass[field] = boolValue
        localStorage.kaidPuckered = JSON.stringify(jsonPass)
    }
}

function loadPuckeredInfo(field) {
    let puckeredInfo = JSON.parse(localStorage.kaidPuckered ? localStorage.kaidPuckered : "{}")
    return puckeredInfo ? puckeredInfo[field] ? true : false : false
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.big_user_icon_enable) {
        sendResponse("bigusericon has been recived")
        setTimeout(photoinject, 2000)
    } else if (message.easy_at_enable) {
        sendResponse("easy at has been recived")
        setTimeout(atinject, 2200)
    } else if (message.most_used_app_enable) {
        sendResponse("most use app list has been recived")
        showApps(message.apps)
    } else if (message.customize_portal_enable) {
        sendResponse("customize portal has been recived")
        regionLinkUp()
        optionButtonUp()
        puckerAnnouncement(loadPuckeredInfo("announcement"))
        puckerNotification(loadPuckeredInfo("notification"))
        puckerAssigned(loadPuckeredInfo("assigned"))
        puckerSpace(loadPuckeredInfo("space"))
        puckerApp(loadPuckeredInfo("app"))
    } else if (message.commentResult) {
        console.log("commentResult recived")
        let commentText = document.getElementsByClassName("ocean-ui-comments-commentbase-text")
        console.log(commentText)
        if (commentText.length > 0) {
            console.log(commentText[0].innerHTML)
        }
        // let commentBlock1s = document.getElementsByClassName("ocean-ui-comments-commentbase")
        // console.log(commentBlock1s)
        // if (commentBlock1s.length > 0) {
        //     console.log(commentBlock1s[0])
        // }
        // let commentBlock2s = document.getElementsByClassName("ocean-ui-comments-post")
        // console.log(commentBlock2s)
        // if (commentBlock2s.length > 0) {
        //     console.log(commentBlock2s[0])
        // }
        //ocean-ui-comments-commentbase ocean-ui-comments-post ocean-ui-comments-post-id-2162679
        let commentTimes = document.getElementsByClassName("ocean-ui-comments-commentbase-time")
        console.log(commentTimes)
        if (commentTimes.length > 0) {
            console.log(commentTimes[0].children)
            console.log(commentTimes[0].children[0].href)
        }
        sendResponse("commentResult -- by event reg")
    } else {
        sendResponse("none of my bussiness -- by event reg")
    }
})

// listen for kintone event
window.onmessage = function (event) {
    if (event.data.id === "fddekggkcckafbhlmjkbmhilkodcnaao") {
        if (event.data.msg === "on.kintone.portal.show") {
            if ($('#mostusedapp').length > 0) {} else {
                chrome.runtime.sendMessage(null, {
                    "mostusedapp": true
                }, null, function (response) {})
            }
            // customize portal
            chrome.runtime.sendMessage(null, {
                "customizeportal": true
            }, null, function (response) {})
        }
    }

}