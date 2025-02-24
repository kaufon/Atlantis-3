import type { Accommodation, accommodationName, Client, Director } from "../..";
import { PlusFamilyDirector } from "../../directors/PlusFamilyDirector";
import { PlusSingleDirector } from "../../directors/PlusSingleDirector";
import { SimpleCoupleDirector } from "../../directors/SimpleCoupleDirector";
import { SimpleFamilyDirector } from "../../directors/SimpleFamilyDirector";
import { SimpleSingleDirector } from "../../directors/SimpleSingleDirector";
import { SuperFamilyDirector } from "../../directors/SuperFamilyDirector";
import type { IInput } from "../../interfaces";

export class RentAccomodationUseCase {
  private input: IInput;
  private clients: Client[];
  private accommodations: Accommodation[];
  constructor(
    input: IInput,
    clients: Client[],
    accommodations: Accommodation[],
  ) {
    this.input = input;
    this.clients = clients;
    this.accommodations = accommodations;
  }
  public async execute(): Promise<void> {
    if (this.clients.length <= 0) {
      console.log("Nenhum cliente encontrado");
      return;
    }

    const clientId = await this.input.textInput(
      "Insira o id do cliente que ira alugar a acomodacao",
    );
    const client = this.clients.find((client) => client.id === clientId);
    if (!client) {
      console.log("Cliente nao encontrado,tente novamente");
      return;
    }

    const accommodationChoice = await this.input.selectInput(
      "Escolha a acomocadao",
      [
        ["Casal Simples", "simpleCouple"],
        ["Familia Simples", "simpleFamily"],
        ["Familia Mais", "plusFamily"],
        ["Familia Super", "superFamily"],
        ["Solteiro Simples", "simpleSingle"],
        ["Solteiro Mais", "plusSingle"],
      ],
    );
    let director: Director<Accommodation>;
    switch (accommodationChoice) {
      case "simpleCouple":
        director = new SimpleCoupleDirector(client);
        break;
      case "simpleFamily":
        director = new SimpleFamilyDirector(client);
        break;
      case "plusFamily":
        director = new PlusFamilyDirector(client);
        break;
      case "superFamily":
        director = new SuperFamilyDirector(client);
        break;
      case "simpleSingle":
        director = new SimpleSingleDirector(client);
        break;
      case "plusSingle":
        director = new PlusSingleDirector(client);
        break;
      default:
        console.log("Opção inválida");
        return;
    }
    const accommodation = director.construct();
    this.accommodations.push(accommodation);
    console.log("Acomocadao alugada com sucesso!");
  }
}
