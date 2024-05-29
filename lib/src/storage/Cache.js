"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyValue = exports.setKeyValue = void 0;
let cache = {};
function setKeyValue(key, value) {
    return new Promise((resolve, reject) => {
        if (!key || !value) {
            return reject(new Error("Invalid key or value"));
        }
        cache[key] = value;
        resolve();
    });
}
exports.setKeyValue = setKeyValue;
function getKeyValue(key) {
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
exports.getKeyValue = getKeyValue;
//# sourceMappingURL=Cache.js.map