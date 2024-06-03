import * as admin from 'firebase-admin';
import { Rating, FirestoreCollections } from 'rideTypes';

const db = admin.firestore();

/**
 * Actualiza una orden con una nueva calificación.
 *
 * @param {string} orderId - El ID de la orden que se actualizará.
 * @param {Rating} rating - La calificación que se agregará a la orden.
 * @return {Promise<void>}
 */
export async function updateOrderWithRating(orderId: string, rating: Rating): Promise<void>
{
  const ordersCollection = db.collection(FirestoreCollections.orders);
  const orderDocRef = ordersCollection.doc(orderId);
  const orderSnapshot = await orderDocRef.get();
  
  const orderData = orderSnapshot?.data();

  if (orderData)
  {
    orderData.ratings = orderData.ratings ?? [];
    orderData.ratings.push(rating);

    await orderDocRef.set(orderData);
  }
}

/**
 * Maneja la creación de una calificación y la actualización de una orden en Firebase.
 *
 * @param {object} ratingData - El objeto con los datos de la orden respectiva y la calificación. 
 * Incluye el ID de la orden.
 * @return {Promise<void>}
 */
export async function rating(ratingData: {
  raterUserId: string
  ratedUserId: string
  raterUserType: string
  ratedUserType: string
  ratingValue: number
  feedback: string
  orderId: string
}): Promise<void>
{
  return new Promise<void>(async (resolve, reject) =>
  {
    try
    {
      const {
        raterUserId,
        ratedUserId,
        raterUserType,
        ratedUserType,
        ratingValue,
        feedback,
        orderId
      } = ratingData;

      const ratingDocData = {
        raterUserId,
        ratedUserId,
        raterUserType,
        ratedUserType,
        ratingValue,
        feedback
      };

      const ratingsCollection = db.collection(FirestoreCollections.ratings);
      const ratingDocRef = await ratingsCollection.add(ratingDocData);
      const ratingSnapshot = await ratingDocRef.get();
      const rating = ratingSnapshot.data() as Rating;

      if (rating)
      {
        await updateOrderWithRating(orderId, rating);
      }

      resolve();
    }
    catch (error)
    {
      console.error('Error upon registering rating: ', error);
      reject(error);
    }
  })
}
