import { injectLambdaContext } from "@aws-lambda-powertools/logger/middleware"
import { logMetrics } from "@aws-lambda-powertools/metrics/middleware"
import { captureLambdaHandler } from "@aws-lambda-powertools/tracer/middleware"
import middy from "@middy/core"
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

import { logger, metrics, tracer } from "./clients/monitoring";
import { createContext } from "./helpers/context";
import { rootRouter } from "./procedures/root-router";
import type { Handler } from "./types/lambda"

const trpcHandler: Handler = awsLambdaRequestHandler({router: rootRouter, createContext});

const monitoredTrpcHandler: Handler = middy(trpcHandler)
    .use(captureLambdaHandler(tracer))
    .use(injectLambdaContext(logger, { resetKeys: true }))
    .use(logMetrics(metrics, { captureColdStartMetric: true }));

export const handler: Handler = async (event, context) => {
    event.rawPath = event.rawPath.slice("/api".length);
    if (event.rawPath === "") {
        event.rawPath = "/";
    }
    event.requestContext.http.path = event.rawPath;
    return monitoredTrpcHandler(event, context);
}