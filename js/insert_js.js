let s = document.createElement('script')
s.src = chrome.extension.getURL('js/ij.js')
s.onload = function () {
    setTimeout(() => {
        this.parentNode.removeChild(this);
    }, 20000);
};
(document.head || document.documentElement).appendChild(s)

// openDB().then(function (promiseValue) {
//     let dbobj = promiseValue
//     let trans = dbobj.transaction(["utterance_history"], "readwrite")
//     let objectStore = trans.objectStore("utterance_history")
//     let requestget = objectStore.get(6)
//     requestget.onsuccess = e => {
//         let obj = e.target.result
//         console.log(obj)
//         let mydate = new Date(obj.CreateDateTime)
//         console.log(mydate)
//         console.log(mydate.getFullYear())
//         console.log(mydate.getHours())
//         console.log(mydate.getMinutes())
//     }
// })