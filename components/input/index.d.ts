interface Props {
  type?: 'text' | 'textarea' | 'id' | 'tel' | 'card' | 'amount' | 'email'
  value?: string | number
  defaultValue?: string | number
  prepend?: string | JSX.Element
  append?: string | JSX.Element
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
declare const Input: React.ComponentType<Props>
export default Input
