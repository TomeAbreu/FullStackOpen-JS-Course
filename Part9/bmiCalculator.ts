//Interface is a way to desing the shape of an object
// in this case parseArguments will return two values of type number
interface BMIValues {
  value1: number
  value2: number
}

const parse1Arguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const bmiCalculator = (height: number, weight: number): void => {
  let alt = height * 0.01 * (height * 0.01)

  const result: number = weight / alt
  console.log(result)
  let textResult: string

  if (result < 18.4) {
    textResult = 'Underweight'
  } else if (result > 18.4 && result <= 24.9) {
    textResult = 'Normal'
  } else if (result >= 25.0 && result <= 29.9) {
    textResult = 'Overweight'
  } else {
    textResult = 'Obese'
  }
  console.log(textResult)
}

try {
  //Parse arguments
  const { value1, value2 } = parse1Arguments(process.argv)
  bmiCalculator(value1, value2)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
