'use strict';

import React, { Component } from 'react';
import ReactNative from 'react-native';
const styles = require('../theme/theme.js');
const flex = require('../theme/flex.js');
import toDo from './toDo.js';
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
      this.state = {email: '', password:''};
  }

  createAccount = () => {
    var state = this;
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function() {
      // Create Account successful.
      state.props.navigator.push({title: "To Do", component: toDo });
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
      state.props.navigator.push({title: "To Do", component: toDo });
    }, function(error) {
      // An error happened.
      var errorMessage = error.message;
      AlertIOS.alert(errorMessage)
    });
  }

  render() {
    return (
      <View style={ flex.flex }>
          <TextInput 
            placeholder="email" 
            ref="username" 
            onChangeText={(email)=>this.setState({email})} 
            value={this.state.email}
            style={{height: 50, textAlign: 'center', marginTop: 50 }}/>
          <TextInput 
            placeholder="password" 
            ref="password"
            onChangeText={(password)=>this.setState({password})} 
            value={this.state.password}
            style={{height: 50, textAlign: 'center', marginBottom: 50}} />
        <TouchableHighlight onPress={this.login}>
          <Text style={styles.btn}>Login</Text>
        </TouchableHighlight>
        <Text style={{marginTop: 10, marginBottom: 10}}>OR</Text>
        <TouchableHighlight onPress={this.createAccount}>
          <Text style={styles.btn}>Create Account</Text>
        </TouchableHighlight>
      </View>
    )
  }

}

module.exports = login;