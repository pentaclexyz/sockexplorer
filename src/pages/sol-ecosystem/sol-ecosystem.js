import {Runtime, Inspector} from '@observablehq/runtime';
import React, {useEffect, useRef} from 'react';
import notebook from './sunburst';
import NavigationSml from "../../components/navigationSml";

export default function SolEcosystem() {
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
        <main className={"ecosystem"}>
            <NavigationSml/>
            <div ref={ref}/>
        </main>
    );
}
