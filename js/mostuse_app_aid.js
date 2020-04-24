function showApps(appAmount) {
    // most used app
    let seeMostApp = loadAppUsageInfo("see_most_app")
    if (seeMostApp) {
        getMostUsedAppIdAndScore(appAmount).then(matchAndGetAppName).then(function (p) {
            render(p, appAmount)
        })
    } else {
        // last used app
        getLastUsedApp(appAmount).then(matchAndGetAppName).then(function (p) {
            render(p, appAmount)
        })
    }
}

// most used app method
function getMostUsedAppIdAndScore(appAmount) {
    return new Promise((resolve, reject) => {
        openDB().then(function (promiseValue) {
            let dbObj = promiseValue
            let trans = dbObj.transaction(["app_history"], "readonly")
            let objectStore_history = trans.objectStore("app_history")
            let req = objectStore_history.getAll()
            req.onsuccess = (event) => {
                let inArray = event.target.result
                let atLastResult = []
                inArray.reduce(function (res, value) {
                    if (!res[value.app_id]) {
                        res[value.app_id] = {
                            id: value.app_id,
                            score: 0
                        }
                        atLastResult.push(res[value.app_id])
                    }
                    res[value.app_id].score += value.app_view_type
                    return res
                }, {})
                atLastResult.sort((one, two) => {
                    return two.score - one.score
                })
                let delPos = atLastResult.length < appAmount ? atLastResult.length : appAmount
                atLastResult.splice(delPos)
                resolve([atLastResult, "most"])
            }
        })
    })
}

function getLastUsedApp(appAmount) {
    return new Promise((resolve, reject) => {
        openDB().then(function (promiseValue) {
            let dbObj = promiseValue
            let trans = dbObj.transaction(["app_history"], "readonly")
            let objectStore_history = trans.objectStore("app_history")
            let ind = objectStore_history.index("idx_view_datetime")
            let resultArray = []
            let lastId
            let found
            ind.openCursor(null, "prev").onsuccess = e => {
                let cursor = event.target.result
                if (cursor) {
                    found = resultArray.find((element) => {
                        return element.id === cursor.value.app_id
                    })
                    if (!found) {
                        resultArray.push({
                            id: cursor.value.app_id,
                            last_time: cursor.key
                        })
                        // console.log(resultArray)
                        if (resultArray.length === appAmount) {
                            resolve([resultArray, "last"])
                            return
                        } else {
                            lastId = cursor.value.app_id
                        }
                    }
                    cursor.continue()
                } else {
                    resolve([resultArray, "last"])
                }
            }
        })
    })
}

// get most used app backup method
function getIdAndScore(resolve, rejct) {
    openDB().then(function (promiseValue) {
        let lastId
        let dbObj = promiseValue
        let trans = dbObj.transaction(["app_history"], "readonly")
        let objectStore_history = trans.objectStore("app_history")
        let ind = objectStore_history.index("idx_id")
        let resultArray = []
        ind.openCursor().onsuccess = e => {
            let cursor = event.target.result
            if (cursor) {
                let id = cursor.key
                let type = cursor.value.app_view_type
                if (lastId === id) {
                    let oldScore = resultArray[resultArray.length - 1].score
                    resultArray[resultArray.length - 1].score = oldScore + type
                } else {
                    lastId = id
                    resultArray.push({
                        id: id,
                        score: type
                    })
                }
                cursor.continue()
            } else {
                // no more records
                resolve(resultArray)
            }
        }
    })
}

function matchAndGetAppName(param) {
    let inArray = param[0]
    let mostOrLast = param[1]
    return new Promise((resolve, reject) => {
        let promiseArray = []
        for (let i = 0; i < inArray.length; i++) {
            /*jshint -W083 */
            promiseArray.push(
                new Promise((resolve, reject) => {
                    openDB().then(function (promiseValue) {
                        let dbObj = promiseValue
                        let trans = dbObj.transaction(["app_master"], "readonly")
                        let objectStore_app_master = trans.objectStore("app_master")
                        let request = objectStore_app_master.get(inArray[i].id)
                        request.onsuccess = (event) => {
                            inArray[i].name = event.target.result.app_name
                            resolve()
                        }
                    })
                })
            )
        }
        Promise.all(promiseArray).then(() => {
            inArray.sort(function (a, b) {
                return b.score - a.score
            })
            resolve([inArray, mostOrLast])
        })
    })
}

function reRenderList(param, listui) {
    let dataArray = param[0]
    let mostOrLast = param[1]
    if (dataArray.length === 0) {
        listui.innerText = chrome.i18n.getMessage("molastUsedAppNoRecordsName")
    } else {
        for (var i in dataArray) {
            let listli = document.createElement("li")
            $(listui).append(listli)
            let itemHref = document.createElement("a")
            itemHref.setAttribute("class", "gaia-argoui-appscrollinglist-item")
            itemHref.href = "/k/" + dataArray[i].id
            $(listli).append(itemHref)
            let bspan1 = document.createElement("span")
            bspan1.setAttribute("class", "gaia-argoui-appscrollinglist-name")
            if (mostOrLast === "most") {
                bspan1.innerText = dataArray[i].name
            }
            if (mostOrLast === "last") {
                bspan1.innerText = dataArray[i].name
            }
            $(itemHref).append(bspan1)
        }
    }
}

function render(param, appAmount) {
    let dataArray = param[0]
    let mostOrLast = param[1]
    // show
    let bodyright = $.find('.ocean-portal-body-right')
    let rp = document.createElement("div")
    rp.setAttribute("class", "ocean-portal-widget")
    rp.setAttribute("id", "mostusedapp")
    $(bodyright).prepend(rp)

    let appList = document.createElement("div")
    appList.setAttribute("class", "gaia-argoui-widget ocean-portal-applist-widget")
    $(rp).append(appList)

    let appHeader = document.createElement("div")
    appHeader.setAttribute("class", "gaia-argoui-widget-header gaia-argoui-widget-header-icon")
    appHeader.setAttribute("style", "background-image: url(\"https://static.cybozu.com/contents/k/image/ocean/cover/documents-select.jpg\"); background-position: left top; background-repeat: no-repeat;")
    $(appList).append(appHeader)

    let appheadername = document.createElement("H3")
    appheadername.setAttribute("class", "gaia-argoui-widget-title")
    appheadername.innerText = chrome.i18n.getMessage("mostUsedAppName")
    $(appHeader).append(appheadername)

    //list
    let listui = document.createElement("ui")
    listui.setAttribute("class", "gaia-argoui-appscrollinglist-list")
    $(appList).append(listui)
    if (dataArray.length === 0) {
        if (mostOrLast === "most") {
            listui.innerText = chrome.i18n.getMessage("molastUsedAppNoRecordsName")
        }
        if (mostOrLast === "last") {
            listui.innerText = chrome.i18n.getMessage("molastUsedAppNoRecordsName")
        }
    } else {
        for (var i in dataArray) {
            let listli = document.createElement("li")
            $(listui).append(listli)
            let itemHref = document.createElement("a")
            itemHref.setAttribute("class", "gaia-argoui-appscrollinglist-item")
            itemHref.href = "/k/" + dataArray[i].id
            $(listli).append(itemHref)
            let bspan1 = document.createElement("span")
            bspan1.setAttribute("class", "gaia-argoui-appscrollinglist-name")
            // bspan1.innerText = mostapp[i].appname + "(" + mostapp[i].viewtimes + ")"
            if (mostOrLast === "most") {
                // bspan1.innerText = dataArray[i].name + "(" + dataArray[i].score + ")"
                bspan1.innerText = dataArray[i].name
            }
            if (mostOrLast === "last") {
                bspan1.innerText = dataArray[i].name
            }
            $(itemHref).append(bspan1)
        }
    }
    // pucker button
    let invisibleButton = document.createElement("a")
    invisibleButton.style.backgroundImage = unPuckeredImgUrl
    invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalPuckerName"))
    invisibleButton.setAttribute("class", "max-min-block")
    invisibleButton.onclick = () => {
        let mostAppPuckered
        $(invisibleButton).toggleClass("puckered")
        if ($(invisibleButton).hasClass('puckered')) {
            mostAppPuckered = true
            invisibleButton.style.backgroundImage = puckeredImgUrl
            invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalExpandName"))
            listui.style.display = "none"
        } else {
            mostAppPuckered = false
            invisibleButton.style.backgroundImage = unPuckeredImgUrl
            invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalPuckerName"))
            listui.style.display = "block"
        }
        savePuckeredInfo("most_app", mostAppPuckered)
    }
    appHeader.appendChild(invisibleButton)
    if (loadPuckeredInfo("most_app")) {
        $(invisibleButton).toggleClass("puckered")
        invisibleButton.style.backgroundImage = puckeredImgUrl
        invisibleButton.setAttribute("title", chrome.i18n.getMessage("portalExpandName"))
        listui.style.display = "none"
    } else {
        invisibleButton.style.backgroundImage = unPuckeredImgUrl
    }

    // switch most last
    let switchButton = document.createElement("a")
    switchButton.style.backgroundImage = doubleArrowImgUrl
    switchButton.setAttribute("title", chrome.i18n.getMessage("portalSwitchName"))
    switchButton.setAttribute("class", "max-min-block")
    switchButton.style.right = "48px"
    appHeader.appendChild(switchButton)

    switchButton.onclick = () => {
        $(listui).empty()
        $(switchButton).toggleClass("sw")
        if ($(switchButton).hasClass('sw')) {
            getLastUsedApp(appAmount).then(matchAndGetAppName).then((par) => {
                reRenderList(par, listui)
                appheadername.innerText = chrome.i18n.getMessage("lastUsedAppName")
            })
            saveAppUsageInfo("see_most_app", false)
        } else {
            getMostUsedAppIdAndScore(appAmount).then(matchAndGetAppName).then((par) => {
                reRenderList(par, listui)
                appheadername.innerText = chrome.i18n.getMessage("mostUsedAppName")
            })
            saveAppUsageInfo("see_most_app", true)
        }
    }
}

function countAccessedPages() {
    let UrlObj = new URL(location.href)
    // pathname patten like "/k/23"
    let ptnPathApp = new RegExp(/^\/k\/(\d+)(.*)$/g)
    let matPathApp = ptnPathApp.exec(UrlObj.pathname)

    if (matPathApp && matPathApp.length > 2) {
        let appIdNumber = matPathApp[1]
        let appOtherInfo = matPathApp[2]

        // when app is deleted
        if (document.title == "Error") {
            // delete from db if exist
            openDB().then(function (promiseValue) {
                let dbObj = promiseValue
                let trans = dbObj.transaction(["app_master", "app_history"], "readwrite")
                // delete master table
                let objectStore_app_master = trans.objectStore("app_master")
                let q = objectStore_app_master.delete(appIdNumber)
                q.onsuccess = e => {
                }
                q.onerror = e => {
                }
                // delete history table
                let objectStore_history = trans.objectStore("app_history")
                let indexHisId = objectStore_history.index("idx_id")
                indexHisId.openCursor().onsuccess = e => {
                    var cursor = event.target.result
                    if (cursor) {
                        if (cursor.key === appIdNumber) {
                            let delq = cursor.delete()
                            delq.onsuccess = function () {
                            }
                        }
                        cursor.continue()
                    }
                }
            })
            return
        }

        // normal situation
        let appRealName = ""
        let appViewType = 1
        if (appOtherInfo.indexOf("show") != -1 || appOtherInfo.indexOf("edit") != -1) {
            // record
            appViewType = 1
            let appBreadNameEles = document.getElementsByClassName("gaia-argoui-app-breadcrumb-item gaia-argoui-app-breadcrumb-link")
            if (appBreadNameEles.length > 0) {
                for (let ix = 0; ix < appBreadNameEles.length; ix++) {
                    let href = appBreadNameEles[ix].getAttribute("href")
                    let ptnHref = new RegExp(/^\/k\/\d+\/$/g)
                    let matchHref = ptnHref.exec(href)
                    if (matchHref && matchHref.length > 0) {
                        appRealName = appBreadNameEles[ix].innerText
                        break
                    }
                }
            }
        } else {
            // list
            appViewType = 5
            let appRealNameEles = document.getElementsByClassName("gaia-argoui-app-breadcrumb-item")
            if (appRealNameEles.length > 0) {
                appRealName = appRealNameEles[appRealNameEles.length - 1].innerText
            }
        }
        let saveMasterObj = {
            app_id: appIdNumber,
            app_name: appRealName
        }
        let saveHistoryObj = {
            app_id: appIdNumber,
            app_view_type: appViewType,
            view_datetime: new Date()
        }
        openDB().then(function (promiseValue) {
            let dbObj = promiseValue
            let trans = dbObj.transaction(["app_master", "app_history"], "readwrite")
            let objectStore_app_master = trans.objectStore("app_master")
            let requestput1 = objectStore_app_master.put(saveMasterObj)
            requestput1.onsuccess = e => {}
            requestput1.onerror = e => {}
            let objectStore_app_history = trans.objectStore("app_history")
            let requestput2 = objectStore_app_history.put(saveHistoryObj)
            requestput2.onsuccess = e => {}
            requestput2.onerror = e => {}
        })
    }

    // hash patten like "/#/space/1/thread/1"
    let ptnPathSpace = new RegExp(/^#\/space\/\d+.*$/g)
    let matchPathSpace = ptnPathSpace.exec(UrlObj.hash)
    // if (matchPathSpace && matchPathSpace.length > 0) {}

    // hash patten like "/#/ntf/mention/k/a:40:2:/136"
    let ptnPathAppInNoti = new RegExp(/^#\/ntf\/mention\/k\/a.*$/g)
    let matchPathAppInNoti = ptnPathAppInNoti.exec(UrlObj.hash)
    // if (matchPathAppInNoti && matchPathAppInNoti.length > 0) {}

    // hash patten like "/#/ntf/mention/k/space/s:40:2:/136"
    let ptnPathSpaceInNoti = new RegExp(/^#\/ntf\/mention\/k\/space\/s.*$/g)
    let matchPathSpaceInNoti = ptnPathSpaceInNoti.exec(UrlObj.hash)
    // if (matchPathSpaceInNoti && matchPathSpaceInNoti.length > 0) {}
}

function timeFn(d1) { //di作为一个变量传进来
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    // var dateBegin = new Date(d1.replace(/-/g, "/")); //将-转化为/，使用new Date
    // var dateBegin = new Date(d1)
    var dateBegin = d1
    var dateEnd = new Date() //获取当前时间
    var dateDiff = dateEnd.getTime() - dateBegin.getTime() //时间差的毫秒数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)) //计算出相差天数
    var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)
    return (dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒" + " 前")
}