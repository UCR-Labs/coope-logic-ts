import { Injectable } from '@angular/core';
import { Firestore, DocumentData, PartialWithFieldValue, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { FirestoreCollections } from 'CoopeTypes';

@Injectable({
  providedIn: 'root'
})
export class UpdateDocumentValue {
  constructor(private firestore: Firestore) {}

  public updateDocumentValue(
    docId: string,
    data: PartialWithFieldValue<DocumentData>,
    collection: keyof typeof FirestoreCollections
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const documentRef = doc(this.firestore, FirestoreCollections[collection], docId);
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
          await setDoc(documentRef, data, { merge: true });
          resolve();
        } else {
          reject(new Error('Document does not exist.'));
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}