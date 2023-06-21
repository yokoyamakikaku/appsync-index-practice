import { CreateScheduleInput } from "@/API"
import { startOfDay, endOfDay } from "date-fns"
import { YearAndMonthSet } from "./types"
import { MONTH_PER_YEAR } from "./constants"

export function zeroPad(number: number, length: number): string {
  let str = number.toString();
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

export function devideDateString (dateString: string) {
  const match = dateString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z/)
  if (!match) throw Error("Invalid Date")
  return {
    year: match[1] as string,
    month: match[2] as string,
    day: match[3] as string,
    hour: match[4] as string,
    minute: match[5] as string,
    second: match[6] as string,
    millsecond: match[7] as string,
  }
}

export function getDateRange (startedDate: string, finishedDate: string) {
  return [
    startOfDay(new Date(startedDate)).toISOString(),
    endOfDay(new Date(finishedDate)).toISOString()
  ] as [string, string]
}

export function getCreateInputForIndex (startedAt: string) {
  const {
    year, month, day
  } = devideDateString(startedAt)

  return {
    startedYear: year,
    startedMonth: month,
    startedDay: day,
  } as Pick<CreateScheduleInput, 'startedYear' | "startedMonth" | "startedDay">
}

export function getYearAndMonthSetsFromDateRange ([ startedAt, finishedAt ] : [string, string]) {
  const yearAndMonthSets: YearAndMonthSet[] = []

  const { year: startedYear, month: startedMonth }  = devideDateString(startedAt)
  const { year: finishedYear, month: finishedMonth }  = devideDateString(finishedAt)

  for (let year = +startedYear; year <= +finishedYear; year++) {
    for (let month = 1; month <= MONTH_PER_YEAR; month++) {
      // NOTE: 開始位置以前の為含まない
      if (year === +startedYear && month < +startedMonth) continue

      // NOTE: 終了位置を超えたら終了
      if (year === +finishedYear && month > +finishedMonth) break

      yearAndMonthSets.push({
        year: zeroPad(year, 4),
        month: zeroPad(month, 2),
      })
    }
  }

  return yearAndMonthSets
}

export function getYearAndMonthAndDaySetsFromDateRange ([ startedAt, finishedAt ] : [string, string]) {
  const yearAndMonthAndDateSets = []

  const { year: startedYear, month: startedMonth, day: startedDay }  = devideDateString(startedAt)
  const { year: finishedYear, month: finishedMonth, day: finishedDay }  = devideDateString(finishedAt)

  for (let year = +startedYear; year <= +finishedYear; year++) {
    for (let month = 1; month <= MONTH_PER_YEAR; month++) {
      // NOTE: 開始位置以前の為含まない
      if (year === +startedYear && month < +startedMonth) continue
      // NOTE: 終了位置を超えたら終了
      if (year === +finishedYear && month > +finishedMonth) break

      const daysInMonth = new Date(year, month, 0).getDate(); // 現在の月の日数を取得

      for (let day = 1; day <= daysInMonth; day++) {
        // NOTE: 開始位置以前の為含まない
        if (year === +startedYear && month === +startedMonth && day < +startedDay) continue
        // NOTE: 終了位置を超えたら終了
        if (year === +finishedYear && month === +finishedMonth && day > +finishedDay) break

        yearAndMonthAndDateSets.push({
          year: zeroPad(year, 4),
          month: zeroPad(month, 2),
          day: zeroPad(day, 2),
        })
      }
    }
  }

  return yearAndMonthAndDateSets
}
