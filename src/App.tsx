import React, { useEffect } from "react";
import { Route, Routes, Outlet, useNavigate, Navigate } from "react-router-dom";
// styles
import "./App.css";
// pages
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProjectDetails from "./pages/ProjectDetails";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import { useAuthContext } from "./context/useContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import OnlineUsers from "./component/OnlineUsers";

const App: React.FC = () => {
  const { dispatch, authIsReady, user } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) =>
      dispatch({ type: "AUTH_IS_READY", payload: user })
    );
    unsub();
    return () => unsub();
  }, []);

  return (
    <main className="App">
      {authIsReady && (
        <>
          {user?.uid && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={user?.uid ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route element={user?.uid ? <Navigate to="/" /> : <Outlet />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
              <Route
                element={user?.uid ? <Outlet /> : <Navigate to="/login" />}
              >
                <Route path="/project" element={<ProjectDetails />} />
                <Route path="project/:id" element={<ProjectDetails />} />
                <Route path="/create" element={<CreateProject />} />
              </Route>
            </Routes>
          </div>
          {user?.uid && <OnlineUsers />}
        </>
      )}
    </main>
  );
};

export default App;
