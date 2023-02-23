import { CurrencyDescription } from "../store/slices/currenciesSlice";

export const convertor = (currencies: CurrencyDescription[], fromValue: number, fromCurrency: string, toCurrency: string ,callback: (val: number) => void) => {
    const currency = currencies.find(currency => currency.from === fromCurrency && currency.to === toCurrency);

    if (fromCurrency === toCurrency || !currency) {
        return fromValue;
    }

    callback(fromValue * currency.buy);
};