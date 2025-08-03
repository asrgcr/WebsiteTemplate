import { App } from "aws-cdk-lib"

export const addStage = (app: App, stage: Stage) => {
    const stageName = HUMANIZED_STAGE_NAMES[stage]
    const
}