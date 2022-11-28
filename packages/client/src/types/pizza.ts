import { Topping } from './topping';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  toppings: Array<Topping>;
  imgSrc: string;
  priceCents: number;
}
