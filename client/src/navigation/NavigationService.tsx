import {
    NavigationActions,
    NavigationNavigateActionPayload,
    NavigationParams
} from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

let navigator;

const setTopLevelNavigator = navigatorRef => {
    navigator = navigatorRef;
};

const navigate = (path: string, params?: NavigationParams) => {
    const options: NavigationNavigateActionPayload = {
        routeName: path,
        params
    };

    navigator.dispatch(NavigationActions.navigate(options));
};

const toggleDrawer = () => {
    navigator.dispatch(DrawerActions.toggleDrawer());
};

const openDrawer = () => {
    navigator.dispatch(DrawerActions.openDrawer());
};

const closeDrawer = () => {
    navigator.dispatch(DrawerActions.closeDrawer());
};

const drawer = {
    open: openDrawer,
    close: closeDrawer,
    toggle: toggleDrawer
};

export default setTopLevelNavigator;

export { navigate, drawer };
