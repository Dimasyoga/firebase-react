import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Route,
  HashRouter,
} from "react-router-dom";
import Monitor0 from './monitor0'
import Lokasi0 from './lokasi0'

class simonster0 extends React.Component {
    render(){
        return(
            <HashRouter>
                <div className="row">
                    <ButtonToolbar>
                        <LinkContainer to="/labtek8/simonster0/monitor">
                            <Button variant="outline-secondary" >Monitor</Button>
                        </LinkContainer>
                        <LinkContainer to="/labtek8/simonster0/lokasi">
                            <Button variant="outline-secondary" >Lokasi</Button>
                        </LinkContainer>
                    </ButtonToolbar>
                </div>
                <div className="row" style={{marginTop:20, marginBottom:20}}>
                    <Route path="/labtek8/simonster0/monitor" component={Monitor0}/>
                    <Route path="/labtek8/simonster0/lokasi" component={Lokasi0}/>
                </div>
            </HashRouter>
        );
    }
}

export default simonster0;