import type { MetricUnit } from "@aws-lambda-powertools/metrics";
import { logger, metrics, tracer } from "../clients/monitoring";

export type OperationResult<T> = { threwError: false; responseHadError: boolean; response: T } | { threwError: true; error: unknown };

export interface Metric {
    readonly name: string;
    readonly unit: MetricUnit;
    readonly value: number;
}

export type MetricGenerator<T, A extends unknown[]> = (
    result: OperationResult<T>,
    ...args: A
) => {readonly name: string; readonly unit: MetricUnit; readonly value: number};

export interface MonitorOperationOpts<T, A extends unknown[]> {
    readonly additionalDimensions?: (...args: A) => Record<string, string>;
    readonly additionalMetrics?: readonly MetricGenerator<T, A>[];
    readonly isResponseError?: (response: T) => boolean;
}

export const publishMetricsWithDimensions = (metricsToBePublished: readonly Metric[], dimensions: Record<string, string>) => {
    metrics.addDimensions(dimensions);
    metricsToBePublished.forEach(({name, unit, value}) => metrics.addMetric(name, unit, value));
    metrics.publishStoredMetrics();
}

export const monitorOperation = function<T, A extends unknown[]>(
    operationName: string,
    operationLogic: (...args: A) => Promise<T> | T,
    opts: MonitorOperationOpts<T, A> = {}
): (...args: A) => Promise<T> {
    return async function (this: unknown, ...args: A) {
        const parentSegment = tracer.getSegment()!;
        const subSegment = parentSegment.addNewSubsegment(operationName);
        tracer.setSegment(subSegment);

        logger.info("Executing operation logic", { operationName });

        let result: OperationResult<T>;
        const before: number = performance.now();
        try {
            const response = await operationLogic.apply(this, args);
            const responseHadError = opts.isResponseError?.(response) ?? false;
            if (responseHadError) {
                subSegment.addErrorFlag();
            }
            result = { threwError: false, responseHadError, response };
        } catch (error) {
            result = { threwError: true, error };
            subSegment.addErrorFlag();
        }
        const after: number = performance.now();
        const latency: number = after - before;
        const wasSuccess: boolean = !result.threwError && !result.responseHadError;
        const metricsToBePublished: readonly Metric[] = [
            {name: "Count", unit: "Count", value: 1},
            {name: "Latency", unit: "Milliseconds", value: latency},
            {name: "Success", unit: "Count", value: wasSuccess ? 1 : 0},
            {name: "Failure", unit: "Count", value: wasSuccess ? 0 : 1},
            ...(opts.additionalMetrics ? opts.additionalMetrics.map((metricGenerator) => metricGenerator(result, ...args)) : [])
        ];
        const dimensions = { Operation: operationName, ...(opts.additionalDimensions ? opts.additionalDimensions(...args) : {}) };
        publishMetricsWithDimensions(metricsToBePublished, dimensions);
        subSegment.close();
        tracer.setSegment(parentSegment);
        if (result.threwError) {
            logger.error("Operation threw an error", { error: result.error, latency, operationName});
            throw result.error;
        } else {
            if (result.responseHadError) {
                logger.error("Response from operation had an error", {response: result.response, latency, operationName});
            } else {
                logger.info("Successfully performed operation", {response: result.response, latency, operationName} );
            }
            return result.response;
        }
    };
};