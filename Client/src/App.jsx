import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/context/AuthContext";
import { LogIn } from "lucide-react";
import Login from "./Components/Pages/Auth/Login/Login";
import AppRoutes from "./Components/routes/Routes";
import SignIn from "./Components/Pages/Auth/Signup/signup";
import Hero from "./Components/landing/components/Hero";
import Updatepassword from "./Components/Pages/Auth/updatepassword/updatepassword";
import Events from "./Components/subpages/Events";
import EventsPage from "./Components/subpages/specificevents/EventsPage"
import EventHome from "./Components/subpages/specificevents/EventHome";
import Martha from "./Components/subpages/specificevents/Marth/Martha";
import Artbasel from "./Components/subpages/specificevents/artbasel/Artbasel";
import { RolesProvider } from "./Components/context/Rolecontext";

function App() {
  return (
    // <ThemeProvider> {/* Wrap everything inside ThemeProvider */}
      <Router>
        <AuthProvider>
        <RolesProvider>
          <Routes>
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/*" element={<AppRoutes />} />

            <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<SignIn />} />
             <Route path="/Updatepassword" element={<Updatepassword />} />
             <Route path="/" element={<Hero />} />
             <Route path="/Events" element={<Events />} />
             {/* <Route path="/EventsPage" element={<EventsPage />} /> */}
             <Route path="/EventHome" element={<EventHome />} />
             <Route path="/Martha" element={<Martha />} />
             <Route path="/Artbasel" element={<Artbasel />} />

          </Routes>
          </RolesProvider>
        </AuthProvider>
      </Router>
    //  </ThemeProvider>
  );
}

export default App;
