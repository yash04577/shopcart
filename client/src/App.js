import Annoucement from "./components/Annoucement";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import SinglePage from "./pages/SinglePage";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Context from "./context/Context";
import State from "./context/State";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import User from "./pages/User";



function App() {
  return (
    <>
      <State>
      {/* <Annoucement></Annoucement> */}
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/singleproduct" element={<SinglePage></SinglePage>} />
            <Route path="/cart" element={<Cart></Cart>} />
            <Route path="/signup" element={<SignUp></SignUp>} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/about" element={<About></About>} />
            <Route path="/contact" element={<Contact></Contact>} />
            <Route path="/user" element={<User></User>} />
        </Routes>
      </BrowserRouter>
      </State>
      
    </>
  );
}

export default App;
