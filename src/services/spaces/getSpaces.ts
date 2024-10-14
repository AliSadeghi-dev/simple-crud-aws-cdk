import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function getSpaces(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (event.queryStringParameters) {
    if ("id" in event.queryStringParameters) {
      const spaceId = event.queryStringParameters["id"];
      if (typeof spaceId !== "string") {
        return {
          statusCode: 400,
          body: JSON.stringify("id must be a string!"),
        };
      }
      const getItemResponse = await ddbClient.send(
        new GetItemCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            id: { S: spaceId },
          },
        })
      );
      if (getItemResponse.Item) {
        const unmarshalItem = unmarshall(getItemResponse.Item);
        console.log("item", unmarshalItem);
        return {
          statusCode: 200,
          body: JSON.stringify(getItemResponse.Item),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify(`Space with ${spaceId} not Found`),
        };
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify("id is required!"),
      };
    }
  }

  const result = await ddbClient.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME,
    })
  );

  const unmarshlaedItems = result.Items?.map((item) => unmarshall(item));

  console.log(unmarshlaedItems);

  return {
    statusCode: 200,
    body: JSON.stringify(unmarshlaedItems),
  };
}
