import EventEmitter from "events";

type PlayersMap = Map<string, Set<string>>;

export class InterCharacterEventTarget extends EventTarget {};

export class InterCharacterEmitter extends EventTarget {
    playerIds: PlayersMap = new Map()
    constructor() {
        super();
    }
    get roomsMap() {
        return new Map(this.rooms);
    }
    set roomsMap(value: RoomsMap) {
        this.rooms = value;
    }
    init() {
        console.log("test")
    }
    to(characterId: string) {
        // to logic
    }
    join(characterId: string) {
        const roomsTemp = this.roomsMap
        const room = roomsTemp.get(characterId)
        if(room){
            room.add(characterId);
            roomsTemp.set(sessionId, room);
            this.roomsMap = roomsTemp;
        }
        else {
            roomsTemp.set(sessionId, new Set(characterId));
            this.roomsMap = roomsTemp;
        }
        return this;
        
    }


}

const emitterBetweenCharacters = new InterCharacterEmitter();
export default emitterBetweenCharacters;

// between different characters

// characters apply status effects to each other
// characters damage each other
// monsters induce sanity checks to player
// characters apply effects to themselves
// spells are cast