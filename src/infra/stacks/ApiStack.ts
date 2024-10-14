import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApisStackProps extends StackProps {
  spacessLambdaIntegration: LambdaIntegration;
}

export class ApisStack extends Stack {
  constructor(scope: Construct, id: string, props: ApisStackProps) {
    super(scope, id, props);
    const api = new RestApi(this, "SpacessApi");
    const spacesResource = api.root.addResource("spacess");
    spacesResource.addMethod("GET", props.spacessLambdaIntegration);
    spacesResource.addMethod("POST", props.spacessLambdaIntegration);
    spacesResource.addMethod("PUT", props.spacessLambdaIntegration);
    spacesResource.addMethod("DELETE", props.spacessLambdaIntegration);
  }
}
