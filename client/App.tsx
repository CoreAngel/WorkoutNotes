import React from "react";
import {StyleSheet, View} from 'react-native'
import {createAppContainer, createSwitchNavigator} from "react-navigation";


import {SignIn} from './src/screens/SignIn';
import {SignUp} from './src/screens/SignUp';
import {RoundedButtonType, RoundedButton} from "./src/components/buttons";


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
        <RoundedButton type={RoundedButtonType.PLAY}/>
        <RoundedButton type={RoundedButtonType.ADD}/>
        <RoundedButton type={RoundedButtonType.ARROW}/>
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
