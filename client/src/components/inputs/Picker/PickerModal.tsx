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

export interface PickerItem {
    name: string;
    value: string;
}

interface Props {
    isVisible: boolean;
    setIsVisible: (state: boolean) => void;
    items: PickerItem[];
    setItem: (items: PickerItem[]) => void;
}

const PickerModal: FC<Props> = ({
    isVisible,
    setIsVisible,
    items,
    setItem
}: Props) => {
    const changeSelectedItem = index => {
        const clonedItems = cloneDeep(items);
        const newItems = clonedItems.map(item => {
            return {
                ...item
            };
        });

        setItem([...newItems]);
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
                                        <ItemText>{item.name}</ItemText>
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

const ItemText = styled(DefaultTextFont)`
    color: ${Colors.WHITE};
    font-size: 18px;
    padding: 10px 10px;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
`;

export default PickerModal;
