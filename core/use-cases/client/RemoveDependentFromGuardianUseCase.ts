import type { Client } from "../../domain";
import type { IInput } from "../../interfaces";

export class RemoveDependentFromGuardianUseCase {
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
    if (
      guardian.dependents?.find((depedent) => dependent.id === dependentId) ===
      undefined
    ) {
      console.log("Esse cliente nao tem esse dependente !");
      return;
    }
    guardian.removeDependent(dependent);
    console.log("Dependente removido com sucesso!")
  }
}
