import { Orchard } from "./orchard";

export interface ExpensesData {
  data: Expenses[];
}

export interface Expenses {
  id: string;
  attributes: Attributes;
}

export interface Attributes {
  crop: string;
  fertilization: number;
  location: string;
  property_size: number;
  orchard: { data: Orchard };
}

/* 
export interface Orchard {
  id: number;
  data: {
    id: number;
    attributes: {
      createdAt: Date;
      harvest_date: Date;
      location: string;
      olive_trees: number;
      percentage_of_oil: number;
      publishedAt: Date;
      size: number;
      updatedAt: Date;
      expenses: {
        data: [{ id: number; attributes: Expense }];
      };
      harvests: { data: [{ id: number; attributes: Harvest }] };
    };
  };
}
*/

export interface Expense {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  fertilization: number;
}
