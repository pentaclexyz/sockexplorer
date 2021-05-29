import React, {Component} from "react"
import {Link} from "react-router-dom";
import twitterIcon from "../assets/images/twitter.svg";

class Navigation extends Component {
    render() {
        return <nav>
            <ul className={"nav-content"}>
                <li><Link to="/socks">SOCKS</Link></li>
                <li><a href={"https://twitter.com/mikedemarais"} target={"_blank"} rel="noopener noreferrer"><img
                    src={twitterIcon} className="width-1-5" alt="twitter"/></a></li>
            </ul>
        </nav>
    }
}

export default Navigation
