import { Firestore } from "@angular/fire/firestore";
import { Business } from "CoopeTypes";
export declare function getBusinesses(db: Firestore): Promise<Business[]>;
export declare function fetchBusinessesFromFirebase(db: Firestore): Promise<Business[]>;
export declare function getBusinessById(db: Firestore, id: string): Promise<Business | null>;
export declare function fetchBusinessFromFirebase(db: Firestore, id: string): Promise<Business | null>;
