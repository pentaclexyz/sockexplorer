import {Runtime, Inspector} from '@observablehq/runtime';
import React, {useEffect, useRef} from 'react';
import notebook from './sunburst';

export default function EthEcosystem() {
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
        <main>
            <div className={"margin-top-2"} ref={ref}/>
        </main>
    );
}
