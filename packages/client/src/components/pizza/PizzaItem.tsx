import { Pizza, Topping } from '../../types';
import CardItem from '../common/CardItem';
import { ListItem } from '@material-ui/core';
import toDollars from '../../lib/format-dollars';

export interface PizzaItemProps {
  pizza?: Pizza;
  handleOpen: (pizza?: Pizza) => void;
}
const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, handleOpen, ...props }) => {
  const toppingList = pizza?.toppings.map((topping: Topping) => (
    <li key={topping.id} data-testid={`topping-item-${topping?.id}`}>
      {topping.name}
    </li>
  ));

  return (
    <ListItem data-testid={`pizza-select-${pizza?.id}`} {...props} onClick={(): void => handleOpen(pizza)}>
      <CardItem>
        <p data-testid={`pizza-name-${pizza?.id}`}>Pizza : {pizza?.name ?? 'Add Pizza'}</p>
        <p data-testid={`pizza-description-${pizza?.description}`}>
          Description : {pizza?.description ? pizza.description : ''}
        </p>
        <p data-testid={`pizza-priceCents-${pizza?.priceCents}`}>
          Price : {pizza?.priceCents ? toDollars(pizza.priceCents) : ''}{' '}
        </p>
        <p>Toppings</p>
        <ul>{toppingList}</ul>
        <img data-testid={`pizza-image-${pizza?.imgSrc}`} src={pizza?.imgSrc}></img>
      </CardItem>
    </ListItem>
  );
};

export default PizzaItem;
