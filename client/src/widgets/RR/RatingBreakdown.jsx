import React, {useState, useEffect} from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";

function RatingBreakdown ({currentProduct, metaData, reviews, setReviews}) {
  const [ratingData, setRatingData] = useState({});
  const [percent, setPercent] = useState(0);
  const [buttonStarNumColors, setButtonStarNumColors] = useState({
    "1": "black",
    "2": "black",
    "3": "black",
    "4": "black",
    "5": "black",
  });
  const [filter, setFilter] = useState(false);
  const [originalReviews, setOriginalReviews] = useState([]);

  useEffect(() => {
    if(metaData) {
      setRatingData(metaData.ratings);
      const recommended = metaData.recommended
      const total = Number(recommended.false) + Number(recommended.true);
      const percentage = Math.round(Number(recommended.true) * 100 / total)
      setPercent(percentage);
    }
  }, [metaData])

  const handleStarNumClick = (starNum) => {
    const updatedColors = {...buttonStarNumColors};
    updatedColors[starNum] = buttonStarNumColors[starNum] === "black" ? "green" : "black";
    setButtonStarNumColors(updatedColors);

    if (!filter) {
      const filteredReviews = reviews.filter((review) => review.rating === starNum);
      setOriginalReviews([... reviews]);
      setReviews(filteredReviews);
    } else {
      setReviews(originalReviews);
    }

    setFilter(!filter);
  }

  const calculateAveRating = (ratingData) => {
    let numerator = 0;
    let totalRatings = 0;

    for (let rating in ratingData) {
      totalRatings += Number(ratingData[rating]);
      numerator += (rating * Number(ratingData[rating]))
    }

   let average = totalRatings !== 0 ? (numerator / totalRatings) : 0;;

    return average;
  }

  const totalRatings = (ratingData, num) => {
    let total = 0
    for (let rating in ratingData) {
      total += Number(ratingData[rating]);
    }
    var percent = Math.round((num * 100) / total);
    return `${percent}%`
  }


  let averageRating = calculateAveRating(ratingData);
  let displayAveRating = averageRating.toFixed(1);

  let starRating = averageRating;
  let oldDecimals = Number(starRating.toString()[2] + starRating.toString()[3]);
  let newDecimals;
  let newMainNum;

  if (oldDecimals >= 0 && oldDecimals <= 13) {
    newMainNum = averageRating.toString()[0];
    newDecimals = 0;
  } else if (oldDecimals > 13 && oldDecimals <= 38) {
    newMainNum = averageRating.toString()[0];
    newDecimals = 25;
  } else if (oldDecimals > 38 && oldDecimals <= 62) {
    newMainNum = averageRating.toString()[0];
    newDecimals = 50
  } else if (oldDecimals > 62 && oldDecimals <= 87) {
    newMainNum = averageRating.toString()[0];
    newDecimals = 75;
  } else {
    newDecimals = 0;
    newMainNum =  Number(averageRating.toString()[0]) + 1;
  }

  let averageRatingRounded = Number(newMainNum.toString()[0] + "." + newDecimals.toString());

  if(starRating > 0) {
  return(
    <div
    className="Rating-Breakdown"
    style={{
      width: "100%",
      height: "300px"
    }}
    >
      <div
      style={{
        display: "flex",
        marginLeft: "20px",
        marginBottom: "10px",
        height: "30%",
      }}>
        <p
        style={{
          fontWeight: "bold",
          fontSize: "65px",
          display: "flex",
          alignItems: "center",
          fontFamily: 'Orbitron, sans-serif',
          maringBottom: '10px'
        }}>
        {displayAveRating}
        </p>
        <div style={{marginTop: "30px", marginLeft: "5px"}}>
          <StarRatings
            rating={averageRatingRounded}
            starRatedColor="green"
            starEmptyColor="grey"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="1px"
            />
          </div>
        </div>
        <div>
        <p
        style={{
          display: "flex",
          justifyContent: "center",
          fontStyle: "italic",
          margin: "0"
        }}
        >
        {`${percent}% people recommend this product`}
        </p>
      <div>
      {[5, 4, 3, 2, 1].map((num, i) => {
        return(
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <button
            onClick={() => handleStarNumClick(num)}
            className="numStars"
            style = {{
              textDecoration: "underline",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: buttonStarNumColors[num],
              marginLeft: "10px",
              marginTop: "5px",
              fontSize: "small",
              display: "flex",
              alignItems: "center"
            }}
              >{num} stars</button>
              <div
              style={{
                height: "15px",
                width: "65%",
                backgroundColor: "grey",
                margin: "10px",
                borderRadius: "5px"
              }}
              >
                <div
                style={{
                  height: "100%",
                  width: `${totalRatings(ratingData, ratingData[num])}`,
                  backgroundColor: 'green',
                  borderRadius: "5px"
                }}
                >
                </div>
              </div>
              <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
                marginTop: "10px",
                marginBottom: "5px",
                fontSize: "small"
              }}>{ratingData[num]}</div>
            </div>

        )
      })}
      </div>
      </div>
    </div>
  );
  } else {
    return (<div>Loading...</div>)
  }
}

export default RatingBreakdown;