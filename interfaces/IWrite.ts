export interface IWrite {
  create(item: any): Promise<boolean>;
}
