import type { SchemaBase } from "./SchemaBase";

export interface CustomRoll extends SchemaBase {
  notation: string;
  name: string;
  investigatorId: string;
}

export class RollSchema implements CustomRoll {
  id: string;
  notation: string;
  name: string;
  investigatorId: string;
  constructor(
    id: string,
    name: string,
    notation: string,
    investigatorId: string
  ) {
    this.id = id;
    this.notation = notation;
    this.name = name;
    this.investigatorId = investigatorId;
  }
}
