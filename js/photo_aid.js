function photoinject() {
    // for detail
    let findusericon = $.find('.user-link-cybozu > img')
    // console.log(findusericon)
    if (findusericon.length != 0) {
        let usericon = document.createElement("img")
        $(findusericon).mouseenter(function (e) {
            // usericon = document.createElement("img")
            usericon.src = e.target.src.replace(/SMALL/g, "ORIGINAL")
            usericon.setAttribute("class", "showlarge")
            $('body').append(usericon)
        })

        $(findusericon).mousemove(function (e) {
            usericon.style.left = e.clientX + 25 + "px"
            if (e.clientY + usericon.height > document.body.clientHeight) {
                let y = document.body.clientHeight - usericon.height - 50
                usericon.style.top = y + "px"
            } else {
                usericon.style.top = e.clientY - 100 + "px"
            }
        })

        $(findusericon).mouseout(function (e) {
            // usericon.remove()
            if (typeof (usericon) != "undefined") {
                usericon.remove()
            }
        })
    }
    let finduserspan = $.find('.user-link-cybozu > span')
    // console.log(finduserspan)
    if (finduserspan.length != 0) {
        let usericon = document.createElement("img")
        $(finduserspan).mouseenter(function (e) {
            // usericon = document.createElement("img")
            usericon.src = $(e.target).prev()[0].src.replace(/SMALL/g, "ORIGINAL")
            usericon.setAttribute("class", "showlarge")
            $('body').append(usericon)
        })

        $(finduserspan).mousemove(function (e) {
            usericon.style.left = e.clientX + 25 + "px"
            if (e.clientY + usericon.height > document.body.clientHeight) {
                let y = document.body.clientHeight - usericon.height - 50
                usericon.style.top = y + "px"
            } else {
                usericon.style.top = e.clientY - 100 + "px"
            }
        })

        $(finduserspan).mouseout(function (e) {
            if (typeof (usericon) != "undefined") {
                usericon.remove()
            }
        })
    }

    // for comment
    let findusercomicon = $.find('.itemlist-userImage-gaia > img')
    if (findusercomicon.length != 0) {
        let usericon = document.createElement("img")
        $(findusercomicon).mouseenter(function (e) {
            // usericon = document.createElement("img")
            usericon.src = e.target.src.replace(/NORMAL/g, "ORIGINAL")
            usericon.setAttribute("class", "showlarge")
            $('body').append(usericon)
        })

        $(findusercomicon).mousemove(function (e) {
            usericon.style.left = e.clientX - 425 + "px"
            if (e.clientY + usericon.height > document.body.clientHeight) {
                let y = document.body.clientHeight - usericon.height - 50
                usericon.style.top = y + "px"
            } else {
                usericon.style.top = e.clientY - 100 + "px"
            }
        })

        $(findusercomicon).mouseout(function (e) {
            if (typeof (usericon) != "undefined") {
                usericon.remove()
            }
        })
    }

    // for notification
    let myiframe = $('iframe')
    if (myiframe.length != 0) {
        let findusericon = myiframe.contents().find(".user-link-cybozu > img")
        if (findusericon.length != 0) {
            let usericon = document.createElement("img")
            $(findusericon).mouseenter(function (e) {
                // usericon = document.createElement("img")
                usericon.src = e.target.src.replace(/SMALL/g, "ORIGINAL")
                usericon.style.position = "fixed"
                usericon.style.width = "400px"
                usericon.style.height = "auto"
                myiframe.contents().find('body').append(usericon)
            })

            $(findusericon).mousemove(function (e) {
                usericon.style.left = e.clientX + 25 + "px"
                usericon.style.top = e.clientY - 100 + "px"
            })

            $(findusericon).mouseout(function (e) {
                if (typeof (usericon) != "undefined") {
                    usericon.remove()
                }
            })
        }

        let finduserspan = myiframe.contents().find(".user-link-cybozu > span")
        if (finduserspan.length != 0) {
            let usericon = document.createElement("img")
            $(finduserspan).mouseenter(function (e) {
                // usericon = document.createElement("img")
                usericon.src = $(e.target).prev()[0].src.replace(/SMALL/g, "ORIGINAL")
                usericon.style.position = "fixed"
                usericon.style.width = "400px"
                usericon.style.height = "auto"
                myiframe.contents().find('body').append(usericon)
            })

            $(finduserspan).mousemove(function (e) {
                usericon.style.left = e.clientX + 25 + "px"
                usericon.style.top = e.clientY - 100 + "px"
            })

            $(finduserspan).mouseout(function (e) {
                if (typeof (usericon) != "undefined") {
                    usericon.remove()
                }
            })
        }

        // for noti comment
        let findusercomicon = myiframe.contents().find(".itemlist-userImage-gaia > img")
        if (findusercomicon.length != 0) {
            let usericon = document.createElement("img")
            $(findusercomicon).mouseenter(function (e) {
                // usericon = document.createElement("img")
                usericon.src = e.target.src.replace(/NORMAL/g, "ORIGINAL")
                usericon.style.position = "fixed"
                usericon.style.width = "400px"
                usericon.style.height = "auto"
                myiframe.contents().find('body').append(usericon)
            })

            $(findusercomicon).mousemove(function (e) {
                usericon.style.left = e.clientX - 425 + "px"
                usericon.style.top = e.clientY - 100 + "px"
            })

            $(findusercomicon).mouseout(function (e) {
                if (typeof (usericon) != "undefined") {
                    usericon.remove()
                }
            })
        }
    }

    // for list
    let finduserlisticon = $.find('.recordlist-username-gaia > img')
    if (finduserlisticon.length != 0) {
        let usericon = document.createElement("img")
        $(finduserlisticon).mouseenter(function (e) {
            // usericon = document.createElement("img")
            usericon.src = e.target.src.replace(/SMALL/g, "ORIGINAL")
            usericon.setAttribute("class", "showlarge")
            $('body').append(usericon)
        })

        $(finduserlisticon).mousemove(function (e) {
            if (e.clientX + usericon.width > document.body.clientWidth) {
                let x = e.clientX - usericon.width - 25
                usericon.style.left = x + "px"
            } else {
                usericon.style.left = e.clientX + 25 + "px"
            }
            if (e.clientY + usericon.height > document.body.clientHeight) {
                let y = document.body.clientHeight - usericon.height - 50
                usericon.style.top = y + "px"
            } else {
                usericon.style.top = e.clientY - 100 + "px"
            }
        })

        $(finduserlisticon).mouseout(function (e) {
            if (typeof (usericon) != "undefined") {
                usericon.remove()
            }
        })
    }
    let finduserlistspan = $.find('.recordlist-username-gaia > span')
    if (finduserlistspan.length != 0) {
        let usericon = document.createElement("img")
        $(finduserlistspan).mouseenter(function (e) {
            // usericon = document.createElement("img")
            usericon.src = $(e.target).prev()[0].src.replace(/SMALL/g, "ORIGINAL")
            usericon.setAttribute("class", "showlarge")
            $('body').append(usericon)
        })

        $(finduserlistspan).mousemove(function (e) {
            if (e.clientX + usericon.width > document.body.clientWidth) {
                let x = e.clientX - usericon.width - 25
                usericon.style.left = x + "px"
            } else {
                usericon.style.left = e.clientX + 25 + "px"
            }
            if (e.clientY + usericon.height > document.body.clientHeight) {
                let y = document.body.clientHeight - usericon.height - 50
                usericon.style.top = y + "px"
            } else {
                usericon.style.top = e.clientY - 100 + "px"
            }
        })

        $(finduserlistspan).mouseout(function (e) {
            if (typeof (usericon) != "undefined") {
                usericon.remove()
            }
        })
    }
}

chrome.runtime.sendMessage(null, {
    "bigusericon": true
}, null, function (response) {})