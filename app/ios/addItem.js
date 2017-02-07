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
} from 'react-native';

class AddItem extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.modal, styles.flex}>
        <TouchableOpacity onPress={this.add}>
          <Text>{this.props.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.close}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

module.exports = AddItem;