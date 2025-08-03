import {SpaceBetween} from "@cloudscape-design/components";
import {useEffect, useState} from "react";
import type { FunctionComponent } from "react";
import {DarkModeToggle} from "./dark-mode-toggle";
import {PageSectionContent} from "../components/page-section-content";
import {NavigationTabs} from "./navigation-tabs";
import {Logo} from "./website-logo";

const isScrolledDown = (): boolean => window.scrollY > 0;

const useScrollTrigger = (): boolean => {
    const [trigger, setTrigger] = useState<boolean>(isScrolledDown)
    useEffect(() => {
        const handleScroll = () => setTrigger(isScrolledDown());
        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return trigger;
}

export const WebsiteHeader: FunctionComponent = () => {
    const trigger = useScrollTrigger();
    return (
        <header className="top-0 z-1000 w-full overflow-visible bg-transparent pt-[12px]">
            <PageSectionContent className={`flex min-h-[64px] items-center rounded-3xl bg-transparent backdrop-blur-sm transition-[all_ease_0.3s] ${trigger ? "dark:bg-header": ""} ${trigger ? "shadow-[0_4px_6px_rgba(0,0,0,0.24)]": ""}`}>
                <Logo />
                <NavigationTabs />
                <SpaceBetween size="m" alignItems="center" direction="horizontal">
                    <DarkModeToggle />
                </SpaceBetween>
            </PageSectionContent>
        </header>
    )
}

