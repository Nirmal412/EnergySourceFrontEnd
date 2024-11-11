import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import { permissions } from "../utility/constants";
import Login from "../pages/Login/login";
import Dashboard from "../pages/Dashboard/dashboard";
import { useSelector } from "react-redux";
import { getToken } from "../services/axios";
import Production from "../pages/Production/Production";
import EnergySource from "../pages/EnergySource/energySource";
import Users from "../pages/Users/user";

const PublicRoute = ({ children }) => {
  const token = getToken();
  console.log("public token===>",token)
  if (token) {
    return <Navigate to={"/dashboard"} />;
  } else {
    return children;
  }
};

const PrivateRoute = ({ children }) => {

  const token = getToken();
  console.log("privet token===>",token)
  if (token) {

    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
const CheckNavigation = () => {
  const token = getToken();
  if (token) {
    return <Navigate replace to="/dashboard" />;
  } else {
    return <Navigate replace to="/login" />;
  }
};

export const RoutesPage = () => {
  const userData = useSelector(
    (store) => store?.auth?.user?.permissions
  );

  const roleBasedRouting = [
    {
      route: "/dashboard",
      role: ["admin"],
      permissions:'ADD_USERS',
      element: (
        <PrivateRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      route: "/dashboard",
      role: ["manager"],
      permissions: "ADD_USERS",
      element: (
        <PrivateRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      route: "/production",
      role: ["admin"],
      permissions:'ADD_USERS',
      element: (
        <PrivateRoute>
          <Layout>
            <Production />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      route: "/production",
      role: ["manager"],
      permissions: "ADD_USERS",
      element: (
        <PrivateRoute>
          <Layout>
            <Production />
          </Layout>
        </PrivateRoute>
      ),
    },

    {
      route: "/energySource",
      role: ["admin"],
      permissions:'ADD_USERS',
      element: (
        <PrivateRoute>
          <Layout>
            <EnergySource />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      route: "/energySource",
      role: ["manager"],
      permissions: "ADD_USERS",
      element: (
        <PrivateRoute>
          <Layout>
            <EnergySource />
          </Layout>
        </PrivateRoute>
      ),
    },

    {
      route: "/users",
      role: ["admin"],
      permissions:'ADD_USERS',
      element: (
        <PrivateRoute>
          <Layout>
            <Users />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      route: "/users",
      role: ["manager"],
      permissions: "ADD_USERS",
      element: (
        <PrivateRoute>
          <Layout>
            <Users />
          </Layout>
        </PrivateRoute>
      ),
    },
  ];

  const token = getToken();
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            !token ? (
              <Navigate to="/login" replace />
            ) : (
              // <NotFound />
              "not foound"
            )
          }
        />

        <Route path="/" element={CheckNavigation()} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      
        {roleBasedRouting
          .filter((data) => userData?.includes(data.permissions))
          .map((data) => {
            console.log(data,"data==>")
            return (
              <Route
                key={data.route}
                path={data.route}
                element={{ ...data.element }}
              />
            );
          })}
      </Routes>
    </Router>
  );
};
