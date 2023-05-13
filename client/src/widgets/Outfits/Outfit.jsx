import React, { useState, useEffect } from "react";
import axios from "axios";
import RelatedProductsCarousel from "./relatedProductsCarousel.jsx";
import YourOutfits from "./YourOutfits.jsx";


const Outfit = ({products, currentProduct, setCurrentProduct}) => {
  const [relatedProducts, setRelatedProducts] = useState([]);


  useEffect(() => {
    axios.post('/relatedProducts', {
      product_id: currentProduct.id
    })
      .then((relatedItems) => {
      setRelatedProducts(relatedItems.data);
    })
  }, [currentProduct])

  if (relatedProducts.length > 0) {

    return (
      <div data-testid="normalRender" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <br></br>
        <>Related Products</>
        <br></br>
        <RelatedProductsCarousel currentProduct={currentProduct} relatedProducts={relatedProducts} setCurrentProduct={setCurrentProduct}/>
        <br></br>
        <>Your Outfit</>
        <br></br>
        <YourOutfits currentProduct={currentProduct}/>
      </div>
    )
  } else {
    return (<div data-testid="loadRender">Loading...</div>)
  }
};

export default Outfit;