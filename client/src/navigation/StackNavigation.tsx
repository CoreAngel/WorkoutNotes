import {
    createStackNavigator,
    StackViewTransitionConfigs
} from 'react-navigation-stack';
import { Home, AddExercise, SignUp, SignIn, CreateSuperset } from '../screens';
import { Colors } from '../utils';

const StackNavigator = createStackNavigator(
    {
        Home,
        AddExercise,
        CreateSuperset,
        signIn: SignIn,
        signUp: SignUp
    },
    {
        initialRouteName: 'AddExercise',
        transitionConfig: () => StackViewTransitionConfigs.SlideFromRightIOS,
        cardStyle: {
            backgroundColor: Colors.DARK
        },
        defaultNavigationOptions: {
            headerStyle: {
                paddingTop: 0,
                backgroundColor: Colors.SECONDARY
            },
            headerTintColor: Colors.WHITE
        }
    }
);

StackNavigator.navigationOptions = ({ navigation }) => {
    let drawerLockMode = 'unlocked';
    if (navigation.state.index > 0) {
        drawerLockMode = 'locked-closed';
    }
    return {
        drawerLockMode
    };
};

export default StackNavigator;
