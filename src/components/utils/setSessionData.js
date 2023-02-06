export const setSessionData = (isLoggedIn, user = {}, profile = {}) => {
  let session = {
    isLoggedIn,
    user,
    profile,
  }
  window.sessionStorage.setItem('savedSession', JSON.stringify(session))
}

export const getSessionData = () => {
  return JSON.parse(sessionStorage.getItem('savedSession'))
}
