import {createStackNavigator, StackViewTransitionConfigs, Header} from "react-navigation-stack";
import Constants from 'expo-constants'
import {SignIn} from "../screens/SignIn";
import {SignUp} from "../screens/SignUp";
import {Colors} from "../utils/colors";
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';


export const StackNavigator = createStackNavigator({
    signIn: SignIn,
    signUp: SignUp,
}, {
    initialRouteName: 'signIn',
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
