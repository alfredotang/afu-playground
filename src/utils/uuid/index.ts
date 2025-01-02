import { nanoid } from 'nanoid'

// Function to generate a standard UUID
function generateUUID() {
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  return template.replace(/[xy]/g, char => {
    const random = parseInt(nanoid(1), 36) % 16 // Get a random number between 0 and 15
    const value = char === 'x' ? random : (random & 0x3) | 0x8 // Ensure `y` char matches UUID spec
    return value.toString(16)
  })
}

export default generateUUID
