import React from 'react'
import { filterChange } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const style = {
    marginBottom: 10,
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    //Dispatch action filterChange using directly the connected dispatch passed with action in prop
    props.filterChange(event.target.value)
  }
  return (
    <div style={style}>
      filter <input onChange={handleFilterChange} />
    </div>
  )
}
//MapDispatchToProps is a group of action creators functions passed
//to the connectedFilter component  as props instead of using the useDispatch
// hook to dispatch the actions
const mapDispatchToProps = {
  filterChange,
}
const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
