import type { Accommodation } from "../../domain";
import { accommodationName } from "../../enums";
import type { IOutput } from "../../interfaces";

export class ListAllAccommodationsUseCase {
  private output: IOutput;
  private accommodations: Accommodation[];
  constructor(output: IOutput, accommodations: Accommodation[]) {
    this.accommodations = accommodations;
    this.output = output;
  }
  public async execute(): Promise<void> {
    const accommodations = this.accommodations;
    if (accommodations.length <= 0) {
      console.log("Nenhuma acomodacao sendo usado no moment");
      return;
    }
    this.output.table(
      accommodations.map((accommodation) => ({
        ID: accommodation.id,
        Nome:
          Object.keys(accommodationName).find(
            (key) =>
              accommodationName[key as keyof typeof accommodationName] ===
              accommodation.accommodationName,
          ) || accommodation.accommodationName,
        Descricao: accommodation.accommodationName,
        "Usuario responsavel": `${accommodation.responsibleUser.name} | ${accommodation.responsibleUser.socialName}`,
      })),
    );
  }
}
