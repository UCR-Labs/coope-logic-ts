"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageRatings = exports.calculateAverageRatingForUser = void 0;
const CoopeTypes_1 = require("CoopeTypes");
function calculateAverageRatingForUser(userId, userType, newRating, db) {
    return new Promise(async (resolve, reject) => {
        try {
            const averageRatingDoc = await db
                .collection(CoopeTypes_1.FirestoreCollections.averageRating)
                .doc(userId)
                .ref
                .get();
            let averageRating;
            if (averageRatingDoc.exists) {
                averageRating = averageRatingDoc.data();
                averageRating.numberOfRatings += 1;
                averageRating.sumOfRatings += newRating;
                averageRating.average =
                    averageRating.sumOfRatings / averageRating.numberOfRatings;
            }
            else {
                averageRating = {
                    ratedUserId: userId,
                    ratedUserType: userType,
                    sumOfRatings: newRating,
                    numberOfRatings: 1,
                    average: newRating,
                };
            }
            resolve(averageRating);
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.calculateAverageRatingForUser = calculateAverageRatingForUser;
function getAverageRatings(userId, db) {
    return new Promise(async (resolve, reject) => {
        try {
            const mainDocs = [];
            const ratingRef = db.collection(CoopeTypes_1.FirestoreCollections.averageRating);
            if (userId) {
                const finalResult = ratingRef.ref.where("ratedUserId", "==", userId);
                const docs = await finalResult.get();
                const promises = docs.docs.map(async (doc) => {
                    const data = doc.data();
                    if (data.average !== undefined) {
                        const average = parseFloat(data.average.toString());
                        if (!isNaN(average)) {
                            const formattedAverage = average.toFixed(1);
                            mainDocs.push(Object.assign(Object.assign({}, data), { _id: doc.id, average: formattedAverage }));
                        }
                    }
                });
                await Promise.all(promises);
            }
            resolve(mainDocs);
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.getAverageRatings = getAverageRatings;
//# sourceMappingURL=Average.js.map