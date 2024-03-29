import { CreatePizzaInput, UpdatePizzaInput, DeletePizzaInput } from '../schema/types/schema';
import { Root } from '../schema/types/types';
import { Pizza as PizzaSchema } from '../schema/types/schema';
import { pizzaProvider } from '../providers';

type Pizza = Omit<PizzaSchema, 'toppings' | 'priceCents'> & { toppingIds: string[] };

const pizzaResolver = {
  Query: {
    pizzas: async (): Promise<Pizza[]> => {
      return pizzaProvider.getPizzas();
    },
  },

  Mutation: {
    createPizza: async (_: Root, args: { input: CreatePizzaInput }): Promise<Pizza> => {
      return pizzaProvider.createPizza(args.input);
    },

    updatePizza: async (_: Root, args: { input: UpdatePizzaInput }): Promise<Pizza> => {
      return pizzaProvider.updatePizza(args.input);
    },

    deletePizza: async (_: Root, args: { input: DeletePizzaInput }): Promise<string> => {
      return pizzaProvider.deletePizza(args.input.id);
    },
  },
};

export { pizzaResolver, Pizza };
