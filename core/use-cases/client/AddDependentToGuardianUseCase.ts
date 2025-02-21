import type { Client } from "../../domain";
import type { IInput } from "../../interfaces";

export class AddDependentToGuardianUseCase {
  private input: IInput;
  private clients: Client[];
  constructor(clients: Client[], input: IInput) {
    this.input = input;
    this.clients = clients;
  }
  public async execute(): Promise<void> {
    const guardianId = await this.input.textInput("Digite o id do responsavel:");
    const guardian = this.clients.find((client) => client.id === guardianId);
    if (!guardian) {
      console.log("Cliente nao encontrando,tente novamente");
      return;
    }
    const dependentId = await this.input.textInput("Digite o id do dependente:");
    const dependent = this.clients.find((client) => client.id === dependentId);
    if (!dependent) {
      console.log("Cliente nao encontrado,tente novamente");
      return;
    }
    if (guardianId === dependentId) {
      console.log("Guardiao e dependente nao podem ser a mesma pessoa!");
      return;
    }
    guardian.addDependent(dependent);
    console.log("Dependente adicionado com sucesso!");
  }
}
