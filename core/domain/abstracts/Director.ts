import type { IConstrutor } from "../../interfaces";

export abstract class Director<T> {
  protected builder!: IConstrutor<T>;
  public abstract construct(): T;
}
