import { gql } from '@apollo/client';

export const GET_PIZZA = gql`
  query Get_Pizza($id: String!) {
    pizza(id: $id) {
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
