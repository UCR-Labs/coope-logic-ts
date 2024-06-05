"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageRatings = exports.calculateAverageRatingForUser = void 0;
const firestore_1 = require("@angular/fire/firestore");
const CoopeTypes_1 = require("CoopeTypes");
async function calculateAverageRatingForUser(userId, userType, newRating, db) {
    try {
        const documentRef = (0, firestore_1.doc)(db, CoopeTypes_1.FirestoreCollections.averageRating, userId);
        const averageRatingDoc = await (0, firestore_1.getDoc)(documentRef);
        //const averageRatingDoc = await db
        //.collection(FirestoreCollections.averageRating)
        //.doc(userId)
        //.get()
        //.toPromise();
        let averageRating;
        if (averageRatingDoc) {
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
        return averageRating;
    }
    catch (error) {
        console.error("Error fetching average rating:", error);
        throw error;
    }
}
exports.calculateAverageRatingForUser = calculateAverageRatingForUser;
async function getAverageRatings(userId, db) {
    return new Promise(async (resolve, reject) => {
        try {
            const mainDocs = [];
            const collectionRef = (0, firestore_1.collection)(db, CoopeTypes_1.FirestoreCollections.averageRating);
            if (userId) {
                const q = (0, firestore_1.query)(collectionRef, (0, firestore_1.where)("ratedUserId", "==", userId));
                const querySnapshot = await (0, firestore_1.getDocs)(q);
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.average !== undefined) {
                        const average = parseFloat(data.average.toString());
                        if (!isNaN(average)) {
                            const formattedAverage = average.toFixed(1);
                            mainDocs.push(Object.assign(Object.assign({}, data), { _id: doc.id, average: formattedAverage }));
                        }
                    }
                });
            }
            resolve(mainDocs);
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.getAverageRatings = getAverageRatings;
/*try {
      const mainDocs: any[] = [];
      const ratingRef: FirestoreCollections = db.collection(
        FirestoreCollections.averageRating
      );
      if (userId) {
        const finalResult = ratingRef.ref.where("ratedUserId", "==", userId);
        const docs = await finalResult.get();
        const promises = docs.docs.map(async (doc) => {
          const data = doc.data() as AverageRating;
          if (data.average !== undefined) {
            const average = parseFloat(data.average.toString());
            if (!isNaN(average)) {
              const formattedAverage = average.toFixed(1);
              mainDocs.push({
                ...data,
                _id: doc.id,
                average: formattedAverage,
              });
            }
          }
        });
        await Promise.all(promises);
      }

      resolve(mainDocs);
    } catch (error) {
      reject(error);
    }
  });
}*/
//# sourceMappingURL=Average.js.map