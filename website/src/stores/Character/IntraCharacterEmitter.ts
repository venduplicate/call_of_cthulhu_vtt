import EventEmitter from "events";

export class IntraCharacterEmitter extends EventEmitter {}

const intraCharacterHandler = new IntraCharacterEmitter();

export default intraCharacterHandler;