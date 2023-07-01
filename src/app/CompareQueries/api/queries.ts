export const listScheduleIdsByGroupWithStatus = /* GraphQL */ `
  query ListScheduleIdsByGroupWithStatus(
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
      }
      nextToken
      __typename
    }
  }
`;
