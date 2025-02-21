import {
  AddDependentToGuardianUseCase,
  type Client,
  CreateClientUseCase,
  DeleteClientUseCase,
  type IInput,
  type IOutput,
  ListAllClientsUseCase,
  ListDependentsFromSpecificGuardian,
  ListGuardianFromSpecificDependent,
  RemoveDependentFromGuardianUseCase,
  UpdateClientUseCase,
} from "../core/index.ts";
import { Input } from "./Input.ts";
import { OutPut } from "./Output.ts";
export class App {
  private clients: Client[];
  private input: IInput;
  private output: IOutput;
  constructor() {
    this.output = new OutPut();
    this.input = new Input();
    this.clients = [];
  }
  public async run(): Promise<void> {
    console.log("Bem vindo a Atlantis!");
    let isRunning = true;
    while (isRunning) {
      let option = await this.input.selectInput("Por favor selecione", [
        ["Clientes", "client"],
        ["Listagem", "lists"],
        ["Sair", "leave"],
      ]);
      switch (option) {
        case "client":
          await this.clientHandler();
          break;
        case "lists":
          await this.listHandler();
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
    let option = await this.input.selectInput("Por favor selecione", [
      ["Cadastrar clientes", "register"],
      ["Listar clientes", "list"],
      ["Editar clientes", "edit"],
      ["Deletar clientes", "delete"],
      ["Adicionar dependente a responsavel", "add-dependent"],
      ["Remover dependente de responsavel", "remove-dependent"],
      ["Voltar", "back"],
    ]);
    switch (option) {
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
    let option = await this.input.selectInput("Por favor selecione", [
      ["Listar dependentes de um guardiao", "list-dependents"],
      ["Listar responsavel para dependente especifico", "list-guardian"],
      ["Voltar", "back"],
    ]);
    switch (option) {
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
}
const app = new App();
app.run();
