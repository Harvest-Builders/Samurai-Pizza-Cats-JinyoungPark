import { ObjectId } from 'bson';
import { Pizza } from '../../src/application/schema/types/schema';
import { PizzaDocument } from '../../src/entities/pizza';

const createMockPizza = (data?: Partial<Pizza>): Pizza => {
  return {
    __typename: 'Pizza',
    id: new ObjectId().toHexString(),
    name: 'Test Pizza',
    description: 'Test pizza description',
    imgSrc:
      'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    toppings: [
      {
        __typename: 'Topping',
        id: '19651dda4a0af8315d840412',
        name: 'Anchovy',
        priceCents: 300,
      },
      {
        __typename: 'Topping',
        id: 'e9e565e9a57cf33fb9b8ceed',
        name: 'BBQ Sauce',
        priceCents: 400,
      },
    ],
    priceCents: 700,
    ...data,
  };
};

const createMockPizzaDocument = (data?: Partial<PizzaDocument>): PizzaDocument => {
  return {
    _id: new ObjectId(),
    name: 'Test Pizza',
    description: 'Test pizza description',
    toppingIds: ['19651dda4a0af8315d840412', 'e9e565e9a57cf33fb9b8ceed'],
    imgSrc:
      'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    ...data,
  };
};

export { createMockPizza, createMockPizzaDocument };
