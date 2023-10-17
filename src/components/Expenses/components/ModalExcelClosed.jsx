import { useState } from 'react'
import styles from './ModalExcelClosed.module.css'

export default function ModalExcelClosed({ createExpenseExcelStatus }) {
  const [open, setOpen] = useState(true)
  const excelUploaded = createExpenseExcelStatus.length - 1

  return (
    <div className={styles.container} style={open ? { display: 'fixed' } : { display: 'none' }}>
      <button
        onClick={() => {
          setOpen(false)
        }}
      >
        ✖
      </button>
      <span>
        Your files are uploading{' '}
        <b>
          {excelUploaded}/{createExpenseExcelStatus[0]?.excelLength}
        </b>
      </span>
    </div>
  )
}
