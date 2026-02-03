export interface IService {
  create(character: any): void;
  read(key: any): any;
  readAll(filter: any): any[];
  update(item: any): void;
  delete(key: any): void;
  clear(): void;
}
