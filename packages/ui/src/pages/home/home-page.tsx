import {FunctionComponent} from "react";
import {DescriptionSection, DescriptionSectionProps} from "./description-section";
import { HomePageHeader } from "./home-page-header";

const descriptionSectionProps: Omit<DescriptionSectionProps, "index">[] = [
    {
        title: "The power of 1",
        description: "1 guide. 1 package. 1 pipeline. 1 language. 1 website pre-configured just for you!",
        icon: "status-positive"
    },
    {
        title: "Batteries Included",
        description: "This template is opinionated by default and includes all of what we think is important for speeding up the process of getting to production.",
        icon: "ticket"
    },
    {
        title: "Security Focused",
        description: "This template is designed to be secure by default, requiring authentication to be set up on package creation.",
        icon: "lock-private"
    }
]

export const HomePage: FunctionComponent = () => {
    return (
        <>
            <HomePageHeader />

            {descriptionSectionProps.map((props, index) => (
                <DescriptionSection key={index} index={index} {...props} />
            ))}
        </>
    )
}