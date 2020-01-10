import React, { FC, ReactElement } from 'react';
import { SectionList, SectionListData, SectionListRenderItem } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { DefaultText } from '../components/DefaultText';
import Colors from '../utils/Colors';
import { Store } from '../redux/store';
import { Plan } from '../redux/plan/types';
import { RoundedButtonType } from '../components/buttons/RoundedButton';
import Tile from '../components/Tile';

type SectionListItems = {
    title: string;
    onClick: (id: number) => void;
    icon: RoundedButtonType;
    data: Plan[];
};

type Props = {
    plans: Plan[];
};

const RunPlan: FC<Props> = ({ plans }: Props) => {
    const dataPlans = plans.sort((p1, p2) => p1.id - p2.id);
    const dataActive = dataPlans[0];

    const items: SectionListItems[] = [];
    if (dataActive) {
        items.push({
            title: 'Active',
            onClick: () => {},
            icon: RoundedButtonType.ARROW,
            data: [dataActive]
        });
    }
    if (dataPlans.length) {
        items.push({
            title: 'Plans',
            onClick: () => {},
            icon: RoundedButtonType.PLAY,
            data: dataPlans
        });
    }

    type RenderItemParams = {
        item: Plan;
        section: SectionListData<Plan>;
    };
    const renderItem: SectionListRenderItem<Plan> = ({ item, section }: RenderItemParams) => {
        const sectionList = section as SectionListItems;
        const { id, name, desc } = item;
        return (
            <TileContainer>
                <Tile
                    title={name}
                    desc={desc}
                    buttonType={sectionList.icon}
                    onClick={() => sectionList.onClick(id)}
                />
            </TileContainer>
        );
    };

    type SectionParams = { section: SectionListData<Plan> };
    type RenderSectionType = (info: { section: SectionListData<Plan> }) => ReactElement | null;
    const renderSection: RenderSectionType = ({ section }: SectionParams) => {
        const sectionPicker = section as SectionListItems;
        return <Header>{sectionPicker.title}</Header>;
    };

    const contentContainerStyle = {
        padding: 20
    };

    return (
        <SectionList
            contentContainerStyle={contentContainerStyle}
            sections={items}
            renderItem={renderItem}
            renderSectionHeader={renderSection}
            keyExtractor={item => item.id}
        />
    );
};

const Header = styled(DefaultText)`
    color: ${Colors.PRIMARY};
    font-weight: bold;
    font-size: 14px;
    margin-top: 30px;
`;

const TileContainer = styled.View`
    padding-top: 10px;
    padding-bottom: 10px;
`;

const mapStateToProps = (store: Store) => {
    const { plan } = store;

    return {
        plans: plan.plans
    };
};

export default connect(mapStateToProps)(RunPlan);
