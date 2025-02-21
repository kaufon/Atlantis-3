import { Table } from "console-table-printer";
import type { IOutput } from "../core/interfaces";
export class OutPut implements IOutput {
  public lineBreaker(): void {
    console.log(
      "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=",
    );
  }
  public table(data: Array<Record<string, unknown>>): void {
    const table = new Table();
    data.forEach((row) => table.addRow(row));
    table.printTable();
  }
}
