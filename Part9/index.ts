const multiplicator = (a: number, b: number, printText) => {
  console.log(printText, a * b)
}

multiplicator(3, 4, 'Multiplied a string and 4, the result is:')

//Create custom type Operation that is a union of three possible operations as string literals
type Operation = 'multiply' | 'add' | 'divide' | 'subtract'

const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case 'multiply':
      return a * b
    case 'divide':
      if (b === 0) throw new Error("Can't divide by 0!")
      return a / b
    case 'add':
      return a + b
    default:
      throw new Error('Operation is not multiply, add or divide!')
  }
}

try {
  console.log(calculator(1, 0, 'subtract'))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
