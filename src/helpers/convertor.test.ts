import axios from "axios";
import { CurrencyDescription, fetchCurrencies } from "../store/slices/currenciesSlice";
import { convertor } from "./convertor";
import { CURRENCIES } from "../types/currencies";

jest.mock("axios");

describe("convertor", () => {
    let mockData: CurrencyDescription[];
    let expectedCurrencyValue;
    let fromValue;

    beforeAll(async () => {
        mockData = [
            {
                id: "EUR:UAH",
                from: CURRENCIES.EUR,
                to: CURRENCIES.UAH,
                buy: 41.05,
                sell: 42.05,
            },
            {
                id: "UAH:EUR",
                from: CURRENCIES.UAH,
                to: CURRENCIES.EUR,
                buy: 0.0243605359317905,
                sell: 0.023781212841854936,
            },
        ];
    });

    test("converting correct value", () => {
        expectedCurrencyValue = 0;
        fromValue = 2;

        convertor(mockData, fromValue, "EUR", "UAH", (value: number) => expectedCurrencyValue = value);

        expect(expectedCurrencyValue).toBe(mockData[0].buy * fromValue);
    });

    test("converting same currency", () => {
        expectedCurrencyValue = 1;
        fromValue = 1;

        convertor(mockData, fromValue, "EUR", "EUR", (value: number) => expectedCurrencyValue = value);

        expect(expectedCurrencyValue).toBe(fromValue);
    });

    test("not found currency", () => {
        expectedCurrencyValue = 1;
        fromValue = 1;

        convertor(mockData, fromValue, "EUR", "ARS", (value: number) => expectedCurrencyValue = value);

        expect(expectedCurrencyValue).toBe(fromValue);
    });
});