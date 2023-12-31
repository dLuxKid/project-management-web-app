// react
import React, { useEffect, useState } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
// styles
import "./App.css";
// pages
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProjectDetails from "./pages/ProjectDetails";
// components
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import Error from "./component/Error";
import OnlineUsers from "./component/OnlineUsers";
// hooks
import { useAuthContext } from "./context/useContext";

const App: React.FC = () => {
  const { authIsReady, user } = useAuthContext();

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    // logic to monitor screen width
    const screenResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", screenResize);
    return () => window.removeEventListener("resize", screenResize);
  }, []);

  if (user?.uid && screenWidth < 992) {
    return (
      <Error error="We are not optimized for small screens please continue on a laptop" />
    );
  }

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
                <Route path="project/:id" element={<ProjectDetails />} />
                <Route path="/create" element={<CreateProject />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          {user?.uid && <OnlineUsers />}
        </>
      )}
    </main>
  );
};

export default App;
