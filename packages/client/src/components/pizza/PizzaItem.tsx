import { Pizza, Topping } from '../../types';
import CardItem from '../common/CardItem';
import { ListItem } from '@material-ui/core';
import toDollars from '../../lib/format-dollars';
import { makeStyles } from '@material-ui/styles';
import { createStyles, Grid, Theme } from '@material-ui/core';

const useStyles = makeStyles(({ typography, spacing }: Theme) =>
  createStyles({
    image: {
      height: '65%',
      width: '100%',
    },
  })
);
export interface PizzaItemProps {
  pizza?: Pizza;
  handleOpen: (pizza?: Pizza) => void;
}
const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, handleOpen, ...props }) => {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={4}
      md={4}
      data-testid={`pizza-select-${pizza?.id}`}
      {...props}
      onClick={(): void => handleOpen(pizza)}
    >
      <CardItem>
        <img className={classes.image} data-testid={`pizza-image-${pizza?.imgSrc}`} src={pizza?.imgSrc}></img>
        <h1 data-testid={`pizza-name-${pizza?.id}`}>{pizza?.name ?? 'Add Pizza'}</h1>
        <p data-testid={`pizza-description-${pizza?.id}`}>{pizza?.description ? pizza.description : ''}</p>
        <p data-testid={`pizza-priceCents-${pizza?.priceCents}`}>
          {pizza?.priceCents ? toDollars(pizza.priceCents) : ''}{' '}
        </p>
      </CardItem>
    </Grid>
  );
};

export default PizzaItem;
