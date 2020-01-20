import React, { FC } from 'react';
import { FlatList } from 'react-native';
import { NavigationSwitchProp } from 'react-navigation';
import styled from 'styled-components/native';
import Tile from '../components/Tile';
import HomeHeader from '../components/navigation/HomeHeader';
import { RoundedButtonType } from '../components/buttons/RoundedButton';
import {
    navigateToRunPlan,
    navigateToAddExercise,
    navigateToCreatePlan,
    navigateToCreateSuperset,
    navigateToBrowse
} from '../navigation/navigationActions';

type HomeScreen<Props> = FC<Props> & {
    navigationOptions: object;
};

type Props = {
    navigation: NavigationSwitchProp<{ screen: string }>;
};

const data = [
    {
        id: 1,
        title: 'Run plan',
        desc: 'Run the established plan.',
        button: RoundedButtonType.PLAY,
        onClick: navigateToRunPlan
    },
    {
        id: 2,
        title: 'Add exercise',
        desc: 'Add exercises to create a plan and supersets.',
        button: RoundedButtonType.ADD,
        onClick: () => navigateToAddExercise(null)
    },
    {
        id: 3,
        title: 'Create superset',
        desc: 'Create superset from exercises.',
        button: RoundedButtonType.ADD,
        onClick: () => navigateToCreateSuperset(null)
    },
    {
        id: 4,
        title: 'Create plan',
        desc: 'Create plan from exercises and supersets.',
        button: RoundedButtonType.ADD,
        onClick: () => navigateToCreatePlan(null)
    },
    {
        id: 5,
        title: 'Browse',
        desc: 'Browse exercises, supersets, plan and workouts',
        button: RoundedButtonType.ARROW,
        onClick: () => navigateToBrowse()
    }
];

const Home: HomeScreen<Props> = () => {
    const containerStyle = {
        paddingTop: 20,
        paddingBottom: 20
    };

    return (
        <FlatList
            contentContainerStyle={containerStyle}
            data={data}
            renderItem={({ item }) => {
                const { id, onClick, desc, title, button } = item;
                return (
                    <TileContainer key={id}>
                        <Tile title={title} desc={desc} buttonType={button} onClick={onClick} />
                    </TileContainer>
                );
            }}
            keyExtractor={item => item.id.toString()}
        />
    );
};

Home.navigationOptions = {
    header: HomeHeader
};

const TileContainer = styled.View`
    margin: 10px 20px;
`;

export default Home;
