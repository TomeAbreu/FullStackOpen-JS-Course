import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  if (!props.notification) {
    return <div></div>
  } else {
    return <div style={style}>{props.notification}</div>
  }
}
//MapStateToProps connect functionn to map the state to props of Notification component
//In this case Notification component used notification state with useSelector hook
//Now it's in the props of ConnectedNotification component
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}
//Connected Notifcation Component
const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
