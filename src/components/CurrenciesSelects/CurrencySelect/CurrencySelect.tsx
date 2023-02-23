import React, { ChangeEvent } from "react";
import { Box, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

import { CURRENCIES } from "../../../types/currencies";

import { getStyles } from "./getStyles";

interface CurrencySelectProps {
    inputValue: number;
    selectValue: string;
    label: string;
    availableCurrencies: CURRENCIES[];

    onChangeInputValue: (event: ChangeEvent<HTMLInputElement>) => void;
    onChangeSelectValue: (event: SelectChangeEvent) => void;
}

const CurrencySelect: React.FC<CurrencySelectProps> = (props) => {
    const styles = getStyles();
    const {
        selectValue,
        onChangeSelectValue,
        onChangeInputValue,
        inputValue,
        availableCurrencies,
        label,
    } = props;

    return (
        <Box sx={styles.main}>
            <Box>
                <TextField sx={styles.input} label={label} variant="standard" value={inputValue}
                           onChange={onChangeInputValue} />
            </Box>
            <Select
                sx={styles.select}
                value={selectValue}
                label={label}
                variant="standard"
                onChange={onChangeSelectValue}
            >
                {
                    availableCurrencies.map(curr => {
                        return <MenuItem key={curr} value={curr}>{curr}</MenuItem>;
                    })
                }
            </Select>
        </Box>
    );
};

export default CurrencySelect;