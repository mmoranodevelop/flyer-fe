import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        color: '#9c27b0',
    },
}));

export const Loading = () => {
    const classes = useStyles();
    return(
        <Backdrop open={true}>
            <CircularProgress  className={classes.backdrop} />
        </Backdrop>
    );
};
