import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/home/Home";
const Rotas = () => {
    const navigation = useNavigate();
    useEffect(() => {
        navigation('/home');
    }, []);
    return (
        <Routes>
            <Route path="*" element={<div>Not found</div>} />
            <Route path="/home" element={<Home/>} />
        </Routes>
    )
}
export default Rotas;