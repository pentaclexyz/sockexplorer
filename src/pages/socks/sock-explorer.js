import {Runtime, Inspector} from '@observablehq/runtime';
import React, {useEffect, useRef} from 'react';
import notebook from './bubble';
import socks from "../../assets/images/socks-icon-200.png";

export default function SockExplorer() {
    const ref = useRef();

    useEffect(() => {
        const runtime = new Runtime();
        runtime.module(notebook, (name) => {
            if (name === 'chart') {
                return new Inspector(ref.current);
            }
        });
        return () => runtime.dispose();
    }, []);

    return (
        <main className={"socks"}>
            <dl className={"tooltip"}>
                <div><dt><img src={socks} alt="socks badge"/></dt> <dd className={"name"}></dd></div>
                <div><dt>$SOCKS</dt> <dd className={"value"}></dd></div>
            </dl>
            <div ref={ref}/>
        </main>
    );
}
