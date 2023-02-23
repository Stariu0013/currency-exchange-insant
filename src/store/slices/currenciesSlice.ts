import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { CURRENCIES } from "../../types/currencies";

interface InitialState {
    currencies: CurrencyDescription[];
    availableCurrencies: CURRENCIES[];
    fetchError: string;
}

const initialState: InitialState = {
    currencies: [],
    availableCurrencies: [],
    fetchError: "",
};

export const fetchCurrencies = createAsyncThunk(
    "currency/fetchAllCurrencies",
    async () => {
        return axios.get("https://currency-exchange-insant-api-production-3ad4.up.railway.app/api/currency/get-all-currencies").then(res => {
            const result = res.data;

            let counter = Number(localStorage.getItem("errorCounter")) || 0;

            localStorage.setItem("errorCounter", String(++counter));

            assertCurrencyApiAnswer(result);

            return result;
        }).catch(err => console.error(err.message));
    },
);

const allCurrenciesKeys: CURRENCIES[] = [CURRENCIES.USD, CURRENCIES.UAH, CURRENCIES.EUR, CURRENCIES.BTC];

export type CurrencyDescription = {
    id: string,
    from: CURRENCIES,
    to: CURRENCIES,
    buy: number,
    sell: number,
    auto?: boolean,
    hidden?: boolean,
};

type CurrencyApiAnswer = {
    currencies: CurrencyDescription[],
    availableCurrencies: CURRENCIES[],
}

function assertCurrencyApiAnswer(apiAnswer: CurrencyApiAnswer | Object | void | null): asserts apiAnswer is CurrencyApiAnswer {
    if (!apiAnswer) {
        console.warn("All currencies API: API result is null");
    }

    const { currencies, availableCurrencies } = apiAnswer as CurrencyApiAnswer;

    if (!Array.isArray(availableCurrencies)) {
        console.warn("All currencies API: availableCurrencies should be array of string");
    }

    if (availableCurrencies.slice().sort().join(",") !== allCurrenciesKeys.slice().sort().join(",")) {
        console.warn("All currencies API: not enough currency information");
    }

    let match = true;

    for (const currencyDescription of currencies) {
        match = !!currencyDescription && typeof currencyDescription === "object"
            && typeof (currencyDescription as CurrencyDescription | { from: any }).from === "string"
            && typeof (currencyDescription as CurrencyDescription | { to: any }).to === "string"
            && typeof (currencyDescription as CurrencyDescription | { buy: any }).buy === "number"
            && typeof (currencyDescription as CurrencyDescription | { sell: any }).sell === "number";

        if (!match) {
            break;
        }
    }

    if (!match) {
        throw new Error("All currencies API: result is invalid");
    }
}

export const counterSlice = createSlice({
    name: "currencies",
    initialState,
    reducers: {
        editCurrency: (state, action) => {
            state.currencies = state.currencies.map(currency => {
                return currency.id === action.payload.id ? action.payload : currency;
            });
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
            const { payload } = action;

            assertCurrencyApiAnswer(payload);

            const { currencies, availableCurrencies } = payload;

            let counter = Number(localStorage.getItem("errorCounter"));

            if (counter === 5) {
                state.fetchError = "Imitating server error";

                localStorage.setItem("errorCounter", String(0));
            }

            for (const currencyDescription of currencies) {
                if ((currencyDescription.from === CURRENCIES.EUR
                        || currencyDescription.from === CURRENCIES.USD
                        || currencyDescription.from === CURRENCIES.BTC)
                    && currencyDescription.to !== CURRENCIES.BTC) {
                    currencyDescription.hidden = true;
                }
            }

            state.currencies = currencies;
            state.availableCurrencies = availableCurrencies;
        });
    },
});

export const { editCurrency } = counterSlice.actions;

export default counterSlice.reducer;