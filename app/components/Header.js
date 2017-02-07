'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../theme/theme.js')

const { 
  Text, 
  View, 
  TouchableOpacity
} = ReactNative;

class Header extends Component {
  constructor(props) {
      super(props);
      this.state = {};
  }

  render() {
    return (
        <View style={styles.header}>
          <View style={styles.navbar}>
            <TouchableOpacity style={{width: 50, marginLeft: 10}} onPress={this.props.addItem}>
              <Text>Add +</Text>
            </TouchableOpacity>
            <Text>{this.props.title}</Text>
            <TouchableOpacity style={{width: 50, marginRight: 10}}></TouchableOpacity>
          </View>
        </View>
    );
  }
}

module.exports = Header;