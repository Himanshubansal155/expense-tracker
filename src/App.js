import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavigationPage from "./components/NavigationPage/NavigationPage";
import { ME_FETCH } from "./constants/action.constants";
import { AUTH_TOKEN } from "./constants/secrets";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Firebase from "./services/firebase.service";
import { initializeApp } from "firebase/app";
import Loader from "./components/shared components/Loader/Loader";
import "./scss/Main.scss";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
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
    return <Loader />;
  }
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Suspense fallback={<Loader />}>
        <NotificationContainer />
        <NavigationPage />
      </Suspense>
    </LocalizationProvider>
  );
}

export default App;