import React, {FC} from "react";
import styled from "styled-components/native";
import {Dimensions, FlatList, Modal, TouchableNativeFeedback} from "react-native";
import {Colors} from "../../../utils/Colors";
import {Button} from "../../buttons";

interface Props {
    isVisible: boolean
    setIsVisible: (state: boolean) => void
    setSelectedIndex: (index: number) => void,
    items: {label: string, value: string, selected: boolean}[]
}

export const SelectModal: FC<Props> = ({
    isVisible,
    setIsVisible,
    setSelectedIndex,
    items,
}) => {
    const changeSelectedItem = (index) => {
        items.map(item => item.selected = false);
        items[index].selected = true;
        setSelectedIndex(index)
    };

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible}>
            <Container>
                <Window>
                    <List>
                        <FlatList
                            data={items}
                            renderItem={({item, index}) => {
                                const ItemText = itemText(item.selected);

                                return <TouchableNativeFeedback onPress={() => {
                                    changeSelectedItem(index);
                                    setIsVisible(false);
                                }}>
                                    <ItemText>{item.label}</ItemText>
                                </TouchableNativeFeedback>
                            }}
                            keyExtractor={(item => item.value)}
                        />
                    </List>
                    <ButtonContainer>
                        <Button onClick={() => setIsVisible(false)} label={'Cancel'} color={Colors.RED}/>
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
  max-width: ${3 * (Dimensions.get('window').width/4)};
`;

const itemText = (selected) => styled.Text`
  color: ${selected ? Colors.WHITE : Colors.WHITE70};
  font-size: 18px;
  padding: 10px 10px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
`;
