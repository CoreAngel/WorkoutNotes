import React, { FC, ReactElement } from 'react';
import { SectionList, SectionListData, SectionListRenderItem } from 'react-native';
import styled from 'styled-components/native';
import { batch, connect } from 'react-redux';
import { DefaultText } from '../components/DefaultText';
import Colors from '../utils/Colors';
import { Store } from '../redux/store';
import { Plan } from '../redux/plan/types';
import { RoundedButtonType } from '../components/buttons/RoundedButton';
import Tile from '../components/Tile';
import { Workout } from '../redux/workout/types';
import { navigateToWorkout } from '../navigation/navigationActions';
import { addWorkout, setWorkoutActive, modifyWorkout } from '../redux/workout/workoutActions';
import {
    addWorkoutExerciseAction,
    multiAddWorkoutExerciseAction
} from '../redux/exercise/exerciseActions';
import { getExercisesAndWorkoutFromPlan } from '../selectors';

type RenderItem = {
    id: number;
    name: string;
    desc: string;
};

type SectionListItems = {
    title: string;
    onClick: (id: number) => void;
    icon: RoundedButtonType;
    data: RenderItem[];
};

type Props = {
    plans: Plan[];
    workouts: Workout[];
    addWorkoutAction: typeof addWorkout;
    setWorkoutActiveAction: typeof setWorkoutActive;
    addWorkoutExercise: typeof addWorkoutExerciseAction;
    multiAddWorkoutExercise: typeof multiAddWorkoutExerciseAction;
    modifyWorkoutAction: typeof modifyWorkout;
};

const RunPlan: FC<Props> = ({
    plans,
    workouts,
    addWorkoutAction,
    setWorkoutActiveAction,
    multiAddWorkoutExercise
}: Props) => {
    const dataPlans = plans.sort((p1, p2) => p1.id - p2.id);

    const runWorkout = (workoutId: number) => {
        const workout = workouts.find(item => item.id === workoutId);
        setWorkoutActiveAction(workoutId);
        navigateToWorkout(workout);
    };

    const addWorkoutFromPlan = (planId: number): void => {
        if (planId < 0) {
            addWorkoutAction({
                name: 'Empty workout',
                finished: false,
                active: false,
                supersets: [],
                exercises: [],
                date: new Date().toUTCString()
            });
            return;
        }

        const { workout, exercises } = getExercisesAndWorkoutFromPlan(planId);

        batch(() => {
            multiAddWorkoutExercise(exercises);
            addWorkoutAction(workout);
        });
    };

    const items: SectionListItems[] = [];
    if (workouts.length > 0) {
        const data = workouts.map(item => {
            const { id, name, planId } = item;
            const plan = planId != null && plans.find(planItem => planItem.id === planId);

            const itemName = planId != null ? plan.name : name;
            const itemDesc = planId != null ? plan.desc : '';
            return {
                id,
                name: itemName,
                desc: itemDesc
            };
        });
        items.push({
            title: 'Active',
            onClick: runWorkout,
            icon: RoundedButtonType.ARROW,
            data
        });
    }

    const runEmptyPlanItem = {
        id: -1,
        name: 'Add empty workout',
        desc: 'Add an empty workout and add the exercises you want.'
    };

    const planItems = dataPlans.map(item => {
        const { id, name, desc } = item;
        return {
            id,
            name,
            desc
        };
    });
    items.push({
        title: 'Plans',
        onClick: addWorkoutFromPlan,
        icon: RoundedButtonType.ADD,
        data: [runEmptyPlanItem, ...planItems]
    });

    type RenderItemParams = {
        item: RenderItem;
        section: SectionListData<RenderItem>;
    };
    const renderItem: SectionListRenderItem<RenderItem> = ({ item, section }: RenderItemParams) => {
        const sectionList = section as SectionListItems;
        const { id, name, desc } = item;
        return (
            <TileContainer>
                <Tile
                    title={name}
                    desc={desc}
                    tileType="medium"
                    buttonType={sectionList.icon}
                    onClick={() => sectionList.onClick(id)}
                />
            </TileContainer>
        );
    };

    type SectionParams = { section: SectionListData<RenderItem> };
    type RenderSectionType = (info: {
        section: SectionListData<RenderItem>;
    }) => ReactElement | null;
    const renderSection: RenderSectionType = ({ section }: SectionParams) => {
        const sectionPicker = section as SectionListItems;
        return <Header>{sectionPicker.title}</Header>;
    };

    const contentContainerStyle = {
        padding: 20
    };

    return (
        <SectionList
            contentContainerStyle={contentContainerStyle}
            sections={items}
            renderItem={renderItem}
            renderSectionHeader={renderSection}
            keyExtractor={item => item.id}
        />
    );
};

const Header = styled(DefaultText)`
    color: ${Colors.PRIMARY};
    font-weight: bold;
    font-size: 14px;
    margin-top: 30px;
`;

const TileContainer = styled.View`
    padding-top: 10px;
    padding-bottom: 10px;
`;

const mapStateToProps = (store: Store) => {
    const { plan, workout } = store;

    const activeWorkouts = workout.workouts.filter(item => !item.finished);

    return {
        workouts: activeWorkouts,
        plans: plan.plans
    };
};

const mapDispatchToProps = {
    addWorkoutAction: addWorkout,
    setWorkoutActiveAction: setWorkoutActive,
    addWorkoutExercise: addWorkoutExerciseAction,
    multiAddWorkoutExercise: multiAddWorkoutExerciseAction,
    modifyWorkoutAction: modifyWorkout
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RunPlan);
