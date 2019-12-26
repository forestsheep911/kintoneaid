function showUtter(loginUserId) {
    let bodyright = $.find('.ocean-portal-body-left')
    let uh = document.createElement("div")
    uh.setAttribute("class", "ocean-portal-widget")
    uh.setAttribute("id", "utter-history")
    $(bodyright).prepend(uh)



    let widget = document.createElement("div")
    widget.setAttribute("class", "gaia-argoui-widget")
    widget.setAttribute("style", "position: relative;")
    $(uh).append(widget)

    let header = document.createElement("div")
    header.setAttribute("class", "gaia-argoui-widget-header gaia-argoui-widget-header-icon")
    header.setAttribute("style", "background-image: url(\"https://static.cybozu.cn/contents/k/image/ocean/cover/compass-select.jpg\"); background-position: left top; background-repeat: no-repeat;")
    $(widget).append(header)

    let menuTitle = document.createElement("h3")
    menuTitle.setAttribute("class", "gaia-argoui-widget-title")
    menuTitle.innerText = "Utterance History"
    $(header).append(menuTitle)

    // test table

    let tableStruct = '<table id="example" class="table table-striped table-bordered" style="width:100%"><thead></thead><tbody></tbody></table>'
    $(widget).append(tableStruct)

    //list
    let listui = document.createElement("ui")
    listui.setAttribute("class", "gaia-argoui-appscrollinglist-list")
    $(widget).append(listui)

    openDB().then(function (promiseValue) {
        let dbobj = promiseValue
        let trans = dbobj.transaction(["utterance_history"], "readwrite")
        let objectStore = trans.objectStore("utterance_history")
        let ind = objectStore.index("cdt")
        let fillarraywithinobj = []
        ind.openCursor(null, "prev").onsuccess = e => {
            var cursor = event.target.result
            if (cursor) {
                if (loginUserId == cursor.value.utterUserId) {
                    let fillobj = {}
                    // let listlItem = document.createElement("li")
                    // $(listui).append(listlItem)

                    let utterContentAndHref = document.createElement("a")
                    utterContentAndHref.setAttribute("style", "margin-left:20px")
                    utterContentAndHref.innerText = Decrypt(cursor.value.contentSummary)
                    utterContentAndHref.href = Decrypt(cursor.value.link)
                    // $(listlItem).append(utterContentAndHref)
                    // fillobj.utterence = Decrypt(cursor.value.contentSummary)
                    fillobj.utterence = utterContentAndHref.outerHTML
                    console.log(utterContentAndHref.outerHTML)

                    let createDateTime = document.createElement("span")
                    createDateTime.setAttribute("style", "position: absolute; top:0; right:8px; max-width: 200px; white-space: nowrap; overflow:hidden; text-align: right")
                    createDateTime.innerText = cursor.value.CreateDateTime.Format("yyyy-MM-dd hh:mm:ss")
                    // $(listlItem).append(createDateTime)
                    fillobj.datetime = cursor.value.CreateDateTime.Format("yyyy-MM-dd hh:mm:ss")

                    fillarraywithinobj.push(fillobj)
                    console.log(fillarraywithinobj)

                    cursor.continue()
                } else {
                    cursor.continue()
                }
            } else {
                // no more results
                console.log(fillarraywithinobj)
                $('#example').DataTable({
                    info: true,
                    searching: true,
                    scrollY: true,
                    scrollX: true,
                    data: fillarraywithinobj,
                    autoWidth: false,
                    order: [
                        [1, "desc"],
                    ],
                    columnDefs: [{
                        targets: 0,
                        type: "html"
                    }, {
                        targets: 1,
                        width: "160px"
                    }],
                    columns: [{
                            data: "utterence",
                            title: "utterence"
                        },
                        {
                            data: "datetime",
                            title: "datatime"
                        }
                    ]
                })
            }
        }
    })
}