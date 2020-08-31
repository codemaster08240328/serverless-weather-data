import csvtojson from 'csvtojson';
import AWS from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';

const handler: APIGatewayProxyHandler = async (event) => {
  const S3 = new AWS.S3();
  const params = {
    Bucket: 'vopak-storage',
    Key: 'weather_june.csv',
  };

  let data = async function () {
    // get csv file and create stream
    const stream = S3.getObject(params).createReadStream();
    // convert csv file (stream) to JSON format data
    const json = await csvtojson().fromStream(stream);

    return json;
  };

  const jsonData = await data();

  let total_temp = 0;

  jsonData.forEach((item) => {
    total_temp += Number(item['feels_like']);
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      avg_temperature: (total_temp / jsonData.length - 273.15).toFixed(2),
      unit: 'celcius',
    }),
  };
};

export { handler };
