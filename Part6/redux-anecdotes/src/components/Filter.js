import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/anecdoteReducer'

const Filter = () => {
  const style = {
    marginBottom: 10,
  }

  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    event.preventDefault()
    //Dispatch action filterChange
    dispatch(filterChange(event.target.value))
  }
  return (
    <div style={style}>
      filter <input onChange={handleFilterChange} />
    </div>
  )
}

export default Filter
