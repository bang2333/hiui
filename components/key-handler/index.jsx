import React, { useCallback, useState } from 'react'

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
  const { onFocus, onBlur, onMouseEnter, onMouseLeave, onKeyDown } = children.props
  return (
    <>
      {React.cloneElement(children, {
        onKeyDown: (e) => {
          if (displayName && displayName === 'modal') {
            console.log('添加按键')
            window.Mousetrap.bind('esc', (e) => {
              console.log('document.activeElement.nodeName', document.activeElement.nodeName)
              keyshandle.esc(e, document.activeElement.nodeName)
              window.Mousetrap.unbind('esc')
            })
          }
          onKeyDown && onKeyDown(e)
        },
        tabIndex: 0,
        onFocus: (e) => {
          if (displayName && displayName === 'modal') {
            onFocus && onFocus(e)
            return
          }
          bindKeyCallback()
          setIsFocus(true)
          console.log('聚焦', e)
        },
        onBlur: (e) => {
          if (displayName && displayName === 'modal') {
            onBlur && onBlur(e)
            return
          }
          !inSide && window.Mousetrap.reset()
          setIsFocus(false)
          console.log('失去焦点')
        },
        onMouseEnter: (e) => {
          if (displayName && displayName === 'modal') {
            onMouseEnter && onMouseEnter(e)
            return
          }
          setInSide(true)
          console.log('移入')
        },
        onMouseLeave: (e) => {
          if (displayName && displayName === 'modal') {
            onMouseLeave && onMouseLeave(e)
            return
          }
          !isFocus && window.Mousetrap.reset()
          setInSide(false)
          console.log('移出')
        }
      })}
    </>
  )
}

export default KeyHandler
