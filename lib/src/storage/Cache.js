"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheGetKeyValue = exports.cacheSetKeyValue = void 0;
let cache = {};
function cacheSetKeyValue(key, value) {
    return new Promise((resolve, reject) => {
        if (!key || !value) {
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
//# sourceMappingURL=Cache.js.map