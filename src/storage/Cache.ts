interface Cache {
  [key: string]: any;
}

let cache: Cache = {};

export function cacheSetKeyValue(key: string, value: any): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!key || value === undefined) {
      return reject(new Error("Invalid key or value"));
    }
    cache[key] = value;
    resolve();
  });
}

export function cacheGetKeyValue(key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const value = cache[key] !== undefined ? cache[key] : null;
      resolve(value);
    } catch (err) {
      reject(err);
    }
  });
}

export function cacheKeyExists(key: string): Promise<boolean> {
  return new Promise((resolve) => {
    const exists = cache[key] !== undefined;
    resolve(exists);
  });
}
