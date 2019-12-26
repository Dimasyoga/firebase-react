import React from 'react'
import Background from '../maps/simonster1.jpg';
import {Image} from 'react-bootstrap'

function lokasi1(props) {
  return(
      <div className="container">
          <Image src={Background} fluid/>
      </div>
  );
}

export default lokasi1