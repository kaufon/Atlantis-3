import {
  type Client,
  type Accommodation,
  type IInput,
  type IOutput,
  CreateClientUseCase,
  ListAllClientsUseCase,
  UpdateClientUseCase,
  DeleteClientUseCase,
  AddDependentToGuardianUseCase,
  RemoveDependentFromGuardianUseCase,
  ListDependentsFromSpecificGuardian,
  ListGuardianFromSpecificDependent,
  RentAccomodationUseCase,
  DeleteAccommodationUseCase,
  ListAllAccommodationsUseCase,
} from "../core";
import { Input } from "./Input";
import { OutPut } from "./Output";

export class App {
  private clients: Client[];
  private accommodations: Accommodation[];
  private input: IInput;
  private output: IOutput;
  constructor() {
    this.output = new OutPut();
    this.input = new Input();
    this.clients = [];
    this.accommodations = [];
  }
  public async run(): Promise<void> {
    console.log("Bem vindo a Atlantis!");
    let isRunning = true;
    while (isRunning) {
      switch (
      await this.input.selectInput("Por favor selecione", [
        ["Clientes", "client"],
        ["Listagem", "lists"],
        ["Acomodacoes", "accommodations"],
        ["Sair", "leave"],
      ])
      ) {
        case "client":
          await this.clientHandler();
          break;
        case "lists":
          await this.listHandler();
          break;
        case "accommodations":
          await this.accommodationsHandler();
          break;
        case "leave":
          console.log("Obrigado por usar!");
          isRunning = false;
          break;
        default:
          console.log("Nao entendi");
          break;
      }
      this.output.lineBreaker();
    }
  }
  public async clientHandler(): Promise<void> {
    switch (
    await this.input.selectInput("Por favor selecione", [
      ["Cadastrar clientes", "register"],
      ["Listar clientes", "list"],
      ["Editar clientes", "edit"],
      ["Deletar clientes", "delete"],
      ["Adicionar dependente a responsavel", "add-dependent"],
      ["Remover dependente de responsavel", "remove-dependent"],
      ["Voltar", "back"],
    ])
    ) {
      case "register": {
        const useCase = new CreateClientUseCase(this.clients, this.input);
        return useCase.execute();
      }
      case "list": {
        const useCase = new ListAllClientsUseCase(this.clients, this.output);
        return useCase.execute();
      }
      case "edit": {
        const useCase = new UpdateClientUseCase(this.clients, this.input);
        return useCase.execute();
      }
      case "delete": {
        const useCase = new DeleteClientUseCase(this.clients, this.input);
        return useCase.execute();
      }
      case "add-dependent": {
        const useCase = new AddDependentToGuardianUseCase(
          this.clients,
          this.input,
        );
        return useCase.execute();
      }
      case "remove-dependent": {
        const useCase = new RemoveDependentFromGuardianUseCase(
          this.clients,
          this.input,
        );
        return useCase.execute();
      }
      case "back": {
        return;
      }
      default:
        console.log("Nao entendi");
        return;
    }
  }
  public async listHandler(): Promise<void> {
    switch (
    await this.input.selectInput("Por favor selecione", [
      ["Listar dependentes de um guardiao", "list-dependents"],
      ["Listar responsavel para dependente especifico", "list-guardian"],
      ["Voltar", "back"],
    ])
    ) {
      case "list-dependents": {
        const useCase = new ListDependentsFromSpecificGuardian(
          this.clients,
          this.input,
          this.output,
        );
        return useCase.execute();
      }
      case "list-guardian": {
        const useCase = new ListGuardianFromSpecificDependent(
          this.clients,
          this.input,
          this.output,
        );
        return useCase.execute();
      }
      case "back": {
        return;
      }
      default: {
        console.log("Nao entendi :(");
      }
    }
  }
  public async accommodationsHandler(): Promise<void> {
    switch (
    await this.input.selectInput("Por favor selecione", [
      ["Adicionar hospede", "create"],
      ["Remover hospede", "remove"],
      ["Listar acomodacoes", "list"],
      ["Voltar", "back"],
    ])
    ) {
      case "create": {
        const useCase = new RentAccomodationUseCase(
          this.input,
          this.clients,
          this.accommodations,
        );
        return useCase.execute();
      }
      case "remove": {
        const useCase = new DeleteAccommodationUseCase(
          this.input,
          this.accommodations,
        );
        return;
      }
      case "list": {
        const useCase = new ListAllAccommodationsUseCase(
          this.output,
          this.accommodations,
        );
        return useCase.execute();
      }
      case "back": {
        return;
      }
      default: {
        console.log("Nao entendi :(");
        return;
      }
    }
  }
}
