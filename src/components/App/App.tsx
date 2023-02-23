import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { fetchCurrencies } from "../../store/slices/currenciesSlice";

import { useAppDispatch, useAppSelector } from "../../hooks/app";

import Loader from "../../common/Loader/Loader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Exchanger from "../Exchanger/Exchanger";

import { getStyles } from "./getStyles";

function App() {
    const styles = getStyles();

    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [showAllPairs, setShowAllPairs] = useState<boolean>(false);

    const fetchError = useAppSelector(state => state.currenciesState.fetchError);

    const handleChangeShowAllPairs = () => {
        setShowAllPairs(prevState => !prevState);
    };

    useEffect(() => {
        setIsLoading(true);

        dispatch(fetchCurrencies()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    return isLoading ? <Loader /> : (
        <Box sx={styles.container}>
            {
                fetchError
                    ? <Typography sx={styles.fetchError}>{fetchError}</Typography>
                    : <Box sx={styles.wrapper}>
                        <Header setShowAllPairs={handleChangeShowAllPairs} showAllPairs={showAllPairs} />
                        <Exchanger showAllPairs={showAllPairs} />
                        <Footer />
                    </Box>
            }
        </Box>
    )
        ;
}

export default App;
