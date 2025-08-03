import { TRPCError } from "@trpc/server"
import { Context } from "../types/context";
import { CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";
import {LambdaFunctionURLEventWithIAMAuthorizer} from "aws-lambda";

export const createContext = ({ event }: CreateAWSLambdaContextOptions<LambdaFunctionURLEventWithIAMAuthorizer> ): Context => {
    const rawAlias = event.headers["user-alias"];
    if (Array.isArray(rawAlias)) {
        throw new TRPCError({code: "UNAUTHORIZED", message: "No user alias found"});
    }
    const userAlias = rawAlias ?? "guest";
    const userId = 135857;
    return {
        userAlias,
        userId
    }
}