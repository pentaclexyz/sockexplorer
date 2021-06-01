import React, {Component} from "react"

class Footer extends Component {
    render() {
        return <footer>
            <article className={"footer-content flex-group space-between flex-align-end"}>
                <div>
                    <a href={"https://etherscan.io/address/pentacle.eth"} target={"_blank"} rel="noopener noreferrer">Donate to pentacle.eth</a>
                    <a href={"https://pentacle.ai"} target={"_blank"} rel="noopener noreferrer">Made by Pentacle</a>
                    <a href={"https://github.com/pentacledotai/sockexplorer"} target={"_blank"} rel="noopener noreferrer">GitHub</a>
                </div>
                <div className={"embed"}>
                    <iframe width="100%" height="120" title={"miyuki eto"}
                            src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&autoplay=1&feed=%2FMIYUKI_ETO%2Fmiyuki_sunset_210328%2F"
                            frameBorder="0" allow="autoplay"></iframe>
                </div>
            </article>
        </footer>
    }
}

export default Footer
