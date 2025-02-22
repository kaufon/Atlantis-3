
import { type Accommodation, Director } from "../domain";
import { AccommodationConstructor } from "../domain/entities/builders/AccommodationConstructor";
import { accommodationName } from "../enums";

export default class SuperFamilyDirector extends Director<Accommodation> {
  constructor() {
    super();
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
      .setGarage(2);

    return accommodation.construct();
  }
}
