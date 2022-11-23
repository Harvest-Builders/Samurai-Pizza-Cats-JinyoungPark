import { Topping } from '../toppings/topping.provider.types';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  toppingIds: string[];
  toppings: Topping[];
  imgSrc: string;
}

export interface CreatePizzaInput {
  name: string;
  description?: string;
  toppingIds?: string[];
  imgSrc?: string;
}

export interface UpdatePizzaInput {
  id: string;
  name?: string | null;
  description?: string | null;
  toppings?: Topping[];
  imgSrc?: string | null;
  priceCents?: number | null;
}

export interface DeletePizzaInput {
  id?: string | null;
}
