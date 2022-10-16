import { InvestigatorInterface, InvestigatorSchema } from "./Investigator";

export class NPCSchema extends InvestigatorSchema {
  constructor(data: InvestigatorInterface) {
    super(data);
  }
}
