import { Rating } from 'rideTypes';
/**
 * Actualiza una orden con una nueva calificación.
 *
 * @param {string} orderId - El ID de la orden que se actualizará.
 * @param {Rating} rating - La calificación que se agregará a la orden.
 * @return {Promise<void>}
 */
export declare function updateOrderWithRating(orderId: string, rating: Rating): Promise<void>;
/**
 * Maneja la creación de una calificación y la actualización de una orden en Firebase.
 *
 * @param {object} ratingData - El objeto con los datos de la orden respectiva y la calificación.
 * Incluye el ID de la orden.
 * @return {Promise<void>}
 */
export declare function rating(ratingData: {
    raterUserId: string;
    ratedUserId: string;
    raterUserType: string;
    ratedUserType: string;
    ratingValue: number;
    feedback: string;
    orderId: string;
}): Promise<void>;
