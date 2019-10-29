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
        if (document.getElementsByClassName('ocean-portal-body-right').length == 0) {
            console.log("found not in portal")
            // return
        } else {
            console.log($('#mostusedapp'))
            if ($('#mostusedapp').length > 0) {
                console.log("already have mua")
            } else {
                console.log("no mua")
                chrome.runtime.sendMessage(null, {
                    "mostusedapp": true
                }, null, function (response) {
                    console.log(response)
                })
            }
        }

        // easy at
        console.log("start easy at inject in hash change")
        // atinject()
        chrome.runtime.sendMessage(null, {
            "easyat": true
        }, null, function (response) {
            console.log(response)
        })

        // big user icon
        console.log("start big user icon inject in hash change")
        // photoinject()
        chrome.runtime.sendMessage(null, {
            "bigusericon": true
        }, null, function (response) {
            console.log(response)
        })
    }, 1400)
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
    } else {
        sendResponse("none of my bussiness -- by event reg")
    }
})