import React, { useCallback, useState } from 'react'

import './mousetrap.js'
const KeyHandler = ({ children, keyshandle = [] }) => {
  const [inSide, setInSide] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const bindKeyCallback = useCallback(() => {
    Object.keys(keyshandle).forEach((code) => {
      window.Mousetrap.bind(code, (e) => {
        console.log(document.activeElement.nodeName)
        keyshandle[code](e, document.activeElement.nodeName)
      })
    })
  }, [keyshandle])
  return (
    <div
      id="hi-key-handler"
      style={{ display: 'inline-block' }}
      onFocus={() => {
        bindKeyCallback()
        setIsFocus(true)
        console.log('聚焦')
      }}
      onBlur={() => {
        !inSide && window.Mousetrap.reset()
        setIsFocus(false)
        console.log('失去焦点')
      }}
      onMouseEnter={() => {
        setInSide(true)
        console.log('移入')
      }}
      onMouseLeave={() => {
        !isFocus && window.Mousetrap.reset()
        setInSide(false)
        console.log('移出')
      }}
    >
      {children}
    </div>
  )
}

export default KeyHandler
