import fs from 'node:fs/promises'
import path from 'node:path'

// hsl

const parseColorFlag = (_value: string) => {
  let value = _value
  const hasPercentage = value.includes('%')
  if (hasPercentage) {
    value = _value.replace('%', '')
  }

  value = `${Math.round(parseFloat(value))}`

  if (hasPercentage) {
    value = value + '%'
  }

  return value
}

const main = async () => {
  const template = await fs.readFile(
    path.join(__dirname, 'template.txt'),
    'utf-8'
  )

  const result = template
    .trim()
    .split('\n')
    .filter(Boolean)
    .filter(name => !name.includes('--radius'))
    .map(item => item.trim())
    .map(item => item.split(':').map(item => item.trim().replace(';', '')))
    .map(([key, value]) => [
      key,
      value.split(' ').map(parseColorFlag).join(','),
    ])
    .map(([key, value]) => [`${key}:`, `hsl(${value});`].join(' '))
    .join('\n')

  await fs.writeFile(path.join(__dirname, 'style.txt'), result)
}

main()
