type AddressProps = {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
};
import type { IPrototype } from "../../interfaces/Prototype.ts";
import { Entity } from "../index.ts";
export class Address extends Entity<AddressProps> implements IPrototype {
  get street(): string {
    return this.props.street;
  }
  get neighborhood(): string {
    return this.props.neighborhood;
  }
  get city(): string {
    return this.props.city;
  }
  get state(): string {
    return this.props.state;
  }
  get postalCode(): string {
    return this.props.postalCode;
  }
  public clone(): IPrototype {
    return new Address(this.props);
  }
}
