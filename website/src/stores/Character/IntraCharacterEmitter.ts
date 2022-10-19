import EventEmitter from "events";

export class IntraCharacterEmitter extends EventEmitter {}

const intraEmitter = new IntraCharacterEmitter();
export default intraEmitter;
