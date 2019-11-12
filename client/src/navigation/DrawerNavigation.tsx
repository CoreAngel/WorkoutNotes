import {createDrawerNavigator} from "react-navigation-drawer";
import {Drawer} from "../components/navigation";
import {StackNavigator} from './StackNavigation'

export const DrawerNavigation = createDrawerNavigator({
    StackNavigator: StackNavigator,
}, {
    initialRouteName: 'StackNavigator',
    drawerPosition: "right",
    contentComponent: Drawer,
});
