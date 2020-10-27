import React, { useCallback } from 'react'

import './mousetrap.js'
const KeyHandler = ({ children, keyhandleList = [] }) => {
  const bindKeyCallback = useCallback(() => {
    keyhandleList.forEach((item) => {
      const { code, callback } = item
      window.Mousetrap.bind(code, (e) => {
        callback && callback(e)
      })
    })
  }, [keyhandleList])
  return (
    <div
      id="hi-key-handler"
      onMouseEnter={() => {
        bindKeyCallback()
      }}
      onMouseLeave={() => {
        window.Mousetrap.reset()
      }}
    >
      {children}
    </div>
  )
}

export default KeyHandler
