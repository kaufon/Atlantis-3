import type { IOutput } from "../interfaces";

export class Validation {
  validateIssueDate(issueDate: string) {
    const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(issueDate)) {
      console.log(
        "Data de emissão deve ser uma data válida e estar no formato (dd/mm/yyyy)",
      );
      return false;
    }
    return true;
  }
}
