import { rootRouter } from "./procedures/root-router";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { Handler } from "./types/lambda"
import { createContext } from "./helpers/context";

const trpcHandler: Handler = awsLambdaRequestHandler({router: rootRouter, createContext});

export const handler: Handler = async (event, context) => {
    event.rawPath = event.rawPath.slice("/api".length);
    if (event.rawPath === "") {
        event.rawPath = "/";
    }
    event.requestContext.http.path = event.rawPath;
    return trpcHandler(event, context);
}