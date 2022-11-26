import { Pizza, Topping } from '../../types';
import CardItem from '../common/CardItem';
import toDollars from '../../lib/format-dollars';
import { ListItem } from '@material-ui/core';

export interface PizzaItemProps {
  pizza?: Pizza;
  selectPizza: (pizza?: Pizza) => void;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, selectPizza, ...props }) => {
  const toppingList = pizza?.toppings.map((topping: Topping) => (
    <li key={topping.id} data-testid={`topping-item${topping?.id}`}>
      {topping.name}
    </li>
  ));
  return (
    <ListItem {...props} onClick={(): void => selectPizza(pizza)}>
      <CardItem>
        <div>
          <p data-testid={`topping-name-${pizza?.id}`}>Pizza : {pizza?.name ?? 'Add Pizza'}</p>
          <p data-testid={`pizza-description-${pizza?.id}`}>
            Description : {pizza?.description ? pizza.description : ''}
          </p>
          <img
            data-testid={`pizza-image-${pizza?.imgSrc}`}
            src={pizza?.imgSrc}
            style={{ maxWidth: 300, maxHeight: 300 }}
          ></img>
          <p>Toppings</p>
          <ul>{toppingList}</ul>
          <p data-testid={`pizza-priceCents-${pizza?.priceCents}`}>
            Price : {pizza?.priceCents ? toDollars(pizza.priceCents) : ''}{' '}
          </p>
        </div>
      </CardItem>
    </ListItem>
  );
};

export default PizzaItem;
