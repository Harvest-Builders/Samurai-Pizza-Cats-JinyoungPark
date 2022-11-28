import { screen, waitFor } from '@testing-library/react';
import { graphql } from 'msw';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { Pizza } from '../../../types';
import { server } from '../../../lib/test/msw-server';
import Pizzas from '../Pizzas';
import { createTestPizza } from '../../../lib/test/helper/pizza';

describe('Pizzas', () => {
  const renderPizzaList = () => {
    const view = renderWithProviders(<Pizzas />);

    return {
      ...view,
      $findPizzaItems: () => screen.findAllByTestId(/^pizza-item-/),
      $queryPizzaItems: () => screen.queryByTestId(/^pizza-list-loading/),
    };
  };

  const mockPizzaQuery = (data: Partial<Pizza[]>) => {
    server.use(
      graphql.query('Pizzas', (_request, response, context) => {
        return response(
          context.data({
            loading: false,
            pizzas: [...data],
          })
        );
      })
    );
  };

  beforeEach(() => {
    const pizza1 = createTestPizza();
    const pizza2 = createTestPizza();
    mockPizzaQuery([pizza1, pizza2]);
  });

  test('should display a list of pizzas', async () => {
    const { $findPizzaItems } = renderPizzaList();

    waitFor(async () => {
      expect(await $findPizzaItems()).toHaveLength(2);
    });
  });

  test('should display loading page', async () => {
    const { $queryPizzaItems } = renderPizzaList();

    expect(
      await waitFor(() => {
        $queryPizzaItems();
      })
    ).not.toBeNull();
  });
});
