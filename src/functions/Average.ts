import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore"; // Ensure correct import
import { FirestoreCollections, AverageRating, UserType } from "CoopeTypes";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  async calculateAverageRatingForUser(
    userId: string,
    userType: UserType,
    newRating: number
  ): Promise<AverageRating> {
    try {
      const averageRatingDoc = await this.firestore
        .collection(FirestoreCollections.averageRating)
        .doc(userId)
        .get()
        .toPromise(); // Convert Observable to Promise

      let averageRating: AverageRating;

      if (averageRatingDoc && averageRatingDoc.exists) {
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

      return averageRating;
    } catch (error) {
      console.error("Error fetching average rating:", error);
      throw error;
    }
  }

  getAverageRatings(userId: string, db: AngularFirestore): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const mainDocs: any[] = [];
        const ratingRef: AngularFirestoreCollection = this.firestore.collection(
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
  }
}
