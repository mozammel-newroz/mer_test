import React from 'react';
import { makeStyles, Home } from '../../common-counter';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Home />
    </div>
  );
}
