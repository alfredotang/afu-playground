export class Human {
  private _firstName: string
  private _lastName: string
  private _age: number

  constructor({
    firstName,
    lastName,
    age,
  }: {
    firstName: string
    lastName: string
    age: number
  }) {
    this._firstName = firstName
    this._lastName = lastName
    this._age = age
  }

  public get name() {
    return `${this._firstName} ${this._lastName}`
  }

  public get age() {
    return this._age
  }
}

type Position =
  | 'Junior'
  | 'Senior'
  | 'Lead'
  | 'Manager'
  | 'Director'
  | 'VP'
  | 'C-Level'
  | 'Founder'
  | 'CEO'

type Department = 'Engineering' | 'Product' | 'Design' | 'Marketing'

export class Employee extends Human {
  private _salary: number
  private _department: Department
  private _position: Position
  private C_LEVEL_TITLE_DICT = {
    Engineering: 'CTO',
    Product: 'CPO',
    Design: 'CCO',
    Marketing: 'CMO',
  } as const

  constructor({
    firstName,
    lastName,
    age,
    salary,
    department,
    position,
  }: {
    firstName: string
    lastName: string
    age: number
    salary: number
    department: Department
    position: Position
  }) {
    super({ firstName, lastName, age })
    this._salary = salary
    this._department = department
    this._position = position
  }

  public get salary() {
    return this._salary
  }

  public get department() {
    return this._department
  }

  public get position() {
    return this._position
  }

  public get title() {
    if (this._position === 'Founder' || this._position === 'CEO')
      return this._position

    if (this._position === 'C-Level') {
      return this.C_LEVEL_TITLE_DICT[this._department]
    }

    return `${this._position} ${this._department}`
  }

  public promote(position: Position, salary?: number) {
    this._position = position
    if (salary != null) this.raise(salary)
  }

  public raise(salary: number) {
    this._salary = salary
  }

  public transfer({
    department,
    position,
    salary,
  }: {
    department: Department
    position?: Position
    salary?: number
  }) {
    this._department = department
    if (position) this._position = position
    if (salary != null) this._salary = salary
  }
}

const jacky = new Employee({
  firstName: 'Jacky',
  lastName: 'Liu',
  age: 31,
  salary: 300,
  department: 'Product',
  position: 'C-Level',
})

console.log(jacky.name, jacky.title, jacky.salary)
