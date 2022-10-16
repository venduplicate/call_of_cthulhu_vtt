import {
  PartialWithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";

export interface ConverterInterface<T extends Record<string, any>> {
  toFirestore: (data: PartialWithFieldValue<T>) => DocumentData;
  fromFirestore: (snapshot: QueryDocumentSnapshot<T>) => { id: string } & T;
}

export const FirebaseConverter = <T extends Record<string, any>>() => ({
  toFirestore: function (data: PartialWithFieldValue<T>): DocumentData {
    return { ...data };
  },
  fromFirestore: function (snapshot: QueryDocumentSnapshot<T>) {
    const data = snapshot.data();
    return { id: snapshot.id, ...data };
  },
});
