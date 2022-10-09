import { SchemaBase } from "../schemas/SchemaBase";
import { db } from "./FireBaseAccess";

export default class DBBase {
    db: FirebaseFirestore.Firestore
    constructor() {
        this.db = db;
    }
    async getDocData(converter: FirebaseFirestore.FirestoreDataConverter<any | undefined>, docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>) {
        const data = await docRef.withConverter(converter).get();
        return data;
    }
    async getCollectionData(collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>) {
        const data = await collectionRef.get();
        return data;
    }
    async setDocData<Type>(converter: FirebaseFirestore.FirestoreDataConverter<Type | undefined>, docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>, docData: Type) {
        await docRef.withConverter(converter).set(docData, { merge: true });
    }
    async deleteDocData(docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>) {
        await docRef.delete();
    }
    async setBatchData<Type extends SchemaBase>(collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>, collectionData: Type[]) {
        const batch = this.db.batch()

        for (const doc of collectionData) {
            const recordRef = collectionRef.doc(doc.id);
            batch.set(recordRef, doc);
        }
        await batch.commit();
    }
    async deleteBatchData<Type extends SchemaBase>(collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>, collectionData: Type[]){
        const batch = this.db.batch();

        for (const doc of collectionData) {
            const recordRef = collectionRef.doc(doc.id)
            batch.delete(recordRef)
        }
        await batch.commit()
    }
}