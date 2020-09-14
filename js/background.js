chrome.runtime.onInstalled.addListener(function (details) {
    // console.log(details)
    if (!localStorage.config) {
        localStorage.config = JSON.stringify({
            cus_por: true,
            big_icon: true,
            easy_at: true,
            easy_at_cus_text: "@",
            most_app: true,
            most_app_num: 5,
            utter_history: true
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

    
})

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf))
}

function isEasyAtEnable(tab) {
    let ableValue = true
    let cus_text = "@"
    if (localStorage.config) {
        let config = JSON.parse(localStorage.config)
        ableValue = config.easy_at !== false
        cus_text = config.easy_at_cus_text ? config.easy_at_cus_text : "@"
    }
    chrome.tabs.sendMessage(tab.id, {
        easy_at_enable: ableValue,
        easy_at_mention_mark: cus_text
    }, null, function (response) {})
}

function isBigUserIconEnable(tab) {
    let ableValue = true
    if (localStorage.config) {
        let config = JSON.parse(localStorage.config)
        ableValue = config.big_icon !== false
    }
    chrome.tabs.sendMessage(tab.id, {
        big_user_icon_enable: ableValue,
    }, null, function (response) {})
}

function isCustomizePortalEnable(tab) {
    let ableValue = true
    if (localStorage.config) {
        let config = JSON.parse(localStorage.config)
        ableValue = config.cus_por !== false
    }
    chrome.tabs.sendMessage(tab.id, {
        customize_portal_enable: ableValue,
    }, null, function (response) {})
}

function isUtterHistoryEnable(tab) {
    let ableValue = true
    if (localStorage.config) {
        let config = JSON.parse(localStorage.config)
        ableValue = config.utter_history !== false
    }
    chrome.tabs.sendMessage(tab.id, {
        utter_history_enable: ableValue,
    }, null, function (response) {})
}

function getMostUsedAppData(tab) {
    // get on or off and maxnumber
    let maxCount = 5
    if (localStorage.config) {
        let config = JSON.parse(localStorage.config)
        if (config.most_app === false) {
            return
        } else {
            maxCount = config.most_app_num ? config.most_app_num : 5
        }
    }
    chrome.tabs.sendMessage(tab.id, {
        most_used_app_enable: true,
        max: maxCount
    }, null, function (response) {})
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
                requestput.onerror = e => {
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

chrome.tabs.onUpdated.addListener(function (tabID, changeInfo, tab) {
    if (changeInfo.status && changeInfo.status == "complete") {
        doAfterCreated(tab)
    }
})

chrome.webRequest.onCompleted.addListener(
    function (details) {
        chrome.tabs.get(details.tabId, function (tab) {
            let utterSpace
            let utterApp
            let utterNotiApp
            let ptnSpace = new RegExp(/\/k\/#\/space/g)
            let ptnNotiSpace = new RegExp(/\/k\/#\/ntf\/mention\/k\/space/g)
            let ptnNotiApp = new RegExp(/\/k\/#\/ntf\/mention\/k\/(?!space)/g)
            let ptnApp = new RegExp(/\/k\/\d+\//g)
            if (ptnSpace.exec(tab.url) != null) {
                utterSpace = true
                utterApp = false
                utterNotiApp = false
            } else if (ptnApp.exec(tab.url) != null) {
                utterSpace = false
                utterApp = true
                utterNotiApp = false
            } else if (ptnNotiSpace.exec(tab.url) != null) {
                utterSpace = true
                utterApp = false
                utterNotiApp = false
            } else if (ptnNotiApp.exec(tab.url) != null) {
                utterSpace = false
                utterApp = false
                utterNotiApp = true
            }
            chrome.tabs.sendMessage(tab.id, {
                utterInSpace: utterSpace,
                utterInApp: utterApp,
                utterInNotiApp: utterNotiApp
            }, null, function (response) {
                // todo save db
            })
        })
    }, {
        urls: ["https://*/k/api/comment/add.json*", "https://*/k/api/space/thread/post/add.json*"]
    },
    ["responseHeaders"]
)

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // console.log(message)
    if (message.mostusedapp) {
        // console.log("start most used app")
        getMostUsedAppData(sender.tab)
        sendResponse("most used app request has been received. --by background")
    }
    if (message.utterHistory) {
        // console.log("start utter history")
        isUtterHistoryEnable(sender.tab)
        sendResponse("utter history request has been received. --by background")
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