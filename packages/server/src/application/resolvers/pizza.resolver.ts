import { Pizza as PizzaSchema } from '../schema/types/schema';
import { pizzaProvider } from '../providers';

type Pizza = Omit<PizzaSchema, 'toppings' | 'priceCents'> & { toppingIds: string[] };

const pizzaResolver = {
  Query: {
    pizzas: async (): Promise<Pizza[]> => {
      return pizzaProvider.getPizzas();
    },
  },
};

export { pizzaResolver, Pizza };
