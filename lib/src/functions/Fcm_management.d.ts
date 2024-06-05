import { Firestore } from "@angular/fire/firestore";
export declare function handleUserFcmTokenUpdate(userId: string, fcmToken: string, collectionName: string, db: Firestore): Promise<any>;
export declare function updateFCMToken({ uid, fcmToken, collectionName, }: {
    uid: string;
    fcmToken: string;
    collectionName: string;
}, db: Firestore): Promise<void>;
