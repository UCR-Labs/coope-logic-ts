import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FirestoreCollections, AverageRating, UserType } from "CoopeTypes";

export function calculateAverageRatingForUser(
  userId: string,
  userType: UserType,
  newRating: number,
  db: AngularFirestore
): Promise<AverageRating> {
  return new Promise(async (resolve, reject) => {
    try {
      const averageRatingDoc = await db
        .collection(FirestoreCollections.averageRating)
        .doc(userId)
        .ref
        .get();
      let averageRating: AverageRating;

      if (averageRatingDoc.exists) {
        averageRating = averageRatingDoc.data() as AverageRating;
        averageRating.numberOfRatings += 1;
        averageRating.sumOfRatings += newRating;
        averageRating.average =
          averageRating.sumOfRatings / averageRating.numberOfRatings;
      } else {
        averageRating = {
          ratedUserId: userId,
          ratedUserType: userType,
          sumOfRatings: newRating,
          numberOfRatings: 1,
          average: newRating,
        };
      }

      resolve(averageRating);
    } catch (error) {
      reject(error);
    }
  });
}

export function getAverageRatings(
  userId: string,
  db: AngularFirestore
): Promise<any[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const mainDocs: any[] = [];
      const ratingRef: AngularFirestoreCollection<AverageRating> = db.collection(
        FirestoreCollections.averageRating
      );
      if (userId) {
        const finalResult = ratingRef.ref.where("ratedUserId", "==", userId);
        const docs = await finalResult.get();
        const promises = docs.docs.map(async (doc: any) => {
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
}
