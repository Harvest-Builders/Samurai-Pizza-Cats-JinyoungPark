import React from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { AddCircle } from '@material-ui/icons';
import { Container, createStyles, Theme, Grid, IconButton } from '@material-ui/core';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import { Pizza } from '../../types';
import CardItem from '../common/CardItem';
import PizzaModal from './PizzaModal';
import PizzaItem from './PizzaItem';
import PageHeader from '../common/PageHeader';
import CardItemSkeleton from '../common/CardItemSkeleton';
import makePizzaImg from '../../assets/img/make-pizza.jpeg';

const useStyles = makeStyles(({ typography }: Theme) =>
  createStyles({
    container: {
      minWidth: typography.pxToRem(650),
      display: 'flex',
      flexWrap: 'wrap',
    },
    makePizza: {
      justifyContent: 'space-between',
      color: 'white',
      backgroundImage: `url(${makePizzaImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
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

  const numOfSkeleton: number = 9;
  const makeSkeletonArray = (): number[] => {
    let array = [];
    for (let i = 0; i < numOfSkeleton; i++) {
      array.push(i);
    }
    return array;
  };

  const pizzasSkeleton = makeSkeletonArray().map((index) => (
    <Grid item xs={4} md={4} key={index}>
      <CardItemSkeleton data-testid="pizza-list-loading"></CardItemSkeleton>
    </Grid>
  ));

  return (
    <Container maxWidth="md">
      <PageHeader pageHeader={'Pizza List'} />
      <Grid container spacing={2}>
        {loading ? (
          pizzasSkeleton
        ) : (
          <Grid item xs={4} md={4}>
            <CardItem rootClassName={classes.makePizza}>
              <h1>Create A New Pizza</h1>
              <IconButton
                edge="end"
                size="medium"
                aria-label="update"
                type="button"
                color="inherit"
                onClick={(): void => {
                  handleOpen();
                  setOpen(true);
                }}
              >
                <AddCircle fontSize="large" />
              </IconButton>
            </CardItem>
          </Grid>
        )}

        {pizzaList}
      </Grid>
      <PizzaModal selectedPizza={selectedPizza} open={open} setOpen={setOpen} />
    </Container>
  );
};

export default Pizzas;
