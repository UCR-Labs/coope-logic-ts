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
export { updateDocumentValue }from "./src/functions/UpdateDocumentValue";
export {
  calculateServiceCost
} from "./src/orders/serviceCost";
export {
  rating
} from "./src/ratings/ratings_management";
export {
  getAverageRating
} from "./src/ratings/average_rating_management";

export {
  updateOrder,
  getUserFCMToken,
  getBikerName,
  sendMessagePending,
  sendMessageAcceptedBiker,
  sendMessageArriving,
  sendMessageRating,
} from "./src/functions/Orders_Management";
export {
  handleUserFcmTokenUpdate,
  updateFCMToken,
} from "./src/functions/Fcm_management";
