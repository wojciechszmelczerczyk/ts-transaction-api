export interface IWrite {
  create(id: string, date: Date, status: string): Promise<Date>;
}
