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
      amount: this.props.item.amount,
      name: this.props.item.name,
      date: this.props.item.date
    };
    this.income = this.income.bind(this);
    this.expense = this.expense.bind(this);
  }

  close(){
    if (this.props.item.key){
      firebase.database().ref(firebase.auth().currentUser.uid + '/' + this.props.item.key).remove();
    }
    this.props.navigator.pop();
  }

  back(){
    this.props.navigator.pop();
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

  income(){
    var params = {
      date: this.getWeekNumber(),
      type: 'income',
      name: this.state.name.toLowerCase(),
      amount: this.state.amount
    }
    if (this.state.name == '') {
      AlertIOS.alert('Please give name to Income');
    } else if (this.state.amount == '') {
      AlertIOS.alert('Enter Amount');
    } else {
      firebase.database().ref(firebase.auth().currentUser.uid).push(params);
      this.close()
    }
  }

  expense(){
    var params = {
      date: this.getWeekNumber(),
      type: 'expense',
      name: this.state.name.toLowerCase(),
      amount: this.state.amount
    }
    if (this.state.name == '') {
      AlertIOS.alert('Please give name to expense');
    } else if (this.state.amount == '') {
      AlertIOS.alert('Enter Amount');
    } else {
      firebase.database().ref(firebase.auth().currentUser.uid).push(params);
      this.close()
    }
  }

  render() {
    return (
      <View style={styles.flex}>
        <TouchableOpacity style={{position: 'absolute', top:45, right: 10}} onPress={()=>this.back()}>
          <Text style={[styles.text, {fontSize: 35}]}>X</Text>
        </TouchableOpacity>
        <TextInput 
          placeholder="ie. 'Lunch' "
          ref="name" 
          onChangeText={(name)=>this.setState({name})} 
          value={this.state.name}
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
        <TouchableOpacity onPress={()=>this.close()}>
          <Text style={styles.text}>Remove</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

module.exports = AddItem;