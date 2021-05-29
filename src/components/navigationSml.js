import React, {Component} from "react"
import {Link} from "react-router-dom";

class NavigationSml extends Component {
    render() {
        return <nav className={"nav-small"}>
            <ul>
                <li><Link to="/" className={"logo"}>Pentacle</Link></li>
            </ul>
        </nav>
    }
}

export default NavigationSml
