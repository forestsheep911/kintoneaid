const MAX_MOST_USE_APP = 3

function doAfterCreated(tab) {
    console.log(tab)
    let URLobj = new URL(tab.url)
    console.log(URLobj)
    // if (URLobj.hostname === "bozuman.cybozu.com" && URLobj.pathname.startsWith("/k/")) {
    //     console.log(URLobj)
    // }
    console.log(URLobj.pathname)
    let ptn = new RegExp(/^\/k\/\d+\/$/g)
    let matchReg
    if ((matchReg = ptn.exec(URLobj.pathname)) != null) {
        console.log(matchReg)
        openDB().then(function (promiseValue) {
            let dbobj = promiseValue
            console.log(dbobj)
            let trans = dbobj.transaction(["mostuseapp"], "readwrite")
            let objectStore = trans.objectStore("mostuseapp")

            let requestget = objectStore.get(URLobj.href)
            requestget.onsuccess = e => {
                let obj = e.target.result
                console.log(obj)
                let splitString = " - "
                let appName = tab.title.split(splitString)[0]
                let putdata = {
                    "apphref": URLobj.origin + URLobj.pathname,
                    "appname": appName,
                    "viewtimes": obj != null ? obj.viewtimes + 1 : 1
                }
                let requestput = objectStore.put(putdata)
                requestput.onsuccess = e => {
                    let obj = e.target.result
                    console.log(obj)
                }
                requestget.onerror = e => {
                    console.log(e)
                }
            }
            requestget.onerror = e => {
                console.log(e)
            }
        })
    } else {
        console.log(matchReg)
    }
}

function getData(maxcount, tab) {
    openDB().then(function (promiseValue) {
        let dbobj = promiseValue
        console.log(dbobj)
        let trans = dbobj.transaction(["mostuseapp"], "readwrite")
        let objectStore = trans.objectStore("mostuseapp")
        let ind = objectStore.index("viewtimes")
        let xx = {}
        let readyToSendArray = []
        console.log(tab)
        let senderUrlObj = new URL(tab.url)
        console.log(senderUrlObj)
        console.log(senderUrlObj.host)

        ind.openCursor(null, "prev").onsuccess = e => {
            var cursor = event.target.result
            if (cursor) {
                // let apphref = cursor.value.apphref
                // xx[apphref] = cursor.value.appname
                xx.apphref = cursor.value.apphref
                let xxUrlObj = new URL(xx.apphref)
                console.log(xxUrlObj)
                console.log(xxUrlObj.host)
                xx.appname = cursor.value.appname
                xx.viewtimes = cursor.value.viewtimes
                if (senderUrlObj.host == xxUrlObj.host) {
                    readyToSendArray.push(xx)
                }
                xx = {}
                cursor.continue()
            } else {
                // no more results
                console.log(readyToSendArray)
                let c = 0
                for (i in readyToSendArray) {
                    c++
                    if (c > maxcount) {
                        // delete readyToSendArray[i]
                        readyToSendArray.splice(i)
                    }
                }
                console.log(readyToSendArray)
                chrome.tabs.sendMessage(tab.id, readyToSendArray, null, function (response) {})
            }
        }
    })
}

chrome.tabs.onUpdated.addListener(function (tabID, changeInfo, tab) {
    if (changeInfo.status && changeInfo.status == "complete") {
        doAfterCreated(tab)
    }
})

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message)
    if (message.mostuseappnum) {
        getData(message.mostuseappnum, sender.tab)
        sendResponse("max number has been sent --by background")
    }
    console.log(message.mostuseappon)
    if (message.mostuseappon) {
        let config = JSON.parse(localStorage.config)
        console.log(config.most_app)
        sendResponse(config.most_app)
    }
})