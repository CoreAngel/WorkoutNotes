import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { AddSmallIcon } from '../icons';
import Modal from './modal/Modal';
import ItemListPickerSection, {
    PickerItem,
    PickerSectionItem
} from './modal/ItemListPickerSection';

export { PickerItem, PickerSectionItem };

interface Props {
    items: PickerSectionItem[];
}

const Select: FC<Props> = ({ items }: Props) => {
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <AddSmallIcon onClick={() => setModalVisible(true)} />
            <Modal isVisible={isModalVisible} setIsVisible={setModalVisible}>
                <ItemListPickerSection
                    items={items}
                    setVisible={setModalVisible}
                />
            </Modal>
        </View>
    );
};

export default Select;
