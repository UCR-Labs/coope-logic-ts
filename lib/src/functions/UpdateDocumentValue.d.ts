import { Firestore, DocumentData, PartialWithFieldValue } from '@angular/fire/firestore';
import { FirestoreCollections } from 'CoopeTypes';
export declare function updateDocumentValue(firestore: Firestore, docId: string, data: PartialWithFieldValue<DocumentData>, collection: keyof typeof FirestoreCollections): Promise<void>;
