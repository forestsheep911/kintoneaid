let s = document.createElement('script')
s.src = chrome.extension.getURL('js/ij.js')
s.onload = function () {
    setTimeout(() => {
        this.parentNode.removeChild(this);
    }, 20000);
};
(document.head || document.documentElement).appendChild(s)