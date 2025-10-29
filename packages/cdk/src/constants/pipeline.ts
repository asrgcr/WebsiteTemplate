import {PipelineProps, PipelineType} from "aws-cdk-lib/aws-codepipeline";

export const PIPELINE_CONFIG: PipelineProps = {
    pipelineType: PipelineType.V2,
    pipelineName: APP_NAME,

}