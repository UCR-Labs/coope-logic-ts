import * as admin from 'firebase-admin';
import { AverageRating, FirestoreCollections } from 'rideTypes';

const db = admin.firestore();

/**
 * Obtiene la calificación promedio para un usuario específico.
 * @param {string} userId - El ID del usuario.
 * @return {Promise<AverageRating[]>} Un array de calificaciones promedio.
 */
export function getAverageRating(userId: string): Promise<AverageRating[]>
{
  return new Promise( async(resolve, reject) =>
  {
    try
    {
      const userAverageRatings: AverageRating[] = []; // Stores the resulting AverageRating document
      const ratingCollection = db.collection(FirestoreCollections.averageRating);

      if (userId)
      {
        const finalResult = ratingCollection.where('ratedUserId', '==', userId);
        const docs = await finalResult.get();
        
        docs.forEach(doc => 
        {
          const data = doc.data();
          if (data.average !== undefined)
          {
            const averageFloat = parseFloat(data.average);
            if (!isNaN(averageFloat))
            {
              userAverageRatings.push({ 
                ratedUserId: data.ratedUserId,
                ratedUserType: data.ratedUserType,
                sumOfRatings: data.sumOfRatings,
                numberOfRatings: data.numberOfRatings,
                average: averageFloat
              });
            }
            else
            { reject('Document member "average" has an invalid value.'); }
          }
          else
          { reject('Document member "average" is undefined.'); }
        });
      }

      resolve(userAverageRatings);
    }
    catch (error)
    {
      reject(error);
    }
  });
}
