const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  modal: {
    backgroundColor: '#fff',
  },
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  header: {
    backgroundColor: '#fff',
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    height: 55,
    flexDirection: 'row',
    marginTop: 10
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  btn: {
    backgroundColor: 'transparent',
    borderColor: '#222',
    borderWidth: 1,
    paddingTop: 14,
    paddingBottom: 16,
    width: 150, 
    textAlign: 'center',
  },
})

module.exports = styles
module.exports.constants = constants;
