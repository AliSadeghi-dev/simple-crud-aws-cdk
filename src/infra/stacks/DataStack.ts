import { Stack, StackProps } from "aws-cdk-lib";
import {
  AttributeType,
  Table as DynamoDBTable,
  ITable,
} from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../Utils";

export class DatasStack extends Stack {
  public readonly spaceTable: ITable;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);

    this.spaceTable = new DynamoDBTable(this, "SpacessTable", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      tableName: `SpacessTable-${suffix}`,
    });
  }
}
