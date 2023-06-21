/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateScheduleInput = {
  id?: string | null,
  name: string,
  group: string,
  status: ScheduleStatus,
  startedAt?: string | null,
  finishedAt?: string | null,
  startedYear?: string | null,
  startedMonth?: string | null,
  startedDate?: string | null,
  startedHour?: string | null,
};

export enum ScheduleStatus {
  ACTIVE = "ACTIVE",
  DISACTIVE = "DISACTIVE",
}


export type ModelScheduleConditionInput = {
  name?: ModelStringInput | null,
  group?: ModelStringInput | null,
  status?: ModelScheduleStatusInput | null,
  startedAt?: ModelStringInput | null,
  finishedAt?: ModelStringInput | null,
  startedYear?: ModelStringInput | null,
  startedMonth?: ModelStringInput | null,
  startedDate?: ModelStringInput | null,
  startedHour?: ModelStringInput | null,
  and?: Array< ModelScheduleConditionInput | null > | null,
  or?: Array< ModelScheduleConditionInput | null > | null,
  not?: ModelScheduleConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelScheduleStatusInput = {
  eq?: ScheduleStatus | null,
  ne?: ScheduleStatus | null,
};

export type Schedule = {
  __typename: "Schedule",
  id: string,
  name: string,
  group: string,
  status: ScheduleStatus,
  startedAt?: string | null,
  finishedAt?: string | null,
  startedYear?: string | null,
  startedMonth?: string | null,
  startedDate?: string | null,
  startedHour?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateScheduleInput = {
  id: string,
  name?: string | null,
  group?: string | null,
  status?: ScheduleStatus | null,
  startedAt?: string | null,
  finishedAt?: string | null,
  startedYear?: string | null,
  startedMonth?: string | null,
  startedDate?: string | null,
  startedHour?: string | null,
};

export type DeleteScheduleInput = {
  id: string,
};

export type ModelScheduleFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  group?: ModelStringInput | null,
  status?: ModelScheduleStatusInput | null,
  startedAt?: ModelStringInput | null,
  finishedAt?: ModelStringInput | null,
  startedYear?: ModelStringInput | null,
  startedMonth?: ModelStringInput | null,
  startedDate?: ModelStringInput | null,
  startedHour?: ModelStringInput | null,
  and?: Array< ModelScheduleFilterInput | null > | null,
  or?: Array< ModelScheduleFilterInput | null > | null,
  not?: ModelScheduleFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelScheduleConnection = {
  __typename: "ModelScheduleConnection",
  items:  Array<Schedule | null >,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelScheduleByGroupWithStatusAndYearAndMonthAndDateAndHourCompositeKeyConditionInput = {
  eq?: ModelScheduleByGroupWithStatusAndYearAndMonthAndDateAndHourCompositeKeyInput | null,
  le?: ModelScheduleByGroupWithStatusAndYearAndMonthAndDateAndHourCompositeKeyInput | null,
  lt?: ModelScheduleByGroupWithStatusAndYearAndMonthAndDateAndHourCompositeKeyInput | null,
  ge?: ModelScheduleByGroupWithStatusAndYearAndMonthAndDateAndHourCompositeKeyInput | null,
  gt?: ModelScheduleByGroupWithStatusAndYearAndMonthAndDateAndHourCompositeKeyInput | null,
  between?: Array< ModelScheduleByGroupWithStatusAndYearAndMonthAndDateAndHourCompositeKeyInput | null > | null,
  beginsWith?: ModelScheduleByGroupWithStatusAndYearAndMonthAndDateAndHourCompositeKeyInput | null,
};

export type ModelScheduleByGroupWithStatusAndYearAndMonthAndDateAndHourCompositeKeyInput = {
  status?: ScheduleStatus | null,
  startedYear?: string | null,
  startedMonth?: string | null,
  startedDate?: string | null,
  startedHour?: string | null,
};

export type ModelSubscriptionScheduleFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  group?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  startedAt?: ModelSubscriptionStringInput | null,
  finishedAt?: ModelSubscriptionStringInput | null,
  startedYear?: ModelSubscriptionStringInput | null,
  startedMonth?: ModelSubscriptionStringInput | null,
  startedDate?: ModelSubscriptionStringInput | null,
  startedHour?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionScheduleFilterInput | null > | null,
  or?: Array< ModelSubscriptionScheduleFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateScheduleMutationVariables = {
  input: CreateScheduleInput,
  condition?: ModelScheduleConditionInput | null,
};

export type CreateScheduleMutation = {
  createSchedule?:  {
    __typename: "Schedule",
    id: string,
    name: string,
    group: string,
    status: ScheduleStatus,
    startedAt?: string | null,
    finishedAt?: string | null,
    startedYear?: string | null,
    startedMonth?: string | null,
    startedDate?: string | null,
    startedHour?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateScheduleMutationVariables = {
  input: UpdateScheduleInput,
  condition?: ModelScheduleConditionInput | null,
};

export type UpdateScheduleMutation = {
  updateSchedule?:  {
    __typename: "Schedule",
    id: string,
    name: string,
    group: string,
    status: ScheduleStatus,
    startedAt?: string | null,
    finishedAt?: string | null,
    startedYear?: string | null,
    startedMonth?: string | null,
    startedDate?: string | null,
    startedHour?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteScheduleMutationVariables = {
  input: DeleteScheduleInput,
  condition?: ModelScheduleConditionInput | null,
};

export type DeleteScheduleMutation = {
  deleteSchedule?:  {
    __typename: "Schedule",
    id: string,
    name: string,
    group: string,
    status: ScheduleStatus,
    startedAt?: string | null,
    finishedAt?: string | null,
    startedYear?: string | null,
    startedMonth?: string | null,
    startedDate?: string | null,
    startedHour?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetScheduleQueryVariables = {
  id: string,
};

export type GetScheduleQuery = {
  getSchedule?:  {
    __typename: "Schedule",
    id: string,
    name: string,
    group: string,
    status: ScheduleStatus,
    startedAt?: string | null,
    finishedAt?: string | null,
    startedYear?: string | null,
    startedMonth?: string | null,
    startedDate?: string | null,
    startedHour?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListSchedulesQueryVariables = {
  filter?: ModelScheduleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSchedulesQuery = {
  listSchedules?:  {
    __typename: "ModelScheduleConnection",
    items:  Array< {
      __typename: "Schedule",
      id: string,
      name: string,
      group: string,
      status: ScheduleStatus,
      startedAt?: string | null,
      finishedAt?: string | null,
      startedYear?: string | null,
      startedMonth?: string | null,
      startedDate?: string | null,
      startedHour?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSchedulesByGroupQueryVariables = {
  group: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelScheduleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSchedulesByGroupQuery = {
  listSchedulesByGroup?:  {
    __typename: "ModelScheduleConnection",
    items:  Array< {
      __typename: "Schedule",
      id: string,
      name: string,
      group: string,
      status: ScheduleStatus,
      startedAt?: string | null,
      finishedAt?: string | null,
      startedYear?: string | null,
      startedMonth?: string | null,
      startedDate?: string | null,
      startedHour?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSchedulesbyGroupWithStatusAndYearAndMonthAndDateAndHourQueryVariables = {
  group: string,
  statusStartedYearStartedMonthStartedDateStartedHour?: ModelScheduleByGroupWithStatusAndYearAndMonthAndDateAndHourCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelScheduleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSchedulesbyGroupWithStatusAndYearAndMonthAndDateAndHourQuery = {
  listSchedulesbyGroupWithStatusAndYearAndMonthAndDateAndHour?:  {
    __typename: "ModelScheduleConnection",
    items:  Array< {
      __typename: "Schedule",
      id: string,
      name: string,
      group: string,
      status: ScheduleStatus,
      startedAt?: string | null,
      finishedAt?: string | null,
      startedYear?: string | null,
      startedMonth?: string | null,
      startedDate?: string | null,
      startedHour?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateScheduleSubscriptionVariables = {
  filter?: ModelSubscriptionScheduleFilterInput | null,
  owner?: string | null,
};

export type OnCreateScheduleSubscription = {
  onCreateSchedule?:  {
    __typename: "Schedule",
    id: string,
    name: string,
    group: string,
    status: ScheduleStatus,
    startedAt?: string | null,
    finishedAt?: string | null,
    startedYear?: string | null,
    startedMonth?: string | null,
    startedDate?: string | null,
    startedHour?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateScheduleSubscriptionVariables = {
  filter?: ModelSubscriptionScheduleFilterInput | null,
  owner?: string | null,
};

export type OnUpdateScheduleSubscription = {
  onUpdateSchedule?:  {
    __typename: "Schedule",
    id: string,
    name: string,
    group: string,
    status: ScheduleStatus,
    startedAt?: string | null,
    finishedAt?: string | null,
    startedYear?: string | null,
    startedMonth?: string | null,
    startedDate?: string | null,
    startedHour?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteScheduleSubscriptionVariables = {
  filter?: ModelSubscriptionScheduleFilterInput | null,
  owner?: string | null,
};

export type OnDeleteScheduleSubscription = {
  onDeleteSchedule?:  {
    __typename: "Schedule",
    id: string,
    name: string,
    group: string,
    status: ScheduleStatus,
    startedAt?: string | null,
    finishedAt?: string | null,
    startedYear?: string | null,
    startedMonth?: string | null,
    startedDate?: string | null,
    startedHour?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
