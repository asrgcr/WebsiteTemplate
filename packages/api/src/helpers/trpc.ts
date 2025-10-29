import { initTRPC } from "@trpc/server"

import { Context } from "../types/context"
import { Meta } from "../types/meta"
import {logger} from "../clients/monitoring";
import { monitorOperation } from "./monitoring"

const trpc = initTRPC.context<Context>().meta<Meta>().create()

export const createRouter = trpc.router;
export const createMiddleware = trpc.middleware;

const monitorProcedure = createMiddleware(async ({ctx, meta, next}) => {
    const procedureName = meta!.name;
    logger.appendKeys({...ctx, procedureName});
    return monitorOperation(`${procedureName}Procedure`, async () => next(), { isResponseError: (response) => !response.ok })();
})

export const procedure = (name: string) => trpc.procedure.meta({name}).use(monitorProcedure);