export interface SessionInterface {
    next: string;
    previous: string;
    current: string;
    isSorted: boolean;
}

export class SessionSchema {
    next: string;
    previous: string;
    current: string;
    isSorted: boolean;
    constructor(data: SessionInterface){
        this.next = data.next;
        this.previous = data.previous;
        this.current = data.current;
        this.isSorted = data.isSorted;
    }
}

export const SessionConverter = {
    toFirestore: function(data: SessionInterface){
        return {...data}
    },
    fromFirestore: function(snapshot: FirebaseFirestore.QueryDocumentSnapshot){
        const data = snapshot.data();
        if (data == undefined) return
        return new SessionSchema(data as SessionInterface);
    }
}