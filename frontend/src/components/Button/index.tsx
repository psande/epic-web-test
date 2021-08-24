// Libraries
import { ButtonHTMLAttributes } from 'react'

// Styles
import './Button.scss'

// Types
type Props = ButtonHTMLAttributes<HTMLButtonElement>

const Button = (props: Props) => (
  <button {...props}>{props.children}</button>
)

export default Button