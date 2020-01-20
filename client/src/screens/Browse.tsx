import React, { FC } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import Tile from '../components/Tile';
import { RoundedButtonType } from '../components/buttons/RoundedButton';
import {
    navigateToBrowseExercises,
    navigateToBrowseSupersets,
    navigateToBrowsePlans,
    navigateToBrowseWorkouts
} from '../navigation/navigationActions';

const data = [
    {
        id: 1,
        title: 'Exercises',
        button: RoundedButtonType.ARROW,
        onClick: navigateToBrowseExercises
    },
    {
        id: 2,
        title: 'Supersets',
        button: RoundedButtonType.ARROW,
        onClick: navigateToBrowseSupersets
    },
    {
        id: 3,
        title: 'Plans',
        button: RoundedButtonType.ARROW,
        onClick: navigateToBrowsePlans
    },
    {
        id: 4,
        title: 'Workouts',
        button: RoundedButtonType.ARROW,
        onClick: navigateToBrowseWorkouts
    }
];

const Browse: FC = () => {
    const containerStyle = {
        paddingTop: 20,
        paddingBottom: 20
    };

    return (
        <FlatList
            contentContainerStyle={containerStyle}
            data={data}
            renderItem={({ item }) => {
                const { id, onClick, title, button } = item;
                return (
                    <TileContainer key={id}>
                        <Tile
                            title={title}
                            tileType="small"
                            buttonType={button}
                            onClick={onClick}
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

export default Browse;
