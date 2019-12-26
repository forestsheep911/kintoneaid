let puckeredImgUrl = "url(" + chrome.extension.getURL('icon/ddown.png') + ")"
let unPuckeredImgUrl = "url(" + chrome.extension.getURL('icon/dup.png') + ")"
let loginUserId

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

function saveUtter(saveobj) {
    if (loginUserId) {
        saveobj.utterUserId = loginUserId
    } else {
        return
    }
    saveobj.contentSummary = Encrypt(saveobj.contentSummary)
    saveobj.link = Encrypt(saveobj.link)
    openDB().then(function (promiseValue) {
        let dbobj = promiseValue
        let trans = dbobj.transaction(["utterance_history"], "readwrite")
        let objectStore = trans.objectStore("utterance_history")
        let requestput = objectStore.put(saveobj)
        requestput.onsuccess = e => {
            console.log(e)
        }
        requestput.onerror = e => {
            console.log(e)
        }
    })
}

function getSaveSpaceUtterContent() {
    console.log("utter in space found")
    // space的通知貌似并不是用iframe做的，所以不必像app那样分开取，这里一次都能取道
    // link
    let utterLink
    let commentTimes = document.getElementsByClassName("ocean-ui-comments-commentbase-time")
    utterLink = commentTimes.length > 0 ? commentTimes[0].firstChild.href : null
    console.log(utterLink)
    if (!utterLink) {
        return false
    }
    // // 获取 除mention外的发言内容
    let utterContentSummary
    let commentTexts = document.getElementsByClassName("ocean-ui-comments-commentbase-text")
    let firstCommentText = commentTexts.length > 0 ? commentTexts[0] : null
    if (!firstCommentText) {
        return false
    }

    let commentTextClone = firstCommentText.cloneNode(true)
    let readytodeletenodes = commentTextClone.getElementsByClassName("ocean-ui-plugin-mention-user")
    while (readytodeletenodes.length > 0) {
        readytodeletenodes[0].remove()
    }
    utterContentSummary = commentTextClone.innerText.replace(/\s/g, "").substring(0, 20)
    if (!utterContentSummary) {
        return false
    }
    console.log(utterContentSummary)

    // mention users
    let mentionUsersArray = []
    let mentionUsers = firstCommentText.getElementsByClassName("ocean-ui-plugin-mention-user")
    for (let i = 0; i < mentionUsers.length; i++) {
        let oneUser = {
            "data-mention-id": mentionUsers[i].getAttribute("data-mention-id"),
            name: mentionUsers[i].innerText,
            href: mentionUsers[i].href
        }
        mentionUsersArray.push(oneUser)
    }


    let saveobj = {
        CreateDateTime: new Date(),
        contentSummary: utterContentSummary,
        link: utterLink,
        mentionUsers: mentionUsersArray
    }
    saveUtter(saveobj)
}

function getSaveAppUtterContent() {
    // 获取link: URL + comment序列号
    let commentUrl
    let ptnUrl = new RegExp(/^.*record=\d+/g)
    let match
    if ((match = ptnUrl.exec(window.location.href)) != null) {
        commentUrl = match[0]
    } else {
        return false
    }
    let utterNumbers = document.getElementsByClassName("itemlist-user-gaia")
    let commentNumber = utterNumbers.length > 0 ? utterNumbers[0].firstChild.nodeValue.replace(/:\s*/g, "") : null
    if (!commentNumber) {
        return false
    }
    // 获取 除mention外的发言内容
    let commentTexts = document.getElementsByClassName("commentlist-body-gaia")
    let firstCommentText = commentTexts.length > 0 ? commentTexts[0] : null
    if (!firstCommentText) {
        return false
    }
    let commentTextClone = firstCommentText.cloneNode(true)
    let readytodeletenodes = commentTextClone.getElementsByClassName("ocean-ui-plugin-mention-user")
    while (readytodeletenodes.length > 0) {
        readytodeletenodes[0].remove()
    }
    let utterContentSummary = commentTextClone.innerText.replace(/\s/g, "").substring(0, 20)
    if (!utterContentSummary) {
        return false
    }
    // mention users
    let mentionUsersArray = []
    let mentionUsers = firstCommentText.getElementsByClassName("ocean-ui-plugin-mention-user")
    for (let i = 0; i < mentionUsers.length; i++) {
        let oneUser = {
            "data-mention-id": mentionUsers[i].getAttribute("data-mention-id"),
            name: mentionUsers[i].innerText,
            href: mentionUsers[i].href
        }
        mentionUsersArray.push(oneUser)
    }
    let saveobj = {
        CreateDateTime: new Date(),
        contentSummary: utterContentSummary,
        link: commentUrl + "&comment=" + commentNumber,
        mentionUsers: mentionUsersArray
    }
    console.log(saveobj)
    saveUtter(saveobj)
    return true
}

function getSaveNotiAppUtterContent() {
    let innerIFrames = document.getElementsByTagName("iframe")
    if (innerIFrames.length == 0) {
        return false
    }
    // 获取link: URL + comment序列号
    let commentUrl
    let ptnUrl = new RegExp(/(^.*\/k\/)#\/ntf\/mention\/k\/\D+(\d+)\D(\d+)/g)
    let match
    if ((match = ptnUrl.exec(window.location.href)) != null) {
        console.log(match[0])
        console.log(match[1])
        console.log(match[2])
        console.log(match[3])
        commentUrl = match[1] + match[2] + "/show#record=" + match[3]
        console.log(commentUrl)
    } else {
        return false
    }

    let ifUtterNumbers = innerIFrames[0].contentDocument.getElementsByClassName("itemlist-user-gaia")
    let commentNumber = ifUtterNumbers.length > 0 ? ifUtterNumbers[0].firstChild.nodeValue.replace(/:\s*/g, "") : null
    if (!commentNumber) {
        return false
    }
    let ifCommentTexts = innerIFrames[0].contentDocument.getElementsByClassName("commentlist-body-gaia")
    let firstCommentText = ifCommentTexts.length > 0 ? ifCommentTexts[0] : null
    if (!firstCommentText) {
        return false
    }
    let commentTextClone = firstCommentText.cloneNode(true)
    let readytodeletenodes = commentTextClone.getElementsByClassName("ocean-ui-plugin-mention-user")
    while (readytodeletenodes.length > 0) {
        readytodeletenodes[0].remove()
    }
    let utterContentSummary = commentTextClone.innerText.replace(/\s/g, "").substring(0, 20)
    if (!utterContentSummary) {
        return false
    }
    // mention users
    let mentionUsersArray = []
    let mentionUsers = firstCommentText.getElementsByClassName("ocean-ui-plugin-mention-user")
    for (let i = 0; i < mentionUsers.length; i++) {
        let oneUser = {
            "data-mention-id": mentionUsers[i].getAttribute("data-mention-id"),
            name: mentionUsers[i].innerText,
            href: mentionUsers[i].href
        }
        mentionUsersArray.push(oneUser)
    }
    let saveobj = {
        CreateDateTime: new Date(),
        contentSummary: utterContentSummary,
        link: commentUrl + "&comment=" + commentNumber,
        mentionUsers: mentionUsersArray
    }
    console.log(saveobj)
    saveUtter(saveobj)
    return true
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.big_user_icon_enable) {
        sendResponse("bigusericon has been recived")
        setTimeout(photoinject, 2000)
    } else if (message.easy_at_enable) {
        sendResponse("easy at has been recived")
        setTimeout(() => {
            atinject(message.easy_at_mention_mark)
        }, 2200);
    } else if (message.most_used_app_enable) {
        sendResponse("most use app list has been recived")
        showApps(message.apps)
    } else if (message.customize_portal_enable) {
        sendResponse("customize portal has been recived")
        regionLinkUp()
        optionButtonUp()
        puckerAnnouncement(loadPuckeredInfo("announcement"))
        // puckerNotification(loadPuckeredInfo("notification"))
        puckerAssigned(loadPuckeredInfo("assigned"))
        puckerSpace(loadPuckeredInfo("space"))
        puckerApp(loadPuckeredInfo("app"))
    } else if (message.utterInSpace) {
        console.log("utter space")
        setTimeout(() => {
            getSaveSpaceUtterContent()
        }, 200);
        sendResponse("utterInSpace -- by event reg")
    } else if (message.utterInApp) {
        setTimeout(() => {
            getSaveAppUtterContent()
        }, 500);
        sendResponse("utterInApp -- by event reg")
    } else if (message.utterInNotiApp) {
        setTimeout(() => {
            console.log("cs: noti app")
            getSaveNotiAppUtterContent()
        }, 500);
        sendResponse("utterInNotiApp -- by event reg")
    } else {
        sendResponse("none of my bussiness -- by event reg")
    }
})

// listen for kintone event
window.onmessage = function (event) {
    if (event.data.id === "aifcogmioeencjbmlgcfnfkgffahnmpf") {
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
            //utter under dev
            showUtter(loginUserId)
        } else if (event.data.msg === "kintone.getLoginUser") {
            console.log(event.data.info)
            loginUserId = event.data.info.id
            console.log(loginUserId)
        }
    }
}