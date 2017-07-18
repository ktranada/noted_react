
export const NOTIFICATION_MESSAGES = 'NOTIFICATION_MESSAGES';
export const NOTIFICATION_INCREMENT_MESSAGES = 'NOTIFICATION_INCREMENT_MESSAGES';
export const RESET_UNREAD_MESSAGES = 'RESET_UNREAD_MESSAGES';


export const setNotification = (type, notification) => ({
  type,
  notification
})

export const setMessageNotification = notification => (
  setNotification(NOTIFICATION_MESSAGES, notification)
)

export const incrementMessageNotifications = notification => (
  setNotification(NOTIFICATION_INCREMENT_MESSAGES, notification)
)
