import { createDrawerNavigator } from 'react-navigation-drawer';
import Drawer from '../../components/navigation/Drawer';
import StackNavigator from './stackNavigator';

const drawerNavigator = createDrawerNavigator(
    {
        StackNavigator
    },
    {
        initialRouteName: 'StackNavigator',
        drawerPosition: 'right',
        contentComponent: Drawer
    }
);

export default drawerNavigator;
