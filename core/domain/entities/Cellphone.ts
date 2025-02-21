import type { IPrototype } from "../../interfaces/Prototype"
import { Entity } from "../abstracts"

type CellphoneProps = {
  ddd: string,
  number: string
}
export class Cellphone extends Entity<CellphoneProps> implements IPrototype{
  get ddd():string{
    return this.props.ddd
  }
  get number():string{
    return this.props.number
  }
  public clone(): IPrototype {
     return new Cellphone(this.props) 
  }
}
