"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStorageSetKeyValue = localStorageSetKeyValue;
exports.localStorageSetKeyValueAsString = localStorageSetKeyValueAsString;
exports.localStorageGetKeyValue = localStorageGetKeyValue;
exports.localStorageGetKeyValueWithoutPromise = localStorageGetKeyValueWithoutPromise;
exports.localStorageKeyExists = localStorageKeyExists;
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
function localStorageSetKeyValueAsString(key, value) {
    return new Promise((resolve, reject) => {
        if (!key || value === undefined) {
            return reject(new Error("Invalid key or value"));
        }
        try {
            localStorage.setItem(key, value);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}
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
function localStorageGetKeyValueWithoutPromise(key, encryptKey) {
    try {
        const item = localStorage.getItem(key);
        if (item !== null) {
            return JSON.parse(item);
        }
    }
    catch (err) {
        console.error("Error parsing JSON from localStorage", err);
        return null;
    }
}
function localStorageKeyExists(key) {
    return new Promise((resolve) => {
        const item = localStorage.getItem(key);
        resolve(item !== null);
    });
}
//# sourceMappingURL=LocalStorage.js.map