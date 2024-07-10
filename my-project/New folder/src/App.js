import Footer from "./Components/Footer";

import Login from "./Components/Login";
import Navigation from "./Components/Navigation";
import SignUp from "./Components/SignUp";
import { Routes} from "react-router";
import { Route } from "react-router";
import NotFound from "./Components/NotFound";
import BlogTemplete from "./Components/BlogTemplete";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <div >
      <Navigation/>
      <Dashboard/>
      <Routes>
        <Route path="/" element={<BlogTemplete/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="*" element={<div><NotFound/></div>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
