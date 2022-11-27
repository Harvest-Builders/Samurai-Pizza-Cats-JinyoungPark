import React from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { Container, createStyles, List, ListItem, Theme } from '@material-ui/core';
import { Pizza } from '../../types';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import PageHeader from '../common/PageHeader';
import PizzaItem from './PizzaItem';
const useStyles = makeStyles(({ typography }: Theme) =>
  createStyles({
    container: {
      minWidth: typography.pxToRem(650),
    },
    skeleton: {
      display: 'flex',
      justifyContent: 'center',
      verticalAlign: 'center',
    },
    header: {
      display: 'flex',
    },
    name: {
      minWidth: typography.pxToRem(500),
    },
    right: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    },
  })
);
const PizzaList: React.FC = () => {
  const classes = useStyles();
  const { loading, data, error } = useQuery(GET_PIZZAS);
  if (loading) {
    return <div className={classes.skeleton}>Loading ...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const pizzaList = data?.pizzas.map((pizza: Pizza) => (
    <PizzaItem
      data-testid={`pizza-item-${pizza?.id}`}
      key={pizza.id}
      pizza={pizza}
      selectPizza={function (pizza?: Pizza | undefined): void {
        throw new Error('Function not implemented.');
      }}
    />
  ));

  return (
    <Container maxWidth="md">
      <PageHeader pageHeader={'Pizzas'} />
      <List className={classes.container}>
        <ListItem className={classes.header}>
          <h2 className={classes.name}>Pizza</h2>
        </ListItem>
        <PizzaItem
          key="add-pizza"
          selectPizza={function (pizza?: Pizza | undefined): void {
            throw new Error('Function not implemented.');
          }}
        />
        {pizzaList}
      </List>
    </Container>
  );
};
export default PizzaList;
