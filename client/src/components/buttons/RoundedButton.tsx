import React, { FC } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../../utils';
import { ArrowIcon, AddIcon, PlayIcon } from '../icons';

export enum RoundedButtonType {
    ARROW,
    ADD,
    PLAY
}

type Props = {
    type: RoundedButtonType;
    size?: string;
};

export const RoundedButton: FC<Props> = ({ type, size = '56px' }: Props) => {
    return (
        <View>
            <TouchableButton size={size} activeOpacity={0.7}>
                {type === RoundedButtonType.ARROW && <ArrowIcon />}
                {type === RoundedButtonType.ADD && <AddIcon />}
                {type === RoundedButtonType.PLAY && <PlayIcon />}
            </TouchableButton>
        </View>
    );
};

type TouchableButtonProps = {
    size: string;
};

const TouchableButton = styled.TouchableOpacity<TouchableButtonProps>`
    background-color: ${Colors.PRIMARY};
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    border-radius: 9999px;
    padding: 20px;
`;
