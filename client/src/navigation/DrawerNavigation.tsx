import {createDrawerNavigator} from "react-navigation-drawer";
import {Drawer} from "../components/navigation";
import {StackNavigator} from './StackNavigation'
import {Colors} from "../utils/colors";

export const DrawerNavigation = createDrawerNavigator({
    StackNavigator: StackNavigator,
}, {
    initialRouteName: 'StackNavigator',
    drawerPosition: "right",
    contentComponent: Drawer,
});
