/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
document.addEventListener('DOMContentLoaded', async () => {
  chrome.storage.local.get(['key'], (result) => {
    if (result && result.key) {
      document.getElementById('openAiKey').value = result.key
    }
  })

  document.getElementById('openAiKey').addEventListener('change', () => {
    chrome.storage.local.set({
      key: document.getElementById('openAiKey').value,
    })
  })

  document.getElementById('closeBtn').addEventListener('click', () => {
    window.close()
  })
})

/******/ })()
;
//# sourceMappingURL=popup.js.map