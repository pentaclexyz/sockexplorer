import React from "react";
import { Route, Routes } from "react-router";

import {Terms} from "./pages/terms";
import {Main} from "./pages/main";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/terms" element={<Terms/>}/>
        </Routes>
    );
}
