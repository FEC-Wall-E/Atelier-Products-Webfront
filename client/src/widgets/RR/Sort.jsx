import React, {useState, useEffect} from "react";
import axios from "axios";
import PostAPIInteraction from "../PostAPIInteraction.jsx";

function Sort ({currentProduct, reviews, setReviews, metaData}) {
  const [value, setValue] = useState("relevant");

  const handleChange = (e) => {
    let newValue = e.target.value
    setValue(newValue);

    axios.post('/listReviews', {product_id: currentProduct.id, sortType: newValue})
      .then((res) => {
        setReviews(res.data.results)
        })
    PostAPIInteraction('Sort dropdown', 'Ratings and Reviews');
  }

  return(
    <div
    style={{
      marginBottom: "10px"
    }}
    >
      <label htmlFor="sortSelect">{`${reviews.length} reviews sorted by:`}</label>
      <select id="sortSelect" value={value} onChange={handleChange}>
        <option value="relevant">Relevance</option>
        <option value="newest">Newest</option>
        <option value="helpful">Helpfulness</option>
      </select>
    </div>
  );
}

export default Sort;