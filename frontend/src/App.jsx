import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import PrivateComp from "./components/PrivateComp";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProducltList";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route element={<PrivateComp />}>
          <Route path="/" element={<ProductList />}></Route>
          <Route path="/add" element={<AddProduct />}></Route>
          <Route path="/update/:id" element={<UpdateProduct />}></Route>
          <Route path="/logout" element={<h1>Logout Componenet</h1>}></Route>
          <Route path="/profile" element={<h1>Profile Componenet</h1>}></Route>
        </Route>

        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
