import { createRouter } from "../helpers/trpc"

import { getCurrentUser } from "./get-current-user";

export const rootRouter = createRouter({
    getCurrentUser
})