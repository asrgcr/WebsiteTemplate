import { initTRPC } from "@trpc/server"

import { Context } from "../types/context"
import { Meta } from "../types/meta"

const trpc = initTRPC.context<Context>().meta<Meta>().create()

export const createRouter = trpc.router;
export const procedure = (name: string) => trpc.procedure.meta({name});