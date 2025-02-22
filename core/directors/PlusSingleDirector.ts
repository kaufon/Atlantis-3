import { type Accommodation, Client, Director } from "../domain";
import { AccommodationConstructor } from "../domain/entities/builders/AccommodationConstructor";
import { accommodationName } from "../enums";

export class PlusSingleDirector extends Director<Accommodation> {
  private responsibleUser: Client;
  constructor(responsibleUser: Client) {
    super();
        this.responsibleUser = responsibleUser
    this.builder = new AccommodationConstructor();
  }
  public construct(): Accommodation {
    const accommodation = this.builder as AccommodationConstructor;
    accommodation
      .setAccommodationName(accommodationName.SolteiroMais)
      .setSingleBed(0)
      .setCoupleBed(1)
      .setSuite(1)
      .setAirConditioning(true)
      .setGarage(1)
      .setResponsibleUser(this.responsibleUser);

    return accommodation.construct();
  }
}
