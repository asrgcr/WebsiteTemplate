import { App } from 'aws-cdk-lib';
import { addStage } from './stage';
import { Stage } from './types';

export const app = new App();

// Add each stage to the app
Object.values(Stage).forEach((stage) => addStage(app, stage));

import { DependencyModel, DeploymentPipelineProps, MergeSchedule, Platform, TimeWindow} from "@amzn/pipelines"

import { ACCOUNTS } from "./accounts"
import { APP_NAME } from "./app"
import { DOMAINS } from "./domain"
import { PACKAGES } from "./packages"

const PLATFORM = Platform.AL2023_AARCH64;

export const PIPELINE_CONFIG: DeploymentPipelineProps = {
    account: ACCOUNTS.TAILWIND_AIR.BETA,
    description: "A CDK-managed pipeline for the Tailwind-Air website",
    mergeSchedule: MergeSchedule.daily(TimeWindow.FROM00_TO_02),
    packages: Object.values(PACKAGES),
    pipelineId: "7279042",
    pipelineName: APP_NAME,
    toolPlatform: PLATFORM,
    trackingVersionSet: "linux/central",
    versionSet: {
        dependencyModel: DependencyModel.PERU,
        name: `${APP_NAME}/development`
    },
    versionSetPlatform: PLATFORM
}