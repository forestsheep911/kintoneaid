kintone.events.on('portal.show', function (event) {
    window.postMessage({
        "id": "fddekggkcckafbhlmjkbmhilkodcnaao",
        "msg": "on.kintone.portal.show"
    }, document.URL);
});