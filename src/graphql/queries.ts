/* tslint:disable */
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
      startedDay
      createdAt
      updatedAt
      owner
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
        startedDay
        createdAt
        updatedAt
        owner
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
        startedDay
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listSchedulesByGroupWithStatus = /* GraphQL */ `
  query ListSchedulesByGroupWithStatus(
    $group: String!
    $status: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchedulesByGroupWithStatus(
      group: $group
      status: $status
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
        startedDay
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listSchedulesByGroupWithStatusAndYearAndMonth = /* GraphQL */ `
  query ListSchedulesByGroupWithStatusAndYearAndMonth(
    $group: String!
    $statusStartedYearStartedMonth: ModelScheduleByGroupWithStatusAndYearAndMonthCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchedulesByGroupWithStatusAndYearAndMonth(
      group: $group
      statusStartedYearStartedMonth: $statusStartedYearStartedMonth
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
        startedDay
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listSchedulesByGroupWithStatusAndYearAndMonthAndDay = /* GraphQL */ `
  query ListSchedulesByGroupWithStatusAndYearAndMonthAndDay(
    $group: String!
    $statusStartedYearStartedMonthStartedDay: ModelScheduleByGroupWithStatusAndYearAndMonthAndDayCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchedulesByGroupWithStatusAndYearAndMonthAndDay(
      group: $group
      statusStartedYearStartedMonthStartedDay: $statusStartedYearStartedMonthStartedDay
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
        startedDay
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
