import React, { FC, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { AddSmallIcon } from '../../icons';
import Modal from '../Modal';
import ItemListPicker, { PickerItem } from './ItemListPicker';
import { DefaultText } from '../../DefaultText';
import Colors from '../../../utils/Colors';

type Props = {
    label?: string;
    items: PickerItem[];
    onChange: (item: PickerItem) => void;
};

const Picker: FC<Props> = ({ items, onChange, label }: Props) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const selectItem = (item: PickerItem) => {
        const selectedItem = items.find(it => it.value === item.value);
        onChange(selectedItem);
        setModalVisible(false);
    };

    return (
        <View>
            <Container>
                <AddSmallIcon onClick={() => setModalVisible(true)} />
                {label && <Label>{label}</Label>}
            </Container>
            <Modal isVisible={isModalVisible} setIsVisible={setModalVisible}>
                <ItemListPicker items={items} onChange={selectItem} />
            </Modal>
        </View>
    );
};

const Container = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Label = styled(DefaultText)`
    color: ${Colors.PRIMARY};
    margin-left: 5px;
`;

export default Picker;
