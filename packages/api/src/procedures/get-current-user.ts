import { z } from 'zod'
import { procedure } from "../helpers/trpc";

export const getCurrentUser = procedure("GetCurrentUser")
    .input(z.undefined())
    .query(async ({ ctx }) => {
        return ctx.userAlias
    });