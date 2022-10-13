import { InitiativeInterface } from "../data/schemas/Initiative";
import {CharacteristicList, Skill, Skills, Weapon } from "../data/schemas/Investigator";
import { InvestigatorFirestore } from "../data/schemas/Investigator";
import { roller } from "../utilities/DiceRoll";

const combatStats = ["Firearms", "Fighting", "Dodge"];

function getCombatStats(skills: Skill[]) {
  const combatSkills: Skill[] = [];

  skills.forEach((skill: Skill) => {
    const index = combatStats.map((value: string) => value).indexOf(skill.name);
    if (index > -1) {
      combatSkills.push(skill);
    } else {
      return;
    }
  });
  return combatSkills;
}

export class Investigator implements InvestigatorFirestore {
  id: string;
  name: string;
  player: string;
  occupation: string;
  age: number;
  pronouns: string;
  gender: string;
  residence: string;
  birthplace: string;
  characteristics: CharacteristicList
  skills: Skills;
  weapons: Weapon[];
  gear_possessions: string;
  cash_assests: {
    spending_level: string;
    cash: string;
    assets: string;
    notes: string;
  };
  personal_desc: string;
  ideology_beliefs: string;
  significant_people: string;
  meaningful_locations: string;
  treasured_possessions: string;
  traits: string;
  injuries_scars: string;
  phobias_manias: string;
  arcane_tomes_spells_artifacts: string;
  encounters_with_strange_entities: string;
  combat_skills: Skill[];
  total_sanity_loss: number;
  maximum_sanity: number;
  current_sanity: number;
  constructor(data: InvestigatorFirestore) {
    this.id = data.id;
    this.name = data.name;
    this.player = data.player;
    this.age = data.age;
    this.occupation = data.occupation;
    this.pronouns = data.pronouns;
    this.gender = data.gender;
    this.residence = data.residence;
    this.birthplace = data.birthplace;
    this.characteristics = data.characteristics;
    this.skills = data.skills;
    this.weapons = data.weapons;
    this.gear_possessions = data.gear_possessions;
    this.cash_assests = data.cash_assests;
    this.personal_desc = data.personal_desc;
    this.ideology_beliefs = data.ideology_beliefs;
    this.significant_people = data.significant_people;
    this.meaningful_locations = data.meaningful_locations;
    this.treasured_possessions = data.treasured_possessions;
    this.traits = data.traits;
    this.injuries_scars = data.injuries_scars;
    this.phobias_manias = data.phobias_manias;
    this.arcane_tomes_spells_artifacts = data.arcane_tomes_spells_artifacts;
    this.encounters_with_strange_entities =
      data.encounters_with_strange_entities;
    this.combat_skills = [];
    this.total_sanity_loss = data.total_sanity_loss;
    this.maximum_sanity = data.maximum_sanity;
    this.current_sanity = data.current_sanity;
  }
  initialize(){
    this.setCombatSkills();
    this.subtractMythosFromSanity();
  }
  setCombatSkills() {
    this.skills.forEach((skill: Skill) => {
      const index = combatStats
        .map((value: string) => value)
        .indexOf(skill.name);
      if (index > -1) {
        this.combat_skills.push(skill);
      } else {
        return;
      }
    });
  }
  getHighestCombatSkill(){
    this.combat_skills.sort((skillOne: Skill, skillTwo: Skill) => {
      return skillTwo.reg - skillOne.reg;
    })
    return this.combat_skills[0].reg
  }
  hasFirearm(){
    let hasFirearm = false;
    this.weapons.forEach((item: Weapon) => {
      if (item.type == "firearm"){
        hasFirearm = true;
      }
    })
    return hasFirearm;
  }
  subtractMythosFromSanity(){
    const CthulhuMythosNum = this.skills.get("Cthulhu Mythos")
    if (CthulhuMythosNum != null){
      this.maximum_sanity = this.maximum_sanity - CthulhuMythosNum.reg
    }
  }
  getInitiativeObject(): InitiativeInterface {
    return {id: "",player_id: this.id,round_order: 0,status_effects: [],dex_modifier: this.characteristics["dex"].reg,firearm: {hasFirearm: this.hasFirearm(), needsReload: false},isCurrentTurn: false,combat_modifier: this.getHighestCombatSkill()}
  }
}
