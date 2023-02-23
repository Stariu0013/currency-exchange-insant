import React from "react";
import { Box, CircularProgress } from "@mui/material";

import { getStyles } from './getStyles';

const Loader = () => {
    const classes = getStyles();

    return (
        <Box sx={classes.loader}>
            <CircularProgress/>
        </Box>
    );
};

export default Loader;