import { Firestore } from "@angular/fire/firestore";
interface ProductPhotoAndTags {
    tagNames: string[];
    productPhoto: string;
}
export declare function getProducts(db: Firestore): Promise<ProductPhotoAndTags[]>;
export declare function fetchProductsFromFirebase(db: Firestore): Promise<ProductPhotoAndTags[]>;
export {};
