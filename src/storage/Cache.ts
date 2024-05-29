interface Cache {
  [key: string]: any;
}

let cache: Cache = {};

export function setKeyValue(key: string, value: any): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!key || !value) {
      return reject(new Error("Invalid key or value"));
    }
    cache[key] = value;
    resolve();
  });
}

export function getKeyValue(key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const value = cache[key] !== undefined ? cache[key] : null;
      resolve(value);
    } catch (err) {
      reject(err);
    }
  });
}
