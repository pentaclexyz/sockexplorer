import React from "react";
import { Route, Routes } from "react-router";

import {About} from "./pages/about";
import {Terms} from "./pages/terms";
import {Main} from "./pages/main";
import EthEcosystem from "./pages/eth-ecosystem/eth-ecosystem";
import SolEcosystem from "./pages/sol-ecosystem/sol-ecosystem";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/ethereum" element={<EthEcosystem/>}/>
            <Route path="/solana" element={<SolEcosystem/>}/>
            <Route path="/ethereum" element={<EthEcosystem/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/terms" element={<Terms/>}/>
        </Routes>
    );
}
