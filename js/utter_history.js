function showUtter(loginUserId) {
    let bodyright = $.find('.ocean-portal-body-left')
    let uh = document.createElement("div")
    uh.setAttribute("class", "ocean-portal-widget")
    uh.setAttribute("id", "utterHistory")
    $(bodyright).prepend(uh)

    let widget = document.createElement("div")
    widget.setAttribute("class", "gaia-argoui-widget")
    widget.setAttribute("style", "position: relative;")
    $(uh).append(widget)

    let header = document.createElement("div")
    header.setAttribute("class", "gaia-argoui-widget-header gaia-argoui-widget-header-icon")
    header.setAttribute("style", "background-image: url(\"https://static.cybozu.com/contents/k/image/ocean/cover/compass-select.jpg\"); background-position: left top; background-repeat: no-repeat;")
    $(widget).append(header)

    let menuTitle = document.createElement("h3")
    menuTitle.setAttribute("class", "gaia-argoui-widget-title")
    menuTitle.innerText = chrome.i18n.getMessage("optionUtterHistoryTitleName")
    $(header).append(menuTitle)

    let tableStruct = '<table id="uhtable" class="display" style="width:100%"><thead></thead><tbody></tbody></table>'
    $(widget).append(tableStruct)

    openDB().then(function (promiseValue) {
        let dbobj = promiseValue
        let trans = dbobj.transaction(["utterance_history"], "readwrite")
        let objectStore = trans.objectStore("utterance_history")
        let ind = objectStore.index("idx_create_datetime")
        let fillarraywithinobj = []
        ind.openCursor(null, "prev").onsuccess = e => {
            var cursor = event.target.result
            if (cursor) {
                if (loginUserId == cursor.value.utterUserId) {
                    let fillobj = {}

                    let utterContentAndHref = document.createElement("a")
                    let contentSummary = Decrypt(cursor.value.contentSummary)
                    if (contentSummary === "") {
                        utterContentAndHref.innerText = "<unknow message>"
                    } else {
                        utterContentAndHref.innerText = contentSummary
                    }
                    utterContentAndHref.href = Decrypt(cursor.value.link)
                    utterContentAndHref.setAttribute("style", "white-space:nowrap;")
                    fillobj.utterence = utterContentAndHref.outerHTML

                    let createDateTimeEle = document.createElement("span")
                    createDateTimeEle.setAttribute("style", "white-space:nowrap;overflow:hidden; text-align:right")
                    createDateTimeEle.innerText = cursor.value.create_datetime.Format("yyyy-MM-dd hh:mm:ss")
                    fillobj.datetime = createDateTimeEle.outerHTML
                    fillobj.mention = getMentionUsersId(cursor.value.mentionUsers)
                    if (cursor.value.sourceType === "APP") {
                        let imgEle = document.createElement("div")
                        imgEle.setAttribute("style", 'background-image:url("https://static.cybozu.com/contents/k/image/argo/uiparts/widget/apps_56.png");background-position:left top;background-repeat:no-repeat;background-size:25px;padding-left:30px;white-space:nowrap;overflow:hidden;')
                        let mojiEle = document.createElement("span")
                        mojiEle.innerText = cursor.value.sourceName ? cursor.value.sourceName : "unknow"
                        imgEle.appendChild(mojiEle)
                        fillobj.sourceName = imgEle.outerHTML
                    } else if (cursor.value.sourceType === "SPACE") {
                        let imgEle = document.createElement("div")
                        imgEle.setAttribute("style", 'background-image:url("https://static.cybozu.com/contents/k/image/argo/uiparts/widget/spaces_56.png");background-position:left top;background-repeat:no-repeat;background-size:25px;padding-left:30px;white-space:nowrap;overflow:hidden;')
                        let mojiEle = document.createElement("span")
                        mojiEle.innerText = cursor.value.sourceName ? cursor.value.sourceName : "unknow"
                        imgEle.appendChild(mojiEle)
                        fillobj.sourceName = imgEle.outerHTML
                    } else {
                        fillobj.sourceName = "unknow"
                    }
                    fillarraywithinobj.push(fillobj)

                    cursor.continue()
                } else {
                    cursor.continue()
                }
            } else {
                // no more results
                $('#uhtable').DataTable({
                    stateSave: true,
                    info: true,
                    searching: true,
                    scrollY: false,
                    scrollX: false,
                    pagingType: "full_numbers",
                    lengthMenu: [3, 5, 8, 13, 21, 34, 55],
                    data: fillarraywithinobj,
                    autoWidth: true,
                    language: {
                        paginate: {
                            first: '«',
                            previous: '‹',
                            next: '›',
                            last: '»'
                        },
                        info: chrome.i18n.getMessage("UtterHistoryShowingInfoName"),
                        infoEmpty: chrome.i18n.getMessage("UtterHistoryShowingInfoEmpytName"),
                        infoFiltered: chrome.i18n.getMessage("UtterHistoryShowingInfoFilteredName"),
                        lengthMenu: chrome.i18n.getMessage("UtterHistorylengthMenuName"),
                        search: chrome.i18n.getMessage("UtterHistorySearchName"),
                        zeroRecords: chrome.i18n.getMessage("UtterHistoryzeroRecordsName")
                    },
                    order: [
                        [3, "desc"],
                    ],
                    columnDefs: [{
                        targets: 0,
                        type: "html",
                        width: "100px"
                    }, {
                        targets: 1,
                        width: "240px"
                    }, {
                        targets: 2,
                        type: "html",
                        width: "50px"
                    }, {
                        targets: 3,
                        type: "html",
                        className: "uhtable_col_datetime",
                        width: "120px"
                    }],
                    columns: [{
                        data: "utterence",
                        title: chrome.i18n.getMessage("UtterHistoryColumnUtterenceName")
                    }, {
                        data: "mention",
                        title: chrome.i18n.getMessage("UtterHistoryColumnMentionsName")
                    }, {
                        data: "sourceName",
                        title: chrome.i18n.getMessage("UtterHistoryColumnSourceName")
                    }, {
                        data: "datetime",
                        title: chrome.i18n.getMessage("UtterHistoryColumnDatetimeName")
                    }]
                })
                puckerUh(loadPuckeredInfo("uh"))
            }
        }
    })
}

function getMentionUsersId(inArray) {
    let outPutString = ""
    for (let i = 0; i < inArray.length; i++) {
        if (i > 0) {
            outPutString += " "
        }
        outPutString += inArray[i].name
    }
    if (outPutString.length > 20) {
        outPutString = outPutString.substring(0, 23) + "..."
    }
    return outPutString
}

function puckerUh(puckered) {
    try {
        let uh = this.document.getElementById("utterHistory")
        let uhHeader = uh.getElementsByClassName("gaia-argoui-widget-header")[0]
        let uhBody = this.document.getElementById("uhtable_wrapper")
        let invisibleButton = document.createElement("a")
        invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalPuckerName"))
        invisibleButton.setAttribute("class", "max-min-block")
        invisibleButton.setAttribute("style", "user-select:none;")
        invisibleButton.onclick = () => {
            let uhPuckered
            $(invisibleButton).toggleClass("puckered")
            if ($(invisibleButton).hasClass('puckered')) {
                uhPuckered = true
                invisibleButton.style.backgroundImage = puckeredImgUrl
                invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalExpandName"))
                uhBody.style.display = "none"
            } else {
                uhPuckered = false
                invisibleButton.style.backgroundImage = unPuckeredImgUrl
                invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalPuckerName"))
                uhBody.style.display = "block"
            }
            savePuckeredInfo("uh", uhPuckered)
        }
        uhHeader.appendChild(invisibleButton)
        if (puckered) {
            $(invisibleButton).toggleClass("puckered")
            invisibleButton.style.backgroundImage = puckeredImgUrl
            invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalExpandName"))
            uhBody.style.display = "none"
        } else {
            invisibleButton.style.backgroundImage = unPuckeredImgUrl
        }
    } catch (error) {}
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
        requestput.onsuccess = e => {}
        requestput.onerror = e => {}
    })
}

function getSaveSpaceUtterContent() {
    // space的通知貌似并不是用iframe做的，所以不必像app那样分开取，这里一次都能取到
    // link
    let utterLink
    let commentTimes = document.getElementsByClassName("ocean-ui-comments-commentbase-time")

    utterLink = commentTimes.length > 0 ? commentTimes[0].firstChild.href : null
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
    utterContentSummary = commentTextClone.innerText.replace(/\s/g, "").substring(0, 29)
    if (!utterContentSummary) {
        utterContentSummary = ""
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

    // get space and thread name
    let spaceNameEles = document.getElementsByClassName("gaia-argoui-space-spacelayout-title")
    let threadNameEles = document.getElementsByClassName("ocean-space-thread-name")
    let spaceName = ""
    let threadName = ""
    if (spaceNameEles.length > 0) {
        spaceName = spaceNameEles[0].innerText
    }
    if (threadNameEles.length > 0) {
        // 如果是单thread space，则thread name的class中会有"assistive-text"
        if (!$(threadNameEles[0]).hasClass("assistive-text")) {
            threadName = threadNameEles[0].innerText
        }
    }

    let saveobj = {
        create_datetime: new Date(),
        contentSummary: utterContentSummary,
        link: utterLink,
        sourceType: "SPACE",
        sourceName: spaceName + ":" + threadName,
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
    let utterContentSummary = commentTextClone.innerText.replace(/\s/g, "").substring(0, 29)
    if (!utterContentSummary) {
        utterContentSummary = ""
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
    // get app name
    let appNameEles = document.getElementsByClassName("gaia-argoui-app-breadcrumb-link")
    let spaceName
    let appName
    let fullName
    for (let i = 0; i < appNameEles.length; i++) {
        console.log(appNameEles[i].href)

        let ptnSpace = new RegExp(/\/k\/#\/space/g)
        let matchSpace = ptnSpace.exec(appNameEles[i].href)
        if ( matchSpace != null) {
            spaceName = appNameEles[i].innerText
        }

        let ptnApp = new RegExp(/\/k\/\d+\/$/g)
        let matchApp = ptnApp.exec(appNameEles[i].href)
        if ( matchApp != null) {
            appName = appNameEles[i].innerText
        }
    }
    if (spaceName) {
        fullName = spaceName + ":" + appName
    } else {
        fullName = appName
    }

    // save
    let saveobj = {
        create_datetime: new Date(),
        contentSummary: utterContentSummary,
        link: commentUrl + "&comment=" + commentNumber,
        sourceType: "APP",
        sourceName: fullName,
        mentionUsers: mentionUsersArray
    }
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
        commentUrl = match[1] + match[2] + "/show#record=" + match[3]
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
    let utterContentSummary = commentTextClone.innerText.replace(/\s/g, "").substring(0, 29)
    if (!utterContentSummary) {
        utterContentSummary = ""
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
    // get app name
    let appNameEles = innerIFrames[0].contentDocument.getElementsByClassName("gaia-argoui-ntf-breadcrumb-item")
    let spaceName
    let appName
    let fullName
    for (let i = 0; i < appNameEles.length; i++) {
        console.log(appNameEles[i].href)

        let ptnSpace = new RegExp(/\/k\/#\/space/g)
        let matchSpace = ptnSpace.exec(appNameEles[i].href)
        if ( matchSpace != null) {
            spaceName = appNameEles[i].innerText
        }

        let ptnApp = new RegExp(/\/k\/\d+\/$/g)
        let matchApp = ptnApp.exec(appNameEles[i].href)
        if ( matchApp != null) {
            appName = appNameEles[i].innerText
        }
    }
    if (spaceName) {
        fullName = spaceName + ":" + appName
    } else {
        fullName = appName
    }

    let saveobj = {
        create_datetime: new Date(),
        contentSummary: utterContentSummary,
        link: commentUrl + "&comment=" + commentNumber,
        sourceType: "APP",
        sourceName: fullName,
        mentionUsers: mentionUsersArray
    }
    saveUtter(saveobj)
    return true
}