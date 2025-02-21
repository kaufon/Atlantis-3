export interface IOutput{
  lineBreaker():void
  table(date:Array<Record<string,unknown>>): void
}
