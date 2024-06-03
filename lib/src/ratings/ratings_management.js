"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rating = exports.updateOrderWithRating = void 0;
const admin = __importStar(require("firebase-admin"));
const rideTypes_1 = require("rideTypes");
const db = admin.firestore();
/**
 * Actualiza una orden con una nueva calificación.
 *
 * @param {string} orderId - El ID de la orden que se actualizará.
 * @param {Rating} rating - La calificación que se agregará a la orden.
 * @return {Promise<void>}
 */
async function updateOrderWithRating(orderId, rating) {
    var _a;
    const ordersCollection = db.collection(rideTypes_1.FirestoreCollections.orders);
    const orderDocRef = ordersCollection.doc(orderId);
    const orderSnapshot = await orderDocRef.get();
    const orderData = orderSnapshot === null || orderSnapshot === void 0 ? void 0 : orderSnapshot.data();
    if (orderData) {
        orderData.ratings = (_a = orderData.ratings) !== null && _a !== void 0 ? _a : [];
        orderData.ratings.push(rating);
        await orderDocRef.set(orderData);
    }
}
exports.updateOrderWithRating = updateOrderWithRating;
/**
 * Maneja la creación de una calificación y la actualización de una orden en Firebase.
 *
 * @param {object} ratingData - El objeto con los datos de la orden respectiva y la calificación.
 * Incluye el ID de la orden.
 * @return {Promise<void>}
 */
async function rating(ratingData) {
    return new Promise(async (resolve, reject) => {
        try {
            const { raterUserId, ratedUserId, raterUserType, ratedUserType, ratingValue, feedback, orderId } = ratingData;
            const ratingDocData = {
                raterUserId,
                ratedUserId,
                raterUserType,
                ratedUserType,
                ratingValue,
                feedback
            };
            const ratingsCollection = db.collection(rideTypes_1.FirestoreCollections.ratings);
            const ratingDocRef = await ratingsCollection.add(ratingDocData);
            const ratingSnapshot = await ratingDocRef.get();
            const rating = ratingSnapshot.data();
            if (rating) {
                await updateOrderWithRating(orderId, rating);
            }
            resolve();
        }
        catch (error) {
            console.error('Error upon registering rating: ', error);
            reject(error);
        }
    });
}
exports.rating = rating;
//# sourceMappingURL=ratings_management.js.map