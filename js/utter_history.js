function showUtter(loginUserId) {
    let bodyright = $.find('.ocean-portal-body-left')
    let uh = document.createElement("div")
    uh.setAttribute("class", "ocean-portal-widget")
    uh.setAttribute("id", "utterHistory")
    // uh.setAttribute("onselectstart", "return false;")
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
    menuTitle.innerText = chrome.i18n.getMessage("optionUtterHistoryTitleName")
    $(header).append(menuTitle)

    let tableStruct = '<table id="uhtable" class="display" style="width:100%"><thead></thead><tbody></tbody></table>'
    $(widget).append(tableStruct)

    openDB().then(function (promiseValue) {
        let dbobj = promiseValue
        let trans = dbobj.transaction(["utterance_history"], "readwrite")
        let objectStore = trans.objectStore("utterance_history")
        let ind = objectStore.index("cdt")
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
                    createDateTimeEle.innerText = cursor.value.CreateDateTime.Format("yyyy-MM-dd hh:mm:ss")
                    fillobj.datetime = createDateTimeEle.outerHTML
                    fillobj.mention = getMentionUsersId(cursor.value.mentionUsers)
                    if (cursor.value.sourceType === "APP") {
                        let imgEle = document.createElement("div")
                        imgEle.setAttribute("style", 'background-image:url("https://static.cybozu.cn/contents/k/image/argo/uiparts/widget/apps_56.png");background-position:left top;background-repeat:no-repeat;background-size:25px;padding-left:30px;white-space:nowrap;overflow:hidden;')
                        let mojiEle = document.createElement("span")
                        mojiEle.innerText = cursor.value.sourceName ? cursor.value.sourceName : "unknow"
                        imgEle.appendChild(mojiEle)
                        fillobj.sourceName = imgEle.outerHTML
                    } else if (cursor.value.sourceType === "SPACE") {
                        let imgEle = document.createElement("div")
                        imgEle.setAttribute("style", 'background-image:url("https://static.cybozu.cn/contents/k/image/argo/uiparts/widget/spaces_56.png"); background-position: left top;background-repeat:no-repeat;background-size:25px;max-width:240px;padding-left:30px;white-space:nowrap;overflow:hidden;')
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
                    autoWidth: false,
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
        outPutString = outPutString.substring(0, 17) + "..."
    }
    return outPutString
}

function puckerUh(puckered) {
    try {
        let uh = this.document.getElementById("utterHistory")
        let uhHeader = uh.getElementsByClassName("gaia-argoui-widget-header")[0]
        let uhBody = this.document.getElementById("uhtable_wrapper")
        let invisibleButton = document.createElement("a")
        invisibleButton.setAttribute("title", "收起")
        invisibleButton.setAttribute("class", "max-min-block")
        invisibleButton.setAttribute("style", "user-select:none;")
        invisibleButton.onclick = () => {
            let uhPuckered
            $(invisibleButton).toggleClass("puckered")
            if ($(invisibleButton).hasClass('puckered')) {
                uhPuckered = true
                invisibleButton.style.backgroundImage = puckeredImgUrl
                invisibleButton.setAttribute("title", "展开")
                uhBody.style.display = "none"
            } else {
                uhPuckered = false
                invisibleButton.style.backgroundImage = unPuckeredImgUrl
                invisibleButton.setAttribute("title", "收起")
                uhBody.style.display = "block"
            }
            savePuckeredInfo("uh", uhPuckered)
        }
        uhHeader.appendChild(invisibleButton)
        if (puckered) {
            $(invisibleButton).toggleClass("puckered")
            invisibleButton.style.backgroundImage = puckeredImgUrl
            invisibleButton.setAttribute("title", "展开")
            uhBody.style.display = "none"
        } else {
            invisibleButton.style.backgroundImage = unPuckeredImgUrl
        }
    } catch (error) {
        console.log(error)
    }
}