import { startOfDay, endOfDay } from "date-fns"

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
