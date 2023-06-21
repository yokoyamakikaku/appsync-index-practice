import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import { add, format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import { fromIni } from  '@aws-sdk/credential-providers'
import { AppSyncClient, ListGraphqlApisCommand, GetDataSourceCommand } from '@aws-sdk/client-appsync'
import { CognitoIdentityProviderClient, ListUserPoolsCommand, ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'

const { random, floor } = Math

function getProfiles () {
  const homeDir = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
  const credentialsPath = path.resolve(homeDir, '.aws/credentials')
  const txt = fs.readFileSync(credentialsPath, { encoding: 'utf-8' })
  const lines = txt.split('\n')

  const profiles = []
  for (const line of lines) {
    const match = line.match(/\[(.*)\]/)
    if (!match) continue
    profiles.push(match[1])
  }

  return profiles
}

async function main () {
  const profiles = getProfiles()
  const profileChoices = []
  for (const profile of profiles) {
    profileChoices.push({ name: profile, value: profile })
  }

  /** @type {{ profile: string }} */
  const { profile } = await inquirer.prompt({
    type: "list",
    message: "AWS Profile を選択してください",
    name: "profile",
    choices: profileChoices
  })

  /** @type {{ region: string }} */
  const { region } = await inquirer.prompt({
    type: "input",
    message: "リージョンを入力してください",
    name: "region",
    default: 'ap-northeast-1',
  })

  const credentials = fromIni({ profile })

  const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({ credentials, region })
  const appSyncClient = new AppSyncClient({ credentials, region })
  const dynamoDb = new DynamoDB({ credentials, region })

  // NOTE: AppSync
  const graphqlApiChoices = []
  let listGraphqlApisNextToken
  do {
    const result = await appSyncClient.send(new ListGraphqlApisCommand({ nextToken: listGraphqlApisNextToken }))
    for (const graphqlApi of result.graphqlApis) graphqlApiChoices.push({ name: graphqlApi.name, value: graphqlApi})
    listGraphqlApisNextToken = result.nextToken
  } while (!!listGraphqlApisNextToken)

  /** @type {{ graphqlApi: import('@aws-sdk/client-appsync').GraphqlApi }} */
  const { graphqlApi: { apiId } } = await inquirer.prompt({
    type: "list",
    message: "APIを選択してください",
    name: "graphqlApi",
    choices: graphqlApiChoices
  })

  const { dataSource: ScheduleDataSource } = await appSyncClient.send(new GetDataSourceCommand({ apiId, name: 'ScheduleTable' }))
  if (!ScheduleDataSource) throw Error("Schedule Datasouce が存在しません")

  // NOTE: UserPool
  const userPoolChoices = []
  let listUserPoolsNextToken
  do {
    const result = await cognitoIdentityProviderClient.send(new ListUserPoolsCommand({ NextToken: listUserPoolsNextToken }))
    for (const UserPool of result.UserPools) userPoolChoices.push({ name: UserPool.Name, value: UserPool})
    listUserPoolsNextToken = result.NextToken
  } while (!!listUserPoolsNextToken)

  /** @type {{ UserPool: import('@aws-sdk/client-cognito-identity-provider').UserPoolType }} */
  const { UserPool } = await inquirer.prompt({
    type: "list",
    message: "UserPool を選択してください",
    name: "UserPool",
    choices: userPoolChoices
  })


  // NOTE: Cognito User
  const userChoices = []
  let listUsersNextToken
  do {
    const result = await cognitoIdentityProviderClient.send(new ListUsersCommand({ UserPoolId: UserPool.Id }))
    for (const User of result.Users) {
      let name = 'NO_NAME'
      for (const Attribute of User.Attributes) {
        if (Attribute.Name !== "name") continue
        name = `${Attribute.Value}`
        break
      }
      name += ` (${User.Username})`
      userChoices.push({ name, value: User })
    }
    listUserPoolsNextToken = result.NextToken
  } while (!!listGraphqlApisNextToken)

  /** @type {{ User: import('@aws-sdk/client-cognito-identity-provider').UserType }} */
  const { User } = await inquirer.prompt({
    type: "list",
    message: "User を選択してください",
    name: "User",
    choices: userChoices
  })

  const TableName = ScheduleDataSource.dynamodbConfig.tableName

  const { count } = await inquirer.prompt({
    type: "number",
    message: "作成するデータの数を入力してください",
    name: "count",
    default: 10000
  })

  if (count < 1) throw Error("1より小さい値が入力されました")
  if (count > 10000) throw Error("10000より大きい値が入力されました")

  const schedules = []
  const rangeStartDate = new Date('2023-01-01 00:00:00')
  const createLabel = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  const today = new Date().toISOString()
  const createdAt = today
  const updatedAt = today
  for (let i = 0; i < count; i++) {
    const date = add(rangeStartDate, { days: floor(random() * 365) })
    const startedAtDate = add(date, { hours: floor(random() * 12) })
    const finishedAtDate = add(startedAt, { hours: floor(random() * 12) })
    const owner = `${User.Username}::${User.Username}`

    const startedAt = startedAtDate.toISOString()
    const finishedAt = finishedAtDate.toISOString()

    const match = startedAt.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):\d{2}:\d{2}.\d{3}Z/)
    if (!match) throw Error("Invalid Date")

    const startedYear = match[1]
    const startedMonth = match[2]
    const startedDate = match[3]
    const startedHour = match[4]

    schedules.push({
      __typename: 'Schedule',
      id: uuid(),
      name: `Schedule ${createLabel}#${i + 1}`,
      group: `Group ${floor(20 * random())}`,
      status: ['ACTIVE', 'DISACTIVE'][floor(random() * 2)],
      startedAt: startedAt,
      finishedAt: finishedAt,
      startedYear: startedYear,
      startedMonth: startedMonth,
      startedDate: startedDate,
      startedHour: startedHour,
      createdAt: createdAt,
      updatedAt: updatedAt,
      owner: owner
    })
  }

  for (let i = 0; i < schedules.length; i++) {
    const { answer } = await inquirer.prompt({
      type: "input",
      message: "データを確認しますか？ (y/n)",
      name: "answer",
      default: 'y'
    })

    if (answer !== 'y') break

    const schedule = schedules[i]

    console.info(`scheduls[${i}]`)
    console.info(schedule)
  }

  if (
    (await inquirer.prompt({
      type: "input",
      message: "データを作成しますか？ (y/n)",
      name: "answer"
    })).answer.toLowerCase() !== 'y'
  ) {
    console.info("中止しました")
    return
  }

  for (const schedule of schedules) {
    await dynamoDb.putItem({
      TableName, Item: marshall(schedule)
    })
  }
}

main()
