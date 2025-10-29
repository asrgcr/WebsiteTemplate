import {Pipeline} from "aws-cdk-lib/aws-codepipeline";
import { App } from 'aws-cdk-lib';

import { PIPELINE_CONFIG } from "./constants"
import { addStage } from './stage';
import { Stage } from './types';


export const app = new App();

const pipeline = new Pipeline(app, "Pipeline", PIPELINE_CONFIG);

// Add each stage to the app
Object.values(Stage).forEach((stage) => addStage(app, pipeline, stage));
