import React, { useRef, useState, useCallback, useEffect } from 'react'

import classNames from 'classnames'

import Popper from '../popper'

import Menu from './Menu'
import Provider from '../context'

const noop = () => {}

const Cascader = (props) => {
  const {
    className,
    disabled = false,
    searchable = false,
    clearable = true,
    style,
    theme,
    value,
    defaultValue,
    displayRender,
    fieldNames = {},
    filterOption,
    changeOnSelect = false,
    localeDatas,
    onChange = noop,
    onActiveItemChange = noop
  } = props
  const data = props.data || props.options // 兼容1.x API 2.x 改为data
  const emptyContent = props.emptyContent || props.noFoundTip // 兼容1.x API 2.x改为 emptyContent
  const expandTrigger = props.expandTrigger || props.trigger || 'click' // 兼容2.x API 1.x改为 expandTrigger

  const getLabelKey = useCallback(() => {
    return fieldNames.label || 'content'
  }, [])

  const getValueKey = useCallback(() => {
    return fieldNames.value || 'id'
  }, [])

  const getChildrenKey = useCallback(() => {
    return fieldNames.children || 'children'
  }, [])

  const getCascaderLabel = useCallback(
    (values, dataList) => {
      if (displayRender) {
        return displayRender(values)
      }

      if (!values || values.length === 0) {
        return ''
      } else {
        const labels = []
        let index = 0
        let _options = dataList || data
        const labelKey = getLabelKey()
        const valueKey = getValueKey()
        const childrenKey = getChildrenKey()

        while (_options && _options.length > 0 && labels.length <= values.length) {
          const value = values[index]
          index++
          _options.every((option) => {
            if (option[valueKey] === value) {
              labels.push(option[labelKey])
              _options = option[childrenKey]
              return false
            } else {
              _options = []
              return true
            }
          })
        }
        return labels.join(' / ')
      }
    },
    [data]
  )
  const [filterOptions, setFilterOptions] = useState(false)
  // 缓存原始value，用户可能点击option但是没选中，用于恢复初始value
  const [cacheValue, setCacheValue] = useState(value || defaultValue || [])
  const [cascaderValue, setCascaderValue] = useState(value || defaultValue || [])
  const [cascaderLabel, setCascaderLabel] = useState(getCascaderLabel(value || defaultValue || []))

  const [popperShow, setPopperShow] = useState(false)
  const [keyword, setKeyword] = useState('')

  const hiCascader = useRef()
  const inputContainer = useRef()
  const inputRef = useRef()

  // 每次值被改变重置缓存值、重置label 展示
  useEffect(() => {
    if (value !== undefined) {
      setCacheValue(value)
    }
  }, [value])

  useEffect(() => {
    setCascaderLabel(getCascaderLabel(cacheValue))
    setCascaderValue(cacheValue)
  }, [cacheValue])

  const extraClass = {
    'hi-cascader--disabled': disabled,
    'hi-cascader--focused': popperShow,
    'hi-cascader--clearable': clearable
  }

  const onChangeValue = useCallback(
    (values, hasChildren) => {
      setFilterOptions(false)
      setKeyword('')
      setCascaderValue(values)
      if (expandTrigger === 'click') {
        if (changeOnSelect || !hasChildren) {
          if (value === undefined) {
            setCacheValue(values)
          }
          onChange(values)
        }
        if (hasChildren) {
          onActiveItemChange(values)
        } else {
          setPopperShow(false)
        }
      } else {
        // hover
        if (changeOnSelect || !hasChildren) {
          if (value === undefined) {
            setCacheValue(values)
          }
          onChange(values)
          setPopperShow(false)
        }
      }
    },
    [changeOnSelect, expandTrigger]
  )

  const clearValue = useCallback(
    (e) => {
      e.stopPropagation()
      onChangeValue([], false)
    },
    [onChangeValue]
  )

  const onHover = useCallback((value, hasChildren) => {
    setFilterOptions(false)
    setKeyword('')
    setCascaderValue(value)
    if (hasChildren) {
      onActiveItemChange(value)
    }
  }, [])

  const onKeywordChange = useCallback(() => {
    if (!keyword) {
      setFilterOptions(false)
      setPopperShow(false)
      return
    }
    let filterOptions = []
    const initMatchOptions = { options: [], matchCount: 0 }
    const labelKey = getLabelKey()
    const valueKey = getValueKey()
    const childrenKey = getChildrenKey()
    const _checkOptions = (options, match) => {
      options.map((option) => {
        const label = option[labelKey]
        const value = option[valueKey]
        const children = option[childrenKey]
        if (label.toString().includes(keyword) || value.toString().includes(keyword)) {
          match.matchCount++
        }

        match.options.push({
          [labelKey]: label,
          [valueKey]: value,
          disabled: option.disabled
        })

        if (children && children.length > 0) {
          _checkOptions(children, match)
        } else {
          if (match.matchCount > 0) {
            filterOptions.push(match.options.slice())
          }
        }
        if (label.toString().includes(keyword) || value.toString().includes(keyword)) {
          match.matchCount--
        }

        match.options.pop()
      })
    }

    _checkOptions(data, initMatchOptions)

    const ids = getSearchId(filterOptions, keyword)

    setCascaderValue(ids)
    filterOptions = formatFilterOptions(data, keyword)
    setPopperShow(true)
  }, [keyword, data])
  // 获取默认选中的最近的id
  const getSearchId = useCallback((filterOptions, keyword) => {
    const filterFunc = filterOption
    const levelItems = []
    const levelItemsObj = {}

    const labelKey = getLabelKey()
    const valueKey = getValueKey()
    if (filterOptions.length === 0) {
      return []
    } else {
      filterOptions.map((options) => {
        const jointOption = {
          jointOption: true,
          [labelKey]: [],
          [valueKey]: []
        }
        options.map((option, index) => {
          const levelItem = {
            [valueKey]: ''
          }

          levelItem[valueKey] = jointOption[valueKey].concat(option[valueKey])

          jointOption[valueKey].push(option[valueKey])
          option.disabled && (jointOption.disabled = option.disabled)
          option.disabled && (levelItem.disabled = option.disabled)

          if (!levelItemsObj[levelItem[valueKey]]) {
            levelItemsObj[levelItem[valueKey]] = levelItem[valueKey]
            if (filterFunc) {
              if (
                filterFunc(keyword, option) &&
                (levelItem[valueKey].toString().includes(keyword) || option[labelKey].toString().includes(keyword))
              ) {
                levelItems.push(levelItem)
              }
            } else {
              if (option[labelKey].toString().includes(keyword)) {
                levelItems.push(levelItem)
              }
            }
          }
        })
      })
    }
    if (levelItems.length === 0) {
      return []
    }

    const ids = levelItems.map((item) => item.id)
    let targetId = ids[0].join(',')
    for (let i = 1; i < ids.length; i++) {
      if (ids[i].join(',').includes(targetId)) {
        targetId = ids[i].join(',')
      }
    }

    return targetId.split(',').map((item) => Number(item))
  }, [])

  // 配置化
  const localeDatasProps = useCallback((key) => {
    return props[key] ? props[key] : localeDatas.cascader[key]
  }, [])

  const formatFilterOptions = useCallback((data, keyword) => {
    const labelKey = getLabelKey()
    const valueKey = getValueKey()
    const childrenKey = getChildrenKey()

    if (data.length === 0) {
      return []
    } else {
      const _changeOptions = (options) => {
        return options.map((option) => {
          const label = option[labelKey]
          const value = option[valueKey]
          const children = option[childrenKey]

          if (label.toString().includes(keyword) || value.toString().includes(keyword)) {
            const hightlight = []
            hightlight.push(hightlightKeyword(label, keyword))
            option.hightlight = hightlight
          } else {
            option.hightlight = null
          }

          if (children && children.length > 0) {
            _changeOptions(children)
          }

          return option
        })
      }
      setFilterOptions(_changeOptions(data, []))
      return _changeOptions(data)
    }
  })
  const hightlightKeyword = useCallback((text, keyword, uniqueKey) => {
    let _keyword = keyword
    _keyword = keyword.includes('[') ? _keyword.replace(/\[/gi, '\\[') : _keyword
    _keyword = keyword.includes('(') ? _keyword.replace(/\(/gi, '\\(') : _keyword
    _keyword = keyword.includes(')') ? _keyword.replace(/\)/gi, '\\)') : _keyword

    const parts = text.split(new RegExp(`(${_keyword})`, 'gi'))
    return (
      <span key={uniqueKey}>
        {parts.map((part, i) => (
          <span
            key={i}
            className={
              part === keyword
                ? 'hi-cascader-menu__item--label-hightlight'
                : 'hi-cascader-menu__item--label-noHightlight'
            }
          >
            {part}
          </span>
        ))}
      </span>
    )
  }, [])
  const handleClick = useCallback(
    (e) => {
      if (popperShow) {
        return
      }
      if (!disabled) {
        if (!searchable) {
          setKeyword('')
          setFilterOptions(false)
        }

        if (!searchable || (searchable && cascaderValue.length)) {
          setPopperShow(true)
        }
        if (searchable && keyword) {
          onKeywordChange()
        } else {
          setCascaderValue(cacheValue || [])
        }

        inputRef.current.focus()
      }
    },
    [popperShow, cacheValue, cascaderValue, keyword]
  )

  const expandIcon = popperShow ? 'icon-up' : 'icon-down'
  const placeholder = cascaderLabel || localeDatasProps('placeholder')

  return (
    <div className={classNames('hi-cascader', `theme__${theme}`, className, extraClass)} style={style} ref={hiCascader}>
      <div className="hi-cascader__input-container" ref={inputContainer} onClick={handleClick}>
        <input
          ref={inputRef}
          className="hi-cascader__input-keyword"
          value={(searchable && keyword) || (!popperShow && cascaderLabel) || ''}
          readOnly={!searchable}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => {
            if (!e.target.value) {
              clearValue(e)
            }
            setKeyword(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              onKeywordChange()
            }
          }}
        />
        <span className="hi-cascader__icon">
          <i
            className={classNames('hi-cascader__icon--expand', 'hi-icon', expandIcon, {
              'has-value': clearable && ((searchable && keyword !== '') || (!popperShow && cascaderLabel !== ''))
            })}
          />
          {clearable && ((searchable && keyword !== '') || (!popperShow && cascaderLabel !== '')) && (
            <i className="hi-cascader__icon--clear hi-icon icon-close-circle" onClick={clearValue} />
          )}
        </span>
      </div>
      <Popper
        show={popperShow}
        attachEle={inputContainer.current}
        zIndex={1050}
        topGap={5}
        width={'auto'}
        className="hi-cascader__popper"
        placement="top-bottom-start"
        onClickOutside={() => {
          setPopperShow(false)
        }}
      >
        <Menu
          value={cascaderValue}
          options={filterOptions || data}
          theme={theme}
          isFiltered={filterOptions}
          filterOptionWidth={hiCascader.current && hiCascader.current.clientWidth}
          valueKey={getValueKey()}
          labelKey={getLabelKey()}
          childrenKey={getChildrenKey()}
          onSelect={onChangeValue}
          onHover={onHover}
          expandTrigger={expandTrigger}
          emptyContent={emptyContent}
          localeDatasProps={localeDatasProps}
        />
      </Popper>
    </div>
  )
}
export default Provider(Cascader)
export { Cascader }
