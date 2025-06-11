import { SyncLoader } from "react-spinners";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import Demo from "./pages/demo";
import LoginPage from "./pages/login";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  const { user, fetched } = useAuth();
  if (!fetched) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-24 p-4">
        <SyncLoader
          color="#000000"
          loading={!fetched}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-24 p-4">
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/" element={user ? <Demo /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
