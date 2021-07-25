import React from "react";
import { makeStyles, AppBar, Container, Toolbar, Typography } from "../common-counter";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Main({ children }) {
    const classes = useStyles();

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        FastPay
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">{children}</Container>
        </>
    );
}
