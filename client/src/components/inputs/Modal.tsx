import React, { FC } from 'react';
import styled from 'styled-components/native';
import {
    Dimensions,
    FlatList,
    Modal as ReactModal,
    TouchableNativeFeedback
} from 'react-native';
import { Colors, DefaultTextFont } from '../../utils';
import { Button } from '../buttons';

export interface SelectItem {
    label: string;
    value: string;
    selected?: boolean;
}

interface Props {
    isVisible: boolean;
    setIsVisible: (state: boolean) => void;
    items: SelectItem[];
    setSelectedItem: (value: string) => void;
}

const Modal: FC<Props> = ({
    isVisible,
    setIsVisible,
    items,
    setSelectedItem
}: Props) => {
    const itemsList = (
        <List>
            <FlatList
                data={items}
                renderItem={({ item }) => {
                    return (
                        <TouchableNativeFeedback
                            onPress={() => {
                                setSelectedItem(item.value);
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
    );

    const noItemInfo = <NoItemsInfo>No items</NoItemsInfo>;

    return (
        <ReactModal animationType="fade" transparent visible={isVisible}>
            <Container>
                <Window>
                    {items.length > 0 ? itemsList : noItemInfo}
                    <ButtonContainer>
                        <Button
                            onClick={() => setIsVisible(false)}
                            label="Cancel"
                            color={Colors.RED}
                        />
                    </ButtonContainer>
                </Window>
            </Container>
        </ReactModal>
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
    color: ${({ styles }) =>
        styles.selected || styles.selected === undefined
            ? Colors.WHITE
            : Colors.WHITE70};
    font-size: 18px;
    padding: 10px 10px;
`;

const NoItemsInfo = styled(DefaultTextFont)`
    color: ${Colors.WHITE};
    font-size: 18px;
    padding: 10px 10px;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
`;

export default Modal;
