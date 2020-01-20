import { useState, useEffect } from 'react';

const useDebounce = (value: any, timeout: number) => {
    const [state, setState] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setState(value), timeout);

        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return state;
};

export default useDebounce;
