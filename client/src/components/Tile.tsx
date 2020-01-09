import React, { FC } from 'react';
import styled from 'styled-components/native';
import RoundedButton, { RoundedButtonType } from './buttons/RoundedButton';
import Colors from '../utils/Colors';
import { DefaultText } from './DefaultText';

type Props = {
    title: string;
    desc: string;
    buttonType: RoundedButtonType;
};

const Tile: FC<Props> = ({ title, desc, buttonType }: Props) => {
    return (
        <Container>
            <TextContainer>
                <Title>{title}</Title>
                <Desc>{desc}</Desc>
            </TextContainer>
            <ButtonContainer>
                <RoundedButton type={buttonType} />
            </ButtonContainer>
        </Container>
    );
};

const Container = styled.View`
    background-color: ${Colors.SECONDARY};
    padding: 20px;
    flex-direction: row;
    min-height: 140px;
`;

const TextContainer = styled.View`
    margin-right: auto;
    max-width: 70%;
`;

const Title = styled(DefaultText)`
    color: ${Colors.WHITE};
    font-size: 25px;
`;

const Desc = styled(DefaultText)`
    color: ${Colors.WHITE70};
    font-size: 14px;
    margin-top: 10px;
`;

const ButtonContainer = styled.View`
    flex-direction: column;
    justify-content: flex-end;
`;

export default Tile;
