import { useQuery } from '@tanstack/react-query'
import { getData } from '@app/app/state/local.store'

import { Task } from '@repo/ui'

const QUERYKEY = 'tasks'

/** Custom Query Hook, Gets Tasks from Local Store */
export const useGetTasks = () => {
  return useQuery<Task[]>({
    queryKey: [QUERYKEY],
    queryFn: () => getData(QUERYKEY),
  })
}
