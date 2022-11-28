import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { createTestPizza } from '../../../lib/test/helper/pizza';
import PizzaItem, { PizzaItemProps } from '../PizzaItem';
import { act } from 'react-dom/test-utils';

describe('PizzaItem', () => {
  const props = {
    pizza: createTestPizza(),
    handleOpen: jest.fn(),
  };

  const renderPizzaList = (props: PizzaItemProps) => {
    const view = renderWithProviders(<PizzaItem {...props} />);

    return {
      ...view,
      $getCorrectPizza: () => screen.getByTestId(/^pizza-id/),
      $getName: () => screen.getByTestId(/^pizza-price/),
      $getDescription: () => screen.getByTestId(/^pizza-description/),
      $getImage: () => screen.getByTestId(/^pizza-image/),
      $getPriceCents: () => screen.getByTestId(/^pizza-priceCents/),
      $getToppings: () => screen.getByTestId(/^topping-item/),
      $getModifyButton: () => screen.getByTestId(/^pizza-select/),
    };
  };

  test('should display all components of the pizza item', async () => {
    const { $getName, $getDescription, $getImage, $getPriceCents, $getToppings } = renderPizzaList(props);

    expect($getName()).toBeVisible();
    expect($getDescription()).toBeVisible();
    expect($getImage()).toBeVisible();
    expect($getPriceCents()).toBeVisible();
    expect($getToppings()).toBeVisible();
  });

  test('should have a correct item', async () => {
    const { $getCorrectPizza } = renderPizzaList(props);
    expect($getCorrectPizza()).not.toBeNull();
  });

  test('should call handleOpen when the pizza list is clicked', async () => {
    const { $getModifyButton } = renderPizzaList(props);
    act(() => userEvent.click($getModifyButton()));
    expect(props.handleOpen).toHaveBeenCalledTimes(1);
  });
});
