import { Pizza } from '../../types';
import CardItem from '../common/CardItem';

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
      </div>
    </CardItem>
  );
};

export default PizzaItem;
