import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "@angular/fire/firestore";
import { FirestoreCollections, AverageRating, UserType } from "CoopeTypes";

export async function calculateAverageRatingForUser(
  userId: string,
  userType: UserType,
  newRating: number,
  db: Firestore
): Promise<AverageRating> {
  try {
    const documentRef = doc(db, FirestoreCollections.averageRating, userId);
    const averageRatingDoc = await getDoc(documentRef);

    //const averageRatingDoc = await db
    //.collection(FirestoreCollections.averageRating)
    //.doc(userId)
    //.get()
    //.toPromise();

    let averageRating: AverageRating;

    if (averageRatingDoc) {
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

export async function getAverageRatings(
  userId: string,
  db: Firestore
): Promise<any[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const mainDocs: any[] = [];
      const collectionRef = collection(db, FirestoreCollections.averageRating);

      if (userId) {
        const q = query(collectionRef, where("ratedUserId", "==", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
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
      }

      resolve(mainDocs);
    } catch (error) {
      reject(error);
    }
  });
}
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
