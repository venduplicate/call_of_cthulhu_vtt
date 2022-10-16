import { Skill, Skills } from "./SkillHandler";
import { v4 } from "uuid";
import { InitiativeInterface } from "../../data/schemas/Initiative";
import { Characteristic } from "./CharacteristicHandler";
import { Weapon, WeaponMap } from "./AttackHandler";

const combatStats = ["Firearms", "Fighting", "Dodge"];

export interface CharacterInitiativeInterface {
  combatSkills: Skills;
}

export class CharacterInitiativeHandler {
  combatSkills: Skills;
  constructor(data: InitiativeInterface) {
    this.combatSkills = new Map();
  }
  setCombatSkills(skills: Skills) {
    skills.forEach((skill: Skill) => {
      const index = combatStats
        .map((value: string) => value)
        .indexOf(skill.name);
      if (index > -1) {
        this.combatSkills.set(skill.name, skill);
      } else {
        return;
      }
    });
    return this;
  }
  hasFirearm(weapons: WeaponMap) {
    let hasFirearm = false;
    weapons.forEach((item: Weapon) => {
      if (item.type == "firearm") {
        hasFirearm = true;
      }
    });
    return hasFirearm;
  }
  createInitiativeObject(
    investigatorId: string,
    dexReg: number, 
    
  ): InitiativeInterface {
    return {
      id: v4(),
      investigator_id: this.id,
      round_order: 0,
      status_effects: [],
      dex_modifier: this.characteristics["dex"].reg,
      firearm: { hasFirearm: this.hasFirearm(), needsReload: false },
      isCurrentTurn: false,
      combat_modifier: this.getHighestCombatSkill(),
      name: this.name,
    };
  }
}
