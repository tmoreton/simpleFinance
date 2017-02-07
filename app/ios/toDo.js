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
} from 'react-native';

class ToDo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      showModal: false
    };
    this.addItem = this.addItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  listenForItems() {
    firebase.database().ref(firebase.auth().currentUser.uid).on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          value: child.val(),
          _key: child.key
        });
      });
      console.log(items)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  componentWillMount() {
    this.listenForItems();
  }

  addItem() {
    this.setState({showModal: true});
  }

  closeModal(){
    this.setState({showModal: false});
  }

  renderItem() {
    return (
      <View>
        <Text>{this.props.value}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Simple Finance" addItem={this.addItem} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>
        <Modal visible={this.state.showModal}>
          <AddItem close={this.closeModal} title='Add Item' />
        </Modal>
      </View>
    )
  }
}

module.exports = ToDo;