import { CSSProperties } from "react"

type formData = {
  [prop: string]: any
}
interface FormProps {
  initialValues?: formData
  rules?: object
  labelWidth?: string | number
  labelPlacement?: 	'right' | 'left' | 'top'
  placement?: 'horizontal' | 'vertical'
  showColon?: boolean
  children: Form.Item
}

interface ItemProps {
  field?: string
  label?: string
  labelWidth?: string
  required?: boolean
  showColon?: boolean
}
interface SchemaItem extends ItemProps {
  component?: string
  componentProps?: string
}
interface SchemaProps {
  schema?: SchemaItem
  submit?: FormSubmit
}

interface FormSubmit extends ButtonProps{
  onClick?: (value: object, errors: object) => void
  validate?: any[]
}
interface FormReset extends ButtonProps{
  onClick?: () => void
  fields?: any[]
  toDefault?: boolean
}
interface FormList {
  name?: string
}
declare class Item extends React.Component<ItemProps, any> {
}
declare class SchemaForm extends React.Component<SchemaProps, any> {
}
declare class Form extends React.Component<FormProps, any> {
  static Item = Item
  static SchemaForm = SchemaForm
  static FormReset = FormReset
}

export default Form
