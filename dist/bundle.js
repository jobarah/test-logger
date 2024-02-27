/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@azure/logger/dist-esm/src/debug.js":
/*!**********************************************************!*\
  !*** ./node_modules/@azure/logger/dist-esm/src/debug.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./log */ \"./node_modules/@azure/logger/dist-esm/src/log.browser.js\");\n// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT license.\n\nconst debugEnvVariable = (typeof process !== \"undefined\" && process.env && process.env.DEBUG) || undefined;\nlet enabledString;\nlet enabledNamespaces = [];\nlet skippedNamespaces = [];\nconst debuggers = [];\nif (debugEnvVariable) {\n    enable(debugEnvVariable);\n}\nconst debugObj = Object.assign((namespace) => {\n    return createDebugger(namespace);\n}, {\n    enable,\n    enabled,\n    disable,\n    log: _log__WEBPACK_IMPORTED_MODULE_0__.log,\n});\nfunction enable(namespaces) {\n    enabledString = namespaces;\n    enabledNamespaces = [];\n    skippedNamespaces = [];\n    const wildcard = /\\*/g;\n    const namespaceList = namespaces.split(\",\").map((ns) => ns.trim().replace(wildcard, \".*?\"));\n    for (const ns of namespaceList) {\n        if (ns.startsWith(\"-\")) {\n            skippedNamespaces.push(new RegExp(`^${ns.substr(1)}$`));\n        }\n        else {\n            enabledNamespaces.push(new RegExp(`^${ns}$`));\n        }\n    }\n    for (const instance of debuggers) {\n        instance.enabled = enabled(instance.namespace);\n    }\n}\nfunction enabled(namespace) {\n    if (namespace.endsWith(\"*\")) {\n        return true;\n    }\n    for (const skipped of skippedNamespaces) {\n        if (skipped.test(namespace)) {\n            return false;\n        }\n    }\n    for (const enabledNamespace of enabledNamespaces) {\n        if (enabledNamespace.test(namespace)) {\n            return true;\n        }\n    }\n    return false;\n}\nfunction disable() {\n    const result = enabledString || \"\";\n    enable(\"\");\n    return result;\n}\nfunction createDebugger(namespace) {\n    const newDebugger = Object.assign(debug, {\n        enabled: enabled(namespace),\n        destroy,\n        log: debugObj.log,\n        namespace,\n        extend,\n    });\n    function debug(...args) {\n        if (!newDebugger.enabled) {\n            return;\n        }\n        if (args.length > 0) {\n            args[0] = `${namespace} ${args[0]}`;\n        }\n        newDebugger.log(...args);\n    }\n    debuggers.push(newDebugger);\n    return newDebugger;\n}\nfunction destroy() {\n    const index = debuggers.indexOf(this);\n    if (index >= 0) {\n        debuggers.splice(index, 1);\n        return true;\n    }\n    return false;\n}\nfunction extend(namespace) {\n    const newDebugger = createDebugger(`${this.namespace}:${namespace}`);\n    newDebugger.log = this.log;\n    return newDebugger;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (debugObj);\n//# sourceMappingURL=debug.js.map\n\n//# sourceURL=webpack://aderant-logger/./node_modules/@azure/logger/dist-esm/src/debug.js?");

/***/ }),

/***/ "./node_modules/@azure/logger/dist-esm/src/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@azure/logger/dist-esm/src/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AzureLogger: () => (/* binding */ AzureLogger),\n/* harmony export */   createClientLogger: () => (/* binding */ createClientLogger),\n/* harmony export */   getLogLevel: () => (/* binding */ getLogLevel),\n/* harmony export */   setLogLevel: () => (/* binding */ setLogLevel)\n/* harmony export */ });\n/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debug */ \"./node_modules/@azure/logger/dist-esm/src/debug.js\");\n// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT license.\n\nconst registeredLoggers = new Set();\nconst logLevelFromEnv = (typeof process !== \"undefined\" && process.env && process.env.AZURE_LOG_LEVEL) || undefined;\nlet azureLogLevel;\n/**\n * The AzureLogger provides a mechanism for overriding where logs are output to.\n * By default, logs are sent to stderr.\n * Override the `log` method to redirect logs to another location.\n */\nconst AzureLogger = (0,_debug__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"azure\");\nAzureLogger.log = (...args) => {\n    _debug__WEBPACK_IMPORTED_MODULE_0__[\"default\"].log(...args);\n};\nconst AZURE_LOG_LEVELS = [\"verbose\", \"info\", \"warning\", \"error\"];\nif (logLevelFromEnv) {\n    // avoid calling setLogLevel because we don't want a mis-set environment variable to crash\n    if (isAzureLogLevel(logLevelFromEnv)) {\n        setLogLevel(logLevelFromEnv);\n    }\n    else {\n        console.error(`AZURE_LOG_LEVEL set to unknown log level '${logLevelFromEnv}'; logging is not enabled. Acceptable values: ${AZURE_LOG_LEVELS.join(\", \")}.`);\n    }\n}\n/**\n * Immediately enables logging at the specified log level. If no level is specified, logging is disabled.\n * @param level - The log level to enable for logging.\n * Options from most verbose to least verbose are:\n * - verbose\n * - info\n * - warning\n * - error\n */\nfunction setLogLevel(level) {\n    if (level && !isAzureLogLevel(level)) {\n        throw new Error(`Unknown log level '${level}'. Acceptable values: ${AZURE_LOG_LEVELS.join(\",\")}`);\n    }\n    azureLogLevel = level;\n    const enabledNamespaces = [];\n    for (const logger of registeredLoggers) {\n        if (shouldEnable(logger)) {\n            enabledNamespaces.push(logger.namespace);\n        }\n    }\n    _debug__WEBPACK_IMPORTED_MODULE_0__[\"default\"].enable(enabledNamespaces.join(\",\"));\n}\n/**\n * Retrieves the currently specified log level.\n */\nfunction getLogLevel() {\n    return azureLogLevel;\n}\nconst levelMap = {\n    verbose: 400,\n    info: 300,\n    warning: 200,\n    error: 100,\n};\n/**\n * Creates a logger for use by the Azure SDKs that inherits from `AzureLogger`.\n * @param namespace - The name of the SDK package.\n * @hidden\n */\nfunction createClientLogger(namespace) {\n    const clientRootLogger = AzureLogger.extend(namespace);\n    patchLogMethod(AzureLogger, clientRootLogger);\n    return {\n        error: createLogger(clientRootLogger, \"error\"),\n        warning: createLogger(clientRootLogger, \"warning\"),\n        info: createLogger(clientRootLogger, \"info\"),\n        verbose: createLogger(clientRootLogger, \"verbose\"),\n    };\n}\nfunction patchLogMethod(parent, child) {\n    child.log = (...args) => {\n        parent.log(...args);\n    };\n}\nfunction createLogger(parent, level) {\n    const logger = Object.assign(parent.extend(level), {\n        level,\n    });\n    patchLogMethod(parent, logger);\n    if (shouldEnable(logger)) {\n        const enabledNamespaces = _debug__WEBPACK_IMPORTED_MODULE_0__[\"default\"].disable();\n        _debug__WEBPACK_IMPORTED_MODULE_0__[\"default\"].enable(enabledNamespaces + \",\" + logger.namespace);\n    }\n    registeredLoggers.add(logger);\n    return logger;\n}\nfunction shouldEnable(logger) {\n    return Boolean(azureLogLevel && levelMap[logger.level] <= levelMap[azureLogLevel]);\n}\nfunction isAzureLogLevel(logLevel) {\n    return AZURE_LOG_LEVELS.includes(logLevel);\n}\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://aderant-logger/./node_modules/@azure/logger/dist-esm/src/index.js?");

/***/ }),

/***/ "./node_modules/@azure/logger/dist-esm/src/log.browser.js":
/*!****************************************************************!*\
  !*** ./node_modules/@azure/logger/dist-esm/src/log.browser.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   log: () => (/* binding */ log)\n/* harmony export */ });\n// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT license.\nfunction log(...args) {\n    if (args.length > 0) {\n        const firstArg = String(args[0]);\n        if (firstArg.includes(\":error\")) {\n            console.error(...args);\n        }\n        else if (firstArg.includes(\":warning\")) {\n            console.warn(...args);\n        }\n        else if (firstArg.includes(\":info\")) {\n            console.info(...args);\n        }\n        else if (firstArg.includes(\":verbose\")) {\n            console.debug(...args);\n        }\n        else {\n            console.debug(...args);\n        }\n    }\n}\n//# sourceMappingURL=log.browser.js.map\n\n//# sourceURL=webpack://aderant-logger/./node_modules/@azure/logger/dist-esm/src/log.browser.js?");

/***/ }),

/***/ "./src/BaseLogger.ts":
/*!***************************!*\
  !*** ./src/BaseLogger.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar ILogger = /** @class */ (function () {\n    function ILogger(env, options) {\n        this.env = env;\n        this.options = options;\n    }\n    ILogger.prototype.log = function (message) { };\n    ILogger.prototype.info = function (message) { };\n    ILogger.prototype.warning = function (message) { };\n    ILogger.prototype.error = function (message) { };\n    return ILogger;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ILogger);\n\n\n//# sourceURL=webpack://aderant-logger/./src/BaseLogger.ts?");

/***/ }),

/***/ "./src/Loggers/AzureLogger.ts":
/*!************************************!*\
  !*** ./src/Loggers/AzureLogger.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _azure_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @azure/logger */ \"./node_modules/@azure/logger/dist-esm/src/index.js\");\n/* harmony import */ var _BaseLogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseLogger */ \"./src/BaseLogger.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n_azure_logger__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setLogLevel('info');\nvar testLogger = _azure_logger__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createClientLogger(\"test\");\nvar AzureLogger = /** @class */ (function (_super) {\n    __extends(AzureLogger, _super);\n    function AzureLogger(env, options) {\n        var _this = _super.call(this, env, options) || this;\n        _this.loggerClient = testLogger.createLogger(_this.env, _this.options);\n        return _this;\n    }\n    AzureLogger.prototype.log = function (message) {\n        this.loggerClient.log(message);\n    };\n    AzureLogger.prototype.info = function (message) {\n        this.loggerClient.info(message);\n    };\n    AzureLogger.prototype.warning = function (message) {\n        this.loggerClient.warning(message);\n    };\n    AzureLogger.prototype.error = function (message) {\n        this.loggerClient.error(message);\n    };\n    return AzureLogger;\n}(_BaseLogger__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AzureLogger);\n\n\n//# sourceURL=webpack://aderant-logger/./src/Loggers/AzureLogger.ts?");

/***/ }),

/***/ "./src/Loggers/index.ts":
/*!******************************!*\
  !*** ./src/Loggers/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AzureLogger: () => (/* reexport safe */ _AzureLogger__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _AzureLogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AzureLogger */ \"./src/Loggers/AzureLogger.ts\");\n\n\n\n\n//# sourceURL=webpack://aderant-logger/./src/Loggers/index.ts?");

/***/ }),

/***/ "./src/SupportedLoggers.ts":
/*!*********************************!*\
  !*** ./src/SupportedLoggers.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Loggers_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Loggers/index */ \"./src/Loggers/index.ts\");\n\nvar SupportedLoggers = {\n    'web': function (args) { return new _Loggers_index__WEBPACK_IMPORTED_MODULE_0__.AzureLogger(args.env, args.options); },\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SupportedLoggers);\n\n\n//# sourceURL=webpack://aderant-logger/./src/SupportedLoggers.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AderantLogger: () => (/* binding */ AderantLogger)\n/* harmony export */ });\n/* harmony import */ var _SupportedLoggers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SupportedLoggers */ \"./src/SupportedLoggers.ts\");\n\nvar AderantLogger = /** @class */ (function () {\n    function AderantLogger(serviceName) {\n        this.serviceName = serviceName;\n    }\n    AderantLogger.prototype.createLogger = function (env, options) {\n        if (_SupportedLoggers__WEBPACK_IMPORTED_MODULE_0__[\"default\"][this.serviceName]) {\n            return _SupportedLoggers__WEBPACK_IMPORTED_MODULE_0__[\"default\"][this.serviceName]({ env: env, options: options });\n        }\n        throw new Error(\"Logger for \".concat(this.serviceName, \" is not supported\"));\n    };\n    return AderantLogger;\n}());\n\n\n\n//# sourceURL=webpack://aderant-logger/./src/index.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;