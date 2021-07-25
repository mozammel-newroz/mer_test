import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { Animation } from "@devexpress/dx-react-chart";

import { confidence as data } from "../components/data-vizualization";

import TransactionService from "../services/wallet.service";

const format = () => (tick) => tick;
const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
    height: "200px",
  },
});
const legendLabelStyles = (theme) => ({
  label: {
    paddingTop: theme.spacing(1),
    whiteSpace: "nowrap",
  },
});
const legendItemStyles = () => ({
  item: {
    flexDirection: "column",
  },
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);
const Item = withStyles(legendItemStyles, { name: "LegendItem" })(
  legendItemBase
);
const demoStyles = () => ({
  chart: {
    paddingRight: "20px",
    height: "100px",
  },
  title: {
    whiteSpace: "pre",
  },
});

const ValueLabel = (props) => {
  const { text } = props;
  return <ValueAxis.Label {...props} text={`${text}%`} />;
};

const titleStyles = {
  title: {
    whiteSpace: "pre",
  },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
  <Title.Text {...props} className={classes.title} />
));

class ChartTran extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
      userTransactions: [],
    };
  }

  componentDidMount() {
    TransactionService.getTransactions().then(
      (response) => {
        this.setState({
          userTransactions: response.data.data.transactions,
        });
      }
    );
  }

  render() {
    const { data: chartData, userTransactions } = this.state;
    const { classes } = this.props;

    return (
      <Paper style={{ height: "310px" }}>
        {/* {userTransactions.map((n) => n.created_at)}
       {userTransactions.map((n) => n.amount)} */}

        <Chart data={chartData} className={classes.chart}>
          <ArgumentAxis tickFormat={format} />
          <ValueAxis max={50} labelComponent={ValueLabel} />

          <LineSeries
            name=""
            valueField="military"
            argumentField="year"
            className={classes.root}
          />
          {/* <LineSeries
            name="TV news"
            valueField="tvNews"
            argumentField="year"
          />
          <LineSeries
            name="Church"
            valueField="church"
            argumentField="year"
          /> */}
          <Legend position="bottom" rootComponent={Root} />
          {/* <Title
            text={`Confidence in Institutions in American society ${'\n'}(Great deal)`}
            textComponent={TitleText}
          /> */}
          <Animation />
        </Chart>
      </Paper>
    );
  }
}

export default withStyles(demoStyles, { name: "ChartTran" })(ChartTran);
