/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/selection.js ***!
  \**************************/
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === 'alert') {
    console.error(request.data)
    alert(request.data)
  } else if (request.method === 'getSelection') {
    sendResponse({data: window.getSelection().toString()})
  } else if (request.method === 'clearSelection') {
    const elem = document.activeElement

    if (elem && !elem.isContentEditable) {
      const end = elem.selectionEnd
      window.getSelection().removeAllRanges()
      elem.selectionStart = end
      elem.selectionEnd = elem.selectionStart
    } else {
      const sel = window.getSelection()
      if (sel.rangeCount) {
        const range = sel.getRangeAt(0)
        range.collapse()
      }
    }
  } else if (request.method === 'replaceSelection' && request.data) {
    const elem = document.activeElement

    if (elem && elem.isContentEditable) {
      // elem is contentEditable
      insertIntoContentEditable(request.data || '')
    } else if (elem) {
      insertIntoInput(elem, request.data || '')
    }
  } else {
    sendResponse({}) // snub them.
  }
})

const insertIntoContentEditable = (content) => {
  const sel = window.getSelection()
  if (sel.rangeCount) {
    const range = sel.getRangeAt(0)
    range.deleteContents()
    const node = document.createTextNode(content)
    range.insertNode(node)
    range.collapse()
  }
}

const insertIntoInput = (elem, content) => {
  // elem is an input or textarea element.
  const start = elem.selectionStart
  const end = elem.selectionEnd
  elem.value = elem.value.slice(0, start) + content + elem.value.substring(end)
  // Set cursor after selected text
  elem.selectionStart = start + content.length
  elem.selectionEnd = elem.selectionStart
}

/******/ })()
;
//# sourceMappingURL=selection.js.map