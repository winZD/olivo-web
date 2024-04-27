import { Expense } from "./expense";
import { Harvest } from "./harvest";

export interface Orchard {
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
}
