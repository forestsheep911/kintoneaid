let puckeredImgUrl = "url(" + chrome.extension.getURL('icon/ddown.png') + ")"
let unPuckeredImgUrl = "url(" + chrome.extension.getURL('icon/dup.png') + ")"
let doubleArrowImgUrl = "url(" + chrome.extension.getURL('icon/double_arrow.png') + ")"
let loginUserId

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

function saveAppUsageInfo(field, boolValue) {
    if (localStorage.kaidUsage) {
        let usageJson = JSON.parse(localStorage.kaidUsage)
        usageJson[field] = boolValue
        localStorage.kaidUsage = JSON.stringify(usageJson)
    } else {
        let jsonPass = {}
        jsonPass[field] = boolValue
        localStorage.kaidUsage = JSON.stringify(jsonPass)
    }
}

function loadAppUsageInfo(field) {
    let usageInfo = JSON.parse(localStorage.kaidUsage ? localStorage.kaidUsage : "{}")
    return usageInfo ? usageInfo[field] ? true : false : false
}