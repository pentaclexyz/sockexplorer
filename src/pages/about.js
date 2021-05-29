import React from "react";
import Layout from "../components/layout";
import Header from "../components/header";

export const About = () => {
    return (
        <>
            <Header/>

            <Layout>
                <section className={"editorial-content one-col"}>
                    <article className={"box feature box-padding margin-top-1 hero"}>
                        <h1>People often ask, where to begin in Crypto</h1>
                        <p>Pentacle's aim is to help people in their quest for knowledge - as a talisman of protection</p>
                    </article>

                    <article className={"box feature box-padding"}>
                        <h2>Discoverability</h2>
                        <h3>Pentacle is</h3>
                        <ul>
                            <li>A gateway into the world of crypto</li>
                            <li>An explorable and fun platform to safely discover projects and teams</li>
                            <li>A browser plugin to accompany people on their voyage beyond the platform (in the
                                pipeline)
                            </li>
                        </ul>
                    </article>

                    <article className={"box feature box-padding"}>
                        <h2>Security</h2>
                        <h3>Pentacle will</h3>
                        <ul>
                            <li>Guide people to community-verified projects and teams</li>
                            <li>Help people take responsibility for their own security</li>
                            <li>Collaborate with teams and connect with existing data and tech across the ecosystem
                            </li>
                        </ul>
                    </article>

                    <article className={"box feature box-padding"}>
                        <h2>Roadmap 2021</h2>
                        <h3>Q1 - Q2</h3>
                        <ul>
                            <li>Build MVP Ethereum and Solana interactive ecosystems</li>
                            <li>Begin work on Eli5 widgets</li>
                            <li>Form data-gathering team and define data set</li>
                            <li>Design decentralised, community-driven project verification integrating
                            <ul>
                                <li>BrightID</li>
                                <li>SnapShot</li>
                                <li>MetaMask whitelist</li>
                            </ul>
                            </li>
                        </ul>
                        <h3 className={"margin-top-1"}>Q3 - Q4</h3>
                        <ul>
                            <li>Litepaper</li>
                            <li>Community grant applications</li>
                            <li>BrightID seed group set up</li>
                            <li>Deploy Pentacle voting token</li>
                            <li>SnapShot deployment</li>
                            <li>Pentacle SubGraph deployment</li>
                            <li>Begin work on Pentacle MetaMask plugin</li>
                        </ul>
                    </article>
                </section>
            </Layout>
        </>
    )
}
