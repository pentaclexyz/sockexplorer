import React from "react";
import Layout from "../components/layout";
import Header from "../components/header";

export const Story = () => {
    return (
        <>
            <Header/>
            <Layout>
                <section className={"editorial-content one-col"}>

                    <article className={"box feature box-padding"}>
                        <h1>Sockstory</h1>
                        <h2>Sock wearers rejoice</h2>
                        <p>things</p>
                    </article>

                </section>
            </Layout>
        </>
    )
}
