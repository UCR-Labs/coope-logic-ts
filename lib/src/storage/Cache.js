"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheKeyExists = exports.cacheGetKeyValue = exports.cacheSetKeyValue = void 0;
let cache = {};
function cacheSetKeyValue(key, value) {
    return new Promise((resolve, reject) => {
        if (!key || value === undefined) {
            return reject(new Error("Invalid key or value"));
        }
        cache[key] = value;
        resolve();
    });
}
exports.cacheSetKeyValue = cacheSetKeyValue;
function cacheGetKeyValue(key) {
    return new Promise((resolve, reject) => {
        try {
            const value = cache[key] !== undefined ? cache[key] : null;
            resolve(value);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.cacheGetKeyValue = cacheGetKeyValue;
function cacheKeyExists(key) {
    return new Promise((resolve) => {
        const exists = cache[key] !== undefined;
        resolve(exists);
    });
}
exports.cacheKeyExists = cacheKeyExists;
//# sourceMappingURL=Cache.js.map