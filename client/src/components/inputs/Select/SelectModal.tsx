import React, { FC } from 'react';
import styled from 'styled-components/native';
import {
    Dimensions,
    FlatList,
    Modal,
    TouchableNativeFeedback
} from 'react-native';
import { cloneDeep } from 'lodash';
import { Colors, DefaultTextFont } from '../../../utils';
import { Button } from '../../buttons';

interface SelectItem {
    label: string;
    value: string;
    selected: boolean;
}

interface Props {
    isVisible: boolean;
    setIsVisible: (state: boolean) => void;
    items: SelectItem[];
    setItems: (items: SelectItem[]) => void;
    setSelectedItem: (item: SelectItem) => void;
}

const SelectModal: FC<Props> = ({
    isVisible,
    setIsVisible,
    items,
    setItems,
    setSelectedItem
}: Props) => {
    const changeSelectedItem = index => {
        const clonedItems = cloneDeep(items);
        const newItems = clonedItems.map(item => {
            return {
                ...item,
                selected: false
            };
        });
        newItems[index].selected = true;
        const selectedItem = newItems[index];

        setItems([...newItems]);
        setSelectedItem({ ...selectedItem });
    };

    return (
        <Modal animationType="fade" transparent visible={isVisible}>
            <Container>
                <Window>
                    <List>
                        <FlatList
                            data={items}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableNativeFeedback
                                        onPress={() => {
                                            changeSelectedItem(index);
                                            setIsVisible(false);
                                        }}
                                    >
                                        <ItemText
                                            styles={{
                                                selected: item.selected
                                            }}
                                        >
                                            {item.label}
                                        </ItemText>
                                    </TouchableNativeFeedback>
                                );
                            }}
                            keyExtractor={item => item.value}
                        />
                    </List>
                    <ButtonContainer>
                        <Button
                            onClick={() => setIsVisible(false)}
                            label="Cancel"
                            color={Colors.RED}
                        />
                    </ButtonContainer>
                </Window>
            </Container>
        </Modal>
    );
};

const Container = styled.View`
    background-color: rgba(0, 0, 0, 0.6);
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const List = styled.View`
    max-height: 250px;
`;

const Window = styled.View`
    background-color: ${Colors.SECONDARY};
    padding: 20px;
    width: 100%;
    max-width: ${3 * (Dimensions.get('window').width / 4)};
`;

interface ItemTextProps {
    styles: {
        selected: boolean;
    };
}

const ItemText = styled(DefaultTextFont)<ItemTextProps>`
    color: ${({ styles }) => (styles.selected ? Colors.WHITE : Colors.WHITE70)};
    font-size: 18px;
    padding: 10px 10px;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
`;

export default SelectModal;
