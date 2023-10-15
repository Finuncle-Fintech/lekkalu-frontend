import { useState, useRef, useContext } from 'react'
import { Context } from 'provider/Provider'
import closeImage from './static/close.png'
import styles from './PopUp.module.css'
import checkEmail from './utils/checkEmail'
import SendForm from './Components/SendForm/SendForm'
import Background from './Components/Background/Background'

export default function SupportPopUp() {
  const [close, setClose] = useState(false)
  const handleClose = () => {
    setClose(!close)
  }

  const { giveFeedback } = useContext(Context)
  const formRef = useRef(null)
  const emailRef = useRef(null)
  const nameRef = useRef(null)
  const subjectRef = useRef(null)
  const submitRef = useRef(null)
  const [email, setEmail] = useState('')
  const [error, setError] = useState()
  const [emailSended, setEmailSended] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const emailInput = emailRef.current

    if (checkEmail(email)) {
      const newFeedback = {
        name: nameRef.current.value,
        email,
        subject_and_description: subjectRef.current.value,
      }

      setSending(true)
      const statusFeedback = await giveFeedback(newFeedback)
      if (statusFeedback[0] === 201) {
        handleClose()
        setEmailSended(true)
        setTimeout(() => {
          resetValues()
        }, 2400)
      } else {
        alert('Error sending the feedback')
        handleClose()
        resetValues()
      }
    } else {
      emailInput.style.borderBottom = '1px red solid'
      setError(true)
    }
  }
  const handleChange = () => {
    const emailInput = emailRef.current
    emailInput.style.borderBottom = ''

    setError(false)
    setEmail(emailInput.value)
  }
  const resetValues = () => {
    setEmailSended(false)
    emailRef.current.value = ''
    nameRef.current.value = ''
    subjectRef.current.value = ''
    setSending(false)
  }

  return (
    <>
      <Background handleClose={handleClose} close={close} />
      <SendForm emailSended={emailSended} />

      <div className={styles.container} style={{ display: close && 'none' }} id='popUpSupport'>
        <div className={styles.containerCloseTitle}>
          <img src={closeImage} alt='' className={styles.close} onClick={handleClose} />
          <h3 className={styles.title}>Share Your Thoughts with Us</h3>
        </div>

        <form ref={formRef} action='' className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.containerInput}>
            <input type='text' placeholder='Name' className={styles.inputName} ref={nameRef} required />
            <div>
              <input
                type='Email'
                placeholder='Email'
                className={styles.inputEmail}
                onChange={handleChange}
                required
                ref={emailRef}
              />
              {error && <p className={styles.errorEmail}>Check the email please.</p>}
            </div>
          </div>
          <textarea
            name=''
            placeholder='Subject and description.'
            ref={subjectRef}
            id='SubjectUser'
            cols='30'
            rows='10'
            className={styles.textarea}
            required
          />
          <button ref={submitRef} type='submit' value='Submit' disabled={sending} className={styles.submit}>
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
