import React, { FC, ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Animated, Modal } from 'react-native';
import useAnimation from '../../../hooks/useAnimation';

type Props = {
    visible: boolean;
    close: boolean;
    setVisible: (visible: boolean) => void;
    children: ReactElement;
};

const EditorContainer: FC<Props> = ({ children, visible, setVisible, close }: Props) => {
    const [doAnimation, setDoAnimation] = useState(false);
    const { animation } = useAnimation({
        doAnimation,
        defaultValue: close ? 0 : 1,
        duration: 200,
        fromValue: 0,
        toValue: 1
    });

    const bottomStyle = {
        bottom: animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '-100%']
        })
    };

    useEffect(() => {
        if (close) {
            setVisible(close);
            setTimeout(() => setDoAnimation(!doAnimation), 100);
        } else {
            setDoAnimation(!doAnimation);
            setTimeout(() => setVisible(close), 200);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [close]);

    return (
        <Modal animationType="fade" transparent visible={visible}>
            <Overlay>
                <Container>
                    <ContainerRelative style={bottomStyle}>{children}</ContainerRelative>
                </Container>
            </Overlay>
        </Modal>
    );
};

const Overlay = styled.View`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
    flex: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const ContainerRelative = styled(Animated.View)`
    position: relative;
    width: 100%;
`;

const Container = styled.View`
    position: absolute;
    bottom: 0;
    width: 100%;
`;

export default EditorContainer;
