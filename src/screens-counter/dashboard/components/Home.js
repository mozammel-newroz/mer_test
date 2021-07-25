import React from "react";
import {
  makeStyles,
  Container,
  Grid,
  Paper,
  useHistory,
} from "../../../common-counter";

import UserInfo from "../../../assets/images/userInfo.png";
import TransImg from "../../../assets/images/trans.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "5rem",
  },
}));
export default function Home() {
  const classes = useStyles();
  let history = useHistory();

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container spacing={3} style={{ padding: "30px 12px" }}>
        <h3
          style={{ fontWeight: "bold", color: "#2B335E", marginBottom: "30px" }}
        >
          Quick Access
        </h3>

        <Grid container spacing={4}>
          <Grid item>
            <Paper
              elevation={3}
              style={{
                width: "300px",
                height: "200px",
                textAlign: "center",
                paddingTop: "20px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <img
                style={{
                  width: "50px",
                  marginTop: "20px",
                  //  height: "90.27px ",
                }}
                src={UserInfo}
                alt="Transactions"
                onClick={() => history.push("/counter-panel/basic-info")}
              />
              <h4 style={{ paddingTop: "15px" }}>
                Basic Information
              </h4>
            </Paper>
          </Grid>
          <Grid item>
            <Paper
              elevation={3}
              style={{
                width: "295px",
                height: "200px",
                textAlign: "center",
                paddingTop: "20px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <img
                style={{
                  width: "50px",
                  marginTop: "20px",
                }}
                src={TransImg}
                alt="Charge"
                onClick={() => history.push("/counter-panel/transactions")}
              />
              <h4 style={{ paddingTop: "15px" }}>
                Transactions
              </h4>
            </Paper>
          </Grid>

          {/* ))} */}
        </Grid>
      </Grid>
    </Container>
  );
}
