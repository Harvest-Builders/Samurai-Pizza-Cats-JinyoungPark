import { gql } from '@apollo/client';

export const GET_PIZZA = gql`
  query Get_Pizza($pizzaId: ObjectID!) {
    pizza(id: $pizzaId) {
      id
      description
      imgSrc
      name
      priceCents
      toppings {
        name
        priceCents
        id
      }
    }
  }
`;
