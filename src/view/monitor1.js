import React from 'react'
import Charts from '../component/Charts'
import Table from 'react-bootstrap/Table'
import Moment from 'moment'
import 'moment/locale/id'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

import * as firebase from 'firebase/app'
import 'firebase/firebase-database'

Moment.locale('id')

class monitor1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData:[],
            state:[],
            period:604800000,
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
        if(value['time'] > (Date.now() - this)){
            value['time'] = Moment(value['time']).format('ddd D-MMM-YYYY HH:mm')
            return value
        }
    }
    
    convertDate(value, index, array){  
        value['time'] = Moment(value['time']).format('dddd D-MMM-YYYY HH:mm')
        return value
    }
    
    getData() {
        const rootRef = firebase.database().ref();
        // const rootRef = firebase.database();
        rootRef.on('value', snap => {
            var list1 = Object.values(snap.val()['sm01']['ts'])
            list1.sort((a, b) => (a.time > b.time) ? 1 : -1 )
            // console.log("Last state: ", list1)
            list1 = list1.filter(this.myFunct, this.state.period)
            
            if(typeof list1 != "undefined" && list1 != null && list1.length != null
            && list1.length > 0){
                this.setState({ 
                    chartData: list1,
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

    handleClick(inp){
        this.setState({period:inp}, () => {
            this.getData()
        })
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <h3>SiMonster 1 Labtek VIII Lt.3 (Depan Lift)</h3>
                </div>
                <div className="row">
                    <div className="row" style={{marginLeft:0}}>
                        <ButtonToolbar>
                            <Button variant="danger" onClick={() => this.handleClick(86400000)}>1 Hari</Button>
                            <Button variant="success" onClick={() => this.handleClick(604800000)}>7 Hari</Button>
                            <Button variant="primary" onClick={() => this.handleClick(2592000000)}>30 Hari</Button>
                        </ButtonToolbar>
                    </div>
                    <div className="row" style={{marginTop:20, marginLeft:0}}>
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
            </div>
        );
    }
}

export default monitor1