import React, {Component} from "react"
import {Link} from "react-router-dom";

class Navigation extends Component {
    render() {
        return <nav>
            <ul className={"nav-content"}>
                {/*<li><Link to="/">Socks</Link></li>*/}
                <li><Link to="/story">Sockstory</Link></li>
                {/*<li><Link to="/data">Data</Link></li>*/}
            </ul>
        </nav>
    }
}

export default Navigation
