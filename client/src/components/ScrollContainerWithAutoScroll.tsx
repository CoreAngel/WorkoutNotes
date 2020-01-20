import React, { FC, ReactNode, useRef, useState } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../utils/Colors';

type ContainerSizeState = {
    width: number;
    height: number;
};

type Props = {
    children: ReactNode;
    absoluteChild?: ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
};

const ScrollContainer: FC<Props> = ({ children, absoluteChild, containerStyle }: Props) => {
    const [containerSize, setContainerSize] = useState<ContainerSizeState>({
        height: 0,
        width: 0
    });
    const scrollContainerRef = useRef<ScrollView>(null);

    const scrollToEndWhenSizeChange = (width: number, height: number): void => {
        if (height > containerSize.height) {
            scrollContainerRef.current.scrollToEnd();
        }
        setContainerSize({
            width,
            height
        });
    };

    const propsContainerStyle = ((): object => {
        if (typeof containerStyle === 'object' && containerStyle !== null) {
            return containerStyle;
        }
        return {};
    })();

    const contentContainerStyle = {
        padding: 20,
        paddingBottom: 70,
        flexGrow: 1,
        ...propsContainerStyle
    };

    return (
        <Container>
            <ScrollViewContainer
                ref={scrollContainerRef}
                onContentSizeChange={scrollToEndWhenSizeChange}
                contentContainerStyle={contentContainerStyle}
            >
                {children}
            </ScrollViewContainer>
            {absoluteChild || null}
        </Container>
    );
};

const Container = styled.View`
    margin: 30px 20px;
    background-color: ${Colors.SECONDARY};
    flex: 1;
`;

const ScrollViewContainer = styled.ScrollView`
    flex-grow: 1;
    position: relative;
`;

export default ScrollContainer;
