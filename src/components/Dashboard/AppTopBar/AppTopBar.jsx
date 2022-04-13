import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../../constants/Routes";
import {
  ME_LOGOUT,
  SHOW_ALL_EXPENSES,
} from "../../../constants/action.constants";
import PopOver from "../../shared components/PopOver/PopOver";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/PowerSettingsNew";

const AppTopBar = ({ drawerWidth, pathname, handleDrawerOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = React.useState("");
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

  const searchExpense = () => {
    navigate(ROUTES.EXPENSES);
    dispatch({
      type: SHOW_ALL_EXPENSES,
      payload: {
        filters: {
          title: searchText,
        },
      },
    });
  };
  const logout = () => {
    dispatch({ type: ME_LOGOUT });
    navigate("/");
  };

  return (
    <AppBar position="fixed" open={false} className={"bg-darkPrimary"}>
      <Toolbar className="pl-3 w-full flex justify-between items-center">
        <div className="flex items-center">
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
          <Typography variant="h6" noWrap component="div" className="w-32">
            {pathname}
          </Typography>
        </div>
        <div className="bg-gray-300 rounded-2xl px-2 p-1 text-gray-500">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search Expense"
            autoComplete="off"
            onChange={(event) => setSearchText(event.target.value)}
            className="rounded-lg p-1 bg-transparent focus:outline-none text-gray-500 placeholder-gray-500"
          />
          <SearchIcon
            color="inherit"
            className="cursor-pointer"
            onClick={searchExpense}
          />
        </div>
        <div>
          <PopOver
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            buttonchild={
              <div className="p-2 flex items-center cursor-pointer">
                <AccountCircleIcon fontSize="large" />
                <ArrowDropDownIcon fontSize="small" />
              </div>
            }
          >
            <div className="flex flex-col p-2 w-40">
              <span
                className="p-1 my-1 hover:bg-primary cursor-pointer flex items-center"
                onClick={() => navigate(ROUTES.PROFILE)}
              >
                <PersonIcon fontSize="small" className="mr-1" />
                Profile
              </span>
              <hr />
              <span
                className="p-1 my-1 hover:bg-primary cursor-pointer flex items-center"
                onClick={() => navigate(ROUTES.TRASH)}
              >
                <DeleteIcon fontSize="small" className="mr-1" />
                Trash
              </span>
              <hr />
              <span
                className="p-1 my-1 hover:bg-primary cursor-pointer flex items-center"
                onClick={logout}
              >
                <LogoutIcon fontSize="small" className="mr-1" />
                SignOut
              </span>
            </div>
          </PopOver>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppTopBar;
