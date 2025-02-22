


import { type Accommodation, Director } from "../domain";
import { AccommodationConstructor } from "../domain/entities/builders/AccommodationConstructor";
import { accommodationName } from "../enums";

export default class SimpleFamilyDirector extends Director<Accommodation> {
  constructor() {
    super();
    this.builder = new AccommodationConstructor();
  }
  public construct(): Accommodation {
    const accommodation = this.builder as AccommodationConstructor;
    accommodation
      .setAccommodationName(accommodationName.FamiliaSimples)
      .setSingleBed(2)
      .setCoupleBed(1)
      .setSuite(1)
      .setAirConditioning(true)
      .setGarage(1);

    return accommodation.construct();
  }
}
