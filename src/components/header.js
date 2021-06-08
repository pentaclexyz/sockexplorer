import React, {Component} from "react"
import {Link} from "react-router-dom";
import Navigation from "./navigation";

class Header extends Component {
    render() {
        return <header>
            <div className="header-content flex-align-center flex-group space-between">
                <Link className={"logo"} style={{textTransform: 'capitalize'}} to="/">{process.env.REACT_APP_NAME} Explorer</Link>
                <Navigation/>
            </div>
        </header>
    }
}

export default Header
