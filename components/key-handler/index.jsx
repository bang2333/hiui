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
        return false
      })
    })
  }, [keyshandle])
  const { onFocus, onBlur, onMouseEnter, onMouseLeave, onKeyDown } = children.props
  const containerComponent = ['modal']
  return (
    <>
      {displayName && containerComponent.includes(displayName)
        ? React.cloneElement(children, {
            onKeyDown: (e) => {
              console.log(e.which, e.target)
              console.log('document.activeElement.nodeName', document.activeElement)
              onKeyDown && onKeyDown(e)
            },
            tabIndex: 0
          })
        : React.cloneElement(children, {
            onFocus: (e) => {
              bindKeyCallback()
              setIsFocus(true)
              console.log('聚焦', e)
              onFocus && onFocus(e)
            },
            onBlur: (e) => {
              !inSide && window.Mousetrap.reset()
              setIsFocus(false)
              console.log('失去焦点')
              onBlur && onBlur(e)
            },
            onMouseEnter: (e) => {
              setInSide(true)
              console.log('移入')
              onMouseEnter && onMouseEnter(e)
            },
            onMouseLeave: (e) => {
              !isFocus && window.Mousetrap.reset()
              setInSide(false)
              console.log('移出')
              onMouseLeave && onMouseLeave(e)
            }
          })}
    </>
  )
}

export default KeyHandler
