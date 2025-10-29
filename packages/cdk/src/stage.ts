import { App } from "aws-cdk-lib"
import {Pipeline} from "aws-cdk-lib/aws-codepipeline";

import {HUMANIZED_STAGE_NAMES, DOMAINS} from "./constants"
import { Stage } from "./types"

export const addStage = (app: App, pipeline: Pipeline, stage: Stage) => {
    const stageName = HUMANIZED_STAGE_NAMES[stage]
    const deploymentGroupStage = pipeline.addStage(stageName);

    const route53HostedZoneStack = new Route53HostedZoneStack(app, {...DOMAINS[stage]});
}