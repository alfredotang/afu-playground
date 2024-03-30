export class Staff {
  private name: string
  constructor(name: string) {
    this.name = name
  }

  get val() {
    return this.name
  }

  set val(name: string) {
    this.name = name
  }
}

const staff = new Staff('John Doe')
console.log(staff.val)
staff.val = 'P Doe'
console.log(staff.val)
