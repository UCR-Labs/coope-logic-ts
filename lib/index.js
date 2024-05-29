"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqliteGetKeyValue = exports.sqliteSetKeyValue = exports.localStorageGetKeyValue = exports.localStorageSetKeyValue = exports.cacheGetKeyValue = exports.cacheSetKeyValue = void 0;
var Cache_1 = require("./src/storage/Cache");
Object.defineProperty(exports, "cacheSetKeyValue", { enumerable: true, get: function () { return Cache_1.cacheSetKeyValue; } });
Object.defineProperty(exports, "cacheGetKeyValue", { enumerable: true, get: function () { return Cache_1.cacheGetKeyValue; } });
var LocalStorage_1 = require("./src/storage/LocalStorage");
Object.defineProperty(exports, "localStorageSetKeyValue", { enumerable: true, get: function () { return LocalStorage_1.localStorageSetKeyValue; } });
Object.defineProperty(exports, "localStorageGetKeyValue", { enumerable: true, get: function () { return LocalStorage_1.localStorageGetKeyValue; } });
var SQLite_1 = require("./src/storage/SQLite");
Object.defineProperty(exports, "sqliteSetKeyValue", { enumerable: true, get: function () { return SQLite_1.sqliteSetKeyValue; } });
Object.defineProperty(exports, "sqliteGetKeyValue", { enumerable: true, get: function () { return SQLite_1.sqliteGetKeyValue; } });
//# sourceMappingURL=index.js.map