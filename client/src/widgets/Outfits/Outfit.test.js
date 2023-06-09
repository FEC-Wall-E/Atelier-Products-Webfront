import { render, screen, fireEvent } from '@testing-library/react';
import Outfit from "./Outfit.jsx";
import RelatedProductsCarousel from "./relatedProductsCarousel.jsx";
import YourOutfits from "./YourOutfits.jsx";
import axios from "axios";


describe(Outfit, () => {
  const products = [
    {
      id: 37311,
      campus: 'hr-rfe',
      name: 'Camo Onesie',
      slogan: 'Blend in to your crowd',
      description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
      category: 'Jackets',
      default_price: '140.00',
      created_at: '2021-08-13T14:37:33.145Z',
      updated_at: '2021-08-13T14:37:33.145Z'
    },
    {
      id: 37312,
      campus: 'hr-rfe',
      name: 'Bright Future Sunglasses',
      slogan: "You've got to wear shades",
      description: "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
      category: 'Accessories',
      default_price: '69.00',
      created_at: '2021-08-13T14:37:33.145Z',
      updated_at: '2021-08-13T14:37:33.145Z'
    }
  ];

  const currentProduct = {
    id: 37311,
    campus: 'hr-rfe',
    name: 'Camo Onesie',
    slogan: 'Blend in to your crowd',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    category: 'Jackets',
    default_price: '140.00',
    created_at: '2021-08-13T14:37:33.145Z',
    updated_at: '2021-08-13T14:37:33.145Z'
  }
  const relatedProducts = [
    37312,
    37313,
    37318,
    37317
  ];

  const changeProduct = jest.fn();
  jest.mock('axios');

  const mock = jest.spyOn(axios, "post");
  mock.mockImplementation(() => Promise.resolve(relatedProducts));

  test("renders correctly when related products is empty", async () => {

    const {queryByTestId} = render(<Outfit products={products} currentProduct={currentProduct} setCurrentProduct={changeProduct}/>);
    await(() => expect(queryByTestId('loadRender')).toBeTruthy());
    await(() => expect(queryByTestId('normalRender')).toBeNull());
  });
});