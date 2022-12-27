import { useState } from 'react'

//Custom Hook for form fields
export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  //Retrieve all atributtes required by  input in a form
  return {
    type,
    value,
    onChange,
  }
}
