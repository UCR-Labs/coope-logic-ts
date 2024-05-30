## Version

**1.0.0**

This library provides utility functions for managing key-value pairs in both an in-memory cache and the browser's `localStorage`. These functions enable you to set, get, and check the existence of keys in a consistent and asynchronous manner.

## Functions

### Cache Functions

- **cacheSetKeyValue(key: string, value: any): Promise<void>**

  - Sets a key-value pair in the in-memory cache.
  - Resolves on success or rejects with an error on failure.

- **cacheGetKeyValue(key: string): Promise<any>**

  - Retrieves the value associated with the specified key from the in-memory cache.
  - Resolves with the value or `null` if the key does not exist.

- **cacheKeyExists(key: string): Promise<boolean>**
  - Checks if the specified key exists in the in-memory cache.
  - Resolves with `true` if the key exists or `false` if it does not.

### LocalStorage Functions

- **localStorageSetKeyValue(key: string, value: any): Promise<void>**

  - Sets a key-value pair in the browser's `localStorage`.
  - The value is stored as a JSON string.
  - Resolves on success or rejects with an error on failure.

- **localStorageGetKeyValue(key: string): Promise<any>**

  - Retrieves the value associated with the specified key from the browser's `localStorage`.
  - The value is parsed from JSON.
  - Resolves with the value or `null` if the key does not exist.

- **localStorageKeyExists(key: string): Promise<boolean>**
  - Checks if the specified key exists in the browser's `localStorage`.
  - Resolves with `true` if the key exists or `false` if it does not.

## Usage

Here is an example demonstrating how to use these functions to check for the existence of a key, set the key if it does not exist, and then retrieve the value:

```typescript
import {
  localStorageSetKeyValue,
  localStorageGetKeyValue,
  localStorageKeyExists,
} from "./path-to-your-module";

const userPreferences = {
  theme: "dark",
  language: "en",
};

localStorageKeyExists("userPreferences")
  .then((exists: boolean) => {
    if (!exists) {
      return localStorageSetKeyValue("userPreferences", userPreferences)
        .then(() => {
          console.log("User preferences saved successfully to localStorage.");
        })
        .catch((error: Error) => {
          console.error(
            "Failed to save user preferences to localStorage:",
            error
          );
        });
    } else {
      console.log("User preferences key already exists in localStorage.");
    }
  })
  .then(() => {
    // Retrieve the user preferences
    return localStorageGetKeyValue("userPreferences");
  })
  .then((prefs: any) => {
    if (prefs) {
      console.log("Retrieved user preferences from localStorage:", prefs);
    } else {
      console.log("No user preferences found in localStorage.");
    }
  })
  .catch((error: Error) => {
    console.error("Error occurred:", error);
  });
```
