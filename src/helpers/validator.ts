export const inputValidator = (currencyValue: number, inputValue: number) => {
    if (typeof (currencyValue as string | number) !== "number" || typeof (inputValue as string | number) !== "number") {
        return false;
    }

    const lessTenPerc = +(inputValue * .9).toFixed(2);
    const moreTenPerc = +(inputValue * 1.1).toFixed(2);

    return currencyValue >= lessTenPerc && currencyValue <= moreTenPerc;
};