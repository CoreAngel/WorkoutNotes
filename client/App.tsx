import React, { FC, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { SafeAreaView, SafeAreaViewProps } from 'react-navigation';
import Navigation from './src/navigation/Navigation';
import { Colors } from './src/utils';

interface SafeAreaWithSetStatusBarHeight<SafeAreaViewProps>
    extends React.ComponentClass<SafeAreaViewProps> {
    setStatusBarHeight(height: number): void;
}

if (Platform.OS === 'android') {
    (SafeAreaView as SafeAreaWithSetStatusBarHeight<
        SafeAreaViewProps
    >).setStatusBarHeight(0);
}

const RobotoRegular = require('./assets/fonts/Roboto-Regular.ttf');

const App: FC = () => {
    const [state, setState] = useState({
        isFontLoaded: false
    });

    useEffect(() => {
        Font.loadAsync({
            Roboto: RobotoRegular
        }).then(() => {
            setState({ isFontLoaded: true });
        });
    }, []);

    return (
        state.isFontLoaded && (
            <AppContainer>
                <Navigation />
            </AppContainer>
        )
    );
};

const AppContainer = styled.View`
    flex: 1;
    background-color: ${Colors.SECONDARY};
    padding-top: ${Constants.statusBarHeight};
`;

export default App;
