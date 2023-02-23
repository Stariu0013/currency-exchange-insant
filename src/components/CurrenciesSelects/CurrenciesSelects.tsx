import React, { ChangeEvent, useState } from "react";
import { Box, SelectChangeEvent } from "@mui/material";
import { CompareArrows } from "@mui/icons-material";

import { useAppSelector } from "../../hooks/app";
import { convertor } from "../../helpers/convertor";

import { CURRENCIES } from "../../types/currencies";

import CurrencySelect from "./CurrencySelect/CurrencySelect";

import { getStyles } from "./getStyles";

const CurrenciesSelects = () => {
    const styles = getStyles();

    const currencies = useAppSelector(state => state.currenciesState.currencies);
    const availableCurrencies = useAppSelector(state => state.currenciesState.availableCurrencies);

    const [fromValue, setFromValue] = useState<number>(0);
    const [toValue, setToValue] = useState<number>(0);

    const [fromCurrency, setFromCurrency] = useState<string>(CURRENCIES.UAH);
    const [toCurrency, setToCurrency] = useState<string>(CURRENCIES.USD);

    const handleChangeFromValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);

        convertor(currencies, value, fromCurrency, toCurrency, setToValue);

        setFromValue(value);
    };
    const handleChangeToValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);

        convertor(currencies, value, fromCurrency, toCurrency, setFromValue);

        setToValue(value);
    };

    const handleChangeFromCurrency = (event: SelectChangeEvent) => {
        const value = event.target.value;

        convertor(currencies, fromValue, value, toCurrency, setToValue);

        setFromCurrency(value);
    };
    const handleChangeToCurrency = (event: SelectChangeEvent) => {
        const value = event.target.value;

        convertor(currencies, toValue, fromCurrency, value, setFromValue);

        setToCurrency(value);
    };

    const swapCurrenciesValues = () => {
        setToValue(() => fromValue);
        setFromValue(() => toValue);

        setFromCurrency(() => toCurrency);
        setToCurrency(() => fromCurrency);
    };

    return (
        <Box sx={styles.exchangeBlock}>
            <CurrencySelect
                inputValue={fromValue}
                selectValue={fromCurrency}
                label={"Change"}
                availableCurrencies={availableCurrencies}
                onChangeInputValue={handleChangeFromValue}
                onChangeSelectValue={handleChangeFromCurrency}
            />

            <Box>
                <CompareArrows sx={styles.icon} onClick={swapCurrenciesValues} />
            </Box>

            <CurrencySelect
                inputValue={toValue}
                selectValue={toCurrency}
                label={"Get"}
                availableCurrencies={availableCurrencies}
                onChangeInputValue={handleChangeToValue}
                onChangeSelectValue={handleChangeToCurrency}
            />
        </Box>
    );
};

export default CurrenciesSelects;