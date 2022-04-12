import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavigationPage from "./components/NavigationPage/NavigationPage";
import { ME_FETCH } from "./constants/action.constants";
import { AUTH_TOKEN } from "./constants/secrets";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Firebase from "./services/firebase.service";
import { initializeApp } from "firebase/app";
import { CircularProgress } from "@mui/material";
function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem(AUTH_TOKEN);
  initializeApp(Firebase);
  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch({
      type: ME_FETCH,
    });
  }, []);
  const user = useSelector((state) => state?.user?.data);
  if (token && !user) {
    return (
      <div className="flex flex-col space-y-2 text-black justify-center mt-3 items-center">
        <CircularProgress color="inherit" />
        Loading...
      </div>
    );
  }
  return (
    <div>
      <NotificationContainer />
      <NavigationPage />
    </div>
  );
}

export default App;
