import React from 'react'
import Charts from './Charts'
import Popup from 'reactjs-popup'
import Table from 'react-bootstrap/Table'

function trash(props) {
  return(
      <Popup
        trigger={<button class={props.class} style={{backgroundColor:props.color}}><i class="fa fa-trash"></i> {props.name} </button>}
        modal
        closeOnDocumentClick
      >
        <div className="modalT">
          <div className="headerT">{props.name}</div>
          <div className="contentT">
            <Charts data={props.data} />
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>State</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {props.tableData.map(( listValue, index ) => {
                  return (
                    <tr key={index}>
                      <td>{listValue.state}</td>
                      <td>{listValue.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </Popup>
  );
}

export default trash