import {Runtime, Inspector} from '@observablehq/runtime';
import React, {useEffect, useRef} from 'react';
import notebook from './bubble';
import NavigationSml from "../../components/navigationSml";

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
        <main className={"ecosystem"} >
            <div ref={ref}/>
        </main>
    );
}
