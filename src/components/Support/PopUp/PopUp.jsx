import closeImage from './static/close.png'
import styles from './PopUp.module.css'
import { useState, useRef } from 'react'
import checkEmail from './utils/checkEmail'

export default function SupportPopUp(){
    const [close, setClose] = useState(false)

    const formRef = useRef(null)
    const emailRef = useRef(null)
    const [ email, setEmail ] = useState('')
    const [ error, setError ] = useState()
    const handleChange = () =>{
        const emailInput = emailRef.current
        emailInput.style.borderBottom=''

        setError(false)
        setEmail(emailInput.value)

    }
    const handleSubmit = (event) =>{
        event.preventDefault()
        const emailInput = emailRef.current
        const form = formRef.current

        if(checkEmail(email)){
            form.submit()
        }
        else{
            emailInput.style.borderBottom='1px red solid'
            setError(true)
        }
      
    }

    return(
        <div className={styles.container} style={{display:close&&'none'}} id='popUpSupport'>
            <img src={closeImage} alt="" className={styles.close} onClick={()=>setClose(close?false:true)}/>
            <h3 className={styles.title}>Share Your Thoughts with Us</h3>

            <form ref={formRef} action="" className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.containerInput}>
                    <input type="text" placeholder='Name' className={styles.inputName} required />
                    <div>
                        <input type="Email" placeholder='Email' className={styles.inputEmail} onChange={handleChange} required ref={emailRef}/>
                        {error&&(<p className={styles.errorEmail}>Check the email please.</p>)}
                    </div>
                </div>
                <textarea name="" placeholder='Subject and description.' id="SubjectUser" cols="30" rows="10" className={styles.textarea} required></textarea>
                <button type="submit" value="Submit" className={styles.submit} >Submit</button>
            </form>

        </div>
    )
}