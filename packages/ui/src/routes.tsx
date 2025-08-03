import type { IndexRouteObject, NonIndexRouteObject } from 'react-router';
import { PermissionWrapper } from "./helpers/permission-wrapper"
import type {RouteMetadata} from "./types/route.ts";
import { HomePage } from "./pages/home/home-page"
import {ArchitecturePage} from "./pages/architecture/architecture-page";

export const ROUTE_PATHS = {
    HOME: "/",
    ARCHITECTURE: "/architecture",
} as const;

export const HOME_ROUTE: RouteMetadata = {
    title: "Home",
    description: "Website Home page",
    path: ROUTE_PATHS.HOME,
};

export const ARCHITECTURE_ROUTE: RouteMetadata = {
    title: "Architecture",
    description: "Website Architecture Overview",
    path: ROUTE_PATHS.ARCHITECTURE,
}

export const routeMetadata: RouteMetadata[] = [
    HOME_ROUTE,
    ARCHITECTURE_ROUTE,
];

export const routes: (IndexRouteObject | NonIndexRouteObject)[] = [
    {
        path: ROUTE_PATHS.HOME,
        element: <PermissionWrapper />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: ROUTE_PATHS.ARCHITECTURE,
                element: <ArchitecturePage />
            }
        ]
    }
]