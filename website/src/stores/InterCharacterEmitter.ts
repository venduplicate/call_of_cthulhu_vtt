import EventEmitter from "events";


export class InterCharacterEmitter extends EventEmitter {
}

export const interCharacterHandler = new InterCharacterEmitter();

export default interCharacterHandler;
// characters apply status effects to each other
// characters damage each other
// monsters induce sanity checks to player
// characters apply effects to themselves
// spells are cast