import React from "react";
import { Box, Typography } from "@mui/material";

import { getStyles } from "./getStyles";

const Footer = () => {
    const styles = getStyles();

    const thisYear = new Date().getFullYear();

    return (
        <Box sx={styles.footer}>
            <Typography>{thisYear} all rights reserved</Typography>
        </Box>
    );
};

export default Footer;