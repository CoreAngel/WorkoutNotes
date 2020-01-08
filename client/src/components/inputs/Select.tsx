import React, { FC, useState } from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { cloneDeep } from 'lodash';
import styled from 'styled-components/native';
import { Colors, DefaultTextFont } from '../../utils';
import Modal from './modal/Modal';
import ItemListSelect, { SelectItem } from './modal/ItemListSelect';

export { SelectItem };

type Props = {
    items: SelectItem[];
    onChange: (item: SelectItem) => void;
    arrowColor?: string;
    pickerTextColor?: string;
};

const Select: FC<Props> = ({
    items,
    onChange,
    arrowColor = Colors.GRAY,
    pickerTextColor = Colors.WHITE
}: Props) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [itemsState, setItemsState] = useState(items);
    const selectedItem = items.filter(item => item.selected).pop();

    const selectItem = (item: SelectItem) => {
        const copyState = cloneDeep(itemsState);
        copyState.forEach((obj, index) => {
            copyState[index].selected = obj.value === item.value;
        });
        setItemsState(copyState);
        onChange({
            ...item,
            selected: true
        });
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableNativeFeedback
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <View>
                    <ArrowIcon color={arrowColor} />
                    <TextValue color={pickerTextColor}>{selectedItem.label}</TextValue>
                </View>
            </TouchableNativeFeedback>
            <Modal isVisible={isModalVisible} setIsVisible={setModalVisible}>
                <ItemListSelect items={itemsState} onChange={selectItem} />
            </Modal>
        </View>
    );
};

type ArrowIconProps = {
    color: string;
};

const ArrowIcon = styled.View<ArrowIconProps>`
    height: 0;
    width: 0;
    border-top-width: 6px;
    border-left-width: 5px;
    border-right-width: 5px;
    border-bottom-width: 0;
    border-color: transparent;
    border-top-color: ${({ color }) => color};
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-3px);
`;

type TextValueProps = {
    color: string;
};

const TextValue = styled(DefaultTextFont)<TextValueProps>`
    color: ${({ color }) => color};
    padding: 10px 30px 10px 10px;
`;

export default Select;
