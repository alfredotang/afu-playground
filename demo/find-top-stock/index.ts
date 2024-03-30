type StockChoiceByUser = Record<string, string[]>

const stockChoiceByUser: StockChoiceByUser = {
  user1: ['2330', '0050', '0056'],
  user2: ['2330', '0050', '1234'],
  user3: ['2330', '0056', '2468'],
}

// o(m + n log n + k)
// string[]
function topK(data: StockChoiceByUser, k: number) {
  const hashMap = new Map<string, number>()
  const result = new Map<number, string[]>()
  const stocks = Object.values(data).flat()

  // o(m)
  for (const stock of stocks) {
    hashMap.set(stock, (hashMap.get(stock) || 0) + 1)
  }

  // console.log(hashMap)

  hashMap.forEach((value, key) => {
    const previous = result.get(value) || []
    previous.push(key)
    result.set(value, previous)
  })

  // o(m log m)

  // on(m)
  return [...result]
    .sort((a, b) => b[0] - a[0])
    .slice(0, k)
    .map(item => item[1])
    .flat()
}

console.log(topK(stockChoiceByUser, 2))
