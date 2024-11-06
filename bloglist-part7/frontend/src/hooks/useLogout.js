//Refactored some functionalities from App.jsx to hooks. Not sure if this is the correct way to do it.

//Function for handling user loggin out
const useLogout = (showMessage, setUser) => {
  const handleLogout = async () => {
    //clear local storage
    window.localStorage.clear()

    //Show logout message
    const messageLogout = 'Logged out succesfully!'
    showMessage(messageLogout, 'success')

    //set state
    setUser(null)
  }

  return { handleLogout }
}

export default useLogout