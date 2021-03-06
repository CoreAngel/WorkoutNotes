import { createStackNavigator, StackViewTransitionConfigs } from 'react-navigation-stack';
import {
    Home,
    AddExercise,
    SignUp,
    SignIn,
    CreateSuperset,
    CreatePlan,
    RunPlan,
    Workout,
    Browse,
    BrowseExercises,
    BrowseSupersets,
    BrowsePlans,
    BrowseWorkouts
} from '../../screens';
import Colors from '../../utils/Colors';
import {
    EXERCISE,
    HOME,
    PLAN,
    RUN_PLAN,
    SUPERSET,
    WORKOUT,
    SIGN_IN,
    SIGN_UP,
    BROWSE,
    BROWSE_EXERCISES,
    BROWSE_SUPERSETS,
    BROWSE_PLANS,
    BROWSE_WORKOUTS
} from '../routes';

const routes = {};
routes[HOME] = Home;
routes[EXERCISE] = AddExercise;
routes[SUPERSET] = CreateSuperset;
routes[PLAN] = CreatePlan;
routes[RUN_PLAN] = RunPlan;
routes[WORKOUT] = Workout;
routes[BROWSE] = Browse;
routes[BROWSE_EXERCISES] = BrowseExercises;
routes[BROWSE_SUPERSETS] = BrowseSupersets;
routes[BROWSE_PLANS] = BrowsePlans;
routes[BROWSE_WORKOUTS] = BrowseWorkouts;
routes[SIGN_IN] = SignIn;
routes[SIGN_UP] = SignUp;

const stackConfig = {
    initialRouteName: HOME,
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
};

const stackNavigator = createStackNavigator(routes, stackConfig);

stackNavigator.navigationOptions = ({ navigation }) => {
    let drawerLockMode = 'unlocked';
    if (navigation.state.index > 0) {
        drawerLockMode = 'locked-closed';
    }
    return {
        drawerLockMode
    };
};

export default stackNavigator;
