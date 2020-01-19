import React, { FC } from 'react';
import styled from 'styled-components/native';
import { DefaultText } from '../DefaultText';
import Colors from '../../utils/Colors';

const WorkoutExerciseItemHeader: FC = () => {
    return (
        <Container>
            <SetContainer>Set</SetContainer>
            <ResultContainer>Goal</ResultContainer>
            <ResultContainer>Achieved</ResultContainer>
        </Container>
    );
};

const Container = styled.View`
    flex-direction: row;
    margin: 2px 0;
    width: 100%;
`;

const SetContainer = styled(DefaultText)`
    width: 30px;
    margin-right: 10px;
    color: ${Colors.WHITE70};
    text-align: center;
`;

const ResultContainer = styled(DefaultText)`
    width: 110px;
    color: ${Colors.WHITE70};
    text-align: center;
`;

export default WorkoutExerciseItemHeader;
