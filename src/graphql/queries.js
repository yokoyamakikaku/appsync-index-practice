/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSchedule = /* GraphQL */ `
  query GetSchedule($id: ID!) {
    getSchedule(id: $id) {
      id
      name
      group
      status
      startedAt
      finishedAt
      startedYear
      startedMonth
      startedDate
      startedHour
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSchedules = /* GraphQL */ `
  query ListSchedules(
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchedules(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        group
        status
        startedAt
        finishedAt
        startedYear
        startedMonth
        startedDate
        startedHour
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listSchedulesByGroup = /* GraphQL */ `
  query ListSchedulesByGroup(
    $group: String!
    $sortDirection: ModelSortDirection
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchedulesByGroup(
      group: $group
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        group
        status
        startedAt
        finishedAt
        startedYear
        startedMonth
        startedDate
        startedHour
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listSchedulesbyGroupWithStatusAndYearAndMonthAndDateAndHour = /* GraphQL */ `
  query ListSchedulesbyGroupWithStatusAndYearAndMonthAndDateAndHour(
    $group: String!
    $statusStartedYearStartedMonthStartedDateStartedHour: ModelScheduleByGroupWithStatusAndYearAndMonthAndDateAndHourCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchedulesbyGroupWithStatusAndYearAndMonthAndDateAndHour(
      group: $group
      statusStartedYearStartedMonthStartedDateStartedHour: $statusStartedYearStartedMonthStartedDateStartedHour
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        group
        status
        startedAt
        finishedAt
        startedYear
        startedMonth
        startedDate
        startedHour
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
