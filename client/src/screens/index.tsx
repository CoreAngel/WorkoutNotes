import Home from './Home';
import AddExercise from './AddExercise';
import CreateSuperset from './CreateSuperset';
import CreatePlan from './CreatePlan';
import RunPlan from './RunPlan';
import Workout from './Workout';
import SignIn from './SignIn';
import SignUp from './SignUp';

const screen = [AddExercise, CreateSuperset, CreatePlan, RunPlan, Workout, SignIn, SignUp];

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

export { Home, AddExercise, CreateSuperset, CreatePlan, RunPlan, SignUp, SignIn, Workout };
