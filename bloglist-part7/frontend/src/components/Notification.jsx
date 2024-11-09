import { useSelector } from 'react-redux'
//Function for rendering notifications to user
const Notification = () => {
  const message = useSelector((state) => {
    //console.log(state.message)
    return state.message
  })

  if (message === null) {
    return null
  }

  const notificationClass =
    message.type === 'success' ? 'notification success' : 'notification error'

  return <div className={notificationClass}>{message.text}</div>
}

export default Notification
