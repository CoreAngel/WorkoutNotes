import React, { FC } from 'react';
import styled from 'styled-components/native';
import RoundedButton, { RoundedButtonType } from './buttons/RoundedButton';
import Colors from '../utils/Colors';
import { DefaultText } from './DefaultText';

const tileSize = {
    big: 140,
    medium: 120,
    small: 100
};

type Props = {
    title: string;
    desc?: string;
    date?: string;
    tileType?: 'big' | 'medium' | 'small';
    onClick: () => void;
    buttonType: RoundedButtonType;
};

const Tile: FC<Props> = ({ title, desc, date, onClick, buttonType, tileType = 'big' }: Props) => {
    return (
        <Container height={tileSize[tileType]}>
            {date != null && <DateText>{date}</DateText>}
            <TextContainer>
                <Title>{title}</Title>
                {tileType !== 'small' && <Desc>{desc}</Desc>}
            </TextContainer>
            <ButtonContainer>
                <RoundedButton type={buttonType} onClick={onClick} />
            </ButtonContainer>
        </Container>
    );
};

type ContainerType = {
    height: number;
};

const Container = styled.View<ContainerType>`
    background-color: ${Colors.SECONDARY};
    position: relative;
    padding: 20px;
    flex-direction: row;
    min-height: ${({ height }) => height}px;
`;

const DateText = styled(DefaultText)`
    position: absolute;
    top: 0;
    right: 0;
    padding: 20px;
    color: ${Colors.WHITE70};
    font-size: 15px;
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
