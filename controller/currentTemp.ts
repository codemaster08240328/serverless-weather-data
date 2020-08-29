import { APIGatewayProxyHandler } from 'aws-lambda';
import CurTempModel from '../model/currentTemp';

export const handler: APIGatewayProxyHandler = async (event) => {
  /**
   * Current Temperatur in Covilha city Endpoint
   * Method: GET
   * Endpoint: /currenttempincovilha
   * Response:
   * {
   *    city_name: 'covilha'
   *    temperatur: 29
   *    time: 2020-08-28T23:00:01.000Z
   * }
   */

  try {
    const docu = await CurTempModel.findOne().sort({ time: -1 }).exec();

    const res = {
      city_name: docu?.name,
      temperature: docu?.feels_temp ? docu?.feels_temp - 273.15 : null,
      time: docu?.time,
      temp_unit: 'celcius',
    };

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (e) {
    console.error(e);

    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: 'Server Error',
      }),
    };
  }
};
