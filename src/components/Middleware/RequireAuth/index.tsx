import { FC, Suspense } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AppShell from "../../AppShell";
import PageLoader from "../../PageLoader";
import useAuth from "../../../hooks/useAuth";

interface IRequireAuthProps {}

const RequireAuth: FC<IRequireAuthProps> = () => {
  const { user, loggedIn } = useAuth();

  if (user) {
    return (
      <AppShell>
        <Suspense
          fallback={
            <div className="w-full h-screen">
              <PageLoader />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </AppShell>
    );
  }

  //   setItem('redirect_post_login_to', location.pathname);
  return <Navigate to={loggedIn ? "/logout" : "/login"} />;
};

export default RequireAuth;
