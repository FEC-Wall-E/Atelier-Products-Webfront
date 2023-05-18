import React, { useState, useEffect } from "react";
import axios from "axios";
import RelatedProductsCarousel from "./RelatedProductsCarousel.jsx";
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
      <div data-testid="normalRender" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '50%', height: 'auto'}}>
        <br></br>
        <div style={{fontSize: 30, fontFamily: 'Orbitron, sans-serif'}}>Related Products</div>
        <br></br>
        <RelatedProductsCarousel currentProduct={currentProduct} relatedProducts={relatedProducts} setCurrentProduct={setCurrentProduct}/>
        <br></br>
        <div style={{fontSize: 30, fontFamily: 'Orbitron, sans-serif'}}>Your Outfit</div>
        <br></br>
        <YourOutfits currentProduct={currentProduct}/>
      </div>
    )
  } else {
    return (
    <div data-testid="loadRender" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '50%', height: 'auto'}}>
      <br></br>
      <div style={{fontSize: 30, fontFamily: 'Orbitron, sans-serif'}}>Related Products</div>
      <br></br>
      <div style={{fontSize: 30, fontFamily: 'Orbitron, sans-serif'}}>No Related Products...</div>
      <br></br>
      <div style={{fontSize: 30, fontFamily: 'Orbitron, sans-serif'}}>Your Outfit</div>
      <br></br>
      <YourOutfits currentProduct={currentProduct}/>
    </div>)
  }
};

export default Outfit;