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

export function localStorageSetKeyValueAsString(
  key: string,
  value: any,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!key || value === undefined) {
      return reject(new Error("Invalid key or value"));
    }
    try {
      localStorage.setItem(key, value);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export function localStorageGetKeyValue(
  key: string
): Promise<any> {
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

export function localStorageGetKeyValueWithoutPromise(
  key: string,
  encryptKey: string
): any {
  try {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
  } catch (err) {
    console.error("Error parsing JSON from localStorage", err);
    return null;
  }
}


export function localStorageKeyExists(key: string): Promise<boolean> {
  return new Promise((resolve) => {
    const item = localStorage.getItem(key);
    resolve(item !== null);
  });
}