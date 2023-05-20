import React, {useState, useEffect}  from 'react';
import axios from 'axios';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import Gallery from './Gallery.jsx';
import AddToCart from './AddToCart.jsx';

function Overview({currentProduct}) {

  const [currentStyle, setCurrentStyle] = useState(0);
  const [allProductStyles, setAllProductStyles] = useState([]);
  const [mainGalleryPic, setMainGalleryPic] = useState(0);
  const [allRatingsObj, setAllRatingsObj] = useState(0)
  const [selectedStyle, setSelectedStyle] = useState('')

  const checkIfProductChangedArr = [currentProduct]

  const checkIfStyleChangedArr = [currentStyle]


  useEffect(()=>{axios.post('/productStyles', {product_id: currentProduct.id}).then((res)=>{setAllProductStyles(res.data.results); setCurrentStyle(res.data.results[0]); }) },[])

  useEffect(()=>{axios.post('/productStyles', {product_id: currentProduct.id}).then((res)=>{setAllProductStyles(res.data.results); setCurrentStyle(res.data.results[0]); setSelectedStyle(res.data.results[0].style_id)})}, checkIfProductChangedArr)

  useEffect(()=>{axios.post('/reviewMetadata', {product_id: currentProduct.id}).then((res) => {setAllRatingsObj(res.data.ratings)})}, checkIfProductChangedArr)


  if (currentProduct) {
    return(
      <div data-testid="overviewMain">
       <div className="main-overview">
        <Gallery currentProduct={currentProduct} currentStyle={currentStyle} mainGalleryPic={mainGalleryPic} setMainGalleryPic={setMainGalleryPic} checkIfProductChangedArr={checkIfProductChangedArr} checkIfStyleChangedArr={checkIfStyleChangedArr}/>
        <div className="all-product-info">
          <ProductInfo currentProduct={currentProduct} currentStyle={currentStyle} checkIfProductChangedArr={checkIfProductChangedArr} checkIfStyleChangedArr={checkIfStyleChangedArr} allRatingsObj={allRatingsObj} />
          <StyleSelector currentProduct={currentProduct} setCurrentStyle={setCurrentStyle} allProductStyles={allProductStyles} currentStyle={currentStyle} checkIfStyleChangedArr={checkIfStyleChangedArr} selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle}/>
          <AddToCart selectedStyle={selectedStyle} currentStyle={currentStyle} checkIfStyleChangedArr={checkIfStyleChangedArr} checkIfProductChangedArr={checkIfProductChangedArr}/>
        </div>
       </div>
      </div>
    )
  } else {
    return(
      <div>NO PRODUCT FOUND</div>
    )
  }
}

export default Overview;