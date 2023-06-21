/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSchedule = /* GraphQL */ `
  subscription OnCreateSchedule(
    $filter: ModelSubscriptionScheduleFilterInput
    $owner: String
  ) {
    onCreateSchedule(filter: $filter, owner: $owner) {
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
export const onUpdateSchedule = /* GraphQL */ `
  subscription OnUpdateSchedule(
    $filter: ModelSubscriptionScheduleFilterInput
    $owner: String
  ) {
    onUpdateSchedule(filter: $filter, owner: $owner) {
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
export const onDeleteSchedule = /* GraphQL */ `
  subscription OnDeleteSchedule(
    $filter: ModelSubscriptionScheduleFilterInput
    $owner: String
  ) {
    onDeleteSchedule(filter: $filter, owner: $owner) {
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
