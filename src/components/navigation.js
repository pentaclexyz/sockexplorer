import React, {Component} from "react"
import {Link} from "react-router-dom";

class Navigation extends Component {
    render() {
        return <nav>
            <ul className={"nav-content"}>
                <li><Link to="/">socks</Link></li>
                <li><Link to="/story">sockstory</Link></li>
                <li><Link to="/data">data</Link></li>
            </ul>
        </nav>
    }
}

export default Navigation
