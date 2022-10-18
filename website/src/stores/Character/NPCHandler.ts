import type { InvestigatorInterface } from "../types/InvestigatorTypes";
import { Investigator } from "./InvestigatorHandler";

export class NPCHandler extends Investigator {
  constructor(data: InvestigatorInterface) {
    super(data);
  }
}
