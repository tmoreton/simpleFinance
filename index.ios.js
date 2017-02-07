/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import login from './app/ios/login';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} from 'react-native';

export default class simpleFinance extends Component {
  render() {
    return (
      <NavigatorIOS 
        navigationBarHidden={true} 
        ref="nav" 
        initialRoute={{title: "Welcome", component: login }} 
        style={{flex: 1}}/>
    );
  }
}

AppRegistry.registerComponent('simpleFinance', () => simpleFinance);