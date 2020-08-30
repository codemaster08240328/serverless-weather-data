import 'mongodb';
import { expect } from 'chai';
import LambdaTester from 'lambda-tester';

import { handler as CurrentTempHandler } from '../currentTemp';

describe('get current temperature in covilha event handler test', function () {
  this.timeout(20000);

  it('should receive status code 200', async () => {
    await LambdaTester(CurrentTempHandler).expectResult((result: any) => {
      expect(result.statusCode).to.eql(200);
    });
  });
});
