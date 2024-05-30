"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStorageKeyExists = exports.localStorageGetKeyValue = exports.localStorageSetKeyValue = void 0;
function localStorageSetKeyValue(key, value) {
    return new Promise((resolve, reject) => {
        if (!key || value === undefined) {
            return reject(new Error("Invalid key or value"));
        }
        try {
            localStorage.setItem(key, JSON.stringify(value));
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.localStorageSetKeyValue = localStorageSetKeyValue;
function localStorageGetKeyValue(key) {
    return new Promise((resolve, reject) => {
        try {
            const item = localStorage.getItem(key);
            const value = item !== null ? JSON.parse(item) : null;
            resolve(value);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.localStorageGetKeyValue = localStorageGetKeyValue;
function localStorageKeyExists(key) {
    return new Promise((resolve) => {
        const item = localStorage.getItem(key);
        resolve(item !== null);
    });
}
exports.localStorageKeyExists = localStorageKeyExists;
//# sourceMappingURL=LocalStorage.js.map