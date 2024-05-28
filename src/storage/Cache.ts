"use strict";

class Cache {
  private cache: { [key: string]: any };

  constructor() {
    this.cache = {};
  }

  public SetKeyValue(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!key || !value) {
        return reject(new Error("Invalid key or value"));
      }
      this.cache[key] = value;
      resolve();
    });
  }

  public GetKeyValue(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const value = this.cache[key] !== undefined ? this.cache[key] : null;
        resolve(value);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default Cache;
