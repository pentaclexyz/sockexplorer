import React from "react";
import { Route, Routes } from "react-router";

import {Terms} from "./pages/terms";
import {Main} from "./pages/main";
import SockExplorer from "./pages/socks/sock-explorer";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/socks" element={<SockExplorer/>}/>
            <Route path="/terms" element={<Terms/>}/>
        </Routes>
    );
}
