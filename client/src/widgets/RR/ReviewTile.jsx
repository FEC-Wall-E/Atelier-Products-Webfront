import React, {useState, useEffect} from "react";
import StarRatings from "react-star-ratings";
import axios from "axios";
import PhotoModal from "./PhotoModal.jsx"
import PostAPIInteraction from "../PostAPIInteraction.jsx";

function ReviewTile ({review, reviews}) {
  const [rating, setRating] = useState(review.rating);
  const [helpfulness, setHelpfulness] = useState(review.helpfulness);
  const [clickedYes, setClickedYes] = useState(false);
  const [buttonYesColor, setButtonYesColor] = useState("blue");
  const [buttonReportColor, setButtonReportColor] = useState("blue");
  const [showMore, setShowMore] = useState(false);
  const [reported, setReported] = useState(false)

  useEffect(() => {
    setHelpfulness(review.helpfulness);
  }, [review])

  const body = review.body;

  const isVerifiedUser = (username) => {
   const allUsernames = reviews.map((reviewObj) => {
      return reviewObj.reviewer_name;
    })

    const currentUserList = []
    allUsernames.map((user) => {
      if (username === user) {
        currentUserList.push(username)
      }
    })

    if (currentUserList.length > 1) {
      return true;
    } else {
      return false;
    }
  }

  const formatDate = (string) => {
    let date = new Date(string);
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    let monthIndex = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();

    return `${months[monthIndex]} ${day}, ${year}`;
  }

  const handleHelpfulClick = () => {
    if (!clickedYes) {
    axios.post('/markReviewHelpful', {review_id: review.review_id})
      .then((res) => {
        console.log('marked review as helpful: ', res.data);
        setHelpfulness(review.helpfulness + 1);
      })
      .catch((err) => {
        console.log('could not mark as helpful: ', err);
      })
      setClickedYes(true);
      setButtonYesColor("grey")
      PostAPIInteraction('Helpful button', 'Ratings and Reviews');
    }
  }

  const reportReview = function () {
    axios.post('/reportReview', {
      review_id: review.review_id
    })
      .then((res) => {console.log('reported review: ', res.data)});
    setButtonReportColor("grey");
    setReported(true);
    PostAPIInteraction('Report button', 'Ratings and Reviews');
  }

  return(
    <div
    className="tile"
    style={{
      borderBottom: "0.5px solid black",
      margin: "10px",
      padding: "10px",
    }}
    >
      <div
      className="rating-and-date"
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "5px"
      }}
      >

        <StarRatings
        rating={review.rating}
        starRatedColor="green"
        starEmptyColor="grey"
        numberOfStars={5}
        name="rating"
        starDimension="18px"
        starSpacing="1px"
        data-testid="star-ratings"
        />

        <div>
          <div style={{fontSize: "small", fontFamily: "Arial, Helvetica, sans-serif"}}>
          {formatDate(review.date)}
          </div>
          <div
          style={{fontSize: "small",
          display: "flex",
          justifyContent: "right",
          fontFamily: "Arial, Helvetica, sans-serif"
          }}>
            {isVerifiedUser(review.reviewer_name) ? `✓ ${review.reviewer_name}`: review.reviewer_name}
          </div>
        </div>

      </div>

      <div style={{marginBottom: "10px"}}>
        <p style={{"fontWeight": "bold", marginTop: "0", fontFamily: "Arial, Helvetica, sans-serif"}}>
        {review.summary}
        </p>

        <p
        style={{
          margin: "0",
          fontFamily: "Arial, Helvetica, sans-serif"
        }}
        >
          {showMore ? body: `${body.substring(0, 250)}`}
          {body.length>250 ?
            <button
            onClick={()=>{setShowMore(!showMore)}}
            style={{
              textDecoration: "underline",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "blue"
            }}
            >
            {showMore ? "Show less": "...Show more"}
            </button>: null
          }
        </p>
      </div>

      <PhotoModal review={review}/>

      {review.recommend ? <div>I recommend this product ✓</div>: null}


      <div style={{display: "flex", fontSize: "small", marginTop: "10px"}}>
        <div style={{marginRight: "5px"}}>Was this review helpful? </div>
        <button
        onClick={handleHelpfulClick}
        style={{ textDecoration: "underline",
        border: "none",
        background: "none",
        cursor: "pointer",
        color: buttonYesColor }}>
          Yes
        </button>
        <div>({helpfulness})</div>
        <div style={{marginLeft: "5px", fontSize: "large"}}> | </div>
        <button
        onClick={reportReview}
        style={{ textDecoration: "underline",
        border: "none",
        background: "none",
        cursor: "pointer",
        color: buttonReportColor }}>
          Report
        </button>
      </div>

      {review.response ? <div style={{backgroundColor:"rgb(187, 185, 185)"}}> Response from seller: {review.response}</div>: null}

    </div>
  );
}

export default ReviewTile;