import * as helpers from '../helpers';

describe('Helpers', () => {
  const timestamp = 122122;
  const date = helpers.convertTimestampToDate(timestamp);
  it('should returna valid date', () => {
    expect(date).toBeDefined();
  });
});
