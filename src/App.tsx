import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./context/AuthContext";

import Toast from "./components/Toast";
import Routers from "./components/Router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 15 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routers />
        <Toast />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
