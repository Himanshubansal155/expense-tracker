import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../../constants/Routes";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { COLORS } from "../../../constants/Colors";
import AppTopBar from "../AppTopBar/AppTopBar";

const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      }),
}));

export default function MiniDrawer({ children }) {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const pathname = location.pathname.split("/")[1];
  const upperRoutes = [
    {
      name: "Dashboard",
      icon: AccountBalanceIcon,
      to: ROUTES.DASHBOARD,
    },
    {
      name: "Expenses",
      icon: ReceiptLongIcon,
      to: ROUTES.EXPENSES,
    },
    {
      name: "Reports",
      icon: ShoppingBagIcon,
      to: ROUTES.REPORTS,
    },
    {
      name: "Category",
      icon: AssessmentIcon,
      to: ROUTES.CATEGORY,
    },
  ];
  const lowerRoutes = [
    {
      name: "Settings",
      icon: SettingsApplicationsIcon,
      to: ROUTES.SETTINGS,
    },
  ];

  const handleDrawerOpen = () => setOpen(!open);
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppTopBar
        handleDrawerOpen={handleDrawerOpen}
        pathname={pathname}
        drawerWidth={drawerWidth}
      />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <Divider />
        <List className="pt-0">
          {upperRoutes.map((route, index) => (
            <Link key={index} to={route.to}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor:
                    pathname === route.to.split("/")[1]
                      ? COLORS.darkPrimary
                      : "",
                  color:
                    pathname === route.to.split("/")[1] ? "white" : "black",
                }}
                className="hover:bg-primary hover:text-white"
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  <route.icon fontSize="small" color="inherit" />
                </ListItemIcon>
                <ListItemText
                  primary={route.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {lowerRoutes.map((route, index) => (
            <Link key={index} to={route.to}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor:
                    pathname === route.to.split("/")[1]
                      ? COLORS.darkPrimary
                      : "",
                  color:
                    pathname === route.to.split("/")[1] ? "white" : "black",
                }}
                className="hover:bg-primary hover:text-white"
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  <route.icon fontSize="small" color="inherit" />
                </ListItemIcon>
                <ListItemText
                  primary={route.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <DrawerHeader />
        {children}
      </Box>
    </div>
  );
}
