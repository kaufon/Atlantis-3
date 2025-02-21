import { printTable } from "console-table-printer";
import { Address, Cellphone, Client, Document } from "../../domain";
import { documentType } from "../../enums";
import type { IInput } from "../../interfaces";
import { Validation } from "../../utils";
import { parseDate } from "../../utils/dateParser";

export class CreateClientUseCase {
  private clients: Client[];
  private input: IInput;
  private validation: Validation;

  constructor(clients: Client[], input: IInput) {
    this.clients = clients;
    this.input = input;
    this.validation = new Validation();
  }

  public async execute(): Promise<void> {
    console.log("Criando cliente... bip bop");

    const name = await this.input.textInput("Insira o nome do cliente:");
    const socialName = await this.input.textInput("Insira o nome social do cliente:");

    const birthDate = await this.getValidDate("Insira a data de nascimento (DD/MM/YYYY):");
    const registrationDate = await this.getValidDate("Insira a data do registro (DD/MM/YYYY):");

    const address = await this.getAddress();
    const cellphones = await this.getCellphones();
    const documents = await this.getDocuments();

    const newClient = new Client({
      name,
      socialName,
      address,
      birthDate: parseDate(birthDate),
      documents,
      registrationDate: parseDate(registrationDate),
      cellphones,
      dependents: [],
    });

    this.clients.push(newClient);
    console.log("Cliente cadastrado com sucesso!");
  }

  private async getValidDate(prompt: string): Promise<string> {
    while (true) {
      const dateInput = await this.input.textInput(prompt);
      if (this.validation.validateIssueDate(dateInput)) {
        return dateInput;
      }
      console.log("Data inválida, tente novamente.");
    }
  }

  private async getAddress(): Promise<Address> {
    const street = await this.input.textInput("Insira o nome da rua:");
    const neighborhood = await this.input.textInput("Insira o bairro:");
    const city = await this.input.textInput("Insira a cidade:");
    const state = await this.input.textInput("Insira o estado:");
    const postalCode = await this.input.textInput("Insira o CEP:");

    return new Address({ street, neighborhood, city, state, postalCode });
  }

  private async getCellphones(): Promise<Cellphone[]> {
    const quantity = await this.input.numberInput("Quantos telefones deseja adicionar?");
    const cellphones: Cellphone[] = [];

    for (let i = 0; i < quantity; i++) {
      const ddd = await this.input.textInput("Insira o DDD do telefone:");
      const number = await this.input.textInput("Insira o número do telefone:");
      cellphones.push(new Cellphone({ ddd, number }));
    }

    return cellphones;
  }

  private async getDocuments(): Promise<Document[]> {
    const quantity = await this.input.numberInput("Quantos documentos deseja adicionar?");
    const documents: Document[] = [];

    for (let i = 0; i < quantity; i++) {
      const type = await this.input.selectInput("Selecione o tipo do documento:", [
        ["RG", documentType.RG],
        ["CPF", documentType.CPF],
        ["Passaporte", documentType.Passaporte],
      ]) as documentType

      const number = await this.input.textInput("Insira o número do documento:");
      const expeditionDate = await this.getValidDate("Insira a data de emissão do documento (DD/MM/YYYY):");

      documents.push(new Document({ number, expeditionDate: parseDate(expeditionDate), type }));
    }

    return documents;
  }
}

