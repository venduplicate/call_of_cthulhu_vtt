import DBBase from "./DBBase";
import {  MonsterInterface } from "../schemas/Characters/Monster";
import { FirebaseConverter } from "./Converter";
export class MonsterFirestore extends DBBase {
  monsters: string;
  constructor() {
    super();
    this.monsters = "monsters";
  }
  getMonsterRef() {
    return this.db.collection(this.monsters);
  }
  getMonsterData(id: string) {
    try {
      const ref = this.getMonsterRef().doc(id);
      const data = this.getDocData(FirebaseConverter<MonsterInterface>(), ref);
      return data;
    } catch (error) {
      return undefined;
    }
  }
}
