import { Schedule } from "@/API";
import { UseQueryResult } from "@tanstack/react-query";

function convertMilliseconds(ms: number) {
  const milliseconds = ms % 1000;
  let seconds = Math.floor(ms / 1000);
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(4, '0')}`;
  return formattedTime;
}

export function getQueryResult(name: string, query: UseQueryResult<{
  startedAt: number
  finishedAt: number
  items: any[][]
}>) {
  if (!query.isSuccess) {
    return { name }
  }

  return {
    name,
    requestCount: query.data?.items.length ?? 0,
    itemCount: query.data?.items.reduce((count, items) => count + items.length, 0) ?? 0,
    elapsedTime: convertMilliseconds(
      (query.data?.finishedAt as number )
      - (query.data?.startedAt as number)
    )
  }
}
