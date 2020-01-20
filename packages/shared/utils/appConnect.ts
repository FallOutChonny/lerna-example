import { Modal } from 'antd-mobile'
import Cookies from 'js-cookie'
import request from '../services/request'

const alert = Modal.alert

/**
 * @params funcName: app 中匹配的 function 名稱
 * @params param: 呼叫 app 裡的 function 所使用參數
 */
export const appConnect = (funcName: string, param?: any) => {
  if (param) {
    console.info(funcName, JSON.stringify(param))
  } else {
    console.log(funcName)
  }

  try {
    if (navigator.userAgent.match(/Android/i)) {
      return param
        ? window.Android[funcName](JSON.stringify(param))
        : window.Android[funcName]()
    }

    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      return param
        ? window.webkit.messageHandlers[funcName].postMessage(
            JSON.stringify(param),
          )
        : window.webkit.messageHandlers[funcName].postMessage()
    }
  } catch (error) {
    console.log(error)

    if (funcName !== 'getFCMToken') {
      alert('發生錯誤', '此功能只能在 APP 使用', [{ text: '確定' }])
    }
  }
}

export const useGoogleMapApp = (address: string) => {
  const handleOpenGoogleMap = () => {
    if (!address) {
      alert('尚未設定地址', '請重新設定後再使用', [{ text: '確定' }])
      return
    }

    appConnect('launchGoogleMap', address)
  }

  return handleOpenGoogleMap
}

export const useQrcodeScannerApp = () => {
  const handleOpenQRCodeScanner = (callback: (code: string) => any) => {
    appConnect('launchQRCode')

    window.onQRCodeResult = (code: string) => callback(code)
  }

  return handleOpenQRCodeScanner
}

export const loadFCMToken = async (callback?: (token: string) => any) => {
  const token: string = appConnect('getFCMToken')

  console.log(token)

  await request('/user/fcmToken', {
    method: 'PUT',
    body: { fcmToken: token },
  })

  Cookies.set('fcmtoken', token)

  if (callback) {
    return callback(token)
  }
}

export default appConnect
