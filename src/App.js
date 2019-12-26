import React from 'react'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Route,
  HashRouter,
} from "react-router-dom";
import labtek8 from './view/labtek8'

class App extends React.Component {
  render(){
    return (
      <HashRouter>
        <div className="container-fluid">
          <div className="row align-items-center" style={{backgroundColor:'blue',color:'white'}}>
            <div className="col" >
              <h1 style={{textAlign: "center"}}>SiMonster WebApp</h1>
            </div>
          </div>
          <div className="container-fluid" style={{marginTop:10}}>
            <div className="row align-items-start">
              <div className="col-2">
                <div className="d-flex flex-column">
                  <LinkContainer to="/labtek8">
                    <Button variant="outline-primary">Labtek 8</Button>
                  </LinkContainer>
                  <LinkContainer to="/labtek7">
                    <Button variant="outline-primary">Labtek 7</Button>
                  </LinkContainer>
                </div>
              </div>
              <div className="col-8" style={{marginLeft:20}}>
                <Route path="/labtek8" component={labtek8}/>
              </div>
            </div>
            <div className="row">

            </div>
          </div>
        </div>
      </HashRouter> 
    );
  }
  
}

export default App;
