import type { Document } from "./Document";
import type { Address } from "./Address";
import type { Cellphone } from "./Cellphone";
import { Entity } from "../abstracts";

type ClientProps = {
  name: string;
  socialName: string;
  birthDate: Date;
  registrationDate: Date;
  cellphones: Cellphone[];
  address: Address;
  documents: Document[];
  dependents: Client[];
  guardian?: Client;
};

export class Client extends Entity<ClientProps> {
  get name(): string {
    return this.props.name;
  }
  set name(value: string) {
    this.props.name = value;
  }

  get socialName(): string {
    return this.props.socialName;
  }
  set socialName(value: string) {
    this.props.socialName = value;
  }

  get birthDate(): Date {
    return this.props.birthDate;
  }
  set birthDate(value: Date) {
    this.props.birthDate = value;
  }

  get registrationDate(): Date {
    return this.props.registrationDate;
  }
  set registrationDate(value: Date) {
    this.props.registrationDate = value;
  }

  get cellphones(): Cellphone[] {
    return this.props.cellphones;
  }
  set cellphones(value: Cellphone[]) {
    this.props.cellphones = value;
  }

  get address(): Address {
    return this.props.address;
  }
  set address(value: Address) {
    this.props.address = value;
  }

  get documents(): Document[] {
    return this.props.documents;
  }
  set documents(value: Document[]) {
    this.props.documents = value;
  }

  get guardian(): Client | undefined {
    return this.props.guardian;
  }
  set guardian(value: Client | undefined) {
    this.props.guardian = value;
  }

  get dependents(): Client[] {
    if (!this.props.dependents) {
      this.props.dependents = [];
    }
    return this.props.dependents;
  }
  set dependents(value: Client[]) {
    this.props.dependents = value;
  }

  public addDependent(dependent: Client): this {
    if (!this.props.dependents) {
      this.props.dependents = [];
    }
    this.props.dependents.push(dependent);
    dependent.guardian = this;
    return this;
  }
  public removeDependent(dependent: Client): this {
    if (!this.props.dependents) {
      this.props.dependents = [];
    }
    const dependentIndex = this.props.dependents.findIndex(
      (client) => client.id === dependent.id,
    );
    this.props.dependents.splice(dependentIndex, 1);
    dependent.guardian = undefined;
    return this;
  }

  public setName(value: string): this {
    this.name = value;
    return this;
  }

  public setSocialName(value: string): this {
    this.socialName = value;
    return this;
  }

  public setBirthDate(value: Date): this {
    this.birthDate = value;
    return this;
  }

  public setRegistrationDate(value: Date): this {
    this.registrationDate = value;
    return this;
  }

  public setCellphones(value: Cellphone[]): this {
    this.cellphones = value;
    return this;
  }

  public setAddress(value: Address): this {
    this.address = value;
    return this;
  }

  public setDocuments(value: Document[]): this {
    this.documents = value;
    return this;
  }

  public setGuardian(value: Client | undefined): this {
    this.guardian = value;
    return this;
  }

  public setDependents(value: Client[]): this {
    this.dependents = value;
    return this;
  }
}
