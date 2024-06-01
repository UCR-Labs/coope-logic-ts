"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageRatings = exports.calculateAverageRatingForUser = exports.localStorageKeyExists = exports.localStorageGetKeyValue = exports.localStorageSetKeyValue = exports.cacheKeyExists = exports.cacheGetKeyValue = exports.cacheSetKeyValue = void 0;
var Cache_1 = require("./src/storage/Cache");
Object.defineProperty(exports, "cacheSetKeyValue", { enumerable: true, get: function () { return Cache_1.cacheSetKeyValue; } });
Object.defineProperty(exports, "cacheGetKeyValue", { enumerable: true, get: function () { return Cache_1.cacheGetKeyValue; } });
Object.defineProperty(exports, "cacheKeyExists", { enumerable: true, get: function () { return Cache_1.cacheKeyExists; } });
var LocalStorage_1 = require("./src/storage/LocalStorage");
Object.defineProperty(exports, "localStorageSetKeyValue", { enumerable: true, get: function () { return LocalStorage_1.localStorageSetKeyValue; } });
Object.defineProperty(exports, "localStorageGetKeyValue", { enumerable: true, get: function () { return LocalStorage_1.localStorageGetKeyValue; } });
Object.defineProperty(exports, "localStorageKeyExists", { enumerable: true, get: function () { return LocalStorage_1.localStorageKeyExists; } });
var Average_1 = require("./src/functions/Average");
Object.defineProperty(exports, "calculateAverageRatingForUser", { enumerable: true, get: function () { return Average_1.calculateAverageRatingForUser; } });
Object.defineProperty(exports, "getAverageRatings", { enumerable: true, get: function () { return Average_1.getAverageRatings; } });
//# sourceMappingURL=index.js.map