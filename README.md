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

**1.0.1**

### Rating Functions

- **calculateAverageRatingForUser(userId: string, userType: UserType, newRating: number, db: Firestore): Promise<AverageRating>**

  - Calculates the average rating for a user based on the new rating provided.
  - Resolves with the updated average rating data.

- **getAverageRatings(userId: string, db: Firestore): Promise<any[]>**

  - Retrieves the average ratings for a specified user.
  - Resolves with an array of documents containing the average ratings.

**1.0.2**

### Functions

- **encrypt(text: string): string**

  - Encrypts the provided text using the specified key and algorithm.
  - Returns the encrypted text.

- **decrypt(text: string): string**

  - Decrypts the provided text using the specified key and algorithm.
  - Returns the decrypted text.

- **geocode(location: string, apiKey: string): Promise<any>**

  - Fetches geolocation data for the specified location using the Google Maps Geocoding API.
  - Requires a valid API key.

- **adminPushNotifications(title: string, body: string, tokens: string[]): Promise<void>**
  - Sends push notifications to multiple devices using Firebase Cloud Messaging.
  - Requires valid title, body, and device tokens.

**1.0.3**

### Fixing bugs

**1.0.4**

### Functions
- **increaseUserStatistics(User: User)**
- **localStorageSetKeyValueAsString(key: string): Promise<any>**
  - Receives a String instead of JSON
- **localStorageGetKeyValueWithoutPromise(key: string): any**
  - Nows returns the string value without promises
- **localStorageSetKeyValue(key: string, value: any): Promise<void>**
  - Nows encrypts the values
- **localStorageGetKeyValue(key: string): Promise<any>**
  - Nows encrypts the values

**1.0.5**


**1.0.6**


**1.0.7**

### Functions
- **calculateServiceCost(distance: number): Promise<number>**
  - Returns the total cost of a service based on the delivery distance.
- **rating(ratingData: { raterUserId: string ratedUserId: string raterUserType: string ratedUserType: string ratingValue: number feedback: string orderId: string }): Promise<void>**
  - Given a collection with data about the rating of an order, registers said rating in the respective order document.
- **getAverageRating(userId: string): Promise<AverageRating[]>**
  - Returns an array of AverageRating documents given an user ID.

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
