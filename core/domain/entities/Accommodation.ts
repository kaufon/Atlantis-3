import { Client } from ".";
import { accommodationName } from "../../enums";
import { Entity } from "../abstracts";

type AccommodationProps = {
  accommodationName: accommodationName;
  singleBed: number;
  coupleBed: number;
  suite: number;
  airConditioning: boolean;
  garage: number;
  responsibleUser: Client
};

export class Accommodation extends Entity<AccommodationProps> {
  public get accommodationName(): accommodationName {
    return this.props.accommodationName;
  }

  public get singleBed(): number {
    return this.props.singleBed;
  }

  public get coupleBed(): number {
    return this.props.coupleBed;
  }

  public get suite(): number {
    return this.props.suite;
  }

  public get airConditioning(): boolean {
    return this.props.airConditioning;
  }

  public get garage(): number {
    return this.props.garage;
  }
  public get responsibleUser(): Client{
    return this.props.responsibleUser
  }
}

