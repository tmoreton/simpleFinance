'use strict';

import React, { Component } from 'react';
import ReactNative from 'react-native';
const styles = require('../theme/theme.js');
import main from './main.js';
const firebase = require('../config/firebase');

import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  NavigatorIOS,
  TextInput,
  AlertIOS,
} from 'react-native';

class login extends Component {
  constructor(props) {
      super(props);
      this.state = {email: 'tmoreton89@gmail.com', password:'Abc123'};
  }

  createAccount = () => {
    var state = this;
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function() {
      // Create Account successful.
      state.props.navigator.push({title: "Simple Finance", component: main });
    }, function(error) {
      // An error happened.
      var errorMessage = error.message;
      AlertIOS.alert(errorMessage)
    });
  }

  login = () => {
    var state = this;
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function() {
      // Login successful.
      state.props.navigator.push({title: "Simple Finance", component: main });
    }, function(error) {
      // An error happened.
      var errorMessage = error.message;
      AlertIOS.alert(errorMessage)
    });
  }

  render() {
    return (
      <View style={ styles.flex }>
        <Text style={styles.logo}>$imple Finance</Text>
        <TextInput 
          placeholder="email" 
          ref="username" 
          onChangeText={(email)=>this.setState({email})} 
          value={this.state.email}
          style={ styles.input }/>
        <View style={styles.line} />
        <TextInput 
          placeholder="password" 
          ref="password"
          secureTextEntry={true}
          onChangeText={(password)=>this.setState({password})} 
          value={this.state.password}
          style={ styles.input } />
        <View style={styles.line} />
        <View style={{marginTop: 10, marginBottom: 10}}></View>
        <TouchableHighlight onPress={this.login}>
          <Text style={styles.btn}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.createAccount}>
          <Text style={styles.text}>Create Account</Text>
        </TouchableHighlight>
      </View>
    )
  }

}

module.exports = login;