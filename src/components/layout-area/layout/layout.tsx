import { Header } from "../header/header";
import { Menu } from "../menu/menu";
import { Copyrights } from "../copyrights/copyrights";
import "./layout.css";
import { Routing } from "../routing/routing";

export function Layout() {
    return (
        <div className="Layout">
            <header><Header /></header>
            <nav><Menu /></nav>
            <main><Routing /></main>
            <footer><Copyrights /></footer>
        </div>
    );
}