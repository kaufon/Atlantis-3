

import { type Accommodation, Director } from "../domain";
import { AccommodationConstructor } from "../domain/entities/builders/AccommodationConstructor";
import { accommodationName } from "../enums";

export default class PlusFamilyDirector extends Director<Accommodation> {
  constructor() {
    super();
    this.builder = new AccommodationConstructor();
  }
  public construct(): Accommodation {
    const accommodation = this.builder as AccommodationConstructor;
    accommodation
      .setAccommodationName(accommodationName.FamiliaMais)
      .setSingleBed(5)
      .setCoupleBed(1)
      .setSuite(2)
      .setAirConditioning(true)
      .setGarage(2);

    return accommodation.construct();
  }
}
