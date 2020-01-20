import React, { FC } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import Tile from '../components/Tile';
import { RoundedButtonType } from '../components/buttons/RoundedButton';
import { navigateToCreateSuperset } from '../navigation/navigationActions';
import { Store } from '../redux/store';
import { Superset } from '../redux/superset/types';

type Props = {
    supersets: Superset[];
};

const BrowseSupersets: FC<Props> = ({ supersets }: Props) => {
    const containerStyle = {
        paddingTop: 20,
        paddingBottom: 20
    };

    const data = supersets.sort((i1, i2) => i1.id - i2.id);

    return (
        <FlatList
            contentContainerStyle={containerStyle}
            data={data}
            renderItem={({ item }) => {
                const { id, name, desc } = item;
                return (
                    <TileContainer key={id}>
                        <Tile
                            title={name}
                            desc={desc}
                            buttonType={RoundedButtonType.ARROW}
                            onClick={() => navigateToCreateSuperset(item)}
                        />
                    </TileContainer>
                );
            }}
            keyExtractor={item => item.id.toString()}
        />
    );
};

const TileContainer = styled.View`
    margin: 10px 20px;
`;

const mapStateToProps = (state: Store) => {
    const { superset } = state;
    return {
        supersets: superset.supersets
    };
};

export default connect(mapStateToProps)(BrowseSupersets);
