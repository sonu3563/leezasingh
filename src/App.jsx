import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./components/context/AuthContext";
import { AuthProvider } from "./Components/context/AuthContext";
import Login from "./Components/Pages/Auth/Login/Login";
import SignIn from "./Components/Pages/Auth/Signup/signup";
import Hero from "./Components/landing/components/Hero";
import Updatepassword from "./Components/Pages/Auth/updatepassword/updatepassword";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Events from "./Components/subpages/Events";
import EventsPage from "./Components/subpages/specificevents/EventsPage"
import EventHome from "./Components/subpages/specificevents/EventHome";
import Martha from "./Components/subpages/specificevents/Marth/Martha";
import Artbasel from "./Components/subpages/specificevents/artbasel/Artbasel";
// import AppRoutes from "./components/Routes";
// import { ThemeProvider } from "@material-native-ui/theme-provider";

function App() {
  return (
    // <ThemeProvider> {/* Wrap everything inside ThemeProvider */}
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignIn />} />
            <Route path="/Updatepassword" element={<Updatepassword />} />
            <Route path="/" element={<Hero />} />
            <Route path="/Events" element={<Events />} />
            {/* <Route path="/EventsPage" element={<EventsPage />} /> */}
            <Route path="/EventHome" element={<EventHome />} />
            <Route path="/Martha" element={<Martha />} />
            <Route path="/Artbasel" element={<Artbasel />} />
            {/* <Route path="/*" element={<AppRoutes />} /> */}
          </Routes>
        </AuthProvider>
      </Router>
    //  </ThemeProvider>
  );
}

export default App;
