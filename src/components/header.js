import React, {Component} from "react"
import {Link} from "react-router-dom";
import Navigation from "./navigation";


class Header extends Component {
    render() {
        return <header>
            <div className="header-content flex-align-center flex-group space-between">
                <Link className={"logo"} to="/">Pentacle</Link>
                <h3>In your quest for knowledge, a talisman of protection</h3>
                <Navigation/>
            </div>
        </header>
    }
}

export default Header
