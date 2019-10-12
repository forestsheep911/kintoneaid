function doAfterCreated(tab) {
    console.log(tab)
    let URLobj = new URL(tab.url)
    console.log(URLobj)
    if (URLobj.hostname === "bozuman.cybozu.com" && URLobj.pathname.startsWith("/k/")) {
        console.log(URLobj)
    }
    console.log(URLobj.pathname)
    let ptn = new RegExp(/\/k\/\d+\//g)
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
                // if (obj) {
                let putdata = {
                    "apphref": URLobj.href,
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
    // setTimeout(() => {
    //     chrome.tabs.query({
    //         "url": URLobj.href
    //     }, function (tab) {
    //         console.log(tab)
    //     })
    // }, 3000)
}

chrome.tabs.onUpdated.addListener(function (tabID, changeInfo, tab) {
    console.log(tabID)
    console.log(changeInfo)
    if (changeInfo.status && changeInfo.status == "complete") {
        doAfterCreated(tab)
    }
})