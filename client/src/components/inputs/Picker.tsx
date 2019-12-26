import React, { FC, useState } from 'react';
import { View } from 'react-native';
import Modal from './Modal';
import { AddSmallIcon } from '../icons';

export interface PickerItem {
    label: string;
    value: string;
}

interface Props {
    items: PickerItem[];
    onSelect: (item: PickerItem) => void;
}

const Select: FC<Props> = ({ items, onSelect }: Props) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const setSelectItem = (value: string) => {
        const selectedItem = items.find(item => item.value === value);
        onSelect(selectedItem);
    };

    return (
        <View>
            <AddSmallIcon onClick={() => setModalVisible(true)} />
            <Modal
                isVisible={isModalVisible}
                setIsVisible={setModalVisible}
                items={items}
                setSelectedItem={setSelectItem}
            />
        </View>
    );
};

export default Select;
