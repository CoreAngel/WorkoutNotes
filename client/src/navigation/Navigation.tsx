import React, { FC } from 'react';
import { createAppContainer } from 'react-navigation';
import DrawerNavigation from './DrawerNavigation';
import setTopLevelNavigator from './NavigationService';

const NavigationContainer = createAppContainer(DrawerNavigation);

const Navigation: FC = () => (
    <NavigationContainer
        ref={navigatorRef => setTopLevelNavigator(navigatorRef)}
    />
);

export default Navigation;
