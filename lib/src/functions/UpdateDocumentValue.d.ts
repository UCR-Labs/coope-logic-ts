import { Firestore, DocumentData, PartialWithFieldValue } from '@angular/fire/firestore';
import { FirestoreCollections } from 'CoopeTypes';
export declare class UpdateDocumentValue {
    private firestore;
    constructor(firestore: Firestore);
    updateDocumentValue(docId: string, data: PartialWithFieldValue<DocumentData>, collection: keyof typeof FirestoreCollections): Promise<void>;
}
