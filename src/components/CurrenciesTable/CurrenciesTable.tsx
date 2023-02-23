import React from "react";
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import { useAppSelector } from "../../hooks/app";

import CurrencyRow from "../Exchanger/CurrencyRow/CurrencyRow";

import { getStyles } from "./getStyles";

type CurrenciesTableProps = {
    showAllPairs: boolean;
}

const CurrenciesTable: React.FC<CurrenciesTableProps> = ({ showAllPairs }) => {
    const styles = getStyles();

    const currencies = useAppSelector(state => state.currenciesState.currencies);

    return (
        <Box sx={styles.wrapper}>
            <Table sx={{ width: "100%" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Currency</TableCell>
                        <TableCell align="left">Buy</TableCell>
                        <TableCell align="left">Sell</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currencies.filter(currency => {
                        return !currency.hidden || showAllPairs;
                    }).map((currency) => {
                        return <CurrencyRow key={currency.id} currency={currency} />;
                    })}
                </TableBody>
            </Table>
        </Box>
    );
};

export default CurrenciesTable;