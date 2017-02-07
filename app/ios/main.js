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

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

class Main extends Component {

  constructor(props) {

    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      showModal: false
    };
    this.addItem = this.addItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  getItems() {
    firebase.database().ref(firebase.auth().currentUser.uid).on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push(child.val());
      });
      console.log(items)
      this.setState({
        dataSource: ds.cloneWithRows(items)
      });
    });
  }

  renderRow(rowData) {
    return (
      <View style={{ height:60, borderBottomWidth:1, borderBottomColor: '#ddd', flexDirection:'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize:18 }}>${rowData.amount}</Text>
        <Text style={{ fontSize:18 }}>{rowData.category}</Text>
      </View>
    )
  }
  componentWillMount() {
    this.getItems();
  }

  componentWillUpdate() {
    console.log(this.state.dataSource)
  }

  addItem() {
    this.setState({showModal: true});
  }

  closeModal(){
    this.setState({showModal: false});
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Simple Finance" addItem={this.addItem} />
        <ListView
          style={{paddingBottom: 20, marginTop: -20}}
          dataSource={this.state.dataSource}
          renderRow={ this.renderRow } />
        <Modal visible={this.state.showModal}>
          <AddItem close={this.closeModal} title='Add Item' />
        </Modal>
      </View>
    )
  }
}

module.exports = Main;