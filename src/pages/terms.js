import React from "react";
import Layout from "../components/layout";
import Header from "../components/header";

export const Terms = () => {
    return (
        <>
            <Header/>
            <Layout>
                <section className={"editorial-content one-col"}>

                    <article className={"box feature box-padding"}>
                        <h1>Terms of use</h1>
                        <h2>Links to other sites</h2>
                        <p>This Site may contain links to other independent third-party Web sites ("Linked Sites").
                            These
                            Linked
                            Sites are provided solely as a convenience to our visitors. </p>
                        <p>Such Linked Sites are not under Pentacle’s control, and Pentacle is not responsible for and
                            does
                            not endorse the content of such
                            Linked Sites, including any information or materials contained on such Linked Sites. You
                            will
                            need to make your
                            own independent judgment regarding your interaction with these Linked Sites.</p>
                    </article>

                    <article className={"box feature box-padding"}>
                        <h2>Disclaimers</h2>
                        <p>Pentacle does not promise that the site or any content of the site, will be error-free, or
                            that
                            any
                            defects will be corrected, or that your use of the site will provide specific results.
                            The site and its content are delivered on an as-is basis. Pentacle disclaims all warranties,
                            express
                            or implied, including warranties of accuracy, non-infringement, or fitness for a particular
                            purpose.</p>
                        <p>Pentacle disclaims any and all liability for the acts, omissions or conduct of any third
                            parties
                            in connection with or related to your use of the site. You assume total responsibility for
                            your
                            use of the site and any Linked Sites.</p>
                        <p>Your sole remedy against Pentacle for your use of this site and any Linked Sites is to stop
                            using
                            the site or any such content. This limitation of relief is a part of the bargain between the
                            parties.
                        </p>
                    </article>

                    <article className={"box feature box-padding"}>
                        <h2>Affiliate links</h2>
                        <ul>
                            <li>Links to exchanges on Pentacle.ai are affiliate links, which generate commission from
                                new
                                sign-ups for Pentacle
                            </li>
                            <li>Where possible Pentacle has selected an even split of commission and trading discount
                                for any person using our affiliate link
                            </li>
                        </ul>
                    </article>
                </section>
            </Layout>
        </>
    )
}
