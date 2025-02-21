import type { Client } from "../../domain";
import type { IInput, IOutput } from "../../interfaces";

export class ListAllClientsUseCase {
  private clients: Client[];
  private output: IOutput;
  constructor(clients: Client[], output: IOutput) {
    this.output = output;
    this.clients = clients;
  }
  public async execute(): Promise<void> {
    if (this.clients.length <= 0) {
      console.log("Nenhum cliente encontrado");
      return;
    }
    const clientsTable = this.clients.map((client) => ({
      ID: client.id,
      Nome: client.name,
      "Nome Social": client.socialName,
      "Data de nascimento": `${client.birthDate.getDate()}/${client.birthDate.getMonth() + 1}/${client.birthDate.getFullYear()}`,
      "Data de registro": `${client.registrationDate.getDate()}/${client.registrationDate.getMonth() + 1}/${client.registrationDate.getFullYear()}`,
      Endereco: `${client.address.street}, ${client.address.neighborhood}, ${client.address.city}, ${client.address.state}, ${client.address.postalCode}`,
      Celulares: client.cellphones.map(
        (cellphone) => `${cellphone.ddd}-${cellphone.number}`,
      ),
      Documentos: client.documents.map(
        (document) =>
          `${document.type} | ${document.number} | ${document.expeditionDate.getDate()}/${document.expeditionDate.getMonth() + 1}/${document.expeditionDate.getFullYear()}`,
      ),
      Responsavel: client.guardian
        ? `${client.guardian?.id} | ${client.guardian?.name}`
        : null,
      Dependentes: client.dependents?.map(
        (dependent) => `${dependent.id} | ${dependent.name}`,
      ),
    }));
    this.output.table(clientsTable);
  }
}
