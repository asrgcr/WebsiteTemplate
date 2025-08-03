import {RootRouter} from "@website/api";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { createTRPCClient, httpLink } from "@trpc/client";
import { StrictMode } from 'react'
import type { FunctionComponent } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import { TRPCProvider } from "./helpers/trpc";
import { fetch } from "./helpers/fetch";
import { Layout } from './layout/layout'
import { ThemeProvider } from './layout/theme-provider'
import { ErrorPage } from './pages/error-page'
import { routes } from './routes'

import "@cloudscape-design/global-styles/index.css"
import "./root.css"

const trpcClient = createTRPCClient<RootRouter>({ links: [httpLink({ fetch, url: "/api"})]});

const queryClient = new QueryClient();

const router = createBrowserRouter([{ path: '/', element: <Layout />, children: routes, errorElement: <ErrorPage /> }]);

const Root: FunctionComponent = () => (
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
                <ThemeProvider>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </TRPCProvider>
        </QueryClientProvider>
    </StrictMode>
);

createRoot(document.getElementById('app')!).render(<Root />)
