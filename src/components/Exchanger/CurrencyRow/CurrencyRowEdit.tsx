import React, { ChangeEvent, useState } from "react";
import { DoneOutlineRounded, CloseRounded } from "@mui/icons-material";
import { Input, TableCell } from "@mui/material";

import { CurrencyDescription, editCurrency } from "../../../store/slices/currenciesSlice";

import { useAppDispatch } from "../../../hooks/app";
import { inputValidator } from "../../../helpers/validator";

import { formatDisplayNumber, getCurrencySymbol, parseNumberFromDisplayNumber } from "../../../helpers/formatNumber";
import { getStyles } from "./getStyles";

interface CurrencyRowEditProps {
    value: number;
    currency: CurrencyDescription;
    type: string;
}

const CurrencyRowEdit: React.FC<CurrencyRowEditProps> = (props) => {
    const styles = getStyles();
    const {
        value,
        currency,
        type,
    } = props;
    const { buy, sell, to } = currency;

    const currencyValueByType = type === "buy" ? buy : sell;

    const dispatch = useAppDispatch();
    const [isClickedCell, setIsClickedCell] = useState(false);
    const [currencyValue, setCurrencyValue] = useState<number>(value);
    const [isCompleted, setIsCompleted] = useState(true);

    const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseNumberFromDisplayNumber(event.target.value);

        setCurrencyValue(value);
    };

    const onClickOpenEditMode = () => {
        setIsClickedCell(true);
    };

    const onSave = () => {
        if (inputValidator(buy, currencyValue) && isCompleted) {
            setIsCompleted(true);
            const object = {
                ...currency,
                buy: currencyValue,
            };

            dispatch(editCurrency(object));
            setIsClickedCell(false);
        } else {
            setIsCompleted(false);
            setCurrencyValue(+currencyValueByType);
        }
    };

    const onClose = () => {
        setIsClickedCell(false);
        setCurrencyValue(currencyValueByType);
    };

    const onSaveIconClass = isCompleted ? styles.icon : [styles.icon, styles.icon.disabled];

    return isClickedCell ? <TableCell sx={styles.cell}>
            <Input sx={styles.input} type="text" value={currencyValue} onChange={onValueChange} />
            <DoneOutlineRounded sx={onSaveIconClass} onClick={onSave} />
            <CloseRounded sx={styles.icon} onClick={onClose} />
        </TableCell> :
        <TableCell sx={styles.cell} onClick={onClickOpenEditMode}
                   data-currency={getCurrencySymbol(to)}>{formatDisplayNumber(value)}</TableCell>;
};

export default CurrencyRowEdit;