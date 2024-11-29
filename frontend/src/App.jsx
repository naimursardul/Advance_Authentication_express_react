import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";

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
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            className:
              "bg-base-100 text-base-content text-sm px-8 py-3 font-semibold",
            duration: 5000,
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
