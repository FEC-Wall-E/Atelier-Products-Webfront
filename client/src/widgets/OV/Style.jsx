import React from 'react';

function Style({style, styleBtnHandler, index, selectedStyle}) {

  if (selectedStyle === style.style_id) {
    return (
      <div onClick={styleBtnHandler(index, style.style_id)} className="style">
        <div style={{fontFamily: 'Orbitron, sans-serif'}}>{style.name}</div>
        <div style={{'display':'flex', 'border': '0.35vw solid green', 'borderRadius': '2.1vw', 'width': '5vw'}}>
          <img src={style.photos[0].thumbnail_url} className="style-thumbnail"/>
        </div>
      </div>
    )
  } else {
    return (
      <div onClick={styleBtnHandler(index, style.style_id)} className="style" >
        <div style={{fontFamily: 'Orbitron, sans-serif'}}>{style.name}</div>
        <div style={{'display':'flex', 'border': '0.2vw solid black', 'borderRadius': '2.1vw', 'width': '5vw'}}>
          <img src={style.photos[0].thumbnail_url} className="style-thumbnail" />
        </div>
      </div>
    )
  }

}

export default Style;