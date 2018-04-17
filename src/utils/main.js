/* global sessionStorage */

export function setUserToSessionStorage (data) {
  sessionStorage.setItem('user', JSON.stringify(data))
}

export async function getUserFromSessionStorage () {
  return JSON.parse(sessionStorage.getItem('user'))
}

export function changeAvatarUrl (avatarUrl) {
  if (typeof avatarUrl === 'string' && /lookaside.facebook.com/.test(avatarUrl)) {
    let url = avatarUrl.match(/asid=(.*?)&/g).join('')
    let id = url.slice(5, url.length - 1)
    return `https://graph.facebook.com/${id}/picture?type=large`
  } else {
    return avatarUrl
  }
}
