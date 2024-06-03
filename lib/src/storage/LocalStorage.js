"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStorageKeyExists = exports.localStorageGetKeyValueWithoutPromise = exports.localStorageGetKeyValue = exports.localStorageSetKeyValueAsString = exports.localStorageSetKeyValue = void 0;
const Encryption_1 = require("../functions/Encryption");
function localStorageSetKeyValue(key, value) {
    return new Promise((resolve, reject) => {
        if (!key || value === undefined) {
            return reject(new Error("Invalid key or value"));
        }
        try {
            const encryptValue = (0, Encryption_1.encrypt)(JSON.stringify(value), key);
            localStorage.setItem(key, encryptValue);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.localStorageSetKeyValue = localStorageSetKeyValue;
function localStorageSetKeyValueAsString(key, value) {
    return new Promise((resolve, reject) => {
        if (!key || value === undefined) {
            return reject(new Error("Invalid key or value"));
        }
        try {
            const encryptalue = (0, Encryption_1.encrypt)(String(value), key);
            localStorage.setItem(key, encryptalue);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.localStorageSetKeyValueAsString = localStorageSetKeyValueAsString;
function localStorageGetKeyValue(key) {
    return new Promise((resolve, reject) => {
        try {
            const item = localStorage.getItem(key);
            if (item !== null) {
                const decryptedValue = (0, Encryption_1.decrypt)(item, key);
                resolve(JSON.parse(decryptedValue));
            }
            else {
                resolve(null);
            }
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.localStorageGetKeyValue = localStorageGetKeyValue;
function localStorageGetKeyValueWithoutPromise(key) {
    try {
        const item = localStorage.getItem(key);
        if (item !== null) {
            const decryptedValue = (0, Encryption_1.decrypt)(item, key);
            return JSON.parse(decryptedValue);
        }
    }
    catch (err) {
        console.error("Error parsing JSON from localStorage", err);
        return null;
    }
}
exports.localStorageGetKeyValueWithoutPromise = localStorageGetKeyValueWithoutPromise;
function localStorageKeyExists(key) {
    return new Promise((resolve) => {
        const item = localStorage.getItem(key);
        resolve(item !== null);
    });
}
exports.localStorageKeyExists = localStorageKeyExists;
//# sourceMappingURL=LocalStorage.js.map