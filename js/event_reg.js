window.onload = function () {
    // console.log(location.href)
}

window.addEventListener('popstate', function (e) {
    // console.log("popstate")
})

window.onhashchange = () => {
    countAccessedPages()
    setTimeout(() => {
        // easy at
        chrome.runtime.sendMessage(null, {
            "easyat": true
        }, null, function (response) {})
        // big user icon
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
        invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalPuckerName"))
        invisibleButton.setAttribute("class", "max-min-block")
        invisibleButton.onclick = () => {
            $(invisibleButton).toggleClass("puckered")
            let annPuckered
            if ($(invisibleButton).hasClass('puckered')) {
                annPuckered = true
                invisibleButton.style.backgroundImage = puckeredImgUrl
                invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalExpandName"))
                annBody.style.display = "none"
                annFooter.style.display = "none"
            } else {
                annPuckered = false
                invisibleButton.style.backgroundImage = unPuckeredImgUrl
                invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalPuckerName"))
                annBody.style.display = "block"
                annFooter.style.display = "block"
            }
            savePuckeredInfo("announcement", annPuckered)
        }
        annHeader.appendChild(invisibleButton)
        if (puckered) {
            $(invisibleButton).toggleClass("puckered")
            invisibleButton.style.backgroundImage = puckeredImgUrl
            invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalExpandName"))
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
        invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalPuckerName"))
        invisibleButton.setAttribute("class", "max-min-block")
        invisibleButton.onclick = () => {
            let notiPuckered
            $(invisibleButton).toggleClass("puckered")
            if ($(invisibleButton).hasClass('puckered')) {
                notiPuckered = true
                invisibleButton.style.backgroundImage = puckeredImgUrl
                invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalExpandName"))
                notiMenu.style.display = "none"
                notiBody.style.display = "none"
                notiFooter.style.display = "none"
            } else {
                notiPuckered = false
                invisibleButton.style.backgroundImage = unPuckeredImgUrl
                invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalPuckerName"))
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
            invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalExpandName"))
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
        invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalPuckerName"))
        invisibleButton.setAttribute("class", "max-min-block")
        invisibleButton.onclick = () => {
            let assPuckered
            $(invisibleButton).toggleClass("puckered")
            if ($(invisibleButton).hasClass('puckered')) {
                assPuckered = true
                invisibleButton.style.backgroundImage = puckeredImgUrl
                invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalExpandName"))
                assBody.style.display = "none"
            } else {
                assPuckered = false
                invisibleButton.style.backgroundImage = unPuckeredImgUrl
                invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalPuckerName"))
                assBody.style.display = "block"
            }
            savePuckeredInfo("assigned", assPuckered)
        }
        assHeader.appendChild(invisibleButton)
        if (puckered) {
            $(invisibleButton).toggleClass("puckered")
            invisibleButton.style.backgroundImage = puckeredImgUrl
            invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalExpandName"))
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
        invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalPuckerName"))
        invisibleButton.setAttribute("class", "max-min-block")
        invisibleButton.onclick = () => {
            let spacePuckered
            $(invisibleButton).toggleClass("puckered")
            if ($(invisibleButton).hasClass('puckered')) {
                spacePuckered = true
                invisibleButton.style.backgroundImage = puckeredImgUrl
                invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalExpandName"))
                spaceMenu.style.display = "none"
                spaceBody.style.display = "none"
            } else {
                spacePuckered = false
                invisibleButton.style.backgroundImage = unPuckeredImgUrl
                invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalPuckerName"))
                spaceMenu.style.display = "block"
                spaceBody.style.display = "block"
            }
            savePuckeredInfo("space", spacePuckered)
        }
        spaceHeader.appendChild(invisibleButton)
        if (puckered) {
            $(invisibleButton).toggleClass("puckered")
            invisibleButton.style.backgroundImage = puckeredImgUrl
            invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalExpandName"))
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
        invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalPuckerName"))
        invisibleButton.setAttribute("class", "max-min-block")
        invisibleButton.onclick = () => {
            let appPuckered
            $(invisibleButton).toggleClass("puckered")
            if ($(invisibleButton).hasClass('puckered')) {
                appPuckered = true
                invisibleButton.style.backgroundImage = puckeredImgUrl
                invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalExpandName"))
                appMenu.style.display = "none"
                appBody.style.display = "none"
            } else {
                appPuckered = false
                invisibleButton.style.backgroundImage = unPuckeredImgUrl
                invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalPuckerName"))
                appMenu.style.display = "block"
                appBody.style.display = "block"
            }
            savePuckeredInfo("app", appPuckered)
        }
        appHeader.appendChild(invisibleButton)
        if (puckered) {
            $(invisibleButton).toggleClass("puckered")
            invisibleButton.style.backgroundImage = puckeredImgUrl
            invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalExpandName"))
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

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.big_user_icon_enable) {
        sendResponse("bigusericon has been recived")
        setTimeout(photoinject, 2000)
    } else if (message.easy_at_enable) {
        sendResponse("easy at has been recived")
        setTimeout(() => {
            atinject(message.easy_at_mention_mark)
        }, 2200)
    } else if (message.most_used_app_enable) {
        sendResponse("most use app list has been recived")
        showApps(message.max)
    } else if (message.utter_history_enable) {
        sendResponse("utter history has been recived")
        showUtter(loginUserId)
    } else if (message.customize_portal_enable) {
        sendResponse("customize portal has been recived")
        regionLinkUp()
        optionButtonUp()
        puckerAnnouncement(loadPuckeredInfo("announcement"))
        // puckerNotification(loadPuckeredInfo("notification"))
        puckerAssigned(loadPuckeredInfo("assigned"))
        puckerSpace(loadPuckeredInfo("space"))
        puckerApp(loadPuckeredInfo("app"))
        // 由于投稿的数据加载延迟，故不能在这里直接折叠most app 和 utterhistory
        // 他们开启则默认定死可以折叠，不受custom portal控制
        // 即custom portal只控制原生组件
    } else if (message.utterInSpace) {
        setTimeout(() => {
            getSaveSpaceUtterContent()
        }, 200)
        sendResponse("utterInSpace -- by event reg")
    } else if (message.utterInApp) {
        setTimeout(() => {
            getSaveAppUtterContent()
        }, 500)
        sendResponse("utterInApp -- by event reg")
    } else if (message.utterInNotiApp) {
        setTimeout(() => {
            getSaveNotiAppUtterContent()
        }, 500)
        sendResponse("utterInNotiApp -- by event reg")
    } else {
        sendResponse("none of my bussiness -- by event reg")
    }
})

// listen for kintone event
window.onmessage = function (event) {
    if (event.data.id === "aifcogmioeencjbmlgcfnfkgffahnmpf") {
        if (event.data.msg === "on.kintone.portal.show") {
            if ($('#mostusedapp').length <= 0) {
                chrome.runtime.sendMessage(null, {
                    mostusedapp: true
                }, null, function (response) {})
            }
            if ($('#utterHistory').length <= 0) {
                chrome.runtime.sendMessage(null, {
                    utterHistory: true
                }, null, function (response) {})
            }
            // customize portal
            chrome.runtime.sendMessage(null, {
                "customizeportal": true
            }, null, function (response) {})
            // app_view_history

        } else if (event.data.msg === "kintone.getLoginUser") {
            loginUserId = event.data.info.id
        }
    }
}