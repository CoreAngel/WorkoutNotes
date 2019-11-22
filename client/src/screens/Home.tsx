import React, { FC } from 'react';
import { FlatList } from 'react-native';
import { NavigationSwitchProp } from 'react-navigation';
import styled from 'styled-components/native';
import Tile from '../components/Tile';
import { HomeHeader } from '../components/navigation';
import { RoundedButtonType } from '../components/buttons';

interface NavigationOptions {
    navigationOptions: object;
}
type HomeScreen<Props> = FC<Props> & NavigationOptions;

interface Props {
    navigation: NavigationSwitchProp<{ screen: string }>;
}

const data = [
    {
        id: 1,
        title: 'Run plan',
        desc: 'Run the established plan.',
        button: RoundedButtonType.PLAY
    },
    {
        id: 2,
        title: 'Add exercise',
        desc: 'Add exercises to create a plan and supersets.',
        button: RoundedButtonType.ADD
    },
    {
        id: 3,
        title: 'Create superset',
        desc: 'Create superset from exercises.',
        button: RoundedButtonType.ADD
    },
    {
        id: 4,
        title: 'Create plan',
        desc: 'Create plan from exercises and supersets.',
        button: RoundedButtonType.ADD
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
                return (
                    <TileContainer key={item.id}>
                        <Tile
                            title={item.title}
                            desc={item.desc}
                            button={item.button}
                        />
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
