import React, { FC } from 'react';
import {
    SectionList,
    SectionListData,
    SectionListRenderItem,
    TouchableNativeFeedback
} from 'react-native';
import styled from 'styled-components/native';
import { Colors, DefaultTextFont } from '../../../utils';

export interface PickerItem {
    label: string;
    value: string;
}

export interface PickerSectionItem {
    title: string;
    onClick: (item: PickerItem) => void;
    data: PickerItem[];
}

interface Props {
    items: PickerSectionItem[];
    setVisible: (value: boolean) => void;
}

const ItemListSelect: FC<Props> = ({ items, setVisible }: Props) => {
    type paramsRender = {
        item: PickerItem;
        section: SectionListData<PickerItem>;
    };
    const renderItem: SectionListRenderItem<PickerItem> = ({
        item,
        section
    }: paramsRender) => {
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

    type paramsSection = { section: SectionListData<PickerItem> };
    type RenderSectionType = (info: {
        section: SectionListData<PickerItem>;
    }) => React.ReactElement | null;
    const renderSection: RenderSectionType = ({ section }: paramsSection) => {
        const sectionPicker = section as PickerSectionItem;
        return <SectionText>{sectionPicker.title}</SectionText>;
    };

    const SectionListPicker = SectionList as SectionList<PickerItem>;
    const ItemList = (
        <List>
            <SectionListPicker
                sections={items}
                renderItem={renderItem}
                renderSectionHeader={renderSection}
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

const SectionText = styled(DefaultTextFont)`
    color: ${Colors.WHITE70};
    font-size: 16px;
    padding: 5px 5px;
    margin: 5px 5px;
    border-bottom-color: ${Colors.PRIMARY};
    border-bottom-width: 1px;
`;

const NoItemsInfo = styled(DefaultTextFont)`
    color: ${Colors.WHITE};
    font-size: 18px;
    padding: 10px 10px;
`;

export default ItemListSelect;
