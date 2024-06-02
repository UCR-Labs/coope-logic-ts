import {encrypt, decrypt} from "../functions/Encryption"

export function localStorageSetKeyValue(
  key: string,
  value: any
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!key || value === undefined) {
      return reject(new Error("Invalid key or value"));
    }
    try {
      const encryptValue = encrypt(JSON.stringify(value), key);
      localStorage.setItem(key, encryptValue);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export function localStorageSetKeyValueAsString(
  key: string,
  value: any
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!key || value === undefined) {
      return reject(new Error("Invalid key or value"));
    }
    try {
      const encryptalue = encrypt(String(value), key);
      localStorage.setItem(key, encryptalue);
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
      if (item !== null) {
        const decryptedValue = decrypt(item, key);
        resolve(JSON.parse(decryptedValue));
      } else {
        resolve(null);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function localStorageGetKeyValueWithoutPromise(key: string): any {
  try {
    const item = localStorage.getItem(key);
    if (item !== null) {
      const decryptedValue = decrypt(item, key);
      return JSON.parse(decryptedValue);
    }
  } catch (err) {
    console.error("Error parsing JSON from localStorage", err);
    return null;
  }
}


export function localStorageKeyExists(key: string): Promise<boolean> {
  return new Promise((resolve) => {
    const item = localStorage.getItem(key);
    resolve(item !== null);
  });
}