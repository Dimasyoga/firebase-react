import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Route,
  HashRouter,
} from "react-router-dom";
import Monitor1 from './monitor1'
import Lokasi1 from './lokasi1'

class simonster1 extends React.Component {
    render(){
        return(
            <HashRouter>
                <div className="row">
                    <ButtonToolbar>
                        <LinkContainer to="/labtek8/simonster1/monitor">
                            <Button variant="outline-secondary" >Monitor</Button>
                        </LinkContainer>
                        <LinkContainer to="/labtek8/simonster1/lokasi">
                            <Button variant="outline-secondary" >Lokasi</Button>
                        </LinkContainer>
                    </ButtonToolbar>
                </div>
                <div className="row" style={{marginTop:20, marginBottom:20}}>
                    <Route path="/labtek8/simonster1/monitor" component={Monitor1}/>
                    <Route path="/labtek8/simonster1/lokasi" component={Lokasi1}/>
                </div>
            </HashRouter>
        );
    }
}

export default simonster1;