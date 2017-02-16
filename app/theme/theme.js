const React = require('react-native')
const {StyleSheet} = React

const constants = {
  font: "GillSans-Light",
  border: '#dbdbdb',
  lightGreen: "#56bd7a"
};

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
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
    margin: 5,
    fontSize: 18
  },
  rowData: {
    height:60, 
    borderBottomWidth:1, 
    borderBottomColor: '#ddd', 
    flexDirection:'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 10
  },
  bottomRow: {
    height:60, 
    borderTopWidth:2, 
    borderTopColor: '#ddd', 
    flexDirection:'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 20
  },
  bottomBlock: {
    alignItems: 'center',
  },
  greenText: {
    color: '#71ceb4',
    fontFamily: constants.font,
    fontWeight: '500',
    fontSize: 18
  },
  redText: {
    color: '#EC6778',
    fontFamily: constants.font,
    fontWeight: '500',
    fontSize: 18
  },
  greenRow: {
    backgroundColor: '#71ceb4',
  },
  redRow: {
    backgroundColor: '#EC6778',
  },
  expense: {
    backgroundColor: '#EC6778',
    borderWidth: 0,
  },
  income: {
    backgroundColor: '#71ceb4',
    borderWidth: 0,
  },
  listview: {
    flex: 1,
  },
  input: {  
    height: 45, 
    fontSize: 18,
    textAlign: 'center',
    fontFamily: constants.font,
  },
  text: {
    fontFamily: constants.font,
    fontSize: 18,
    textAlign: 'center',
  },
  logo: {
    fontFamily: constants.font,
    color: constants.lightGreen,
    fontStyle: 'italic',
    fontWeight: '600',
    paddingLeft: 75,
    paddingRight: 75,
    fontSize: 150,
    textAlign: 'center'
  },
  logoText: {
    fontFamily: constants.font,
    color: constants.lightGreen,
    fontWeight: '400',
    paddingBottom: 30,
    paddingLeft: 75,
    paddingRight: 75,
    fontSize: 30,
    textAlign: 'center'
  },
  line: {
    borderColor: constants.border,
    borderWidth: 0.5,
    height: 1,
    alignSelf: 'stretch',
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
    fontSize: 16
  },
})

module.exports = styles
module.exports.constants = constants;
