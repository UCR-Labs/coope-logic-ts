"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.localStorageSetKeyValueAsString = exports.localStorageGetKeyValueWithoutPromise = exports.localStorageKeyExists = exports.localStorageGetKeyValue = exports.localStorageSetKeyValue = void 0;
var LocalStorage_1 = require("./src/storage/LocalStorage");
Object.defineProperty(exports, "localStorageSetKeyValue", { enumerable: true, get: function () { return LocalStorage_1.localStorageSetKeyValue; } });
Object.defineProperty(exports, "localStorageGetKeyValue", { enumerable: true, get: function () { return LocalStorage_1.localStorageGetKeyValue; } });
Object.defineProperty(exports, "localStorageKeyExists", { enumerable: true, get: function () { return LocalStorage_1.localStorageKeyExists; } });
Object.defineProperty(exports, "localStorageGetKeyValueWithoutPromise", { enumerable: true, get: function () { return LocalStorage_1.localStorageGetKeyValueWithoutPromise; } });
Object.defineProperty(exports, "localStorageSetKeyValueAsString", { enumerable: true, get: function () { return LocalStorage_1.localStorageSetKeyValueAsString; } });
var Encryption_1 = require("./src/functions/Encryption");
Object.defineProperty(exports, "encrypt", { enumerable: true, get: function () { return Encryption_1.encrypt; } });
Object.defineProperty(exports, "decrypt", { enumerable: true, get: function () { return Encryption_1.decrypt; } });
//# sourceMappingURL=index.js.map