kintone.events.on('portal.show', function (event) {
    window.postMessage({
        "id": "fddekggkcckafbhlmjkbmhilkodcnaao",
        "msg": "on.kintone.portal.show"
    }, document.URL)
})

kintone.events.on('app.record.index.show', function (event) {
    console.log("app.record.index.show")
})
kintone.events.on('app.record.detail.show', function (event) {
    console.log("app.record.detail.show")
})
kintone.events.on('app.record.print.show', function (event) {
    console.log("app.record.print.show")
})