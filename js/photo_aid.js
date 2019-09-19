window.onload = function () {
    // for detail
    let findusericon = $.find('.user-link-cybozu > img')
    if (findusericon.length != 0) {
        let usericon
        $(findusericon).mouseenter(function (e) {
            usericon = document.createElement("img")
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
            usericon.remove()
        })
    }
    let finduserspan = $.find('.user-link-cybozu > span')
    if (finduserspan.length != 0) {
        let usericon
        $(finduserspan).mouseenter(function (e) {
            usericon = document.createElement("img")
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
            usericon.remove()
        })
    }

    // for comment
    let findusercomicon = $.find('.itemlist-userImage-gaia > img')
    if (findusercomicon.length != 0) {
        let usericon
        $(findusercomicon).mouseenter(function (e) {
            usericon = document.createElement("img")
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
            usericon.remove()
        })
    }
}

// for notification
setTimeout(() => {
    let myiframe = $('iframe')
    if (myiframe.length != 0) {
        let findusericon = myiframe.contents().find(".user-link-cybozu > img")
        if (findusericon.length != 0) {
            $(findusericon).mouseenter(function (e) {
                usericon = document.createElement("img")
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
                usericon.remove()
            })
        }

        let finduserspan = myiframe.contents().find(".user-link-cybozu > span")
        if (finduserspan.length != 0) {
            $(finduserspan).mouseenter(function (e) {
                usericon = document.createElement("img")
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
                usericon.remove()
            })
        }

        // for noti comment
        let findusercomicon = myiframe.contents().find(".itemlist-userImage-gaia > img")
        console.log(findusercomicon)
        if (findusercomicon.length != 0) {
            $(findusercomicon).mouseenter(function (e) {
                usericon = document.createElement("img")
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
                usericon.remove()
            })
        }
    }

    // for list
    let finduserlisticon = $.find('.recordlist-username-gaia > img')
    if (finduserlisticon.length != 0) {
        let usericon
        $(finduserlisticon).mouseenter(function (e) {
            usericon = document.createElement("img")
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
            usericon.remove()
        })
    }
    let finduserlistspan = $.find('.recordlist-username-gaia > span')
    if (finduserlistspan.length != 0) {
        let usericon
        $(finduserlistspan).mouseenter(function (e) {
            usericon = document.createElement("img")
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
            usericon.remove()
        })
    }
}, 2000)