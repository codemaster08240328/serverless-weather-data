import { APIGatewayEvent } from 'aws-lambda';
import axios from 'axios';

import CurTempModel from '../model/currentTemp';

const run = async (event: APIGatewayEvent) => {
  /**
   * Get Real Weather data of Covilha city from openweather api every 10mins
   *
   * Store weather data on database
   */
  console.log('<--- cron job started --->');

  try {
    const res = await axios(
      `${process.env.CUR_WEATHER_DATA_API}/weather?q=Covilha&appid=${process.env.API_KEY}`
    ).then((resp) => resp.data);

    const document = {
      name: res.name,
      time: new Date(res.dt * 1000).toUTCString(),
      timezone: res.timezone,
      temp: res.main.temp,
      feels_temp: res.main.feels_like,
      temp_min: res.temp_min,
      temp_max: res.temp_max,
      id: res.id,
    };

    CurTempModel.create(document);
  } catch (e) {
    console.log(e);
  }

  console.log('<--- cron job will start again 10 minutes later --->');
};

export { run };
