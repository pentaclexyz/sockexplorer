import React from 'react';
import './assets/styles/pentacle.scss';
import {BrowserRouter} from "react-router-dom";

import Footer from "./components/footer";
import {Router} from "./Router";

function App() {
    return (
        <BrowserRouter>
            <Router/>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
