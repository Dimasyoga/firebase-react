import React from 'react'
import './App.css'
import * as firebase from 'firebase/app'
import 'firebase/firebase-database'
import Trash from './Trash'

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData1:[],
      chartData2:[],
      color1:'#FFFFFF',
      color2:'#FFFFFF'
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

  myFunct(value, index, array){
    if(value['time'] > (Date.now() - 86400000)){
      var d = new Date(value['time'])
      value['time'] = d.getHours().toString() + ":" + d.getMinutes().toString()
      return value
    }
  }

  getColor(data){
    if(data.slice(-1)[0]['state'] === 0){
      return '#75F735'
    }else if(data.slice(-1)[0]['state'] === 1){
      return '#F7EB35'
    }else if(data.slice(-1)[0]['state'] === 2){
      return '#F74F35'
    }else{
      return '#000000'
    }
  }

  getData() {
    const rootRef = firebase.database().ref();
    // const rootRef = firebase.database();
    rootRef.on('value', snap => {
      var list1 = Object.values(snap.val()['sm00']['ts'])
      var list2 = Object.values(snap.val()['sm01']['ts'])
      // console.log("Data: ", list1)
      list1.sort((a, b) => (a.time > b.time) ? 1 : -1 )
      list2.sort((a, b) => (a.time > b.time) ? 1 : -1 )
      // console.log("Last state: ", list1)
      list1 = list1.filter(this.myFunct)
      list2 = list2.filter(this.myFunct)
      
      if(typeof list1 != "undefined" && list1 != null && list1.length != null
      && list1.length > 0){
        this.setState({ 
          chartData1: list1,
          color1:this.getColor(list1),
        }, () => {
          console.log("getData1 success")
        });
      }else{
        console.log("SiMonster 1 no data")
      }

      if(typeof list2 != "undefined" && list2 != null && list2.length != null
      && list2.length > 0){
        this.setState({ 
          chartData2: list2,
          color2:this.getColor(list2),
        }, () => {
          console.log("getData2 success")
        });
      }else{
        console.log("SiMonster 2 no data")
      }
    });
  }

  _handleChoice(theChosenOne) {
    this.getData(theChosenOne);
  }
  

  render(){
    return (
      <div class="content">
        <Trash name="SiMonster 1" data={this.state.chartData1} color={this.state.color1} class="btn"/>
        <Trash name="SiMonster 2" data={this.state.chartData2} color={this.state.color2} class="btn2"/>
      </div>
      
    );
  }
  
}

export default App;
