window.onload = function () {
    console.log("after onload")
}

window.addEventListener('popstate', function (e) {
    console.log("popstate")
})

window.onhashchange = () => {
    console.log("onhashchange")
    setTimeout(() => {
        // most used app
        // if (document.getElementsByClassName('ocean-portal-body-right').length == 0) {
        //     console.log("found not in portal")
        //     // return
        // } else {
        //     console.log($('#mostusedapp'))
        //     if ($('#mostusedapp').length > 0) {
        //         console.log("already have mua")
        //     } else {
        //         console.log("no mua")
        //         chrome.runtime.sendMessage(null, {
        //             "mostusedapp": true
        //         }, null, function (response) {
        //             console.log(response)
        //         })
        //     }
        // }

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
        console.error(error)
        console.log(error)
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
        console.error(error)
    }
}

function puckerAnnouncement() {
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
            if ($(invisibleButton).hasClass('puckered')) {
                invisibleButton.setAttribute("title", "展开")
                annBody.style.display = "none"
                annFooter.style.display = "none"
            } else {
                invisibleButton.setAttribute("title", "收起")
                annBody.style.display = "block"
                annFooter.style.display = "block"
            }
        }
        annHeader.appendChild(invisibleButton)
        // Announcement edit button position
        let annEditButton = this.document.getElementsByClassName("ocean-portal-announcement-edit")
        console.log(annEditButton)
        annEditButton[0].style.right = "48px"
    } catch (error) {
        console.error(error)
    }
}

function puckerNotification() {
    try {
        let noti = this.document.getElementsByClassName("ocean-portal-ntflist")[0]
        let notiHeader = noti.getElementsByClassName("gaia-argoui-widget-header")[0]
        let notiMenu = noti.getElementsByClassName("gaia-argoui-widget-menu")[0]
        let notiBody = noti.getElementsByClassName("gaia-argoui-widget-body")[0]
        let notiFooter = noti.getElementsByClassName("gaia-argoui-widget-footer")[0]
        let invisibleButton2 = document.createElement("a")
        invisibleButton2.setAttribute("title", "收起")
        invisibleButton2.setAttribute("class", "max-min-block")
        invisibleButton2.onclick = () => {
            $(invisibleButton2).toggleClass("puckered")
            if ($(invisibleButton2).hasClass('puckered')) {
                invisibleButton2.setAttribute("title", "展开")
                notiMenu.style.display = "none"
                notiBody.style.display = "none"
                notiFooter.style.display = "none"
            } else {
                invisibleButton2.setAttribute("title", "收起")
                notiMenu.style.display = "block"
                notiBody.style.display = "block"
                notiFooter.style.display = "block"
            }
        }
        notiHeader.appendChild(invisibleButton2)
    } catch (error) {
        console.error(error)
    }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message)
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
        puckerAnnouncement()
        puckerNotification()
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
            // regionLinkUp()
            // optionButtonUp()
            // puckerAnnouncement()
            // puckerNotification()
        }
    }

}