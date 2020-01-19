const dateFormatter = (dateUTC: string): string => {
    const date = new Date(dateUTC);
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${date.getDate()}.${month}.${date.getFullYear()}`;
};

export default dateFormatter;
