import {createStackNavigator, StackViewTransitionConfigs, Header} from "react-navigation-stack";
import {SignIn} from "../screens/SignIn";
import {SignUp} from "../screens/SignUp";
import {Home} from "../screens/Home";
import {Colors} from "../utils/Colors";


export const StackNavigator = createStackNavigator({
    Home: Home,
    signIn: SignIn,
    signUp: SignUp,
}, {
    initialRouteName: 'Home',
    transitionConfig: () => StackViewTransitionConfigs.SlideFromRightIOS,
    cardStyle: {
        backgroundColor: Colors.DARK
    },
    defaultNavigationOptions: {
        headerStyle: {
            paddingTop: 0,
            backgroundColor: Colors.SECONDARY,
        },
        headerTintColor: Colors.WHITE,
    }
});

StackNavigator.navigationOptions = ({ navigation }) => {
    let drawerLockMode = 'unlocked';
    if (navigation.state.index > 0) {
        drawerLockMode = 'locked-closed';
    }
    return {
        drawerLockMode,
    };
};
