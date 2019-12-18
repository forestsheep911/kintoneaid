let appenStringFormat = "<a class=\"ocean-ui-plugin-mention-user ocean-ui-plugin-linkbubble-no\" href=\"{0}\" data-mention-id=\"{1}\" tabindex=\"-1\" style=\"-webkit-user-modify: read-only;\">@{2}</a>&nbsp;"

function stringFormat(src) {
    if (arguments.length === 0) return null
    let args = Array.prototype.slice.call(arguments, 1)
    return src.replace(/\{(\d+)\}/g, function (m, i) {
        return args[i]
    })
}

function placeCaretAtEnd(jsDom) { //传入光标要去的jsDom节点
    jsDom.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(jsDom);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(jsDom);
        textRange.collapse(false);
        textRange.select();
    }
}

function atinject(atMarkString) {
    // 0 path
    // 1 mentionid
    // 2 username
    let finduserhref = $.find('.user-link-cybozu')

    if (finduserhref.length != 0) {
        doloop(finduserhref, false, atMarkString)
    }

    let myiframe = $('iframe')
    if (myiframe.length != 0) {
        let finduserhref = myiframe.contents().find('.user-link-cybozu')
        doloop(finduserhref, true, atMarkString)
    }
}

function doloop(finduserhref, isNoti, atMarkString) {
    for (let i = 0; i < finduserhref.length; i++) {
        // popstate may create duplicated @, if find @ href, skip
        // console.log(finduserhref[i])
        // console.log($(finduserhref[i]).next())
        if ($(finduserhref[i]).next().length > 0) {
            continue
        }
        // user path
        let newurl = new URL(finduserhref[i].href)
        let path = finduserhref[i].href.substring(newurl.protocol.length + newurl.hostname.length + 2)
        // user id here is called mention id whatever
        let photosrc = $(finduserhref[i]).children()[0].src
        let photosrcurl = new URL(photosrc)
        let mentionid = photosrcurl.searchParams.get('id')
        //user name
        let username = $(finduserhref[i]).children()[1].innerText
        // create the <a> element "at"
        let ata = document.createElement("a")
        ata.style = 'margin-left: 5px'
        ata.innerText = atMarkString
        /*jshint -W083 */
        $(ata).click(function () {
            let replybox
            if (isNoti) {
                replybox = $('iframe').contents().find('.ocean-ui-comments-commentform-textarea')
            } else {
                replybox = $.find('.ocean-ui-comments-commentform-textarea')
            }
            $(replybox).focus()
            let replyinputareas
            if (isNoti) {
                replyinputareas = $('iframe').contents().find('.ocean-ui-editor-field')
            } else {
                replyinputareas = $.find('.ocean-ui-editor-field')
            }
            let replyinputarea
            if (replyinputareas.length === 0) {
                return
            } else {
                replyinputarea = replyinputareas[0]
            }
            let lasteles = $(replyinputarea).children().last()
            if (lasteles.length > 0) {
                let lastele = lasteles[0]
                // 其他情况不是进入br就是进入div，都可以移动到文末
                if (lastele.nodeName === "BR") {
                    $(lastele).before(stringFormat(appenStringFormat, path, mentionid, username))
                    placeCaretAtEnd(replyinputarea)
                } else if (lastele.nodeName === "DIV") {
                    let divbr = $(lastele).children().last()
                    if (divbr.length > 0 && divbr[0].nodeName === "BR") {
                        $(divbr[0]).before(stringFormat(appenStringFormat, path, mentionid, username))
                    } else {
                        $(lastele).append(stringFormat(appenStringFormat, path, mentionid, username))
                    }
                    placeCaretAtEnd(replyinputarea)
                } else {
                    // 如果在第一行输入些文字，然后点@，再点一次@，会进入这里
                    $(replyinputarea).append(stringFormat(appenStringFormat, path, mentionid, username))
                    placeCaretAtEnd(replyinputarea)
                }
            } else {
                // 如果在第一行输入些文字，然后点@，会进入这里
                $(replyinputarea).append(stringFormat(appenStringFormat, path, mentionid, username))
                placeCaretAtEnd(replyinputarea)
            }
        })
        // append the element
        $(finduserhref[i]).parent().append(ata)
    }
}

chrome.runtime.sendMessage(null, {
    "easyat": true
}, null, function (response) {})