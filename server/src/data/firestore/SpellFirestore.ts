import { SpellInterface } from "../schemas/Spell";
import { FirebaseConverter } from "./Converter";
import DBBase from "./DBBase";

export class SpellFirestore extends DBBase {
  spells: string;
  constructor() {
    super();
    this.spells = "spells";
  }
  getSpellRef() {
    return this.db.collection(this.spells);
  }
  getSpellData(id: string) {
    try {
      const ref = this.getSpellRef().doc(id);
      const data = this.getDocData(FirebaseConverter<SpellInterface>(), ref);
      return data;
    } catch (error) {
      return undefined;
    }
  }
}
