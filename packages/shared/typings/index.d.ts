declare module 'apollo-link-logger'

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function
  Android: any
  webkit: any
  onQRCodeResult(code: string): any
}

declare namespace React {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: import('react').CSSProperties
  }
}
