import { type Accommodation, Director } from "../domain";
import { AccommodationConstructor } from "../domain/entities/builders/AccommodationConstructor";
import { accommodationName } from "../enums";

export default class SimpleSingleDirector extends Director<Accommodation> {
  constructor() {
    super();
    this.builder = new AccommodationConstructor();
  }
  public construct(): Accommodation {
    const accommodation = this.builder as AccommodationConstructor;
    accommodation
      .setAccommodationName(accommodationName.SolteiroSimples)
      .setCoupleBed(0)
      .setSingleBed(1)
      .setAirConditioning(true)
      .setGarage(0)
      .setSuite(1);
    return accommodation.construct();
  }
}
