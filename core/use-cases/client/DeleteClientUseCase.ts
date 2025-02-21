import type { Client } from "../../domain";
import type { IInput } from "../../interfaces";

export class DeleteClientUseCase {
  private input: IInput;
  private clients: Client[];
  constructor(clients: Client[], input: IInput) {
    this.clients = clients;
    this.input = input;
  }
  public async execute(): Promise<void> {
    if (this.clients.length <= 0) {
      console.log("Nenhum cliente cadastrado");
      return;
    }
    const clientId = await this.input.textInput(
      "Digite o ID do cliente a ser selecionado",
    );
    const clientIndex = this.clients.findIndex(
      (client) => client.id === clientId,
    );
    if (clientIndex === -1) {
      console.log("Cliente nao encontrado tente novamente!");
      return;
    }
    this.clients.splice(clientIndex, 1);
    console.log("Cliente removido com sucesso!")
  }
}
