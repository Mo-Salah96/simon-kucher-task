export type Customer = {
  id: number,
  code: string,
  balance: number,
  profile: {
    name: string
  }
};
export type Industry = {
  id: number,
  name: string
};

export type Query = {
  customers: Customer[];
  industries: Industry[];
  customer: Customer;
};

export type Mutation = {
  createCustomer: Customer
};
