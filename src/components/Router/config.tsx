import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import RequireAuth from "../Middleware/RequireAuth";
import ServerErrorPage from "../../pages/ServerErrorPage";
import PageNotFound from "../../pages/PageNotFound";
import Login from "../../pages/Login";
import SignUp from "../../pages/Register";
import Dashboard from "../../pages/Dashboard";
const routers = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />

      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route
        path="/404"
        element={<PageNotFound statusCode={400} message="Page is not found" />}
      />
      <Route
        path="/500"
        element={
          <ServerErrorPage statusCode={500} message="Internal Server Error" />
        }
      />
      <Route path="*" element={<Navigate to="/404" />} />
    </Route>
  )
);

export default routers;
