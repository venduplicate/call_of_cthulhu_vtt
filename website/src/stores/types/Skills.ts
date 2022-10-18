import type { Characteristic } from "./Characteristics";
import type { SkillHandler } from "../Character/SkillHandler";

export interface Skill extends Characteristic {
  name: string;
  hasImproved: boolean;
}

export type Skills = Map<string, SkillHandler>;

export type SkillFirestore = Map<string, Skill>;
