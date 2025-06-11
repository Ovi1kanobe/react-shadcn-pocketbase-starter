import { SyncLoader } from "react-spinners";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import Demo from "./pages/demo";
import LoginPage from "./pages/login";

function App() {
  const { user, fetched } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-24 p-4">
      {!fetched ? (
        <SyncLoader
          color={"#000000"}
          loading={!fetched}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : user != null ? (
        <Demo />
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
