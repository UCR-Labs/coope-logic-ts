export {
  cacheSetKeyValue,
  cacheGetKeyValue,
  cacheKeyExists,
} from "./src/storage/Cache";
export {
  localStorageSetKeyValue,
  localStorageGetKeyValue,
  localStorageKeyExists,
} from "./src/storage/LocalStorage";
export {
  calculateAverageRatingForUser,
  getAverageRatings,
} from "./src/functions/Average";
export { encrypt, decrypt } from "./src/functions/Encryption";
export { geocode } from "./src/functions/GoogleMaps";
export { adminPushNotifications } from "./src/functions/PushNotification";
export { UpdateDocumentValue }from "./src/functions/UpdateDocumentValue";
export { 
  increaseUserToReviewStatistics,
  decreaseUserToReviewStatistics
} from "./src/functions/User";