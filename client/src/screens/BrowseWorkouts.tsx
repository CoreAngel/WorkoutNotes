import React, { FC } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import Tile from '../components/Tile';
import { RoundedButtonType } from '../components/buttons/RoundedButton';
import { navigateToWorkout } from '../navigation/navigationActions';
import { Store } from '../redux/store';
import { Plan } from '../redux/plan/types';
import { Workout } from '../redux/workout/types';
import { setWorkoutActive } from '../redux/workout/workoutActions';
import DateFormatter from '../utils/DateFormatter';

type Props = {
    workouts: Workout[];
    plans: Plan[];
    setWorkoutActiveAction: typeof setWorkoutActive;
};

const BrowsePlans: FC<Props> = ({ workouts, plans, setWorkoutActiveAction }: Props) => {
    const containerStyle = {
        paddingTop: 20,
        paddingBottom: 20
    };

    const plansInWorkouts = plans.filter(item => {
        return workouts.some(workItem => workItem.planId === item.id);
    });
    const data = workouts
        .sort((i1, i2) => i2.id - i1.id)
        .map(item => {
            const name =
                item.name != null
                    ? item.name
                    : plansInWorkouts.find(planItem => planItem.id === item.planId).name;

            const { id, date } = item;
            return {
                id,
                name,
                date,
                workout: item
            };
        });

    const navigate = (workout: Workout) => {
        setWorkoutActiveAction(workout.id);
        navigateToWorkout(workout);
    };

    return (
        <FlatList
            contentContainerStyle={containerStyle}
            data={data}
            renderItem={({ item }) => {
                const { id, name, date, workout } = item;
                return (
                    <TileContainer key={id}>
                        <Tile
                            title={name}
                            date={DateFormatter(date)}
                            buttonType={RoundedButtonType.ARROW}
                            onClick={() => navigate(workout)}
                        />
                    </TileContainer>
                );
            }}
            keyExtractor={item => item.id.toString()}
        />
    );
};

const TileContainer = styled.View`
    margin: 10px 20px;
`;

const mapDispatchToProps = {
    setWorkoutActiveAction: setWorkoutActive
};

const mapStateToProps = (state: Store) => {
    const { workout, plan } = state;
    return {
        workouts: workout.workouts.filter(item => item.finished),
        plans: plan.plans
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrowsePlans);
