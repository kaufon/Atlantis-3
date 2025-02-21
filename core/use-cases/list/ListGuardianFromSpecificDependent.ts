import type { Client } from "../../domain";
import type { IInput, IOutput } from "../../interfaces";

export class ListGuardianFromSpecificDependent {
  private clients: Client[];
  private input: IInput;
  private output: IOutput;
  constructor(clients: Client[], input: IInput, output: IOutput) {
    this.input = input;
    this.clients = clients;
    this.output = output;
  }
  public async execute(): Promise<void> {
    const dependentId = await this.input.textInput("Digite o id do dependente:");
    const dependent = this.clients.find((client) => client.id === dependentId);
    if (!dependent) {
      console.log("Cliente nao encotrando,tente novamente");
      return;
    }
    if (!dependent.guardian) {
      console.log("Esse cliente nao possui responsavel");
      return;
    }
    this.output.table([
      {
        ID: dependent.guardian.id,
        Name: dependent.guardian.name,
        "Social name": dependent.guardian.socialName,
      },
    ]);
  }
}
