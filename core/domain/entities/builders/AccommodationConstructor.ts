import { accommodationName } from "../../../enums";
import { IConstrutor } from "../../../interfaces";
import { RemoveDependentFromGuardianUseCase } from "../../../use-cases";
import { Accommodation, Client } from "../../entities";
export class AccommodationConstructor implements IConstrutor<Accommodation> {
  private AccommodationName: accommodationName;
  private responsibleUser: Client;
  private singleBed: number;
  private coupleBed: number;
  private suite: number;
  private airConditioning: boolean;
  private garage: number;
  constructor() {
    this.AccommodationName = accommodationName.SolteiroSimples;
    this.singleBed = 0;
    this.coupleBed = 0;
    this.suite = 0;
    this.airConditioning = false;
    this.garage = 0;
  }
  public setAccommodationName(accommodationName: accommodationName): this {
    this.AccommodationName = accommodationName;
    return this;
  }
  public setResponsibleUser(responsibleUser: Client): this {
    this.responsibleUser = responsibleUser;
    return this;
  }
  public setSingleBed(singleBed: number): this {
    this.singleBed = singleBed;
    return this;
  }
  public setCoupleBed(coupleBed: number): this {
    this.coupleBed = coupleBed;
    return this;
  }
  public setSuite(suite: number): this {
    this.suite = suite;
    return this;
  }
  public setAirConditioning(airConditioning: boolean): this {
    this.airConditioning = airConditioning;
    return this;
  }
  public setGarage(garage: number): this {
    this.garage = garage;
    return this;
  }
  construct(): Accommodation {
    return new Accommodation({
      accommodationName: this.AccommodationName,
      singleBed: this.singleBed,
      coupleBed: this.coupleBed,
      suite: this.suite,
      airConditioning: this.airConditioning,
      garage: this.garage,
      responsibleUser: this.responsibleUser,
    });
  }
}
