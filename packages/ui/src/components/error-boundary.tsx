import Alert from "@cloudscape-design/components/alert";
import { FunctionComponent, ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from "react-error-boundary";

interface Props {
    readonly children: ReactNode;
}

const FallbackComponent: FunctionComponent<FallbackProps> = ({ error }) => (
    <Alert type={"error"}>
        <b>Error</b>: An error occured while rendering a component:
        <br />
        <i>{JSON.stringify(error, Object.getOwnPropertyNames(error))}</i>
        <br />
        Try refreshing the page, and please contact our team if this issue persists.
    </Alert>
);

export const ErrorBoundary: FunctionComponent<Props> = ({ children }) => (
    <ReactErrorBoundary FallbackComponent={FallbackComponent}>{children}</ReactErrorBoundary>
);