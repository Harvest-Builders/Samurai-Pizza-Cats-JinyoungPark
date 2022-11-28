import React from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { Container, createStyles, List, Theme } from '@material-ui/core';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import { Pizza } from '../../types';
import PizzaModal from './PizzaModal';
import PizzaItem from './PizzaItem';
import PageHeader from '../common/PageHeader';
import CardItemSkeleton from '../common/CardItemSkeleton';

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
  const [open, setOpen] = React.useState(false);
  const [selectedPizza, setSelectedPizza] = React.useState<Partial<Pizza>>();
  const { loading, data, error } = useQuery(GET_PIZZAS);

  const handleOpen = (pizza?: Pizza): void => {
    setSelectedPizza(pizza);
    setOpen(true);
  };
  if (error) return <div>Error! {error.message}</div>;
  if (loading) return <CardItemSkeleton data-tested="pizza-list-loading"></CardItemSkeleton>;

  const pizzaList = data?.pizzas.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} pizza={pizza} key={pizza.id} handleOpen={handleOpen} />
  ));
  return (
    <Container maxWidth="md">
      <PageHeader pageHeader={'Pizza List'} />
      <List className={classes.container}>
        <PizzaItem key="add-pizza" handleOpen={handleOpen} />
        {pizzaList}
      </List>

      <PizzaModal selectedPizza={selectedPizza} open={open} setOpen={setOpen} />
    </Container>
  );
};

export default Pizzas;
