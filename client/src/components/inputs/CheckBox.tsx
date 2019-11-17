import React, {FC, useEffect, useState} from "react";
import {Animated, TouchableWithoutFeedback, View} from 'react-native'
import {Colors} from "../../utils/Colors";
import styled from "styled-components/native";
import Svg, {Path} from "react-native-svg";

enum CheckBoxState {
    UNCHECKED = 0,
    CHECKED = 1
}

interface Props {
    onChange: (status: boolean) => void
    label: string
    size?: number
    borderSize?: number
    inactiveBorderColor?: string
    activeBorderColor?: string
    inactiveLabelColor?: string
    activeLabelColor?: string
    fillColor?: string
    defaultValue?: boolean
    animationDuration?: number
}

export const CheckBox: FC<Props> = ({
    onChange,
    label,
    size = 25,
    borderSize = 2,
    inactiveBorderColor = Colors.PRIMARY70,
    activeBorderColor = Colors.PRIMARY,
    inactiveLabelColor = Colors.WHITE70,
    activeLabelColor = Colors.WHITE,
    fillColor = Colors.PRIMARY,
    defaultValue = false,
    animationDuration = 100,
   }) => {
    const [state, setState] = useState({
        value: defaultValue,
        isAnimated: false,
        animation: new Animated.Value(0)
    });
    const {animation, isAnimated, value} = state;

    useEffect(() => {
        if (value) {
            Animated.timing(animation,
            {
                toValue: CheckBoxState.CHECKED,
                duration: animationDuration,
            }).start(() => setState({
                ...state,
                isAnimated: false
            }))
        } else {
            Animated.timing(animation,
            {
                toValue: CheckBoxState.UNCHECKED,
                duration: animationDuration
            }).start(() => setState({
                ...state,
                isAnimated: false
            }))
        }
    }, [value]);

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

    const CheckBoxBorder = checkBoxBorder(size, borderSize);
    const CheckBoxBG = checkBoxBG(size, fillColor, borderSize, activeBorderColor);

    return (
        <Container>
            <TouchableWithoutFeedback onPress={() => {
                if (isAnimated) return;
                setState({
                    ...state,
                    isAnimated: true,
                    value: !value
                });
                onChange && onChange(!value);
            }}>
                <View>
                    <CheckBoxBorder style={styleBorder}/>
                    <CheckBoxBG style={styleBG}/>
                    <SvgContainer>
                        <Svg width={size} height={size} viewBox="0 0 25 25">
                            <Path d="M3.421,7.854l-1.4,1.4,5.06,4.706,8.885-8.619L14.6,3.988l-7.638,7.33Z" transform="translate(3.5 4)" fill={Colors.SECONDARY}/>
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

const Label = styled(Animated.Text)`
  margin-left: 20px;
  font-size: 16px;
`;

const checkBoxBorder = (size, borderSize) => styled(Animated.View)`
  width: ${size};
  height: ${size};
  border-width: ${borderSize};
  border-radius: ${size/8};
`;

const checkBoxBG = (size, fillColor, borderSize, activeBorderColor) => styled(Animated.View)`
  width: ${size};
  height: ${size};
  background-color: ${fillColor};
  border-radius: ${size/8};
  border-width: ${borderSize};
  border-color: ${activeBorderColor};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
