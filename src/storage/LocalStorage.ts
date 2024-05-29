export function localStorageSetKeyValue(
  key: string,
  value: any
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!key || value === undefined) {
      return reject(new Error("Invalid key or value"));
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export function localStorageGetKeyValue(key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const item = localStorage.getItem(key);
      const value = item !== null ? JSON.parse(item) : null;
      resolve(value);
    } catch (err) {
      reject(err);
    }
  });
}
