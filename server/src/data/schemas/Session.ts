export interface SessionInterface {
  nextNumber: number;
  previousNumber: number;
  currentNumber: number;
  isSorted: boolean;
}

export class SessionSchema {
  nextNumber: number;
  previousNumber: number;
  currentNumber: number;
  isSorted: boolean;
  constructor(data: SessionInterface) {
    this.nextNumber = data.nextNumber;
    this.previousNumber = data.previousNumber;
    this.currentNumber = data.currentNumber;
    this.isSorted = data.isSorted;
  }
}

export const SessionConverter = {
  toFirestore: function (data: SessionInterface) {
    return { ...data };
  },
  fromFirestore: function (snapshot: FirebaseFirestore.QueryDocumentSnapshot) {
    const data = snapshot.data();
    if (data == undefined) return;
    return new SessionSchema(data as SessionInterface);
  },
};
