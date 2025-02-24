import type { Accommodation } from "../../domain";
import type { IInput } from "../../interfaces";

export class DeleteAccommodationUseCase {
  private input: IInput;
  private accommodations: Accommodation[];
  constructor(input: IInput, accommodations: Accommodation[]) {
    this.input = input;
    this.accommodations = accommodations;
  }
  public async execute(): Promise<void> {

    if (this.accommodations.length <= 0) {
      console.log("Nenhuma acomodacao sendo usada no momento");
      return;
    }
    const accommodationId = await this.input.textInput(
      "Insira o ID da acomodacao",
    );
    const accomodationIndex = this.accommodations.findIndex(
      (accomodation) => accomodation.id === accommodationId,
    );
    if (accomodationIndex === -1) {
      console.log("Acomodacao nao encontrada,tente novamente !");
      return;
    }
    this.accommodations.splice(accomodationIndex, 1);
    console.log("Acomodacao removida com sucesso!");
  }
}
