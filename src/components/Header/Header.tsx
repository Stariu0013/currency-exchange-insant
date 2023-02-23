import React from "react";
import { Box, Typography } from "@mui/material";

import logo from "../../assets/logo.svg";

import { getStyles } from "./getStyles";

type HeaderProps = {
    showAllPairs: boolean;

    setShowAllPairs: () => void;
}

const Header: React.FC<HeaderProps> = ({ setShowAllPairs, showAllPairs }) => {
    const styles = getStyles();

    return (
        <Box sx={styles.header}>
            <Box component="img" sx={styles.header.img} src={logo} />
            {
                showAllPairs
                    ? <Typography sx={styles.header.title} onClick={setShowAllPairs}>Hide all pairs</Typography>
                    : <Typography sx={styles.header.title} onClick={setShowAllPairs}>Show all pairs</Typography>
            }
        </Box>
    );
};

export default Header;