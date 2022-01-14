export interface ICostumer {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  cep: string;
  address: string;
  addressAlternate: string;
  cpf: string;
  birthday: any;
  salary: string;
}

export interface ICostumerContext {
  removeCostumer: (cpf: string) => void;
  addCostumer: (costumer: ICostumer) => void;
  costumer: ICostumer[];
}
