import {App, Stack, StackProps} from 'aws-cdk-lib';
import { HUMANIZED_STAGE_NAMES } from "../constants"
import {Stage} from "../types"

export interface DeploymentStackProps extends Omit<StackProps, "softwareType"> {
    readonly stage: Stage;
}

export class DeploymentStack extends Stack {

    public readonly stage: Stage;

    public constructor(app: App, name: string, props: DeploymentStackProps ) {
        const { stage, ...deploymentStackProps } = props;

        const stackName = `${name}-${HUMANIZED_STAGE_NAMES[stage]}-${deploymentStackProps.env.region.toUpperCase()}`;

        super(app, stackName, deploymentStackProps);

        this.stage = stage;
    }
}