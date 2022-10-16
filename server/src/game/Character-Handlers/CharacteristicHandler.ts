export interface Characteristic {
  reg: number;
  half: number;
  fifth: number;
}

export type CharacteristicStrings =
  | "str"
  | "dex"
  | "con"
  | "siz"
  | "app"
  | "int"
  | "pow"
  | "edu"
  | "luck";

export type CharacteristicList = Record<CharacteristicStrings, Characteristic>;


export class CharacteristicBase {
  characteristic: Characteristic;
  constructor(characteristic: Characteristic) {
    this.characteristic = characteristic;
  }
  getCharacteristic() {
    return this.characteristic;
  }
  setCharacteristic(newReg: number) {
    const newCharacteristic = this.calculateHalfandFifthValues(newReg);
    this.characteristic = newCharacteristic;
    return this;
  }
  calculateHalfandFifthValues(regValue: number): Characteristic {
    const halfValue = Math.floor(regValue / 2);
    const fifthValue = Math.floor(regValue / 5);
    return { reg: regValue, half: halfValue, fifth: fifthValue };
  }
}

export class LuckHandler extends CharacteristicBase {
  constructor(luck: Characteristic) {
    super(luck);
  }
}

export class StrengthHandler extends CharacteristicBase {
  constructor(str: Characteristic) {
    super(str);
  }
}

export class DexterityHandler extends CharacteristicBase {
  constructor(dex: Characteristic) {
    super(dex);
  }
}

export class ConstitutionHandler extends CharacteristicBase {
  constructor(con: Characteristic) {
    super(con);
  }
}

export class SizeHandler extends CharacteristicBase {
  constructor(siz: Characteristic) {
    super(siz);
  }
}

export class AppearanceHandler extends CharacteristicBase {
  constructor(app: Characteristic) {
    super(app);
  }
}

export class IntelligenceHandler extends CharacteristicBase {
  constructor(int: Characteristic) {
    super(int);
  }
}

export class PowerHandler extends CharacteristicBase {
  constructor(pow: Characteristic) {
    super(pow);
  }
}

export class EducationHandler extends CharacteristicBase {
  constructor(edu: Characteristic) {
    super(edu);
  }
}

export class CharacteristicHandler {
  private str: StrengthHandler;
  private dex: DexterityHandler;
  private con: ConstitutionHandler;
  private siz: SizeHandler;
  private app: AppearanceHandler;
  private int: IntelligenceHandler;
  private pow: PowerHandler;
  private edu: EducationHandler;
  private luck: LuckHandler;
  constructor(data: CharacteristicList) {
    this.str = new StrengthHandler(data.str);
    this.dex = new DexterityHandler(data.dex);
    this.con = new ConstitutionHandler(data.con);
    this.siz = new SizeHandler(data.siz);
    this.app = new AppearanceHandler(data.app);
    this.int = new IntelligenceHandler(data.int);
    this.pow = new PowerHandler(data.pow);
    this.edu = new EducationHandler(data.edu);
    this.luck = new LuckHandler(data.luck);
  }
  get strHandler() {
    return this.str;
  }
  get dexHandler() {
    return this.dex;
  }
  get conHandler() {
    return this.con;
  }
  get sizHandler() {
    return this.siz;
  }
  get appHandler() {
    return this.app;
  }
  get intHandler() {
    return this.int;
  }
  get powHandler() {
    return this.pow;
  }
  get eduHandler() {
    return this.edu;
  }
  get luckHandler() {
    return this.luck;
  }
}
