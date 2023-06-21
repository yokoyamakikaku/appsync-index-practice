import { getYearAndMonthSetsFromDateRange } from './utilities'

test('getYearAndMonthSetsFromDateRange: same date', () => {
  expect(
    getYearAndMonthSetsFromDateRange([
      '2023-01-01T00:00:00.000Z',
      '2023-01-31T23:59:59.999Z'
    ])
  ).toEqual([{
    year: "2023",
    month: "01"
  }]);
});

test('getYearAndMonthSetsFromDateRange: other months', () => {
  expect(
    getYearAndMonthSetsFromDateRange([
      '2023-01-01T00:00:00.000Z',
      '2023-02-01T23:59:59.999Z'
    ])
  ).toEqual([{
    year: "2023",
    month: "01"
  }, {
    year: "2023",
    month: "02"
  }]);
});

test('getYearAndMonthSetsFromDateRange: other years', () => {
  expect(
    getYearAndMonthSetsFromDateRange([
      '2022-12-12T00:00:00.000Z',
      '2023-02-01T23:59:59.999Z'
    ])
  ).toEqual([{
    year: "2022",
    month: "12"
  }, {
    year: "2023",
    month: "01"
  }, {
    year: "2023",
    month: "02"
  }]);
});
