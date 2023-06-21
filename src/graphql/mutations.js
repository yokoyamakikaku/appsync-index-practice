/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSchedule = /* GraphQL */ `
  mutation CreateSchedule(
    $input: CreateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    createSchedule(input: $input, condition: $condition) {
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
export const updateSchedule = /* GraphQL */ `
  mutation UpdateSchedule(
    $input: UpdateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    updateSchedule(input: $input, condition: $condition) {
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
export const deleteSchedule = /* GraphQL */ `
  mutation DeleteSchedule(
    $input: DeleteScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    deleteSchedule(input: $input, condition: $condition) {
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
