import React, { FC, ReactElement } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../../utils';
import { ArrowIcon, AddIcon, PlayIcon } from '../icons';

export enum RoundedButtonType {
    ARROW,
    ADD,
    PLAY
}

interface Props {
    size?: string;
    type: RoundedButtonType;
}

export const RoundedButton: FC<Props> = ({
    size = '56px',
    type
}: Props): ReactElement => {
    const TouchableButton = styled.TouchableOpacity`
        background: ${Colors.PRIMARY};
        width: ${size};
        height: ${size};
        border-radius: 9999px;
        padding: 20px;
    `;

    return (
        <View>
            <TouchableButton activeOpacity={0.7}>
                {type === RoundedButtonType.ARROW && <ArrowIcon />}
                {type === RoundedButtonType.ADD && <AddIcon />}
                {type === RoundedButtonType.PLAY && <PlayIcon />}
            </TouchableButton>
        </View>
    );
};
