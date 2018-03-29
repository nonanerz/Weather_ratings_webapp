import {LIVE} from '../config'

export const CHANGE_STATE_PROP = '_CHANGE_STATE_PROP'
export const FACEBOOK_APP_ID_LIVE = 191608621449296
export const FACEBOOK_APP_ID_TEST = 157166725000122
export const FACEBOOK_APP_ID = LIVE ? FACEBOOK_APP_ID_LIVE : FACEBOOK_APP_ID_TEST

export const EMAIL_REGEXP = /(([\w-]+\.)+[\w-]+|([a-zA-Z]{1}|[\w-]{2,}))@((([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\.([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\\.([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\\.([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])){1}|([a-zA-Z][\w-]+\.)+[a-zA-Z]{2,4})/
