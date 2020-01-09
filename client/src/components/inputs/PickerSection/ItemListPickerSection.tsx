import React, { FC, ReactElement } from 'react';
import {
    SectionList,
    SectionListData,
    SectionListRenderItem,
    TouchableNativeFeedback
} from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../utils/Colors';
import { DefaultText } from '../../DefaultText';

export type PickerItem = {
    label: string;
    value: string;
};

export type PickerSectionItem = {
    title: string;
    onClick: (item: PickerItem) => void;
    data: PickerItem[];
};

type Props = {
    items: PickerSectionItem[];
    setVisible: (value: boolean) => void;
};

const ItemListSelect: FC<Props> = ({ items, setVisible }: Props) => {
    type RenderItemParams = {
        item: PickerItem;
        section: SectionListData<PickerItem>;
    };
    const renderItem: SectionListRenderItem<PickerItem> = ({ item, section }: RenderItemParams) => {
        const sectionPicker = section as PickerSectionItem;
        return (
            <TouchableNativeFeedback
                onPress={() => {
                    setVisible(false);
                    sectionPicker.onClick(item);
                }}
            >
                <ItemText>{item.label}</ItemText>
            </TouchableNativeFeedback>
        );
    };

    type SectionParams = { section: SectionListData<PickerItem> };
    type RenderSectionType = (info: {
        section: SectionListData<PickerItem>;
    }) => ReactElement | null;
    const renderSection: RenderSectionType = ({ section }: SectionParams) => {
        const sectionPicker = section as PickerSectionItem;
        return <SectionText>{sectionPicker.title}</SectionText>;
    };

    const SectionListPicker = SectionList as SectionList<PickerItem>;
    const itemList = (
        <List>
            <SectionListPicker
                sections={items}
                renderItem={renderItem}
                renderSectionHeader={renderSection}
                keyExtractor={item => item.value}
            />
        </List>
    );

    const noItems = <NoItemsInfo>No items</NoItemsInfo>;

    return items.length > 0 ? itemList : noItems;
};

const List = styled.View`
    max-height: 250px;
`;

const ItemText = styled(DefaultText)`
    color: ${Colors.WHITE};
    font-size: 18px;
    padding: 10px 10px;
`;

const SectionText = styled(DefaultText)`
    color: ${Colors.WHITE70};
    font-size: 16px;
    padding: 5px 5px;
    margin: 5px 5px;
    border-bottom-color: ${Colors.PRIMARY};
    border-bottom-width: 1px;
`;

const NoItemsInfo = styled(DefaultText)`
    color: ${Colors.WHITE};
    font-size: 18px;
    padding: 10px 10px;
`;

export default ItemListSelect;
