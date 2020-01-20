import React, { FC } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import Tile from '../components/Tile';
import { RoundedButtonType } from '../components/buttons/RoundedButton';
import { navigateToAddExercise } from '../navigation/navigationActions';
import { Store } from '../redux/store';
import { Exercise } from '../redux/exercise/types';

type Props = {
    exercises: Exercise[];
};

const BrowseExercises: FC<Props> = ({ exercises }: Props) => {
    const containerStyle = {
        paddingTop: 20,
        paddingBottom: 20
    };

    const data = exercises.sort((i1, i2) => i1.id - i2.id);

    return (
        <FlatList
            contentContainerStyle={containerStyle}
            data={data}
            renderItem={({ item }) => {
                const { id, name, desc } = item;
                return (
                    <TileContainer key={id}>
                        <Tile
                            title={name}
                            desc={desc}
                            buttonType={RoundedButtonType.ARROW}
                            onClick={() => navigateToAddExercise(item)}
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

const mapStateToProps = (state: Store) => {
    const { exercise } = state;
    return {
        exercises: exercise.exercises
    };
};

export default connect(mapStateToProps)(BrowseExercises);
