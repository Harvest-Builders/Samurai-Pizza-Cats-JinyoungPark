import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    id: ObjectID!
    name: String!
    description: String!
    toppings: [Topping!]!
    toppingIds: [String!]!
    imgSrc: String!
    priceCents: Long!
  }

  type Topping {
    id: ObjectID!
    name: String!
    priceCents: Long!
  }

  type Query {
    pizzas: [Pizza!]!
  }

  type Mutation {
    createPizza(input: CreatePizzaInput!): Pizza!
    deletePizza(input: DeletePizzaInput!): ObjectID!
    updatePizza(input: UpdatePizzaInput!): Pizza!
  }

  input CreatePizzaInput {
    name: String!
    description: String!
    toppingIds: ObjectID!
    imgSrc: String!
  }

  input DeletePizzaInput {
    id: ObjectID!
  }

  input UpdatePizzaInput {
    id: ObjectID!
    name: String
    description: String
    toppingIds: ObjectID
    imgSrc: String
    priceCents: Long
  }
`;

export { typeDefs };
