import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Moderator from "./pages/Moderator";
import Editor from "./pages/Editor";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import NotFoundPage from "./pages/NotFoundPage";
import AccessController from "./pages/AccessController";

function App() {
  return (
    <BrowserRouter>
      <div
        id="themeController"
        data-theme={localStorage.getItem("theme") || "light"}
        className="min-h-screen w-full flex flex-col justify-between bg-base-10"
      >
        <Navbar />
        <div className="sm:px-[80px] px-[16px] pb-[50px] pt-[50px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/access_controller" element={<AccessController />} />
            {/* <Route path="/admin" element={<Admin />} /> */}
            <Route
              path="/profile"
              element={<ProtectedRoute roles={["all"]} element={<Profile />} />}
            />
            <Route
              path="/admin"
              element={<ProtectedRoute roles={["admin"]} element={<Admin />} />}
            />
            <Route
              path="/moderator"
              element={
                <ProtectedRoute
                  roles={["admin", "moderator"]}
                  element={<Moderator />}
                />
              }
            />
            <Route
              path="/editor"
              element={
                <ProtectedRoute
                  roles={["admin", "editor"]}
                  element={<Editor />}
                />
              }
            />

            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            className:
              "bg-base-100 text-base-content text-sm px-8 py-3 font-semibold z-[1000]",
            duration: 5000,
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
