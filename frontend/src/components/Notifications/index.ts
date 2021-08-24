import { store as Notifications } from 'react-notifications-component'

export const InfoNotification = (message: string) => {
  Notifications.addNotification({
    title: 'ACCOUNTS',
    message,
    type: 'info',
    insert: 'bottom',
    container: 'bottom-right',
    dismiss: {
      duration: 5000,
    },
  })
}

export const SuccessNotification = (message: string) => {
  Notifications.addNotification({
    title: 'ACCOUNTS',
    message,
    type: 'success',
    insert: 'bottom',
    container: 'bottom-right',
    dismiss: {
      duration: 5000,
    },
  })
}

export const WarningNotification = (message: string) => {
  Notifications.addNotification({
    title: 'ACCOUNTS',
    message,
    type: 'warning',
    insert: 'bottom',
    container: 'bottom-right',
    dismiss: {
      duration: 5000,
    },
  })
}

export const DangerNotification = (message: string) => {
  Notifications.addNotification({
    title: 'ACCOUNTS',
    message,
    type: 'danger',
    insert: 'bottom',
    container: 'bottom-right',
    dismiss: {
      duration: 5000,
    },
  })
}

