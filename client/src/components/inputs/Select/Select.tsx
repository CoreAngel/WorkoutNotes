import React, { FC, useState } from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import styled from 'styled-components/native';
import { Colors, DefaultTextFont } from '../../../utils';
import SelectModal from './SelectModal';

export interface SelectItem {
    label: string;
    value: string;
    selected: boolean;
}

interface Props {
    items: SelectItem[];
    onChange: (item: SelectItem) => void;
    arrowColor?: string;
    pickerTextColor?: string;
}

const Select: FC<Props> = ({
    items,
    onChange,
    arrowColor = Colors.GRAY,
    pickerTextColor = Colors.WHITE
}: Props) => {
    const [itemsState, setItemsState] = useState(items);
    const [selectedItem, setSelectedItem] = useState(
        itemsState.filter(item => item.selected).pop()
    );
    const [isModalVisible, setIsModalVisible] = useState(false);

    const changeSelectedItem = item => {
        if (onChange) {
            onChange(item);
        }
        setSelectedItem(item);
    };

    return (
        <View>
            <TouchableNativeFeedback
                onPress={() => {
                    setIsModalVisible(true);
                }}
            >
                <View>
                    <ArrowIcon
                        styles={{
                            arrowColor
                        }}
                    />
                    <TextValue
                        styles={{
                            pickerTextColor
                        }}
                    >
                        {selectedItem.label}
                    </TextValue>
                </View>
            </TouchableNativeFeedback>
            <SelectModal
                isVisible={isModalVisible}
                setIsVisible={setIsModalVisible}
                items={itemsState}
                setItems={setItemsState}
                setSelectedItem={changeSelectedItem}
            />
        </View>
    );
};

interface ArrowIconProps {
    styles: {
        arrowColor: string;
    };
}

const ArrowIcon = styled.View<ArrowIconProps>`
    height: 0;
    width: 0;
    border-top-width: 6px;
    border-left-width: 5px;
    border-right-width: 5px;
    border-bottom-width: 0;
    border-color: transparent;
    border-top-color: ${({ styles }) => styles.arrowColor};
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-3px);
`;

interface TextValueProps {
    styles: {
        pickerTextColor: string;
    };
}

const TextValue = styled(DefaultTextFont)<TextValueProps>`
    color: ${({ styles }) => styles.pickerTextColor};
    padding: 10px 30px 10px 10px;
`;

export default Select;
