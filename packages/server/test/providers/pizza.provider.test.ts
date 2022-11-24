import { Collection } from 'mongodb';
import { reveal, stub } from 'jest-auto-stub';
import { PizzaProvider } from '../../src/application/providers/pizza/pizza.provider';
import { mockSortToArray } from '../helpers/mongo.helper';
import { createMockPizzaDocument } from '../helpers/pizza.helper';
import { PizzaDocument, toPizzaObject } from '../../src/entities/pizza';
import { ToppingProvider } from 'src/application/providers/toppings/topping.provider';

const stubPizzaCollection = stub<Collection<PizzaDocument>>();
const stubToppingProvider = stub<ToppingProvider>();

const pizzaProvider = new PizzaProvider(stubPizzaCollection, stubToppingProvider);

beforeEach(jest.clearAllMocks);

describe('pizzaProvider', (): void => {
  const mockPizzaDocument = createMockPizzaDocument();
  const mockPizza = toPizzaObject(mockPizzaDocument);

  describe('getPizzas', (): void => {
    beforeEach(() => {
      reveal(stubPizzaCollection).find.mockImplementation(mockSortToArray([mockPizzaDocument]));
    });
    test('should call find once', async () => {
      await pizzaProvider.getPizzas();
      expect(stubPizzaCollection.find).toHaveBeenCalledTimes(1);
    });

    test('should get all pizzas', async () => {
      const result = await pizzaProvider.getPizzas();
      expect(result).toEqual([mockPizza]);
    });
  });

  describe('createTopping', (): void => {
    const validPizza = createMockPizzaDocument({
      name: 'test pizza',
      description: 'test pizza description',
      toppingIds: ['19651dda4a0af8315d840412', 'e9e565e9a57cf33fb9b8ceed'],
      imgSrc: 'test picture src',
    });

    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: validPizza }));
    });
    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.createPizza({
        name: validPizza.name,
        description: validPizza.description,
        toppingIds: validPizza.toppingIds,
        imgSrc: validPizza.imgSrc,
      });

      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a pizza when passed valid input', async () => {
      const result = await pizzaProvider.createPizza({
        name: validPizza.name,
        description: validPizza.description,
        toppingIds: validPizza.toppingIds,
        imgSrc: validPizza.imgSrc,
      });

      expect(result).toEqual(toPizzaObject(validPizza));
    });
  });

  describe('deletePizza', (): void => {
    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: mockPizzaDocument }));
    });
    test('should call findOneAndDelete once', async () => {
      await pizzaProvider.deletePizza(mockPizza.id);

      expect(stubPizzaCollection.findOneAndDelete).toHaveBeenCalledTimes(1);
    });

    test('should throw an error if findOneAndDelete returns null for value', async () => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: null }));

      await expect(pizzaProvider.deletePizza(mockPizza.id)).rejects.toThrow(new Error('Could not delete the pizza'));
    });

    test('should return an id', async () => {
      const result = await pizzaProvider.deletePizza(mockPizza.id);

      expect(result).toEqual(mockPizza.id);
    });
  });

  describe('updatePizza', (): void => {
    const validPizza = createMockPizzaDocument({
      name: 'test pizza',
      description: 'test pizza description',
      toppingIds: ['19651dda4a0af8315d840412', 'e9e565e9a57cf33fb9b8ceed'],
      imgSrc: 'test picture src',
    });

    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: validPizza }));
    });

    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.updatePizza({
        id: validPizza.id,
        name: validPizza.name,
        description: validPizza.description,
        toppingIds: validPizza.toppingIds,
        imgSrc: validPizza.imgSrc,
      });

      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a pizza', async () => {
      const result = await pizzaProvider.updatePizza({
        id: validPizza.id,
        name: validPizza.name,
        description: validPizza.description,
        toppingIds: validPizza.toppingIds,
        imgSrc: validPizza.imgSrc,
      });

      expect(result).toEqual(toPizzaObject(validPizza));
    });
  });
});
