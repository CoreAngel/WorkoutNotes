import { Animated } from 'react-native';
import { useState, useEffect } from 'react';

type Props = {
    doAnimation: boolean;
    duration: number;
    fromValue: number;
    toValue: number;
    defaultValue: number;
};

const useAnimation = ({ doAnimation, duration, fromValue, toValue, defaultValue }: Props) => {
    const [animation] = useState(new Animated.Value(defaultValue));
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        if (!isAnimated) {
            setIsAnimated(true);

            Animated.timing(animation, {
                toValue: doAnimation ? toValue : fromValue,
                duration
            }).start(() => setIsAnimated(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doAnimation]);

    return {
        animation,
        isAnimated
    };
};

export default useAnimation;
