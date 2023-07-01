import { format, set } from 'date-fns'

import { ScheduleStatus } from '@/API'
import { FormValues } from './types'

export function getDefaultValues () {
  return {
    group: 'Group',
    status: ScheduleStatus.ACTIVE,
    startedDate: format(set(new Date(), { month: 0, date: 1 }), 'yyyy-MM-dd'),
    finishedDate: format(set(new Date(), { month: 11, date: 31 }), 'yyyy-MM-dd'),
  } as FormValues
}
