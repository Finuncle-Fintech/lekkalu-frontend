import React, { cloneElement } from 'react'
import { AlertDialogActionProps, AlertDialogCancelProps } from '@radix-ui/react-alert-dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '../ui/alert-dialog'

type Props = {
  className?: string
  style?: React.CSSProperties
  trigger: React.ReactElement
  title: string
  description?: string
  okText?: string
  cancelText?: string
  onCancel?: () => void
  cancelProps?: AlertDialogCancelProps
  onOk?: () => void
  okButtonProps?: AlertDialogActionProps
}

export default function Alert({
  className,
  style,
  trigger,
  title,
  description,
  okText,
  cancelText,
  onCancel,
  cancelProps,
  onOk,
  okButtonProps,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{cloneElement(trigger)}</AlertDialogTrigger>
      <AlertDialogContent className={className} style={style}>
        <AlertDialogHeader>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              onCancel?.()
            }}
            {...cancelProps}
          >
            {cancelText ?? 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onOk?.()
            }}
            {...okButtonProps}
          >
            {okText ?? 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
