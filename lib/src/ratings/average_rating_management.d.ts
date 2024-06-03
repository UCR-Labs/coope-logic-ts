import { AverageRating } from 'rideTypes';
/**
 * Obtiene la calificación promedio para un usuario específico.
 * @param {string} userId - El ID del usuario.
 * @return {Promise<AverageRating[]>} Un array de calificaciones promedio.
 */
export declare function getAverageRating(userId: string): Promise<AverageRating[]>;
