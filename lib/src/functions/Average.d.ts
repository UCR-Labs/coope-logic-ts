import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AverageRating, UserType } from "CoopeTypes";
export declare function calculateAverageRatingForUser(userId: string, userType: UserType, newRating: number, db: AngularFirestore): Promise<AverageRating>;
export declare function getAverageRatings(userId: string, db: AngularFirestore): Promise<any[]>;
