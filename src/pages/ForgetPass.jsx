import React, { useState } from 'react'
import ForgetPassDesign from '../components/pages/ForgetPassDesign'
import VerifyEmail from '../components/pages/VerifyEmail'
import ResetPass from '../components/pages/ResetPass'

const ForgetPass = () => {
  const [email, setEmail] = useState('')
  const [isVerified, setIsverified] = useState(false)
  return (
    <>
      {
        !email ? <ForgetPassDesign setEmail={setEmail} /> :
          !isVerified ? <VerifyEmail email={email} setIsverified={setIsverified} /> :
            <ResetPass email={email} />
      }
    </>
  )
}

export default ForgetPass