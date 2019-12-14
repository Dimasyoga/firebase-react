import React from 'react'
import './App.css'
import * as firebase from 'firebase/app'
import 'firebase/firebase-database'
import Charts from './Charts'
import Popup from 'reactjs-popup'

var firebaseConfig = {
  apiKey: "AIzaSyDzlWi_GqFWdzNmYUdl-4Fj2LrEIvLeDD4",
  authDomain: "reminapp.firebaseapp.com",
  databaseURL: "https://reminapp.firebaseio.com",
  projectId: "reminapp",
  storageBucket: "reminapp.appspot.com",
  messagingSenderId: "703294009454",
  appId: "1:703294009454:web:8facc4eec8f1c28b6e767f",
  measurementId: "G-QPTJYLTRHC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData1:[],
      chartData2:[]
    }
  }
  // async function
  // componentDidMount(){
  //   let record = firebase.database().ref('timestamped_measures');
  //   record.once('value').then((result) => {
  //     console.log("async: ", result.val())
  //     this.setState({chartData:Object.values(result.val())})
  //   }).catch((err) => {
  //     console.log("error")
  //   });
  // }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const rootRef = firebase.database().ref('timestamped_measures');
    rootRef.on('value', snap => {
      var list1 = Object.values(snap.val()['tong 1'])
      var list2 = Object.values(snap.val()['tong 2'])
      this.setState({ 
        chartData1: list1.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1 ),
        chartData2: list2.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1 )
      }, () => {
        console.log("getData success")
      });
    });
  }

  _handleChoice(theChosenOne) {
    this.getData(theChosenOne);
  }
  

  render(){
    return (
      <div>
        <div>
          <Popup
            trigger={<button class="btn"><i class="fa fa-trash"></i> Thrash 1 </button>}
            modal
            closeOnDocumentClick
          >
            <div className="header">Thrash 1</div>
            <div className="content">
              <Charts data={this.state.chartData1} />
            </div>
          </Popup>
        </div>
        <div>
          <Popup
            trigger={<button class="btn"><i class="fa fa-trash"></i> Thrash 2 </button>}
            modal
            closeOnDocumentClick
          >
            <div className="header">Thrash 2</div>
            <div className="content">
              <Charts data={this.state.chartData2} />
            </div>
          </Popup>
        </div>
      </div>
      
    );
  }
  
}

export default App;
