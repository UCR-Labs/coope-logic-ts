import {encrypt, decrypt} from "../functions/Encryption"

export function localStorageSetKeyValue(
  key: string,
  value: any,
  encryptKey: string 
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!key || value === undefined) {
      return reject(new Error("Invalid key or value"));
    }
    try {
      const encryptValue = encrypt(JSON.stringify(value), encryptKey);
      localStorage.setItem(key, encryptValue);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export function localStorageSetKeyValueAsString(
  key: string,
  value: any,
  encryptKey: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!key || value === undefined) {
      return reject(new Error("Invalid key or value"));
    }
    try {
      const encryptValue = encrypt(String(value), encryptKey);
      localStorage.setItem(key, encryptValue);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export function localStorageGetKeyValue(
  key: string,
  encryptKey: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        const decryptedValue = decrypt(item, encryptKey);
        resolve(JSON.parse(decryptedValue));
      } else {
        resolve(null);
      }
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
      const decryptedValue = decrypt(item, encryptKey);
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