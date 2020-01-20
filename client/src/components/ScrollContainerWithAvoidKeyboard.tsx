import React, { FC, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../utils/Colors';

type Props = {
    children: ReactNode;
    absoluteChild?: ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
};

const ScrollContainerWithAvoidKeyboard: FC<Props> = ({
    children,
    absoluteChild,
    containerStyle
}: Props) => {
    const propsContainerStyle = ((): object => {
        if (typeof containerStyle === 'object' && containerStyle !== null) {
            return containerStyle;
        }
        return {};
    })();

    const contentContainerStyle = {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 20,
        flexGrow: 1,
        ...propsContainerStyle
    };

    return (
        <OuterContainer>
            <ScrollViewContainer contentContainerStyle={contentContainerStyle}>
                <ContainerInner behavior="padding" enabled>
                    {children}
                </ContainerInner>
                {absoluteChild || null}
            </ScrollViewContainer>
        </OuterContainer>
    );
};

const OuterContainer = styled.View`
    flex: 1;
`;

const ContainerInner = styled.KeyboardAvoidingView`
    background-color: ${Colors.SECONDARY};
    flex: 1;
`;

const ScrollViewContainer = styled.ScrollView`
    flex-grow: 1;
    position: relative;
`;

export default ScrollContainerWithAvoidKeyboard;
