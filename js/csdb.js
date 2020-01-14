function openDB() {
    return new Promise((resolve, reject) => {
        let dbopenrequest = window.indexedDB.open("kintoneaiddb", 1)
        dbopenrequest.onerror = function (event) {
            // console.log("Database error: " + event.target.errorCode)
            reject()
        }
        dbopenrequest.onsuccess = function (event) {
            // console.log("db open success")
            resolve(dbopenrequest.result)
        }
        dbopenrequest.onupgradeneeded = function (event) {
            let db = event.target.result
            db.onerror = function (errorEvent) {
                // console.log("Error upgrade database.")
            }
            if (event.oldVersion < 1) {
                let objectStore1 = db.createObjectStore("utterance_history", {
                    autoIncrement: true
                })
                objectStore1.createIndex("idx_create_datetime", "create_datetime", {
                    unique: false
                })

                db.createObjectStore("app_master", {
                    keyPath: "app_id"
                })

                let objectStore2 = db.createObjectStore("app_history", {
                    autoIncrement: true
                })
                objectStore2.createIndex("idx_id", "app_id", {
                    unique: false
                })
                objectStore2.createIndex("idx_view_datetime", "view_datetime", {
                    unique: false
                })
            }
        }
    })
}