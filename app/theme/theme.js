const React = require('react-native')
const {StyleSheet} = React

const constants = {
  font: "GillSans-Light",
  border: '#dbdbdb',
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
  btn: {
    backgroundColor: '#fff',
    borderColor: constants.border,
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    width: 150, 
    textAlign: 'center',
    fontFamily: constants.font,
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
  loginInput: {
    height: 45, 
    textAlign: 'center',
    fontFamily: constants.font,
  },
  createAccount: {
    fontFamily: constants.font,
  },
  logo: {
    fontFamily: constants.font,
    paddingBottom: 50,
    paddingLeft: 75,
    paddingRight: 75,
    fontSize: 40,
    textAlign: 'center'
  },
  line: {
    borderColor: constants.border,
    borderWidth: 0.5,
    height: 1,
    width: 200
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
    marginTop: 10,
  },
  navText:{
    fontFamily: constants.font,
    fontWeight: '400',
    fontSize: 16
  },
})

module.exports = styles
module.exports.constants = constants;
