import React from "react"
import {features} from "../../data/featuresXsmall";

const FeaturesXsmlLayout = () => {

    return (
        <><h4>Fresh links</h4>
            <section className="flex-group">
                {features
                    .map(feature => <article className="editorial-content box feature small align-center">
                            <h3><a href={feature.link} target={"_blank"} rel="noopener noreferrer">{feature.title}</a></h3>
                            <p>{feature.text}</p>
                        </article>
                    )}
            </section>
        </>
    );
};

export default FeaturesXsmlLayout
