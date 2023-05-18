import React, {useState, useEffect} from 'react';
import axios from 'axios';
import StarRatings from "react-star-ratings";

function ProductInfo({currentProduct, currentStyle, checkIfProductChangedArr, checkIfStyleChangedArr, allRatingsObj}) {

  const [currentPrice, setCurrentPrice] = useState(currentProduct.default_price)
  const [hasSale, setHasSale] = useState(false)
  const [numOfReviews, setNumOfReviews] = useState(0)

  useEffect(()=>{axios.post('/listReviews', {product_id: currentProduct.id}).then((res)=>{setNumOfReviews(res.data.results.length)})}, checkIfProductChangedArr)
  useEffect(()=>{setCurrentPrice(currentProduct.default_price)}, checkIfProductChangedArr)
  useEffect(()=>{if (currentStyle) {if (currentStyle.sale_price) {setHasSale(true); setCurrentPrice(currentStyle.sale_price)} else {setCurrentPrice(currentStyle.original_price); setHasSale(false)}}}, checkIfStyleChangedArr)


  if (allRatingsObj) {
    var ratingsArr = Object.entries(allRatingsObj)

    // oh my god this has got to be the LEAST efficient way to do this
    // ... well, it works for now soooooo
    var total = 0;
    var divider = 0;
    for (var i = 0; i < ratingsArr.length; i++) {
      total += Number(ratingsArr[i][0]) * Number(ratingsArr[i][1])
      divider += Number(ratingsArr[i][1])
    }
    var averageRating = total / divider;
    var oldDecimals = Number(averageRating.toString()[2] + averageRating.toString()[3])
    var newDecimals;
    var newMainNum;
    if (oldDecimals >= 0 && oldDecimals <= 13) {
      newMainNum = averageRating.toString()[0]
      newDecimals = 0;
    } else if (oldDecimals > 13 && oldDecimals <= 38) {
      newMainNum = averageRating.toString()[0]
      newDecimals = 25;
    } else if (oldDecimals > 38 && oldDecimals <= 62) {
      newMainNum = averageRating.toString()[0]
      newDecimals = 50;
    } else if (oldDecimals > 62 && oldDecimals <= 87) {
      newMainNum = averageRating.toString()[0]
      newDecimals = 75;
    } else if (oldDecimals > 87 && oldDecimals <= 99) {
      newDecimals = 0;
      newMainNum =  Number(averageRating.toString()[0]) + 1
    }
    var averageRatingRounded = Number(newMainNum.toString() + '.' + newDecimals.toString())

    if (currentStyle) {
      return (
        <div>
          <div className="product-info">
          <StarRatings
              name="average-rating"
              editing='false'
              starCount={5}
              rating={averageRatingRounded}
              starRatedColor="green"
              starEmptyColor="grey"
              starSpacing="0.5vw"
              starDimension="5vh"
            />
            <p className="read-all-reviews-btn" onClick={(e)=>{e.preventDefault; console.log('average: ', averageRating, ' rounded: ', averageRatingRounded); document.querySelector('.RR').scrollIntoView()}}>read all {numOfReviews ? numOfReviews : null} reviews</p>
          </div>
          <p className="product-category">{currentProduct.category}</p>
          <h3 className="product-name">{currentProduct.name}</h3>
          <p>{currentProduct.slogan}</p>
          {hasSale ? <div  style={{'display': 'flex', 'marginBottom': '1vh'}}> <strike>${currentStyle.original_price}</strike> <div className="product-price-discounted">${currentPrice}</div> </div> : <div className="product-price">${currentPrice}</div>}
          <div className="product-description">{currentProduct.description}</div>
        </div>
      )
    } else {
      return (
        <div>
          Loading...
        </div>
      )
    }
  } else {
    return (
      <div>
        Loading...
      </div>
    )
  }

}

export default ProductInfo;
