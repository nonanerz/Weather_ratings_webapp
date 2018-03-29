/* global sessionStorage */

export function setUserToSessionStorage (data) {
  sessionStorage.setItem('user', JSON.stringify(data))
}

export async function getUserFromSessionStorage () {
  return JSON.parse(sessionStorage.getItem('user'))
}
