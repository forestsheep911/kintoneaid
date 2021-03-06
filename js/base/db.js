function openDB() {
    return new Promise((resolve, reject) => {
        let dbopenrequest = window.indexedDB.open("savedata", 2)

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
                let objectStore = db.createObjectStore("mostuseapp", {
                    keyPath: "apphref"
                })
                objectStore.createIndex("viewtimes", "viewtimes", {
                    unique: false
                })
            }
        }
    })
}