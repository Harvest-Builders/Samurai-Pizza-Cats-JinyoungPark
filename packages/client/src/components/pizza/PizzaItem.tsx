import { Pizza } from '../../types';
import CardItem from '../common/CardItem';
import toDollars from '../../lib/format-dollars';

export interface PizzaItemProps {
  pizza?: Pizza;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza }) => {
  return (
    <CardItem>
      <div>
        <p>{pizza?.name}</p>
        <p>{pizza?.description}</p>
        <img src={pizza?.imgSrc} style={{ maxWidth: 300, maxHeight: 300 }}></img>
        <p>{pizza?.toppings.map((topping) => topping.name).join(', ')}</p>
        <p>{pizza?.priceCents ? toDollars(pizza.priceCents) : ''}</p>
      </div>
    </CardItem>
  );
};

export default PizzaItem;
