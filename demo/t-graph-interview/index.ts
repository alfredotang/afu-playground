export const NeighborsMap = new Map<number, number[]>([
  [1, [2, 3, 4]],
  [2, [1, 5]],
  [3, [1, 5]],
  [4, [1, 6]],
  [5, [2, 3, 7]],
  [6, [4, 7]],
  [7, [5, 6]],
])

const fetchNeighbors = async (node: number): Promise<{ data: number[] }> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: NeighborsMap.get(node) as number[] })
    }, 1000)
  })

const searchGraph = async (
  start: number,
  prev: number | null = null,
  list: Set<number> = new Set()
) => {
  if (prev && start < prev) return
  console.log(start)
  list.add(start)
  const { data } = await fetchNeighbors(start)
  await Promise.all(
    data
      .filter(node => !list.has(node))
      .map(node => searchGraph(node, start, list))
  )
}

const main = async () => {
  console.time('searchGraph')
  await searchGraph(1)
  console.timeEnd('searchGraph')
}
main()
