import Cookies from 'js-cookie'

const TOKEN = 'token'

export const setToken = (token) => {
  Cookies.set(TOKEN, token, { secure: true, sameSite: 'Strict' })
}

export const getToken = () => {
  return Cookies.get(TOKEN)
}

export const removeToken = () => {
  Cookies.remove(TOKEN)
}
