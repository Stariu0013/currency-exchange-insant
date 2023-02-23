export const getStyles = () => ({
    input: {
        width: "70px",

        fontSize: "14px",
    },
    cell: {
        width: "150px",
        height: "70px",

        cursor: "pointer",
        "&::after": {
            content: "' 'attr(data-currency)",
        },
    },
    icon: {
        width: "15px",
        height: "15px",

        cursor: "pointer",

        disabled: {
            color: "red",
        },
    },
    row: {
        "&:nth-child(even)": {
            backgroundColor: "lightyellow",
        },
    },
});