import Destinations from "./components/destinations/Destinations";
import HotelsAndRestaurants from "./components/hotels-and-restaurants/HotelsAndRestaurants";
import Hero from "./components/hero";
import Travel from "./components/travel/Travel";
import AboutUs from "./components/about-us/AboutUs";
import Footer from "./components/footer/Footer";
import ChatBot from "./components/ChatBot/ChatBot"
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <>
    <BrowserRouter>
    
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<SignIn />} />
    <Route path="/register" element={<SignUp />} />
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
