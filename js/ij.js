try {
    kintone.events.on('portal.show', function (event) {
        window.postMessage({
            "id": "aifcogmioeencjbmlgcfnfkgffahnmpf",
            "msg": "on.kintone.portal.show"
        }, document.URL)
    })

    let loginUser = kintone.getLoginUser()
    window.postMessage({
        "id": "aifcogmioeencjbmlgcfnfkgffahnmpf",
        "msg": "kintone.getLoginUser",
        "info": loginUser
    }, document.URL)
}
catch (e){
    if (e instanceof ReferenceError) {
        // console.log(e)
    }
}