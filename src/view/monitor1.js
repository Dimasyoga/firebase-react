import React from 'react'
import Charts from '../component/Charts'
import Table from 'react-bootstrap/Table'
import Moment from 'moment'

import * as firebase from 'firebase/app'
import 'firebase/firebase-database'

class monitor1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData:[],
            color:'#FFFFFF',
            state:[],
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
            value['time'] = Moment(value['time']).format("M/D/YYYY HH:mm")
            return value
        }
    }
    
    convertDate(value, index, array){  
        value['time'] = Moment(value['time']).format("M/D/YYYY HH:mm")
        return value
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
            var list1 = Object.values(snap.val()['sm01']['ts'])
            list1.sort((a, b) => (a.time > b.time) ? 1 : -1 )
            // console.log("Last state: ", list1)
            list1 = list1.filter(this.myFunct)
            
            if(typeof list1 != "undefined" && list1 != null && list1.length != null
            && list1.length > 0){
                this.setState({ 
                    chartData: list1,
                    color:this.getColor(list1),
                    state:Object.values(snap.val()['sm01']['stateUpdate']).sort((a, b) => (a.time > b.time) ? 1 : -1 ).filter(this.convertDate),
                }, () => {
                    console.log("getData success")
                });
            }else{
                console.log("SiMonster no data")
            }
        });
    }
    
    _handleChoice(theChosenOne) {
        this.getData(theChosenOne);
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <h3>SiMonster 1 Labtek 8 Lantai 3 Depan LIFT</h3>
                    <Charts data={this.state.chartData}/>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>State</th>
                            <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.state.map(( listValue, index ) => {
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
        );
    }
}

export default monitor1