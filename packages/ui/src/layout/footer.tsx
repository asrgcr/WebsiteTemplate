import type { FunctionComponent } from "react";

export const Footer: FunctionComponent = () => {
    return (
        <footer className="bg-header-bg border-primary mt-auto border-t-1 text-sm py-2 flex justify-center items-center gap-2">
            <span>Made with</span>
            <span>&#10084;</span>
            <span></span>
        </footer>
    )
}