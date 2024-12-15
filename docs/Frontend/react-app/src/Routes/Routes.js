import { Navigate, Route, Routes } from "react-router-dom";

import Products from "../Components/Products/Products";
import Cart from "../Components/Cart/Cart";
import UserManagement from "../Components/User-Management/UserManagement";
import Login from "../Components/Login/Login";
import ResetPassword from "../Components/Reset-Password/Reset-Password";
import TopNavigationRender from "../Components/Top-Navigation/Top-navigation";
import Footer from "../Components/Footer/Footer";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

function RoutesApp() {

    const { user } = useContext(AuthContext);

    console.log(user);

    if (!user) {
        return (
            <Routes >
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        )
    }


    return (
        <>
            <TopNavigationRender />
            <Routes >
                <Route path="/" element={<Products />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/usermanagement" element={<UserManagement />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
            </Routes>

            <Footer />
        </>
    )
}

export default RoutesApp;