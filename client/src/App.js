import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import VerifyPage from "./pages/VerifyPage";

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='' element={<Home />} />
                <Route path='about' element={<About />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verify' element={<VerifyPage />} />
            <Route path='/*' element={<div>Not found</div>} />


        </Routes>
    );
};

export default App;
