import { useQuery } from '@tanstack/react-query'

import { getData } from '@app/state/async.state'

const QUERYKEY = 'tasks'

/** Custom Query Hook, Gets Tasks from Local Store */
export const useGetTasks = () => {
  return useQuery({
    queryKey: [QUERYKEY],
    queryFn: () => getData(QUERYKEY),
  })
}
