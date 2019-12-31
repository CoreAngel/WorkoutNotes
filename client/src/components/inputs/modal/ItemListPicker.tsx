import React, { FC } from 'react';
import { FlatList, TouchableNativeFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Colors, DefaultTextFont } from '../../../utils';

export interface PickerItem {
    label: string;
    value: string;
}

interface Props {
    items: PickerItem[];
    onChange: (item: PickerItem) => void;
}

const ItemListSelect: FC<Props> = ({ onChange, items }: Props) => {
    const ItemList = (
        <List>
            <FlatList
                data={items}
                renderItem={({ item }) => {
                    return (
                        <TouchableNativeFeedback
                            onPress={() => {
                                onChange(item);
                            }}
                        >
                            <ItemText>{item.label}</ItemText>
                        </TouchableNativeFeedback>
                    );
                }}
                keyExtractor={item => item.value}
            />
        </List>
    );

    const NoItems = <NoItemsInfo>No items</NoItemsInfo>;

    return items.length > 0 ? ItemList : NoItems;
};

const List = styled.View`
    max-height: 250px;
`;

const ItemText = styled(DefaultTextFont)`
    color: ${Colors.WHITE};
    font-size: 18px;
    padding: 10px 10px;
`;

const NoItemsInfo = styled(DefaultTextFont)`
    color: ${Colors.WHITE};
    font-size: 18px;
    padding: 10px 10px;
`;

export default ItemListSelect;
