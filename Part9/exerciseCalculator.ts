//Interface for object returing from the calculator
interface IExerciseCalculator {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface IExerciseCalculatorValues {
  value1: number
  value2: Array<number>
}

//Parse arguments function
const parseArgumentsExerciseCalculator = (
  args: Array<string>
): IExerciseCalculatorValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')
  let secondArgument: Array<number> = JSON.parse(args[3])

  return {
    value1: Number(args[2]),
    value2: secondArgument,
  }
}

//Funtion
const calculateExercises = (
  targetDaily: number,
  dailyHours: Array<number>
): IExerciseCalculator => {
  //Do the functionality

  //Calculate number of days with training time
  let trainingDays = dailyHours.reduce((accumulator, element) => {
    return element === 0 ? accumulator : (accumulator = accumulator + 1)
  }, 0)
  //Calculate average
  let average =
    dailyHours.reduce((accumulator, element) => {
      return element !== 0 ? accumulator + element : accumulator
    }, 0) / dailyHours.length

  let rating = dailyHours.reduce((accumulator, element) => {
    return element >= targetDaily
      ? (accumulator = accumulator + 1)
      : accumulator
  }, 0)
  //Calculate rating
  rating = rating >= dailyHours.length ? 3 : rating

  rating = rating > 3 ? 3 : rating < 0 ? 0 : rating

  const ratingDescriptionFunc = (rating: number): string => {
    let desc
    if (rating === 1) {
      desc = 'Not to bad could be better'
    } else if (rating === 2) {
      desc = 'Good could be better'
    } else {
      desc = 'Excellent the target was perfect'
    }
    return desc
  }
  let ratingDescription = ratingDescriptionFunc(rating)

  let result: IExerciseCalculator = {
    periodLength: dailyHours.length,
    trainingDays: trainingDays,
    success: average < targetDaily ? false : true,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetDaily,
    average: average,
  }

  return result
}

try {
  //Parse arguments
  const { value1, value2 } = parseArgumentsExerciseCalculator(process.argv)
  console.log('VALUE1: ', value1)
  console.log('VALUE2: ', value2)
  console.log(calculateExercises(value1, value2))
} catch (error: any) {
  let errorMessage = 'Something bad happened. ' + error.message

  console.log(errorMessage)
}
