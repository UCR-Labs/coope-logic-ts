import { Order } from "CoopeTypes";
import { Firestore } from "@angular/fire/firestore";
export declare function updateOrder(db: Firestore, order: Order, docId: string): Promise<any>;
export declare function getUserFCMToken(db: Firestore, userId: string): Promise<string>;
export declare function getBikerName(db: Firestore, bikerId: string): Promise<string>;
export declare function sendMessagePending(orderId: string, fcmToken: string): Promise<void>;
export declare function sendMessageAcceptedBiker(orderId: string, fcmToken: string, bikerName: string): Promise<void>;
export declare function sendMessageArriving(orderId: string, fcmToken: string, bikerName: string): Promise<void>;
export declare function sendMessageRating(orderId: string, fcmToken: string): Promise<void>;
