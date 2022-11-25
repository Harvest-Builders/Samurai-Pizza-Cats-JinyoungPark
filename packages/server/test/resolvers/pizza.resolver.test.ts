import { gql } from 'apollo-server-core';
import { pizzaResolver } from '../../src/application/resolvers/pizza.resolver';
import { pizzaProvider } from '../../src/application/providers';
import { typeDefs } from '../../src/application/schema/index';
import { createMockPizza } from '../helpers/pizza.helper';
import { TestClient } from '../helpers/client.helper';
import { toppingResolver } from '../../src/application/resolvers/topping.resolver';
import { createMockTopping } from '../../test/helpers/topping.helper';
import { MutationCreatePizzaArgs } from '../../src/application/schema/types/schema';

let client: TestClient;

jest.mock('../../src/application/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));

beforeAll(async (): Promise<void> => {
  client = new TestClient(typeDefs, [pizzaResolver, toppingResolver]);
});

beforeEach(async (): Promise<void> => {
  jest.restoreAllMocks();
});

const mockTopping = createMockTopping();
const mockPizza = createMockPizza({ toppings: [mockTopping], priceCents: mockTopping.priceCents });

describe('pizzaResolver', (): void => {
  describe('Mutation', () => {
    describe('createPizza', () => {
      const mutation = gql`
        mutation ($input: CreatePizzaInput!) {
          createPizza(input: $input) {
            name
            imgSrc
            description
            toppingIds
          }
        }
      `;
      const validTopping = createMockTopping({
        name: 'Test Topping',
        priceCents: 123,
      });
      const validPizza = createMockPizza({
        name: 'Test Pizza',
        imgSrc: 'Test',
        description: 'Test',
        toppings: [validTopping],
        priceCents: validTopping.priceCents,
      });

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'createPizza').mockResolvedValue({
          id: validPizza.id,
          name: validPizza.name,
          description: validPizza.description,
          imgSrc: validPizza.imgSrc,
          toppingIds: [validTopping.id],
        });
      });
      test('should call createPizza when passed a valid input', async () => {
        const variables: MutationCreatePizzaArgs = {
          input: {
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
            toppingIds: [validTopping.id],
          },
        };
        await client.mutate({ mutation, variables });

        expect(pizzaProvider.createPizza).toHaveBeenCalledWith(variables.input);
      });
      test('should return created pizza when passed a valide input', async () => {
        const variables: MutationCreatePizzaArgs = {
          input: {
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
            toppingIds: [validTopping.id],
          },
        };
        const result = await client.mutate({ mutation, variables });
        expect(result.data).toEqual({
          createPizza: {
            __typename: 'Pizza',
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
          },
        });
      });
    });
  });
});
