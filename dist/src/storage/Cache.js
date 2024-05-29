"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
class Cache {
    constructor() {
        this.cache = {};
    }
    SetKeyValue(key, value) {
        return new Promise((resolve, reject) => {
            if (!key || !value) {
                return reject(new Error("Invalid key or value"));
            }
            this.cache[key] = value;
            resolve();
        });
    }
    GetKeyValue(key) {
        return new Promise((resolve, reject) => {
            try {
                const value = this.cache[key] !== undefined ? this.cache[key] : null;
                resolve(value);
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
exports.Cache = Cache;
//# sourceMappingURL=Cache.js.map