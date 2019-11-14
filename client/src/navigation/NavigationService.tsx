import {NavigationActions, NavigationNavigateActionPayload, NavigationParams} from 'react-navigation';
import {DrawerActions} from "react-navigation-drawer";

let _navigator;

const setTopLevelNavigator = (navigatorRef) => {
    _navigator = navigatorRef;
};

const navigate = (path: string, params?: NavigationParams) => {
    const options: NavigationNavigateActionPayload = {
        routeName: path,
        params,
    };

    _navigator.dispatch(NavigationActions.navigate(options));
};


const toggleDrawer = () => {
    _navigator.dispatch(DrawerActions.toggleDrawer())
};

const openDrawer = () => {
    _navigator.dispatch(DrawerActions.openDrawer())
};

const closeDrawer = () => {
    _navigator.dispatch(DrawerActions.closeDrawer())
};

const drawer = {
    open: openDrawer,
    close: closeDrawer,
    toggle: toggleDrawer
};

export default setTopLevelNavigator;

export {
    navigate,
    drawer
};
