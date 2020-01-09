import React, { FC } from 'react';
import { createAppContainer } from 'react-navigation';
import mainNavigation from '../../navigation/navigator';
import setTopLevelNavigator from '../../navigation/navigationService';

const NavigationContainer = createAppContainer(mainNavigation);

const Navigation: FC = () => {
    return <NavigationContainer ref={navigatorRef => setTopLevelNavigator(navigatorRef)} />;
};

export default Navigation;
