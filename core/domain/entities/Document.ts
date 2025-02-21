import { Entity } from "../abstracts"
import type { documentType } from "../../index.ts";

type DocumentProps = {
  number: string;
  type: documentType;
  expeditionDate: Date;
};
export class Document extends Entity<DocumentProps> {
  get number(): string {
    return this.props.number;
  }
  get type(): documentType {
    return this.props.type;
  }
  get expeditionDate(): Date {
    return this.props.expeditionDate;
  }
}
