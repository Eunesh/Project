import { useState, useEffect, createContext, useReducer } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Membership from "./pages/Membership";
import Logout from "./pages/Logout";
import { initialState, reducer } from "./Reducer/useReducer";
import Chatroom from "./pages/Home/chatroom/Chatroom";
import Trainerchatroom from "./pages/Home/chatroom/Trainerchatroom";
import { QueryClientProvider, QueryClient } from "react-query";
import Trainer from "./pages/Trainer";
import Admin from "./Admin/Admin";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signUp" component={Signup} />
      <Route path="/Login" component={Login} />
      <Route path="/Membership" component={Membership} />
      <Route path="/Logout" component={Logout} />
      <Route path="/Chatroom" component={Chatroom} />
      <Route path="/Tchatroom" component={Trainerchatroom} />
      <Route path="/Admin" component={Admin} />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const queryClient = new QueryClient();

  useEffect(() => {
    setShowHeader(
      !["/Admin", "/Login", "/signUp", "/Trainer", "/Tchatroom"].includes(
        location.pathname
      )
    );
  }, [location]);

  return (
    <div className="bg-neutral-100 text-gray-800 ">
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ state, dispatch }}>
          {showHeader && <Header />}
          <Routing />
        </UserContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
