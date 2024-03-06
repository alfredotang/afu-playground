import { nanoid } from 'nanoid'

type StyledProps = { theme: typeof theme }

const styleMap = new Map<string, { className: string; style: string }>()

function generateClassName(style: string) {
  const key =
    style
      .replace(/(\n|\s)/g, '')
      .split(';')
      .filter(Boolean)
      .sort()
      .join(';') + ';'

  if (styleMap.has(key)) {
    return styleMap.get(key)?.className || ''
  }

  const className = nanoid(6)
  styleMap.set(key, { className, style })
  return className
}

const theme = {
  color: {
    primary: 'red',
    secondary: 'blue',
  },
  size: {
    xs: '1rem',
    sm: '1.5rem',
    md: '2rem',
    lg: '2.5rem',
    xl: '3rem',
  },
}

function createStyled(
  strs: TemplateStringsArray,
  ...exprs: Array<string | boolean | number | ((props: StyledProps) => string)>
) {
  const style = exprs.reduce<string>((result, expr, index) => {
    const value = typeof expr === 'function' ? expr({ theme }) : expr
    return `${result}${value}${strs[index + 1]}`
  }, strs[0])

  return { style, className: generateClassName(style) }
}

const styled = {
  div: createStyled,
  a: createStyled,
  h1: createStyled,
  h2: createStyled,
  h3: createStyled,
  h4: createStyled,
  h5: createStyled,
  span: createStyled,
  p: createStyled,
  button: createStyled,
  input: createStyled,
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.color.primary};
  height: ${props => props.theme.size.lg};
  width: ${props => props.theme.size.lg};
`

const Box = styled.div`
  height: ${props => props.theme.size.lg};
  display: flex;
  align-items: center;
  color: ${props => props.theme.color.primary};
  justify-content: center;
  width: ${props => props.theme.size.lg};
`

console.log({ Button, Box })
