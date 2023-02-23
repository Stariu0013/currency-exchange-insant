import React from "react";
import { TableCell, TableRow } from "@mui/material";

import { CurrencyDescription } from "../../../store/slices/currenciesSlice";

import CurrencyRowEdit from "./CurrencyRowEdit";
import { getStyles } from "./getStyles";

interface CurrencyRowProps {
    currency: CurrencyDescription,
}

const CurrencyRow: React.FC<CurrencyRowProps> = ({ currency }) => {
    const styles = getStyles();
    const {
        buy,
        sell,
        from,
        to,
    } = currency;

    return (
        <TableRow key={from} sx={styles.row}>
            <TableCell>{from}/{to}</TableCell>
            <CurrencyRowEdit value={buy} currency={currency} type="buy" />
            <CurrencyRowEdit value={sell} currency={currency} type="sell" />
        </TableRow>
    );
};

export default CurrencyRow;