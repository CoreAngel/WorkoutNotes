import { createDrawerNavigator } from 'react-navigation-drawer';
import { Drawer } from '../components/navigation';
import StackNavigator from './StackNavigation';

const DrawerNavigation = createDrawerNavigator(
    {
        StackNavigator
    },
    {
        initialRouteName: 'StackNavigator',
        drawerPosition: 'right',
        contentComponent: Drawer
    }
);

export default DrawerNavigation;
