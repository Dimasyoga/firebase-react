import React from 'react'
import Charts from './Charts'
import Popup from 'reactjs-popup'

function trash(props) {
    return(
        <Popup
          trigger={<button class={props.class} style={{backgroundColor:props.color}}><i class="fa fa-trash"></i> {props.name} </button>}
          modal
          closeOnDocumentClick
        >
          <div className="header">{props.name}</div>
          <div>
            <Charts data={props.data} />
          </div>
        </Popup>
    );
}

export default trash