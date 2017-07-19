
export const SET_UNREAD_MESSAGE_COUNT = 'SET_UNREAD_MESSAGE_COUNT';
export const INCREMENT_UNREAD_MESSAGE_COUNT = 'INCREMENT_UNREAD_MESSAGE_COUNT';
export const RESET_UNREAD_MESSAGES = 'RESET_UNREAD_MESSAGES';


export const setNotification = (type, notification) => ({
  type,
  notification
})

export const setMessageNotification = notification => (
  setNotification(SET_UNREAD_MESSAGE_COUNT, notification)
)

export const incrementMessageNotifications = notification => (
  setNotification(INCREMENT_UNREAD_MESSAGE_COUNT, notification)
)
