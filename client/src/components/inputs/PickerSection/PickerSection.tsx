import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { AddSmallIcon } from '../../icons';
import Modal from '../Modal';
import ItemListPickerSection, { PickerSectionItem } from './ItemListPickerSection';

type Props = {
    items: PickerSectionItem[];
};

const Select: FC<Props> = ({ items }: Props) => {
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <AddSmallIcon onClick={() => setModalVisible(true)} />
            <Modal isVisible={isModalVisible} setIsVisible={setModalVisible}>
                <ItemListPickerSection items={items} setVisible={setModalVisible} />
            </Modal>
        </View>
    );
};

export default Select;
