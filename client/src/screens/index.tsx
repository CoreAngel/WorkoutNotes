import Home from './Home';
import AddExercise from './AddExercise';
import CreateSuperset from './CreateSuperset';
import CreatePlan from './CreatePlan';
import RunPlan from './RunPlan';
import Workout from './Workout';
import Browse from './Browse';
import BrowseExercises from './BrowseExercises';
import BrowseSupersets from './BrowseSupersets';
import SignIn from './SignIn';
import SignUp from './SignUp';
import BrowsePlans from './BrowsePlans';
import BrowseWorkouts from './BrowseWorkouts';

const screen = [
    AddExercise,
    CreateSuperset,
    CreatePlan,
    RunPlan,
    Workout,
    Browse,
    BrowseExercises,
    BrowseSupersets,
    BrowsePlans,
    BrowseWorkouts,
    SignIn,
    SignUp
];

screen.forEach(item => {
    type itemType = typeof item & {
        navigationOptions: (props: {
            navigation: {
                getParam: (text: string) => string;
            };
        }) => void;
    };

    const itemTyped = item as itemType;
    itemTyped.navigationOptions = props => ({
        title: props.navigation.getParam('title')
    });
});

export {
    Home,
    AddExercise,
    CreateSuperset,
    CreatePlan,
    RunPlan,
    SignUp,
    SignIn,
    Workout,
    Browse,
    BrowseExercises,
    BrowseSupersets,
    BrowsePlans,
    BrowseWorkouts
};
