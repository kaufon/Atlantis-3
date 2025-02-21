import type { Client } from "../../domain";
import type { IInput, IOutput } from "../../interfaces";

export class ListDependentsFromSpecificGuardian {
  private clients: Client[];
  private input: IInput;
  private output: IOutput;
  constructor(clients: Client[], input: IInput, output: IOutput) {
    this.input = input;
    this.clients = clients;
    this.output = output;
  }
  public async execute(): Promise<void> {
    const guardianId = await this.input.textInput("Digite o id do responsavel:");
    const guardian = this.clients.find((client) => client.id === guardianId);
    if (!guardian) {
      console.log("Cliente nao encotrando,tente novamente");
      return;
    }
    if (guardian.dependents.length <= 0) {
      console.log("Esse cliente nao possui dependentes");
      return;
    }
    this.output.table(
      guardian.dependents.map((dependent) => ({
        ID: dependent.id,
        Nome: dependent.name,
        "Nome Social": dependent.socialName,
      })),
    );
  }
}
