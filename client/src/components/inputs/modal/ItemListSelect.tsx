import React, { FC } from 'react';
import { FlatList, TouchableNativeFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Colors, DefaultTextFont } from '../../../utils';

export type SelectItem = {
    label: string;
    value: string;
    selected: boolean;
};

type Props = {
    items: SelectItem[];
    onChange: (item: SelectItem) => void;
};

const ItemListSelect: FC<Props> = ({ items, onChange }: Props) => {
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
                            <ItemText selected={item.selected}>
                                {item.label}
                            </ItemText>
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

interface ItemTextProps {
    selected: boolean;
}

const ItemText = styled(DefaultTextFont)<ItemTextProps>`
    color: ${({ selected }) => (selected ? Colors.WHITE : Colors.WHITE70)};
    font-size: 18px;
    padding: 10px 10px;
`;

const NoItemsInfo = styled(DefaultTextFont)`
    color: ${Colors.WHITE};
    font-size: 18px;
    padding: 10px 10px;
`;

export default ItemListSelect;
