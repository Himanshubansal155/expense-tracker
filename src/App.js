import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Counter } from "./components/counter";
import NavigationPage from "./components/NavigationPage/NavigationPage";
import { ME_FETCH } from "./constants/action.constants";
import { AUTH_TOKEN } from "./constants/secrets";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem(AUTH_TOKEN);
  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch({
      type: ME_FETCH,
      payload: {
        email: "himanshubansal1@gmail.com",
        password: "123456",
      },
    });
  }, []);
  const user = useSelector((state) => state.user.data);
  if (token && !user) {
    return <div className="text-blue-600">Loading...</div>;
  }
  return (
    <div>
      <NavigationPage />
      <Counter />
    </div>
  );
}

export default App;
