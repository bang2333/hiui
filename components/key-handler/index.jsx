import React, { useCallback, useEffect, useState } from 'react'

import './mousetrap.js'
const KeyHandler = ({ children, keyshandle = [], displayName }) => {
  const [inSide, setInSide] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const bindKeyCallback = useCallback(() => {
    Object.keys(keyshandle).forEach((code) => {
      window.Mousetrap.bind(code, (e) => {
        e.stopPropagation()
        keyshandle[code](e, document.activeElement.nodeName)
      })
    })
  }, [keyshandle])
  useCallback(() => {
    const modal = document.querySelector('hi-modal')
    const mousetrapModal = new Mousetrap(modal)
    mousetrapModal.bind('esc', (e) => {})
  }, [children])
  return (
    <div
      id="hi-key-handler"
      style={{ display: 'inline-block', width: '100%' }}
      onFocus={(e) => {
        bindKeyCallback()
        setIsFocus(true)
        console.log('聚焦', e)
      }}
      onBlur={() => {
        !inSide && window.Mousetrap.reset()
        setIsFocus(false)
        console.log('失去焦点')
      }}
      onMouseEnter={() => {
        setInSide(true)
        console.log('移入')
        if (displayName && displayName === 'modal') {
          window.Mousetrap.bind('esc', (e) => {
            keyshandle.esc(e, document.activeElement.nodeName)
            window.Mousetrap.unbind('esc')
          })
        }
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
