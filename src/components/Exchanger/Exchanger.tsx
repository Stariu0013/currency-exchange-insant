import React from "react";
import { Box, Typography } from "@mui/material";

import { useAppSelector } from "../../hooks/app";

import CurrenciesTable from "../CurrenciesTable/CurrenciesTable";
import CurrenciesSelects from "../CurrenciesSelects/CurrenciesSelects";

import { getStyles } from "./getStyles";

type ExchangerProps = {
    showAllPairs: boolean
}

const Exchanger: React.FC<ExchangerProps> = ({showAllPairs}) => {
    const styles = getStyles();
    const currencies = useAppSelector(state => state.currenciesState.currencies);

    return !currencies.length
        ? <Typography sx={styles.noCurrencies}>There are no currencies</Typography>
        : (
            <Box sx={styles.main}>
                <CurrenciesTable showAllPairs={showAllPairs}/>
                <CurrenciesSelects />
            </Box>
        );
};

export default Exchanger;