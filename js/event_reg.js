window.onload = function () {
    console.log("after onload")
}

window.addEventListener('popstate', function (e) {
    console.log("popstate")
})

window.onhashchange = () => {
    console.log("onhashchange")
    setTimeout(() => {
        // easy at
        console.log("start easy at inject in hash change")
        chrome.runtime.sendMessage(null, {
            "easyat": true
        }, null, function (response) {
            console.log(response)
        })
        // big user icon
        console.log("start big user icon inject in hash change")
        chrome.runtime.sendMessage(null, {
            "bigusericon": true
        }, null, function (response) {
            console.log(response)
        })
    }, 1400)
}

function regionLinkUp() {
    // region link move to up
    console.log("regionlinkup")
    try {
        let regionLink = this.document.getElementsByClassName("kintone-portal-content-space")[0]
        console.log(regionLink)
        let regionLinkHrefs = regionLink.getElementsByTagName("a")
        console.log(regionLinkHrefs)
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
    } catch (error) {
        // console.error(error)
    }
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
    } catch (error) {
        // console.error(error)
    }
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
                invisibleButton.setAttribute("title", "展开")
                annBody.style.display = "none"
                annFooter.style.display = "none"
            } else {
                annPuckered = false
                invisibleButton.setAttribute("title", "收起")
                annBody.style.display = "block"
                annFooter.style.display = "block"
            }
            savePuckeredInfo("announcement", annPuckered)
            // chrome.runtime.sendMessage(null, {
            //     saveAnnPuckered: true,
            //     value: annPuckered
            // }, null, function (response) {
            //     console.log(response)
            // })
        }
        annHeader.appendChild(invisibleButton)
        if (puckered) {
            $(invisibleButton).toggleClass("puckered")
            invisibleButton.setAttribute("title", "展开")
            annBody.style.display = "none"
            annFooter.style.display = "none"
        }
        // Announcement edit button position
        let annEditButton = this.document.getElementsByClassName("ocean-portal-announcement-edit")
        console.log(annEditButton)
        annEditButton[0].style.right = "48px"
    } catch (error) {
        // console.error(error)
    }
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
                invisibleButton.setAttribute("title", "展开")
                notiMenu.style.display = "none"
                notiBody.style.display = "none"
                notiFooter.style.display = "none"
            } else {
                notiPuckered = false
                invisibleButton.setAttribute("title", "收起")
                notiMenu.style.display = "block"
                notiBody.style.display = "block"
                notiFooter.style.display = "block"
            }
            savePuckeredInfo("notification", notiPuckered)
            // chrome.runtime.sendMessage(null, {
            //     saveNotiPuckered: true,
            //     value: notiPuckered
            // }, null, function (response) {
            //     console.log(response)
            // })
        }
        notiHeader.appendChild(invisibleButton)
        if (puckered) {
            $(invisibleButton).toggleClass("puckered")
            invisibleButton.setAttribute("title", "展开")
            notiBody.style.display = "none"
            notiFooter.style.display = "none"
        }
    } catch (error) {
        // console.error(error)
    }
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
                invisibleButton.setAttribute("title", "展开")
                assBody.style.display = "none"
            } else {
                assPuckered = false
                invisibleButton.setAttribute("title", "收起")
                assBody.style.display = "block"
            }
            savePuckeredInfo("assinged", assPuckered)
            // chrome.runtime.sendMessage(null, {
            //     saveAssignedPuckered: true,
            //     value: assPuckered
            // }, null, function (response) {
            //     console.log(response)
            // })
        }
        assHeader.appendChild(invisibleButton)
        if (puckered) {
            $(invisibleButton).toggleClass("puckered")
            invisibleButton.setAttribute("title", "展开")
            assBody.style.display = "none"
        }
    } catch (error) {
        // console.error(error)
    }
}

function puckerSpace(puckered) {
    try {
        let space = this.document.getElementsByClassName("ocean-portal-space")[0]
        console.log(space)
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
                invisibleButton.setAttribute("title", "展开")
                spaceMenu.style.display = "none"
                spaceBody.style.display = "none"
            } else {
                spacePuckered = false
                invisibleButton.setAttribute("title", "收起")
                spaceMenu.style.display = "block"
                spaceBody.style.display = "block"
            }
            savePuckeredInfo("space", spacePuckered)
            // chrome.runtime.sendMessage(null, {
            //     saveSpacePuckered: true,
            //     value: spacePuckered
            // }, null, function (response) {
            //     console.log(response)
            // })
        }
        spaceHeader.appendChild(invisibleButton)
        if (puckered) {
            $(invisibleButton).toggleClass("puckered")
            invisibleButton.setAttribute("title", "展开")
            spaceMenu.style.display = "none"
            spaceBody.style.display = "none"
        }
        // Announcement edit button position
        let spaceAddButton = this.document.getElementsByClassName("ocean-portal-spacelist-newspace")
        console.log(spaceAddButton)
        spaceAddButton[0].style.right = "48px"
    } catch (error) {
        // console.error(error)
    }
}

function puckerApp(puckered) {
    try {
        let app = this.document.getElementsByClassName("ocean-portal-app")[0]
        console.log(app)
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
                invisibleButton.setAttribute("title", "展开")
                appMenu.style.display = "none"
                appBody.style.display = "none"
            } else {
                appPuckered = false
                invisibleButton.setAttribute("title", "收起")
                appMenu.style.display = "block"
                appBody.style.display = "block"
            }
            savePuckeredInfo("app", appPuckered)
            // chrome.runtime.sendMessage(null, {
            //     saveAppPuckered: true,
            //     value: appPuckered
            // }, null, function (response) {
            //     console.log(response)
            // })
        }
        appHeader.appendChild(invisibleButton)
        if (puckered) {
            $(invisibleButton).toggleClass("puckered")
            invisibleButton.setAttribute("title", "展开")
            appMenu.style.display = "none"
            appBody.style.display = "none"
        }
        // Announcement edit button position
        let appAddButton = this.document.getElementsByClassName("ocean-portal-applist-newapp")
        console.log(appAddButton)
        appAddButton[0].style.right = "48px"
    } catch (error) {
        // console.error(error)
    }
}

// todo
// save pucker info into localstorage(content script[HTML5's][by site])
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
    console.log(puckeredInfo ? puckeredInfo[field] ? true : false : false)
    return puckeredInfo ? puckeredInfo[field] ? true : false : false
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // console.log(message)
    if (message.big_user_icon_enable) {
        sendResponse("bigusericon has been recived")
        setTimeout(photoinject, 2000)
    } else if (message.easy_at_enable) {
        sendResponse("easy at has been recived")
        setTimeout(atinject, 2200)
    } else if (message.most_used_app_enable) {
        sendResponse("most use app list has been recived")
        showApps(message.apps, message.puckered)
    } else if (message.customize_portal_enable) {
        sendResponse("customize portal has been recived")
        regionLinkUp()
        optionButtonUp()
        // todo
        // get pucker info from localstorage(content script[HTML5's][by site])
        puckerAnnouncement(loadPuckeredInfo("announcement"))
        puckerNotification(loadPuckeredInfo("notification"))
        puckerAssigned(loadPuckeredInfo("assigned"))
        puckerSpace(loadPuckeredInfo("apspacep"))
        puckerApp(loadPuckeredInfo("app"))
    } else {
        sendResponse("none of my bussiness -- by event reg")
    }
})

// listen for kintone event
window.onmessage = function (event) {
    // console.log(event);
    if (event.data.id === "fddekggkcckafbhlmjkbmhilkodcnaao") {
        if (event.data.msg === "on.kintone.portal.show") {
            if ($('#mostusedapp').length > 0) {
                // console.log("already have mua")
            } else {
                // console.log("no mua")
                chrome.runtime.sendMessage(null, {
                    "mostusedapp": true
                }, null, function (response) {
                    console.log(response)
                })
            }
            // customize portal
            chrome.runtime.sendMessage(null, {
                "customizeportal": true
            }, null, function (response) {
                console.log(response)
            })
        }
    }

}