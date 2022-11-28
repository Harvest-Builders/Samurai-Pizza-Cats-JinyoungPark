import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    id: ObjectID!
    name: String!
    description: String!
    toppings: [Topping!]!
    imgSrc: String!
    priceCents: Long!
  }

  type PizzaResponse {
    results: [Pizza!]!
    totalCount: Int!
    hasNextPage: Boolean!
    cursor: String
  }

  input QueryInput {
    limit: Int!
    cursor: String!
  }

  type Query {
    pizzas(input: QueryInput): PizzaResponse!
  }

  type Mutation {
    createPizza(input: CreatePizzaInput!): Pizza!
    deletePizza(input: DeletePizzaInput!): ObjectID!
    updatePizza(input: UpdatePizzaInput!): Pizza!
  }

  input CreatePizzaInput {
    name: String!
    description: String!
    toppingIds: [ObjectID!]!
    imgSrc: String!
  }

  input DeletePizzaInput {
    id: ObjectID!
  }

  input UpdatePizzaInput {
    id: ObjectID!
    name: String
    description: String
    toppingIds: [ObjectID!]
    imgSrc: String
  }
`;

export { typeDefs };
