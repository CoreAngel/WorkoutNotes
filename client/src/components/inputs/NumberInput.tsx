import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { AddSmallIcon, DeleteIcon } from '../icons';
import Colors from '../../utils/Colors';

type Props = {
    defaultValue: number;
    fixedNumbersAfterDot: number;
    onChange: (number: number) => void;
};

const NumberInput: FC<Props> = ({ fixedNumbersAfterDot, onChange, defaultValue }: Props) => {
    const [numberAsString, setNumberAsString] = useState(
        defaultValue.toFixed(fixedNumbersAfterDot)
    );

    useEffect(() => {
        setNumberAsString(defaultValue.toFixed(fixedNumbersAfterDot));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue]);

    const onChangeText = (text: string) => {
        const regex: RegExp = /[^(0-9).,]/gm;
        const splitedText = text
            .replace(regex, '')
            .replace(',', '.')
            .split('.');

        let numberAsText: string;
        if (splitedText.length > 1) {
            const indexOfEndString = splitedText.length;
            const numbersAfterDots = splitedText
                .slice(1, indexOfEndString)
                .join('')
                .slice(0, fixedNumbersAfterDot);
            const numberBeforeDots = splitedText[0] === '' ? '0' : splitedText[0];
            numberAsText = `${numberBeforeDots}.${numbersAfterDots}`;
        } else {
            numberAsText = splitedText.join('');
        }
        setNumberAsString(numberAsText);
        const number = Number.parseFloat(numberAsString);
        onChange(Number.isNaN(number) ? 0 : number);
    };

    const onEndEditingText = () => {
        const number = Number.parseFloat(numberAsString);
        const numberString = Number.isNaN(number) ? '' : number.toFixed(fixedNumbersAfterDot);
        setNumberAsString(numberString);
        onChange(Number.isNaN(number) ? 0 : number);
    };

    const changeNumberAbout = (number: number) => {
        const parsedNumber = Number.parseFloat(numberAsString === '' ? '0' : numberAsString);
        if (Number.isNaN(parsedNumber)) {
            return;
        }
        const changedNumber = parsedNumber + number;
        const newNumber = changedNumber < 0 ? 0 : changedNumber;
        const numberString = newNumber.toFixed(fixedNumbersAfterDot);
        setNumberAsString(numberString);
        onChange(Number.isNaN(changedNumber) ? 0 : changedNumber);
    };

    return (
        <Container>
            <DeleteIcon onClick={() => changeNumberAbout(-1)} />
            <Input
                keyboardType="numeric"
                onChangeText={onChangeText}
                onEndEditing={() => onEndEditingText()}
                value={numberAsString}
            />
            <AddSmallIcon onClick={() => changeNumberAbout(1)} />
        </Container>
    );
};

const Container = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Input = styled.TextInput`
    border-width: 1px;
    border-color: ${Colors.PRIMARY};
    border-radius: 5px;
    color: ${Colors.WHITE70};
    text-align: center;
    flex: 1;
`;

export default NumberInput;
