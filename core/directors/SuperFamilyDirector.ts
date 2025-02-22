import { type Accommodation, Client, Director } from "../domain";
import { AccommodationConstructor } from "../domain/entities/builders/AccommodationConstructor";
import { accommodationName } from "../enums";

export class SuperFamilyDirector extends Director<Accommodation> {
  private responsibleUser: Client;
  constructor(responsibleUser: Client) {
    super();
    this.responsibleUser = responsibleUser;
    this.builder = new AccommodationConstructor();
  }
  public construct(): Accommodation {
    const accommodation = this.builder as AccommodationConstructor;
    accommodation
      .setAccommodationName(accommodationName.FamiliaSuper)
      .setSingleBed(6)
      .setCoupleBed(2)
      .setSuite(3)
      .setAirConditioning(true)
      .setGarage(2)
      .setResponsibleUser(this.responsibleUser);

    return accommodation.construct();
  }
}
