'use strict';

import React, { Component } from 'react';
import ReactNative from 'react-native';
const styles = require('../theme/theme.js');
const Header = require('../components/Header');
import AddItem from './addItem.js';
import History from './history.js';
const firebase = require('../config/firebase');

import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  NavigatorIOS,
  Modal,
  ActivityIndicator
} from 'react-native';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      income: 0,
      expense: 0,
      animating: true
    };
    this.addItem = this.addItem.bind(this);
    this.history = this.history.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.getWeekNumber = this.getWeekNumber.bind(this);
  }

  componentWillMount() {
    this.getItems();
  }

  getWeekNumber() {
      // Copy date so don't modify original
      var d = new Date();
      d.setHours(0,0,0,0);
      // Set to nearest Thursday: current date + 4 - current day number
      // Make Sunday's day number 7
      d.setDate(d.getDate() + 4 - (d.getDay()||7));
      // Get first day of year
      var yearStart = new Date(d.getFullYear(),0,1);
      // Calculate full weeks to nearest Thursday
      var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
      return d.getFullYear() + '-' + weekNo
  }

  getItems() {
    var ref = firebase.database().ref(firebase.auth().currentUser.uid)
    ref.orderByChild('date').equalTo(this.getWeekNumber()).on('value', (snap) => {
      var items = [];
      var income = 0;
      var expense = 0;
      snap.forEach((child) => {
        var item = {}
        item.amount = child.val().amount
        item.name = child.val().name
        item.date = child.val().date
        item.type = child.val().type
        item.key = child.key
        items.push(item);
        if ( child.val().type == 'income' ) {
          income += Number(child.val().amount)
        } else {
          expense += Number(child.val().amount)
        }
      });
      items = items.reverse();
      this.setState({
        dataSource: ds.cloneWithRows(items),
        income: income,
        expense: expense,
        animating: false
      });
    });
  }

  // getItems() {
  //   var ref = firebase.database().ref(firebase.auth().currentUser.uid)
  //   ref.orderByChild('date').equalTo(this.getWeekNumber()).on('value', (snap) => {
  //     var items = [];

  //     var item = {
  //       amount: 0,
  //       type: '',
  //       name: ''
  //     };

  //     var income = 0;
  //     var expense = 0;

  //     snap.forEach((child) => {
        
  //       // track totals
  //       if ( child.val().type == 'income' ) {
  //         income += Number(child.val().amount)
  //       } else {
  //         expense += Number(child.val().amount)
  //       }

  //       if (items.filter(function(e) { return e.name == child.val().name; }).length > 0) {
  //         console.log("here!")
  //         items.filter(function(e) {
  //           if (e.name == child.val().name){
  //             e.amount = Number(e.amount) + Number(child.val().amount)
  //           }
  //         })
          
  //       } else {
  //         console.log("none here")
  //         item.amount = child.val().amount
  //         item.type = child.val().type
  //         item.name = child.val().name
  //         items.push(item);
  //         item = {
  //           amount: 0,
  //           type: '',
  //           name: ''
  //         };
  //       }
  //     });
  //     this.setState({
  //       dataSource: ds.cloneWithRows(items),
  //       income: income,
  //       expense: expense
  //     });

  //   });
  // }

  renderRow(rowData) {
    if (rowData.type == 'income'){
      return (
        <TouchableHighlight onPress={()=>this.addItem(rowData)}>
          <View style={ [styles.rowData, styles.greenRow] }>
            <Text style={styles.text}>{rowData.name}</Text>
            <Text style={styles.text}>${rowData.amount}</Text>
          </View>
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight onPress={()=>this.addItem(rowData)}>
          <View style={ [styles.rowData, styles.redRow] }>
            <Text style={styles.text}>{rowData.name}</Text>
            <Text style={styles.text}>${rowData.amount}</Text>
          </View>
        </TouchableHighlight>
      )
    }
  }

  addItem(rowData) {
    this.props.navigator.push({
      title: "Add Item",
      component: AddItem,
      passProps: {
          item: rowData,
      }
    });
  }

  history() {
    this.props.navigator.push({
      title: "History",
      component: History,
    });
  }

  activity(){
    if(this.state.animating === true){
      return (
        <View>
          <ActivityIndicator
            animating={this.state.animating}
            style={{height: 80, alignItems: 'center', justifyContent: 'center', padding: 25,}}
            size="large" />
          <Text style={styles.text}>Retrieving your expenses!</Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Simple Finance" addItem={this.addItem} history={this.history} />
        {this.activity()}
        <ListView
          style={{paddingBottom: 20, marginTop: -20}}
          dataSource={this.state.dataSource}
          renderRow={ this.renderRow.bind(this) }
          enableEmptySections={true} />
        <View style={ styles.bottomRow } >
          <View style={ styles.bottomBlock }>
            <Text style={ styles.greenText }>Income</Text>
            <Text style={ styles.greenText }>${this.state.income}</Text>
          </View>
          <Text style={styles.text}>This Week</Text>
          <View style={ styles.bottomBlock }>
            <Text style={ styles.redText }>Expenses</Text>
            <Text style={ styles.redText }>$ {this.state.expense}</Text>
          </View>
        </View>
      </View>
    )
  }
}

module.exports = Main;