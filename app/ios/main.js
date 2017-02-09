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
} from 'react-native';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      income: 0,
      expense: 0
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
        expense: expense
      });
    });
  }

  // getItems() {
  //   var ref = firebase.database().ref(firebase.auth().currentUser.uid)
  //   ref.on('value', (snap) => {
  //     var items = [];

  //     var item = {
  //       income: 0,
  //       expense: 0,
  //       date: ''
  //     };

  //     var totalIncome = 0;
  //     var totalExpense = 0;

  //     snap.forEach((child) => {
        
  //       // track totals
  //       if ( child.val().type == 'income' ) {
  //         totalIncome += Number(child.val().amount)
  //       } else {
  //         totalExpense += Number(child.val().amount)
  //       }

  //       // if its the first item set date
  //       if (item.date == ''){ item.date = child.val().date }

  //       // group together different categories
  //       if (child.val().date == item.date){
  //         if ( child.val().type == 'income' ) {
  //           item.income += Number(child.val().amount)
  //         } else {
  //           item.expense += Number(child.val().amount)
  //         }
  //       } else {
  //         items.push(item);
  //         item = {
  //           income: 0,
  //           expense: 0,
  //           date: child.val().date
  //         };
  //         if ( child.val().type == 'income' ) {
  //           item.income += Number(child.val().amount)
  //         } else {
  //           item.expense += Number(child.val().amount)
  //         }
  //       }
  //     });

  //     items.push(item);
  //     this.setState({
  //       dataSource: ds.cloneWithRows(items),
  //       totalIncome: totalIncome,
  //       totalExpense: totalExpense
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

  render() {
    return (
      <View style={styles.container}>
        <Header title="Simple Finance" addItem={this.addItem} history={this.history} />
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