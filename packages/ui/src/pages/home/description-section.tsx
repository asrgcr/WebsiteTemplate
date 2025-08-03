import {Box, TextContent} from "@cloudscape-design/components"
import { Icon, type IconProps} from "@cloudscape-design/components"
import {FunctionComponent} from "react";
import {PageSectionBackground} from "../../components/page-section-background";
import {PageSectionContent} from "../../components/page-section-content";

export interface DescriptionSectionProps {
    icon: IconProps.Name;
    description: string;
    index: number;
    title: string;
}

export const DescriptionSection: FunctionComponent<DescriptionSectionProps> = ({description, title, index, icon}) => {
    const isEvenRow: boolean = index % 2 === 0;
    return (
        <PageSectionBackground color={isEvenRow ? "section" : "header"}>
            <PageSectionContent className={"py-4 sm:py-10 md:py-16"}>
                <div className={`mb-8 flex items-center ${isEvenRow ? "flex-row" : "flex-row-reverse"}`}>
                    <Icon ariaLabel={`${title} Section Icon`} name={icon} size={"large"} />
                    <Box variant={"h3"} fontSize={"display-l"} margin={{horizontal: "m"}}>
                        {title}
                    </Box>
                </div>

                <TextContent>
                    <p className={"text-justify text-xl"}>{description}</p>
                </TextContent>
            </PageSectionContent>
        </PageSectionBackground>
    )
}