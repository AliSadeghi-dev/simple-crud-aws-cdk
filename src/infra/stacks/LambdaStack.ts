import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

interface LambdaStackProps extends StackProps {
  spacessTable: ITable;
}

export class LambdasStack extends Stack {
  public readonly spacessLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);
    const spacessLambda = new NodejsFunction(this, "HiLambda", {
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      entry: join(__dirname, "..", "..", "services", "spaces", "handler.ts"),
      environment: {
        TABLE_NAME: props.spacessTable.tableName,
      },
    });

    spacessLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [props.spacessTable.tableArn],
        actions: ["dynamodb:PutItem"],
      })
    );

    this.spacessLambdaIntegration = new LambdaIntegration(spacessLambda);
  }
}
