import type { FunctionComponent, ReactNode } from "react";
import { Outlet } from "react-router";

import { Footer } from "./footer";
import { WebsiteHeader } from "./website-header";
import { ErrorBoundary } from "../components/error-boundary";

interface Props {
    readonly children?: ReactNode;
}

export const Layout: FunctionComponent<Props> = ({ children }) => (
    <>
        <ErrorBoundary>
            <WebsiteHeader />
        </ErrorBoundary>

        {children ?? <Outlet />}

        <ErrorBoundary>
            <Footer />
        </ErrorBoundary>
    </>
);