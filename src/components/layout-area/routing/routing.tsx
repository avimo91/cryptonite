import { Navigate, Route, Routes } from "react-router-dom";
import "./routing.css";
import { Home } from "../../pages-area/home/home";
import { Reports } from "../../pages-area/reports/reports";
import { Recommendations } from "../../pages-area/recommendations/recommendations";
import { About } from "../../pages-area/about/about";
import { PageNotFound } from "../../pages-area/page-not-found/page-not-found";

export function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}