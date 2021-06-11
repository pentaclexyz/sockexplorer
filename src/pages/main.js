import React from "react";
import Tweet from "../components/tweet";
import {data} from "../components/tweet-data";
import Header from "../components/header";
import SockExplorer from "./socks/sock-explorer";

export const Main = () => {
    return (
        <>
            <Header/>
            <div style={{maxWidth: '500px'}}>
              <Tweet {...data}  />
            </div>
            <SockExplorer/>
        </>
    )
}
