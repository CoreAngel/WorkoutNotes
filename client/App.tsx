import React from "react";
import {View, StyleSheet} from 'react-native'
import {createSwitchNavigator, createAppContainer} from "react-navigation";


import {SignIn, SignUp} from './src/screens';


const AppNavigator = createSwitchNavigator({
  signIn: SignIn,
  signUp: SignUp,
}, {
  // mode: 'card',
  // headerMode: 'none',
});

const AppContainer = createAppContainer(AppNavigator);

export default () => {

  return (
      <View style={styles.container}>
        <View style={styles.menuBar}/>
        <AppContainer/>
      </View>
  )
};

const styles = StyleSheet.create({
  menuBar: {
    height: 25,
    backgroundColor: '#c8c8c8',
  },
  container: {
    flex: 1,
  }
});
