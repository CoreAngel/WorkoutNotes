import React, {FC, useEffect, useState} from "react";
import {Picker, TouchableNativeFeedback, View} from 'react-native'
import styled from "styled-components/native";
import {Colors} from "../../../utils/Colors";
import {SelectModal} from "./SelectModal";

interface Props {
    items: {label: string, value: string, selected: boolean}[]
    onChange: (index: number) => void
    arrowColor?: string
    pickerTextColor?: string
}

export const Select: FC<Props> = ({
    items,
    onChange,
    arrowColor = Colors.GRAY,
    pickerTextColor = Colors.WHITE
}) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(items.findIndex((item => item.selected)));
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        onChange && onChange(selectedItemIndex)
    }, [selectedItemIndex]);

    const TextValue = textValue(pickerTextColor);
    const ArrowIcon = arrowIcon(arrowColor);

    return (
        <View>
            <TouchableNativeFeedback onPress={() => {
                setIsModalVisible(true)
            }}>
                <View>
                    <ArrowIcon/>
                    <TextValue>{items[selectedItemIndex].label}</TextValue>
                </View>
            </TouchableNativeFeedback>
            <SelectModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} setSelectedIndex={setSelectedItemIndex} items={items}/>
        </View>
    );
};

const arrowIcon = (arrowColor) => styled.View`
    height: 0;
    width: 0;
    border-top-width: 6px;
    border-left-width: 5px;
    border-right-width: 5px;
    border-bottom-width: 0;
    border-color: transparent;
    border-top-color: ${arrowColor};
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-3px);
`;

const textValue = (pickerTextColor) => styled.Text`
  color: ${pickerTextColor};
  padding: 10px 30px 10px 10px;
`;
