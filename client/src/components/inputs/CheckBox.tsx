import React, { FC, useState } from 'react';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components/native';
import Svg, { Path } from 'react-native-svg';
import { Colors, DefaultAnimatedTextFont, useAnimation } from '../../utils';

enum CheckBoxState {
    UNCHECKED = 0,
    CHECKED = 1
}

type Props = {
    onChange: (status: boolean) => void;
    label: string;
    defaultValue: boolean;
    size?: number;
    borderSize?: number;
    inactiveBorderColor?: string;
    activeBorderColor?: string;
    inactiveLabelColor?: string;
    activeLabelColor?: string;
    fillColor?: string;
    animationDuration?: number;
};

const CheckBox: FC<Props> = ({
    onChange,
    label,
    defaultValue,
    size = 20,
    borderSize = 2,
    inactiveBorderColor = Colors.PRIMARY70,
    activeBorderColor = Colors.PRIMARY,
    inactiveLabelColor = Colors.WHITE70,
    activeLabelColor = Colors.WHITE,
    fillColor = Colors.PRIMARY,
    animationDuration = 100
}: Props) => {
    const [value, setValue] = useState(defaultValue);
    const { animation, isAnimated } = useAnimation({
        doAnimation: value,
        duration: animationDuration,
        fromValue: CheckBoxState.UNCHECKED,
        toValue: CheckBoxState.CHECKED,
        defaultValue: defaultValue
            ? CheckBoxState.CHECKED
            : CheckBoxState.UNCHECKED
    });

    const styleBorder = {
        borderColor: animation.interpolate({
            inputRange: [CheckBoxState.UNCHECKED, CheckBoxState.CHECKED],
            outputRange: [inactiveBorderColor, activeBorderColor]
        })
    };
    const styleBG = { opacity: animation };

    const labelFontSize = {
        color: animation.interpolate({
            inputRange: [CheckBoxState.UNCHECKED, CheckBoxState.CHECKED],
            outputRange: [inactiveLabelColor, activeLabelColor]
        })
    };

    return (
        <Container>
            <TouchableWithoutFeedback
                onPress={() => {
                    if (isAnimated) return;
                    setValue(!value);
                    onChange(!value);
                }}
            >
                <View>
                    <CheckBoxBorder
                        size={size}
                        borderSize={borderSize}
                        style={styleBorder}
                    />
                    <CheckBoxBG
                        size={size}
                        borderSize={borderSize}
                        activeBorderColor={activeBorderColor}
                        fillColor={fillColor}
                        style={styleBG}
                    />
                    <SvgContainer>
                        <Svg width={size} height={size} viewBox="0 0 25 25">
                            <Path
                                d="M3.421,7.854l-1.4,1.4,5.06,4.706,8.885-8.619L14.6,3.988l-7.638,7.33Z"
                                transform="translate(3.5 4)"
                                fill={Colors.SECONDARY}
                            />
                        </Svg>
                    </SvgContainer>
                </View>
            </TouchableWithoutFeedback>
            <Label style={labelFontSize}>{label}</Label>
        </Container>
    );
};

const Container = styled.View`
    flex-direction: row;
    align-content: center;
`;

const SvgContainer = styled.View`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`;

const Label = styled(DefaultAnimatedTextFont)`
    margin-left: 20px;
    margin-top: auto;
    margin-bottom: auto;
`;

type CheckBoxBorderProps = {
    size: number;
    borderSize: number;
};

const CheckBoxBorder = styled(Animated.View)<CheckBoxBorderProps>`
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    border-width: ${({ borderSize }) => borderSize}px;
    border-radius: ${({ size }) => size / 8}px;
`;

type CheckBoxBGProps = {
    size: number;
    borderSize: number;
    activeBorderColor: string;
    fillColor: string;
};

const CheckBoxBG = styled(Animated.View)<CheckBoxBGProps>`
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    background-color: ${({ fillColor }) => fillColor};
    border-radius: ${({ size }) => size / 8};
    border-width: ${({ borderSize }) => borderSize};
    border-color: ${({ activeBorderColor }) => activeBorderColor};
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`;

export default CheckBox;
