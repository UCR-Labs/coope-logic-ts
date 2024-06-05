import { Firestore } from "@angular/fire/firestore";
import { AverageRating, UserType } from "CoopeTypes";
export declare function calculateAverageRatingForUser(userId: string, userType: UserType, newRating: number, db: Firestore): Promise<AverageRating>;
export declare function getAverageRatings(userId: string, db: Firestore): Promise<any[]>;
