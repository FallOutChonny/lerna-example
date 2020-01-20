import React from 'react'

export default function useReCAPTCHA() {
  const [captchaVal, setCaptchaVal] = React.useState()

  const [captchaErr, setCaptchaError] = React.useState<string | null>()

  const handleCaptcha = (captchaVal: any) => {
    setCaptchaError(null)
    setCaptchaVal(captchaVal)
  }

  return { handleCaptcha, captchaVal, captchaErr, setCaptchaError }
}
