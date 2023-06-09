/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/openai-edge/dist/index.mjs":
/*!*************************************************!*\
  !*** ./node_modules/openai-edge/dist/index.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Configuration": () => (/* binding */ Configuration),
/* harmony export */   "OpenAIApi": () => (/* binding */ OpenAIApi)
/* harmony export */ });
const BASE_PATH = "https://api.openai.com/v1".replace(/\/+$/, "");
class Configuration {
    /**
     * parameter for apiKey security
     * @param name security name
     * @memberof Configuration
     */
    apiKey;
    /**
     * OpenAI organization id
     *
     * @type {string}
     * @memberof Configuration
     */
    organization;
    /**
     * parameter for basic security
     *
     * @type {string}
     * @memberof Configuration
     */
    username;
    /**
     * parameter for basic security
     *
     * @type {string}
     * @memberof Configuration
     */
    password;
    /**
     * parameter for oauth2 security
     * @param name security name
     * @param scopes oauth2 scope
     * @memberof Configuration
     */
    accessToken;
    /**
     * override base path
     *
     * @type {string}
     * @memberof Configuration
     */
    basePath;
    /**
     * base options for axios calls
     *
     * @type {any}
     * @memberof Configuration
     */
    baseOptions;
    /**
     * The FormData constructor that will be used to create multipart form data
     * requests. You can inject this here so that execution environments that
     * do not support the FormData class can still run the generated client.
     *
     * @type {new () => FormData}
     */
    formDataCtor;
    // asdlfkalsdfkmad
    constructor(param = {}) {
        this.apiKey = param.apiKey;
        this.organization = param.organization;
        this.username = param.username;
        this.password = param.password;
        this.accessToken = param.accessToken;
        this.basePath = param.basePath;
        this.baseOptions = param.baseOptions;
        this.formDataCtor = param.formDataCtor;
        if (!this.baseOptions) {
            this.baseOptions = {};
        }
        this.baseOptions.headers = Object.assign({
            // "User-Agent": `OpenAI/NodeJS/${packageJson.version}`,
            Authorization: `Bearer ${this.apiKey}`,
        }, this.baseOptions.headers);
        if (this.organization) {
            this.baseOptions.headers["OpenAI-Organization"] = this.organization;
        }
        // if (!this.formDataCtor) {
        //   this.formDataCtor = require("form-data")
        // }
    }
    /**
     * Check if the given MIME is a JSON MIME.
     * JSON MIME examples:
     *   application/json
     *   application/json; charset=UTF8
     *   APPLICATION/JSON
     *   application/vnd.company+json
     * @param mime - MIME (Multipurpose Internet Mail Extensions)
     * @return True if the given MIME is JSON, false otherwise.
     */
    isJsonMime(mime) {
        const jsonMime = new RegExp("^(application/json|[^;/ \t]+/[^;/ \t]+[+]json)[ \t]*(;.*)?$", "i");
        return (mime !== null &&
            (jsonMime.test(mime) ||
                mime.toLowerCase() === "application/json-patch+json"));
    }
}
/**
 *
 * @export
 * @class BaseAPI
 */
class BaseAPI {
    basePath;
    configuration;
    constructor(configuration, basePath = BASE_PATH) {
        this.basePath = basePath;
        // this.axios = axios;
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
}
/**
 * OpenAIApi - object-oriented interface
 * @export
 * @class OpenAIApi
 * @extends {BaseAPI}
 */
class OpenAIApi extends BaseAPI {
    /**
     *
     * @summary Creates a completion for the chat message
     * @param {CreateChatCompletionRequest} createChatCompletionRequest
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createChatCompletion(createChatCompletionRequest
    // options?: AxiosRequestConfig
    ) {
        if (!this.configuration) {
            throw new Error(`Must provide a valid configuration to \`OpenAIApi\``);
        }
        return fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                ...this.configuration.baseOptions.headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createChatCompletionRequest),
        });
    }
    /**
     *
     * @summary Creates a completion for the provided prompt and parameters
     * @param {CreateCompletionRequest} createCompletionRequest
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createCompletion(createCompletionRequest
    // options?: AxiosRequestConfig
    ) {
        if (!this.configuration) {
            throw new Error(`Must provide a valid configuration to \`OpenAIApi\``);
        }
        return fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                ...this.configuration.baseOptions.headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createCompletionRequest),
        });
    }
    /**
     *
     * @summary Creates an image given a prompt.
     * @param {CreateImageRequest} createImageRequest
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createImage(createImageRequest
    // options?: AxiosRequestConfig
    ) {
        if (!this.configuration) {
            throw new Error(`Must provide a valid configuration to \`OpenAIApi\``);
        }
        return fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                ...this.configuration.baseOptions.headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createImageRequest),
        });
    }
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var openai_edge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! openai-edge */ "./node_modules/openai-edge/dist/index.mjs");


chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: 'chatgpt',
    title: 'NectarGPT',
    contexts: ['selection'],
  })
  chrome.contextMenus.create({
    id: 'improveWriting',
    parentId: 'chatgpt',
    title: 'Improve writing',
    contexts: ['selection'],
  })
  chrome.contextMenus.create({
    id: 'makeLonger',
    parentId: 'chatgpt',
    title: 'Make longer',
    contexts: ['selection'],
  })
  chrome.contextMenus.create({
    id: 'makeShorter',
    parentId: 'chatgpt',
    title: 'Make shorter',
    contexts: ['selection'],
  })
  chrome.contextMenus.create({
    id: 'summarize',
    parentId: 'chatgpt',
    title: 'Make summary',
    contexts: ['selection'],
  })
  chrome.contextMenus.create({
    id: 'command',
    parentId: 'chatgpt',
    title: 'Automate task',
    contexts: ['selection'],
  })
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const {menuItemId, frameId} = info
  const {key} = await chrome.storage.local.get(['key'])

  if (!key) {
    const error = 'Please set your OpenAI API key in the extension options'
    console.error(error)
    chrome.tabs.sendMessage(tab.id, {method: 'alert', data: error})
    return
  }

  const {data: selectedText} = await chrome.tabs.sendMessage(tab.id, {method: 'getSelection'})

  if (selectedText) {
    switch (menuItemId) {
      case 'improveWriting':
        await runCommand(tab, key, `Improve the writing of the following content. \n\n${selectedText}`)
        break
      case 'makeLonger':
        chrome.tabs.sendMessage(tab.id, {method: 'clearSelection'})
        await runCommand(tab, key, `Make the following content longer: \n\n${selectedText}`)
        break
      case 'makeShorter':
        await runCommand(tab, key, `Make the following content shorter: \n\n${selectedText}`)
        break
      case 'summarize':
        await runCommand(tab, key, `Make a summary of the following content: \n\n${selectedText}`)
        break
      case 'command':
        await runCommand(tab, key, selectedText, true)
        break
    }
  } else {
    const error = 'Please select some text'
    console.error(error)
    chrome.tabs.sendMessage(tab.id, {method: 'alert', data: error})
  }
})

const runCommand = async (tab, key, command, commandOnly = false) => {
  const configuration = new openai_edge__WEBPACK_IMPORTED_MODULE_0__.Configuration({
    apiKey: key,
  })
  const openai = new openai_edge__WEBPACK_IMPORTED_MODULE_0__.OpenAIApi(configuration)
  const messages = []
  if (commandOnly) {
    messages.push({role: 'system', content: 'You are a helpful assistant.'})
  } else {
    messages.push({
      role: 'system',
      content:
        'I want you to act as a professional writer, spelling corrector and improver. I will give you a command to follow and some content. Always reply in the original language the content was written in. I want you to only reply the new content and nothing else, do not write explanations. ',
    })
  }
  messages.push({role: 'user', content: command})

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
    max_tokens: 500,
  })

  const reader = completion.body.getReader()
  const readStream = () => {
    reader
      .read()
      .then(({done, value}) => {
        if (done) {
          return
        }
        let isFinished = false
        const res = new TextDecoder()
          .decode(value)
          .split('data: ')
          .filter((s) => !!s)
        let output = ''
        for (const r of res) {
          if (r.startsWith('[DONE]')) {
            isFinished = true
          } else {
            const parsed = JSON.parse(r)
            if (parsed.error) {
              throw new Error('Problem getting response from OpenAI: ' + parsed.error.message)
            } else {
              output += parsed.choices[0].delta.content || ''
            }
          }
        }

        chrome.tabs.sendMessage(tab.id, {method: 'replaceSelection', data: output})

        if (!isFinished) {
          readStream()
        }
      })
      .catch((error) => {
        console.error(error)
        chrome.tabs.sendMessage(tab.id, {method: 'alert', data: error.toString()})
      })
  }
  readStream()
}

})();

/******/ })()
;
//# sourceMappingURL=background.js.map