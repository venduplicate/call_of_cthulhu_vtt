export class HealthHandler {
  hpCurrent: number;
  hpMax: number;
  constructor(hpCurrent: number, hpMax: number) {
    this.hpCurrent = hpCurrent;
    this.hpMax = hpMax;
  }
  get hp() {
    return this.hpCurrent;
  }
  set hp(value: number) {
    this.hpCurrent = value;
  }
  get maxHP() {
    return this.hpMax;
  }
  subtractHP(value: number) {
    const newHP = this.hp - value;
    this.hp = newHP < 0 ? 0 : newHP;
    return this;
  }
  addHP(value: number) {
    const newHP = this.hp + value;
    this.hp = newHP <= this.maxHP ? newHP : this.maxHP;
    return this;
  }
}
