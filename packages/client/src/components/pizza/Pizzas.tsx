import React from 'react';
import { Pizza } from '../../types';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import { Container, makeStyles, List, Theme, createStyles } from '@material-ui/core';
import PizzaItem from './PizzaItem';
import CardItemSkeleton from '../common/CardItemSkeleton';
import { useQuery } from '@apollo/client';
import PageHeader from '../common/PageHeader';
import PizzaModal from './PizzaModal';

const useStyles = makeStyles(({ typography }: Theme) =>
  createStyles({
    container: {
      minWidth: typography.pxToRem(650),
      display: 'flex',
      flexWrap: 'wrap',
    },
    cardItem: {
      display: 'flex',
      width: '300%',
      justifyContent: 'space-between',
    },
  })
);

const Pizzas: React.FC = () => {
  const classes = useStyles();
  const [selectedPizza, setSelectedPizza] = React.useState<Partial<Pizza>>();
  const { loading, data, error } = useQuery(GET_PIZZAS);
  const [open, setOpen] = React.useState(false);

  const selectPizza = (pizza?: Pizza): void => {
    setSelectedPizza(pizza);
    setOpen(true);
  };

  if (error) return <div>Error occured {error.message}</div>;
  if (loading) {
    return <CardItemSkeleton>pizza-list-loading</CardItemSkeleton>;
  }

  const PizzaList = data?.pizzas.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} pizza={pizza} key={pizza.id} selectPizza={selectPizza} />
  ));

  return (
    <Container maxWidth="md">
      <PageHeader pageHeader={'Pizza List'} />
      <List className={classes.container}>
        <PizzaItem key="add-pizza" selectPizza={selectPizza} />
        {PizzaList}
      </List>

      <PizzaModal selectedPizza={selectedPizza} open={open} setOpen={setOpen} />
    </Container>
  );
};

export default Pizzas;
