import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { AddSmallIcon } from '../icons';
import Modal from './modal/Modal';
import ItemListPicker, { PickerItem } from './modal/ItemListPicker';

export { PickerItem };

type Props = {
    items: PickerItem[];
    onChange: (item: PickerItem) => void;
};

const Select: FC<Props> = ({ items, onChange }: Props) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const selectItem = (item: PickerItem) => {
        const selectedItem = items.find(it => it.value === item.value);
        onChange(selectedItem);
        setModalVisible(false);
    };

    return (
        <View>
            <AddSmallIcon onClick={() => setModalVisible(true)} />
            <Modal isVisible={isModalVisible} setIsVisible={setModalVisible}>
                <ItemListPicker items={items} onChange={selectItem} />
            </Modal>
        </View>
    );
};

export default Select;
