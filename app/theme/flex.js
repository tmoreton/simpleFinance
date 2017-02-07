const React = require('react-native')
const {StyleSheet} = React

var flex = StyleSheet.create({
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
})

module.exports = flex