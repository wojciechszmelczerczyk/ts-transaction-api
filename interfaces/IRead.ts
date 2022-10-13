export interface IRead {
  find(item: any): Promise<any[]>;
}
