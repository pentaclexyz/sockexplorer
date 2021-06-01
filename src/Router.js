import React from "react";
import { Route, Routes } from "react-router";

import {Story} from "./pages/story";
import {Main} from "./pages/main";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/story" element={<Story/>}/>
        </Routes>
    );
}
