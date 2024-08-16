import { createContext, useEffect, useState } from "react";
import { getItem, removeAllItems, setItem } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import apiService from "../utils/apiService";
import { getCurrentUser, loginAccount } from "../queries/auth";
import { useQueryClient } from "@tanstack/react-query";
import { userChannel } from "../utils/misc";
import PageLoader from "../components/PageLoader";

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  organization: {
    name: string;
    domain: string;
  };
}

interface IForm {
  email: string;
  password: string;
}

export const AuthContext = createContext<any>({
  user: null as null | any,
  setUser: () => {},
  loggedIn: false,
  sessionExpired: false,
  reset: () => {},
});

type AppProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AppProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();

  const login = async (formData: IForm) => {
    const response = await loginAccount(formData);

    if (response.token) {
      setItem("token", response.token);
      setUser(response.user);
      return response;
    }
    return null;
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      setLoggedIn(true);
      apiService.setTokenGenerator(token);
    } else {
      apiService.setTokenGenerator(() => null);
    }
  }, [user]);

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      setLoggedIn(true);
      fetchCurrentUser();
    }
    setLoading(false);
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const d = await getCurrentUser();
      setLoading(false);
      setUser(d);
    } catch (error) {
      localStorage.removeItem("token");
      return navigate("/");
    }
  };
  const reset = () => {
    setUser(null); // set user
    queryClient.clear();
    removeAllItems();
    setSessionExpired(false);
  };

  useEffect(() => {
    userChannel.onmessage = (data: any) => {
      if (data?.data?.payload?.type === "SIGN_OUT") {
        reset();
        window.location.replace(`${window.location.origin}/logout`);
      }
    };
  }, []); // single session
  const updateUser = (user: IUser) => setUser((u: any) => ({ ...u, ...user }));

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loggedIn,
        loading,
        sessionExpired,
        reset,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
