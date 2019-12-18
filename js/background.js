chrome.runtime.onInstalled.addListener(function (details) {
    // console.log(details)
    if (!localStorage.config) {
        localStorage.config = JSON.stringify({
            cus_por: true,
            big_icon: true,
            easy_at: true,
            easy_at_cus_text: "@",
            most_app: true,
            most_app_num: 5
        })
    }

    chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (let key in changes) {
            let storageChange = changes[key]
            if (key == "config") {
                localStorage.config = storageChange.newValue
            }
        }
    })

    // chrome.webRequest.onBeforeRequest.addListener(
    //     function (details) {
    //         let nstString = ab2str(details.requestBody.raw[0].bytes)
    //         // console.log(nstString)
    //         chrome.tabs.get(details.tabId, function (tab) {})
    //     }, {
    //         urls: ["https://*/k/api/comment/add.json*", "https://*/k/api/space/thread/post/add.json*"]
    //     },
    //     ["requestBody"]
    // )
})

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf))
}

function isEasyAtEnable(tab) {
    if (localStorage.config != null) {
        let config = JSON.parse(localStorage.config)
        let easyAtEnable = config.easy_at ? true : false
        // if (!easyAtEnable) {
        chrome.tabs.sendMessage(tab.id, {
            easy_at_enable: easyAtEnable,
            easy_at_mention_mark: config.easy_at_cus_text
        }, null, function (response) {
            // console.log(response)
        })
    } else {
        chrome.tabs.sendMessage(tab.id, {
            easy_at_enable: true
        }, null, function (response) {
            // console.log(response)
        })
        return
    }
}

function isBigUserIconEnable(tab) {
    if (localStorage.config != null) {
        let config = JSON.parse(localStorage.config)
        let bigUserIconEnable = config.big_icon ? true : false
        // if (!bigUserIconEnable) {
        chrome.tabs.sendMessage(tab.id, {
            big_user_icon_enable: bigUserIconEnable
        }, null, function (response) {
            // console.log(response)
        })
    } else {
        chrome.tabs.sendMessage(tab.id, {
            big_user_icon_enable: true
        }, null, function (response) {
            // console.log(response)
        })
        return
    }
}

function isCustomizePortalEnable(tab) {
    if (localStorage.config) {
        let config = JSON.parse(localStorage.config)
        let customizePortalEnable = config.cus_por ? true : false
        chrome.tabs.sendMessage(tab.id, {
            customize_portal_enable: customizePortalEnable
        }, null, function (response) {
            // console.log(response)
        })
    } else {
        chrome.tabs.sendMessage(tab.id, {}, null, function (response) {
            // console.log(response)
        })
        return
    }
}

function doAfterCreated(tab) {
    let URLobj = new URL(tab.url)
    let ptn = new RegExp(/^\/k\/\d+\/$/g)
    // let matchReg
    if ((ptn.exec(URLobj.pathname)) != null) {
        openDB().then(function (promiseValue) {
            let dbobj = promiseValue
            let trans = dbobj.transaction(["mostuseapp"], "readwrite")
            let objectStore = trans.objectStore("mostuseapp")

            let requestget = objectStore.get(URLobj.href)
            requestget.onsuccess = e => {
                let obj = e.target.result
                // console.log(obj)
                let splitString = " - "
                let appName = tab.title.split(splitString)[0]
                let putdata = {
                    "apphref": URLobj.origin + URLobj.pathname,
                    "appname": appName,
                    "viewtimes": obj != null ? obj.viewtimes + 1 : 1
                }
                let requestput = objectStore.put(putdata)
                requestput.onsuccess = e => {
                    // let obj = e.target.result
                }
                requestget.onerror = e => {
                    // console.log(e)
                }
            }
            requestget.onerror = e => {
                // console.log(e)
            }
        })
    } else {
        // console.log(matchReg)
    }
}

function getMostUsedAppData(tab) {
    // puckered
    // let puckered = JSON.parse(localStorage.pucker)
    // let mostAppPuckered = puckered ? puckered.most_app : false
    // console.log(puckered)
    // get on or off and maxnumber
    let maxCount
    if (localStorage.config != null) {
        let config = JSON.parse(localStorage.config)
        let mostAppEnable = config.most_app ? true : false
        if (!mostAppEnable) return
        maxCount = config.most_app_num
    } else {
        maxCount = 5
    }
    console.log("1")
    openDB().then(function (promiseValue) {
        let dbobj = promiseValue
        console.log("2")
        let trans = dbobj.transaction(["mostuseapp"], "readwrite")
        console.log("3")
        let objectStore = trans.objectStore("mostuseapp")
        let ind = objectStore.index("viewtimes")
        let xx = {}
        let readyToSendArray = []
        let senderUrlObj = new URL(tab.url)

        ind.openCursor(null, "prev").onsuccess = e => {
            var cursor = event.target.result
            if (cursor) {
                xx.apphref = cursor.value.apphref
                let xxUrlObj = new URL(xx.apphref)
                xx.appname = cursor.value.appname
                xx.viewtimes = cursor.value.viewtimes
                if (senderUrlObj.host == xxUrlObj.host) {
                    readyToSendArray.push(xx)
                }
                xx = {}
                cursor.continue()
            } else {
                // no more results
                let c = 0
                for (var i in readyToSendArray) {
                    c++
                    if (c > maxCount) {
                        // delete readyToSendArray[i]
                        readyToSendArray.splice(i)
                    }
                }
                // console.log(readyToSendArray)
                chrome.tabs.sendMessage(tab.id, {
                    most_used_app_enable: true,
                    apps: readyToSendArray
                    // puckered: mostAppPuckered
                }, null, function (response) {
                    // console.log(response)
                })
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
    // console.log(message)
    if (message.mostusedapp) {
        console.log("start most used app")
        getMostUsedAppData(sender.tab)
        sendResponse("most used app request has been received. --by background")
    }
    if (message.bigusericon) {
        // console.log("start big user icon")
        isBigUserIconEnable(sender.tab)
        sendResponse("big user icon request has been received. --by background")
    }
    if (message.easyat) {
        // console.log("start easy at")
        isEasyAtEnable(sender.tab)
        sendResponse("easy at request has been received. --by background")
    }
    if (message.customizeportal) {
        // console.log("start customize portal")
        isCustomizePortalEnable(sender.tab)
        sendResponse("customize portal request has been received. --by background")
    }
})