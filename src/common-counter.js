export {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  NavLink,
  useHistory,
} from "react-router-dom";

// material-ui
export {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  CssBaseline,
  Grid,
  OutlinedInput,
  Paper,
  Typography,
  Table,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  Snackbar,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
  TableSortLabel,
  FormControl,
  FormControlLabel,
  Select,
  Breadcrumbs,
  Radio,
  RadioGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
  ButtonGroup,
  FormHelperText,
  AppBar,
  Toolbar,
  Menu,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Dialog,
  DialogContent,
  Slide,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
export { green } from "@material-ui/core/colors";
export { default as AddIcon } from "@material-ui/icons/Add";
export { default as ClearIcon } from "@material-ui/icons/Clear";
export { default as SearchIcon } from "@material-ui/icons/Search";
export { default as AddBoxIcon } from "@material-ui/icons/AddBox";
export { default as SpeedIcon } from "@material-ui/icons/Speed";
export { default as HomeIcon } from "@material-ui/icons/Home";
export { default as WhatshotIcon } from "@material-ui/icons/Whatshot";
export { default as MoreIcon } from "@material-ui/icons/MoreVert";
export {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LockOutlined,
  Visibility,
  VisibilityOff,
  CheckCircle,
  EmailOutlined,
  AccountCircle,
} from "@material-ui/icons";
export { default as MuiAlert } from "@material-ui/lab/Alert";
export { default as Autocomplete } from "@material-ui/lab/Autocomplete";
export {
  makeStyles,
  useTheme,
  withStyles,
  fade,
} from "@material-ui/core/styles";
export {
  KeyboardDateTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

// Others
export { default as Cookies } from "js-cookie";
export { default as PropTypes } from "prop-types";
export { default as moment } from "moment";
export { default as QRCode } from "qrcode.react";
export { default as NumberFormat } from "react-number-format";

// Services
export { default as commonService } from "./services-counter/common.service";
export { default as AuthService } from "./services-counter/auth.service";

// Components
export { isAuthenticate } from "./utils-counter/UtilActions";

export { default as Home } from "./screens-counter/dashboard/components/Home";
export { default as Header } from "./screens-counter/Header";
export { default as Login } from "./screens-counter/Login";
export { default as Dashboard } from "./screens-counter/dashboard/Dashboard";
export { default as BasicInfo } from "./screens-counter/dashboard/BasicInformation/BasicInfo";
export { default as Transactions } from "./screens-counter/dashboard/Transactions/transactions";
export { default as ForgotPassword } from "./screens-counter/ForgotPassword";

export { default as RouteWithLayout } from "./routes-counter/RouteWithLayouts";
export { default as PrivateRouteWithLayout } from "./routes-counter/PrivateRoutes";

export { default as Main } from "./layouts-counter/Main";
