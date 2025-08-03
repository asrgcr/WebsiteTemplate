import { RootRouter } from "@website/api"
import { createTRPCContext } from "@trpc/tanstack-react-query"

export const { TRPCProvider, useTRPC } = createTRPCContext<RootRouter>()

export const trpStatusToCloudscapeStatus = (status: "pending" | "success" | "error") => {
    switch(status) {
        case "success":
            return "finished"
        case "error":
            return "error"
        case "pending":
            return "loading"
    }
}