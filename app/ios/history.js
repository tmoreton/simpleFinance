'use strict';

import React, { Component } from 'react';
import ReactNative from 'react-native';
const styles = require('../theme/theme.js');
const Header = require('../components/Header');
import AddItem from './addItem.js';
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
  TouchableOpacity
} from 'react-native';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

class History extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      totalIncome: 0,
      totalExpense: 0
    };
    this.renderRow = this.renderRow.bind(this);
    this.back = this.back.bind(this);
  }

  componentWillMount() {
    this.getItems();
  }

  back() {
    this.props.navigator.pop();
  }

  getItems() {
    var ref = firebase.database().ref(firebase.auth().currentUser.uid)
    ref.on('value', (snap) => {
      var items = [];

      var item = {
        income: 0,
        expense: 0,
        date: ''
      };

      var totalIncome = 0;
      var totalExpense = 0;

      snap.forEach((child) => {
        
        // track totals
        if ( child.val().type == 'income' ) {
          totalIncome += Number(child.val().amount)
        } else {
          totalExpense += Number(child.val().amount)
        }

        // if its the first item set date
        if (item.date == ''){ item.date = child.val().date }

        // group together different categories
        if (child.val().date == item.date){
          if ( child.val().type == 'income' ) {
            item.income += Number(child.val().amount)
          } else {
            item.expense += Number(child.val().amount)
          }
        } else {
          items.push(item);
          item = {
            income: 0,
            expense: 0,
            date: child.val().date
          };
          if ( child.val().type == 'income' ) {
            item.income += Number(child.val().amount)
          } else {
            item.expense += Number(child.val().amount)
          }
        }
      });

      items.push(item);
      this.setState({
        dataSource: ds.cloneWithRows(items),
        totalIncome: totalIncome,
        totalExpense: totalExpense
      });

    });
  }

  renderRow(rowData) {
    var year = rowData.date.split('-')[0]
    var week = rowData.date.split('-')[1]
    return (
      <View>
        <View style={ [styles.rowData, styles.greenRow] }>
          <Text style={styles.text}>Week {week}</Text>
          <Text style={styles.text}>${rowData.income}</Text>
        </View>
        <View style={ [styles.rowData, styles.redRow] }>
          <Text style={styles.text}>Week {week}</Text>
          <Text style={styles.text}>${rowData.expense}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.navbar}>
            <TouchableOpacity style={{width: 50, marginLeft: 10}} onPress={this.back}>
              <Text style={styles.navText}>Back</Text>
            </TouchableOpacity>
            <Text style={{ fontFamily: "GillSans-Light", fontWeight: '500', fontSize: 16 }}>History</Text>
            <TouchableOpacity style={{width: 50, marginRight: 10}} ></TouchableOpacity>
          </View>
          <View style={styles.line} />
        </View>
        <ListView
          style={{paddingBottom: 20, marginTop: -20}}
          dataSource={this.state.dataSource}
          renderRow={ this.renderRow.bind(this) }
          enableEmptySections={true} />
        <View style={ styles.bottomRow } >
          <View style={ styles.bottomBlock }>
            <Text style={ styles.greenText }>Income</Text>
            <Text style={ styles.greenText }>${this.state.totalIncome}</Text>
          </View>
          <Text style={styles.text}>All Time</Text>
          <View style={ styles.bottomBlock }>
            <Text style={ styles.redText }>Expenses</Text>
            <Text style={ styles.redText }>$ {this.state.totalExpense}</Text>
          </View>
        </View>
      </View>
    )
  }
}

module.exports = History;