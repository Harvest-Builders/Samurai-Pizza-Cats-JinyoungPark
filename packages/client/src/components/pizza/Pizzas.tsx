import React from 'react';
import { Pizza } from '../../types';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import { Container } from '@material-ui/core';
import PizzaItem from './PizzaItem';
import CardItemSkeleton from '../common/CardItemSkeleton';
import { useQuery } from '@apollo/client';

const Pizzas: React.FC = () => {
  const { loading, data, error } = useQuery(GET_PIZZAS);

  if (loading) {
    return <CardItemSkeleton>pizza-list-loading</CardItemSkeleton>;
  }

  const PizzaList = data?.pizzas.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} pizza={pizza} />
  ));

  if (error) {
    return <div>`Error $(error.message)`</div>;
  }

  return <Container maxWidth="md">{PizzaList}</Container>;
};

export default Pizzas;
