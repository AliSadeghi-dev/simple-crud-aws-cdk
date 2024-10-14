import { App } from "aws-cdk-lib";
import { DatasStack } from "./stacks/DataStack";
import { LambdasStack } from "./stacks/LambdaStack";
import { ApisStack } from "./stacks/ApiStack";

const app = new App();
const dataStack = new DatasStack(app, "DatasStack");
const lambdaStack = new LambdasStack(app, "LambdasStack", {
  spacessTable: dataStack.spaceTable,
});
new ApisStack(app, "ApisStack", {
  spacessLambdaIntegration: lambdaStack.spacessLambdaIntegration,
});
