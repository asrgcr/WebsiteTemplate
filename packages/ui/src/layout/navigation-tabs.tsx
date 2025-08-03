import type { FunctionComponent } from "react";
import { Link, matchPath, useLocation } from "react-router";

import { routeMetadata } from "../routes";

export const NavigationTabs: FunctionComponent = () => {
    const location = useLocation();
    return (
        <div className="ml-4 hidden grow-1 md:flex">
            {routeMetadata.map(({ path, title }, index) => (
                <Link
                    className={`border-primary px-6 py-2 text-lg font-medium ${matchPath(path, location.pathname) ? "border-b-3" : ""}`}
                    key={index}
                    to={path}
                >
                    {title}
                </Link>
            ))}
        </div>
    );
};