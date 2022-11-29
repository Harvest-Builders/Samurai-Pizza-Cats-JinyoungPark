import { CreatePizzaInput, UpdatePizzaInput, DeletePizzaInput, QueryInput } from '../schema/types/schema';
import { Root } from '../schema/types/types';
import { Pizza as PizzaSchema } from '../schema/types/schema';
import { pizzaProvider } from '../providers';
import { PizzaResponse } from '../providers/pizza/pizza.provider.types';

type Pizza = Omit<PizzaSchema, 'toppings' | 'priceCents'> & { toppingIds: string[] };

const pizzaResolver = {
  Query: {
    pizzas: async (_: Root, args: { input?: QueryInput }): Promise<PizzaResponse> => {
      return pizzaProvider.getPizzas(args.input);
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
