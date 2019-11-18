import React, {FC, useEffect, useState} from "react";
import Navigation from './src/navigation'
import styled from 'styled-components/native'
import {Colors} from "./src/utils/Colors";
import Constants from 'expo-constants'
import {SafeAreaView, SafeAreaViewProps} from 'react-navigation';
import {Platform, YellowBox, Text} from "react-native";
import * as Font from 'expo-font';

interface SafeAreaWithSetStatusBarHeight<SafeAreaViewProps> extends React.ComponentClass<SafeAreaViewProps> {
    setStatusBarHeight(height: number): void
}

if (Platform.OS === 'android') {
    (SafeAreaView as SafeAreaWithSetStatusBarHeight<SafeAreaViewProps>).setStatusBarHeight(0);
}

YellowBox.ignoreWarnings(['Require cycle: src\\navigation\\index.tsx']);

const App: FC = () => {
    const [state, setState] = useState({
        isFontLoaded: false,
    });

    useEffect(() => {
        Font.loadAsync({
            'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
        }).then(() => {
            setState({isFontLoaded: true})
        });
    }, []);

    return (
        state.isFontLoaded &&
        <AppContainer>
            <Navigation/>
        </AppContainer>
    )
};

const AppContainer = styled.View`
  flex: 1;
  backgroundColor: ${Colors.SECONDARY};
  padding-top: ${Constants.statusBarHeight};
`;

export default App;
