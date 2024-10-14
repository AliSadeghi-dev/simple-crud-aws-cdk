import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { postSpaces } from "./postSpaces";
import { getSpaces } from "./getSpaces";

const ddbClient = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> {
  let message: string = "";

  try {
    switch (event.httpMethod) {
      case "GET":
        const getAllSpacesResponse = await getSpaces(event, ddbClient);
        return getAllSpacesResponse;
      case "POST":
        const createSpaceReponse = await postSpaces(event, ddbClient);
        return createSpaceReponse;
      case "DELETE":
        message = "Hello from DELETE";
        break;
      case "PUT":
        message = "Hello from PUT";
        break;
      default:
        break;
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };
  return response;
}

export { handler };
