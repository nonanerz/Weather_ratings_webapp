/* global localStorage */

export function setUserToLocaleStorage (data) {
  localStorage.setItem('user', JSON.stringify(data))
}

export async function getUserFromLocaleStorage () {
  return JSON.parse(localStorage.getItem('user'))
}
