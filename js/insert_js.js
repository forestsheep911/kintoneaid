let s = document.createElement('script');
s.src = chrome.extension.getURL('js/ij.js');
s.onload = function () {
    setTimeout(() => {
        console.log(this)
        this.parentNode.removeChild(this);
    }, 20000);
};
(document.head || document.documentElement).appendChild(s);
console.log(s)