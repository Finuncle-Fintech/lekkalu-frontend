export type IconType = 'warning' | 'default' | 'financial';

type notificationType = { message: string, type: IconType }

export const notificationMock: Array<notificationType> = [
    {
        message: 'This is a notification common',
        type: 'default'
    },
    {
        message: 'This is a notification warning',
        type: 'warning'
    },
    {
        message: 'This is a notification of financial data',
        type: 'financial'
    }
]
