import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Route,
  HashRouter,
} from "react-router-dom";
import Simonster0 from './simonster0'
import Simonster1 from './simonster1'

import * as firebase from 'firebase/app'
import 'firebase/firebase-database'

var firebaseConfig = {
    apiKey: "AIzaSyCq89rpk8CsXk_eAy_-WR7Dyo7kai4SdfA",
    authDomain: "si-monster.firebaseapp.com",
    databaseURL: "https://si-monster.firebaseio.com",
    projectId: "si-monster",
    storageBucket: "si-monster.appspot.com",
    messagingSenderId: "902434644807",
    appId: "1:902434644807:web:06b2c690c0cab9426ba262",
    measurementId: "G-CLTV9E3320"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class labtek8 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color0:"secondary",
            color1:"secondary",
        }
    }

    componentDidMount() {
        this.getData();
    }

    getColor(data){
        if(data.slice(-1)[0]['time'] > (Date.now()-7200000)){
            if(data.slice(-1)[0]['state'] === 0){
                return "success"
            }else if(data.slice(-1)[0]['state'] === 1){
                return "warning"
            }else if(data.slice(-1)[0]['state'] === 2){
                return "danger"
            }else{
                return "light"
            }
        }else{
            return "dark"
        }
    }

    getData() {
        const rootRef = firebase.database().ref();
        // const rootRef = firebase.database();
        rootRef.on('value', snap => {
            var list1 = Object.values(snap.val()['sm00']['ts'])
            var list2 = Object.values(snap.val()['sm01']['ts'])
            list1.sort((a, b) => (a.time > b.time) ? 1 : -1 )
            list2.sort((a, b) => (a.time > b.time) ? 1 : -1 )
            
            if(typeof list1 != "undefined" && list1 != null && list1.length != null
            && list1.length > 0){
                this.setState({ 
                    color0:this.getColor(list1),
                }, () => {
                    console.log("getData success")
                });
            }else{
                console.log("SiMonster no data")
            }

            if(typeof list2 != "undefined" && list2 != null && list2.length != null
            && list2.length > 0){
                this.setState({ 
                    color1:this.getColor(list2),
                }, () => {
                    console.log("getData success")
                });
            }else{
                console.log("SiMonster no data")
            }
        });
    }

    render(){
        return (
            <HashRouter>
                <div className="row">
                    <ButtonToolbar>
                        <LinkContainer to="/labtek8/simonster0/monitor">
                            <Button variant={this.state.color0} >SiMonster 0</Button>
                        </LinkContainer>
                        <LinkContainer to="/labtek8/simonster1/monitor">
                            <Button variant={this.state.color1} >SiMonster 1</Button>
                        </LinkContainer>
                        <LinkContainer to="/labtek8/simonster2">
                            <Button variant="secondary" >SiMonster 2</Button>
                        </LinkContainer>
                        <LinkContainer to="/labtek8/simonster3">
                            <Button variant="secondary" >SiMonster 3</Button>
                        </LinkContainer>
                    </ButtonToolbar>
                </div>
                <div className="row" style={{marginTop:20, marginLeft:0}}>
                    <Route path="/labtek8/simonster0" component={Simonster0}/>
                    <Route path="/labtek8/simonster1" component={Simonster1}/>
                </div>
            </HashRouter>
        );
    }
        
}
    
export default labtek8;
