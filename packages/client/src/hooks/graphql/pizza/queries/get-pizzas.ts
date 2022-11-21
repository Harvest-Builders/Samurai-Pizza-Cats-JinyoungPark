import { gql } from '@apollo/client';

const GET_PIZZAS = gql`
  query Query {
    pizzas {
      toppings {
        name
        priceCents
        id
      }
      name
      id
      description
      priceCents
      imgSrc
    }
  }
`;

export { GET_PIZZAS };
