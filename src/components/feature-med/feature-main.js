import React from "react"
import {features} from "../../data/featuresMain";
import {Link} from "react-router-dom";

const FeatureMainLayout = () => {

    return (<>
            <h4>Pentacle ecosystems</h4>
            <section className="flex-group">
                {features
                    .map(feature => <article
                            className={"editorial-content box feature box-padding"}>
                            <div className={"flex-group flex-align-center"}>
                                <div>
                                    <h2>{feature.title}</h2>
                                    <p>{feature.text}</p>
                                </div>
                                <div className={"align-center"}>
                                    <Link to={feature.link}><img className={feature.logoClass} alt={feature.alt}
                                                                   src={feature.logoUrl}/></Link>
                                </div>
                            </div>
                            <div className={"margin-top-2"}>
                                <Link to={feature.link}>
                                    <button className="primary full-width">{feature.buttonText}</button>
                                </Link></div>
                        </article>
                    )}
            </section>
        </>
    );
};

export default FeatureMainLayout
