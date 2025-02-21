import inquirer from "inquirer";
import type { IInput } from "../core/interfaces/Input";

export class Input implements IInput {
  public async textInput(message: string): Promise<string> {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: message,
      },
    ]);
    return answer.value;
  }
  public async numberInput(message: string): Promise<number> {
    const answer = await inquirer.prompt([
      {
        type: "number",
        name: "value",
        message: message,
      },
    ]);
    return answer.value;
  }
  public async selectInput(
    message: string,
    choices: string[][],
  ): Promise<string> {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "value",
        message: message,
        choices: choices.map((choice) => ({
          name: choice[0],
          value: choice[1] ?? choice[0],
        })),
      },
    ]);
    return answer.value
  }
}
