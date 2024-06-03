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
exports.getAverageRating = void 0;
const admin = __importStar(require("firebase-admin"));
const rideTypes_1 = require("rideTypes");
const db = admin.firestore();
/**
 * Obtiene la calificación promedio para un usuario específico.
 * @param {string} userId - El ID del usuario.
 * @return {Promise<AverageRating[]>} Un array de calificaciones promedio.
 */
function getAverageRating(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const userAverageRatings = []; // Stores the resulting AverageRating document
            const ratingCollection = db.collection(rideTypes_1.FirestoreCollections.averageRating);
            if (userId) {
                const finalResult = ratingCollection.where('ratedUserId', '==', userId);
                const docs = await finalResult.get();
                docs.forEach(doc => {
                    const data = doc.data();
                    if (data.average !== undefined) {
                        const averageFloat = parseFloat(data.average);
                        if (!isNaN(averageFloat)) {
                            userAverageRatings.push({
                                ratedUserId: data.ratedUserId,
                                ratedUserType: data.ratedUserType,
                                sumOfRatings: data.sumOfRatings,
                                numberOfRatings: data.numberOfRatings,
                                average: averageFloat
                            });
                        }
                        else {
                            reject('Document member "average" has an invalid value.');
                        }
                    }
                    else {
                        reject('Document member "average" is undefined.');
                    }
                });
            }
            resolve(userAverageRatings);
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.getAverageRating = getAverageRating;
//# sourceMappingURL=average_rating_management.js.map