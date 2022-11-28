import { ObjectID, ObjectId } from 'bson';
import { Pizza } from '../../../types/schema';

export const createTestPizza = (data: Partial<Pizza> = {}): Pizza & { __typename: string } => ({
  __typename: 'Pizza',
  id: new ObjectID().toHexString(),
  name: 'A pizza',
  description: 'Pizza description',
  imgSrc: 'Pizza img',
  toppings: [{ id: new ObjectID().toHexString(), name: 'A topping', priceCents: 3_50 }],
  priceCents: 3_50,
  ...data,
});
