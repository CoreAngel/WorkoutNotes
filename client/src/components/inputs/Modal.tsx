import React, { FC, ReactNode } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Modal as ReactModal } from 'react-native';
import Colors from '../../utils/Colors';
import Button from '../buttons/Button';

type Props = {
    isVisible: boolean;
    setIsVisible: (state: boolean) => void;
    children: ReactNode;
};

const Modal: FC<Props> = ({ isVisible, setIsVisible, children }: Props) => {
    return (
        <ReactModal animationType="fade" transparent visible={isVisible}>
            <Container>
                <Window>
                    {children}
                    <ButtonContainer>
                        <Button
                            onClick={() => setIsVisible(false)}
                            label="Cancel"
                            color={Colors.RED}
                        />
                    </ButtonContainer>
                </Window>
            </Container>
        </ReactModal>
    );
};

const Container = styled.View`
    background-color: rgba(0, 0, 0, 0.6);
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Window = styled.View`
    background-color: ${Colors.SECONDARY};
    padding: 20px;
    width: 100%;
    max-width: ${3 * (Dimensions.get('window').width / 4)};
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
`;

export default Modal;
