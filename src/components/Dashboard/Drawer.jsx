import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/Routes";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { COLORS } from "../../constants/Colors";

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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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
      name: "Budget",
      icon: ShoppingBagIcon,
      to: ROUTES.BUDGET,
    },
    {
      name: "Analytics",
      icon: AssessmentIcon,
      to: ROUTES.ANALYTICS,
    },
  ];
  const lowerRoutes = [
    {
      name: "Settings",
      icon: SettingsApplicationsIcon,
      to: ROUTES.SETTINGS,
    },
    {
      name: "Trash",
      icon: RestoreFromTrashIcon,
      to: ROUTES.TRASH,
    },
  ];

  const handleDrawerOpen = () => setOpen(!open);
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={false} className={"bg-primary"}>
        <Toolbar className="pl-3">
          <div className="p-2 pl-0 mr-6 flex items-end">
            <img src="/logo.png" alt="Logo" height={48} width={50} />
          </div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {pathname}
          </Typography>
        </Toolbar>
      </AppBar>
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
                    pathname === route.to.split("/")[1] ? COLORS.primary : "",
                  color:
                    pathname === route.to.split("/")[1] ? "white" : "black",
                }}
                className="hover:opacity-70 hover:bg-darkPrimary hover:text-white"
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
                    pathname === route.to.split("/")[1] ? COLORS.primary : "",
                  color:
                    pathname === route.to.split("/")[1] ? "white" : "black",
                }}
                className="hover:opacity-70 hover:bg-darkPrimary hover:text-white"
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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </div>
  );
}
