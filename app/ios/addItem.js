'use strict';

import React, { Component } from 'react';
import ReactNative from 'react-native';
const styles = require('../theme/theme.js');
const firebase = require('../config/firebase');

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AlertIOS,
} from 'react-native';

class AddItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      category: '',
      date: new Date()
    };
    this.income = this.income.bind(this);
    this.expense = this.expense.bind(this);
  }

  getWeekNumber() {
      // Copy date so don't modify original
      var date = new Date();
      var d = new Date();
      d.setHours(0,0,0,0);
      // Set to nearest Thursday: current date + 4 - current day number
      // Make Sunday's day number 7
      d.setDate(d.getDate() + 4 - (d.getDay()||7));
      // Get first day of year
      var yearStart = new Date(d.getFullYear(),0,1);
      // Calculate full weeks to nearest Thursday
      var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
      var day = date.getDay()
      if (day === 0 ) {
        day = 7
      }
      return d.getFullYear() + '-' + weekNo + '-' + day
  }


  income(){
    var params = {
      date: this.getWeekNumber(),
      type: 'income',
      category: this.state.category.toLowerCase(),
      amount: this.state.amount
    }
    if (this.state.category == '') {
      AlertIOS.alert('Please enter Category');
    } else if (this.state.amount == '') {
      AlertIOS.alert('Enter Amount');
    } else {
      firebase.database().ref(firebase.auth().currentUser.uid).push(params);
      this.props.close()
    }
  }

  expense(){
    var params = {
      date: this.getWeekNumber(),
      type: 'expense',
      category: this.state.category.toLowerCase(),
      amount: this.state.amount
    }
    if (this.state.category == '') {
      AlertIOS.alert('Please enter Category');
    } else if (this.state.amount == '') {
      AlertIOS.alert('Enter Amount');
    } else {
      firebase.database().ref(firebase.auth().currentUser.uid).push(params);
      this.props.close()
    }
  }

  render() {
    return (
      <View style={styles.flex}>
        <TextInput 
          placeholder="Category ie. 'Lunch' "
          ref="category" 
          onChangeText={(category)=>this.setState({category})} 
          value={this.state.category}
          style={ styles.input }/>
        <View style={styles.line} />
        <View style={{marginTop: 10, marginBottom: 10}}></View>
        <TextInput 
          placeholder="$12"
          keyboardType="numeric"
          ref="amount" 
          onChangeText={(amount)=>this.setState({amount})} 
          value={this.state.amount}
          style={ styles.input }/>
        <View style={styles.line} />
        <View style={{marginTop: 10, marginBottom: 10}}></View>
        <View style={styles.row}>
          <TouchableOpacity onPress={this.income}>
            <Text style={[ styles.btn, styles.income ]}>+Income</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.expense}>
            <Text style={[ styles.btn, styles.expense ]}>-Expense</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.props.close}>
          <Text style={styles.text}>Close</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

module.exports = AddItem;