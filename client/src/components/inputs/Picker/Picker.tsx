import React, { FC, useState } from 'react';
import { View } from 'react-native';
import PickerModal, { PickerItem } from './PickerModal';
import { AddSmallIcon } from '../../icons';

interface Props {
    items: PickerItem[];
    onChange: (item: PickerItem) => void;
    arrowColor?: string;
    pickerTextColor?: string;
}

const Picker: FC<Props> = ({ items }: Props) => {
    const [itemsState, setItemsState] = useState(items);
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <View>
            <AddSmallIcon
                onClick={() => {
                    setIsModalVisible(true);
                }}
            />
            <PickerModal
                isVisible={isModalVisible}
                setIsVisible={setIsModalVisible}
                items={itemsState}
                setItem={setItemsState}
            />
        </View>
    );
};

export default Picker;
